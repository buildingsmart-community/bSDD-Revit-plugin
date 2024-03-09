﻿using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.Utilities;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManager
    {

        // Element IFCClassification schema
        private static Guid s_schemaId = new Guid("79717CB2-D47B-4EC0-8E74-83A43E7D9F0A");
        private const string s_IfcClassificationData = "IfcClassificationData";
        private static Schema GetBsddDataSchema()
        {
            Schema schema = Schema.Lookup(s_schemaId);
            if (schema == null)
            {
                SchemaBuilder classificationBuilder = new SchemaBuilder(s_schemaId);
                classificationBuilder.SetSchemaName("BsddData");
                classificationBuilder.AddSimpleField(s_IfcClassificationData, typeof(string));
                schema = classificationBuilder.Finish();
            }
            return schema;
        }


        public static List<ElementType> ListFilter(List<ElementType> elemList)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            List<ElementType> elemListFiltered = new List<ElementType>();


            string typeId;
            List<string> idList = new List<string>();
            foreach (ElementType item in elemList)
            {
                try
                {
                    if (item != null && item.Category != null)
                    {
                        if (
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Grids" &&
                        item.Category.Name != "Location Data" &&
                        item.Category.Name != "Model Groups" &&
                        item.Category.Name != "RVT Links" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            //dubble elementen verwijderen
                            typeId = GetTypeId(item);
                            bool chk = !idList.Any();
                            //logger.Debug("Aantal: " + idList.Count());
                            //logger.Debug("TypeId: " + typeId);
                            int count = idList.Count();
                            int number = 1;
                            foreach (string result in idList)
                            {
                                // do something with each item
                                //logger.Debug("result: " + result);
                                if (count == number)
                                {
                                    // do something different with the last item
                                    if (result != typeId)
                                    {
                                        idList.Add(typeId);
                                        elemListFiltered.Add(item);
                                        break;
                                    }
                                }
                                else
                                {
                                    // do something different with every item but the last
                                    if (result == typeId)
                                    {
                                        break;
                                    }
                                }
                                number++;
                            }
                            if (idList.Count() == 0)
                            {
                                idList.Add(typeId);
                                elemListFiltered.Add(item);
                            }
                        }
                    }
                }
                catch { }
            }

            elemListFiltered = elemListFiltered.Distinct().ToList();
            return elemListFiltered;
        }
        public static void SetIfcDataToRevitElement(Document doc, IfcEntity ifcEntity)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");

            try
            {
                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("Save bsdd data to element");

                    // Create a classification set in which every dictionary will be collected
                    HashSet<IfcClassification> dictionaryCollection = new HashSet<IfcClassification>();

                    //Get the elementType
                    int idInt = Convert.ToInt32(ifcEntity.Tag);
                    ElementId typeId = new ElementId(idInt);
                    ElementType elementType = doc.GetElement(typeId) as ElementType;

                    //Initialize parameters
                    string bsddParameterName = "";
                    string parameterMappedName = "";

                    //Set parameter type and group for the bsdd classification parameters
                    ForgeTypeId specType = SpecTypeId.String.Text;
                    ForgeTypeId groupType = GroupTypeId.Ifc;

                    //Add all associations to the element in element entity storage
                    Schema schema = GetBsddDataSchema();
                    var field = schema.GetField(s_IfcClassificationData);
                    try
                    {
                        Entity entity = new Entity(schema);
                        entity.Set(field, JsonConvert.SerializeObject(ifcEntity.HasAssociations));
                        elementType.SetEntity(entity);
                    }
                    catch
                    {
                        Console.WriteLine("error");
                    }


                    //Set Revit parameters for each association
                    var associations = ifcEntity.HasAssociations;
                    if (associations != null)
                    {
                        foreach (var association in associations)
                        {
                            switch (association)
                            {
                                case IfcClassificationReference ifcClassificationReference:
                                    // do something with ifcClassificationReference

                                    dictionaryCollection.Add(ifcClassificationReference.ReferencedSource);

                                    //Create parameter name for each unique the bsdd classificationReference
                                    bsddParameterName = CreateParameterNameFromIFCClassificationReferenceSourceLocation(ifcClassificationReference);

                                    //Add a project parameter for the bsdd classification in all Revit categories if it does not exist
                                    Utilities.Parameters.CreateProjectParameterForAllCategories(doc, bsddParameterName, "tempGroupName", specType, groupType, false);

                                    //Get mapped parametername (stored in the documents DataStorage)
                                    parameterMappedName = GetMappedParameterName(ifcClassificationReference);

                                    //Check each type parameter from the object
                                    foreach (Parameter typeparameter in elementType.Parameters)
                                    {
                                        string typeParameterName = typeparameter.Definition.Name;

                                        switch (typeParameterName)
                                        {
                                            //Add the bsdd value to the parameter
                                            case var name when name == bsddParameterName:
                                                try
                                                {
                                                    logger.Info($"Setting parameter {typeparameter.Definition.Name} with value {ifcClassificationReference.Identification + ":" + ifcClassificationReference.Name}");
                                                    typeparameter.Set(ifcClassificationReference.Identification + ":" + ifcClassificationReference.Name);
                                                }
                                                catch (Exception)
                                                {

                                                    throw;
                                                }
                                                break;

                                            //Add the bsdd value to the mapped parameter
                                            case var name when name == parameterMappedName:
                                                typeparameter.Set(ifcClassificationReference.Identification);
                                                break;

                                            //Allways add a type
                                            case "Export Type to IFC As":
                                                if (ifcEntity.Type != null)
                                                {
                                                    typeparameter.Set(ifcEntity.Type);
                                                }
                                                break;

                                            //Allways add a predifined type
                                            case "Type IFC Predefined Type":
                                                //add check if Type even exists
                                                if (ifcEntity.PredefinedType != null)
                                                {
                                                    typeparameter.Set(ifcEntity.PredefinedType);
                                                }
                                                else if (ifcEntity.Type != null && ifcEntity.PredefinedType == null)
                                                {
                                                    typeparameter.Set("");
                                                }
                                                break;

                                            default:
                                                break;
                                        }
                                    }

                                    break;

                                case IfcMaterial ifcMaterial:
                                    // do something with ifcMaterial
                                    break;
                            }
                        }
                    }
                    //Set Revit parameters for each property
                    var isDefinedBy = ifcEntity.IsDefinedBy;

                    List<ParameterCreation> parametersToCreate = new List<ParameterCreation>();
                    if (isDefinedBy != null)
                    {
                        foreach (var propertySet in isDefinedBy)
                        {
                            foreach (var property in propertySet.HasProperties)
                            {
                                if (property.NominalValue.Type != null)
                                {
                                    //Else default specType string.text is used
                                    specType = GetParameterTypeFromProperty(property);
                                }
                                bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, property.Name);
                                parametersToCreate.Add(new ParameterCreation(bsddParameterName, specType));
                            }
                        }
                    }
                    //Add a project parameter for the bsdd parameter in all Revit categorices if it does not exist 
                    //NOTE: THIS IS UP FOR DISCUSSION, AS IT MIGHT NOT BE NECESSARY TO ADD THE PARAMETER TO ALL CATEGORIES
                    Parameters.CreateProjectParametersForAllCategories(doc, parametersToCreate, "tempGroupName", groupType, false);

                    if (isDefinedBy != null)
                    {
                        foreach (var propertySet in isDefinedBy)
                        {
                            foreach (var property in propertySet.HasProperties)
                            {
                                //Set parameter type and group for the bsdd classification parameters
                                if (property.NominalValue.Type != null)
                                {
                                    //Else default specType string.text is used
                                    specType = GetParameterTypeFromProperty(property);
                                }

                                //Create parameter name for each unique the bsdd property
                                bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, property.Name);
                                ////Commenting this switch: Issue with LoadBearing etc being allready added as a param without all categories
                                //switch (property.Name)
                                //{
                                //    //Allways add a type
                                //    case "Load Bearing":
                                //        bsddParameterName = "LoadBearing";
                                //        break;

                                //    //Allways add a predifined type
                                //    case "Is External":
                                //        //add check if Type even exists
                                //        bsddParameterName = "IsExternal";
                                //        break;

                                //    //Allways add a predifined type
                                //    case "Fire Rating":
                                //        //add check if Type even exists
                                //        bsddParameterName = "FireRating";
                                //        break;

                                //    default:
                                //        bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, property.Name);
                                //        break;
                                //}

                                //Add a project parameter for the bsdd parameter in all Revit categorices if it does not exist 
                                //NOTE: THIS IS UP FOR DISCUSSION, AS IT MIGHT NOT BE NECESSARY TO ADD THE PARAMETER TO ALL CATEGORIES
                                //Utilities.Parameters.CreateProjectParameterForAllCategories(doc, bsddParameterName, "tempGroupName", specType, groupType, false);

                                if (property.NominalValue.Value != null)
                                {
                                    dynamic value = GetParameterValueInCorrectDatatype(property);

                                    //Check each type parameter from the object
                                    foreach (Parameter typeparameter in elementType.Parameters)
                                    {
                                        string typeParameterName = typeparameter.Definition.Name;


                                        //Add the bsdd value to the parameter
                                        if (typeParameterName == bsddParameterName)
                                        {
                                            try
                                            {
                                                //because the value is dynamic, always try catch
                                                typeparameter.Set(value);
                                            }
                                            catch (Exception e)
                                            {
                                                logger.Info($"Property {property.Name} of type {property.Type} could not be set for elementType {elementType.Name},'{elementType.Id}'. Exception: {e.Message}");
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    }

                    tx.Commit();
                }

            }
            catch (Exception e)
            {
                logger.Info($"Failed to set elementdata: {e.Message}");
                throw;
            }
        }
        public static void SelectElementsWithIfcData(UIDocument uidoc, IfcEntity ifcEntity)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");
            Document doc = uidoc.Document;

            try
            {
                //Get the elementType
                int idInt = Convert.ToInt32(ifcEntity.Tag);
                ElementId typeId = new ElementId(idInt);
                ElementType elementType = doc.GetElement(typeId) as ElementType;

                //Get all instances of the elementtype
                FilteredElementCollector collector = new FilteredElementCollector(doc);
                var elements = collector
                    .WhereElementIsNotElementType()
                    .Where(e => e.GetTypeId() == elementType.Id)
                    .ToList();
              
                //Get element ids
                List<ElementId> elementIds = elements.Select(e => e.Id).ToList();


                try
                {

                    // Select the elements in the UI
                    uidoc.Selection.SetElementIds(elementIds);
                }
                catch
                {
                    Console.WriteLine("Could not select any elements");
                }


            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                throw;
            }
        }

        private static dynamic GetParameterValueInCorrectDatatype(IfcPropertySingleValue property)
        {
            dynamic value = property.NominalValue.Value;

            if (value != null)
            {

                // Parse value to correct datatype
                switch (property.NominalValue.Type)
                {
                    case "IfcBoolean":
                        try
                        {
                            bool revidBool = (bool)value;
                            value = revidBool ? 1 : 0;
                        }
                        catch (InvalidCastException)
                        {
                            value = 0;
                            // Handle or ignore the error when value is not a boolean
                        }
                        break;
                    case "IfcInteger":
                        try
                        {
                            value = Convert.ToInt32(value);

                        }
                        catch (Exception)
                        {
                            value = 0;
                        }
                        break;
                    case "IfcReal":
                        try
                        {

                            value = Convert.ToDouble(value);
                        }
                        catch (Exception)
                        {

                            value = 0;
                        }
                        break;
                    case "IfcDate":
                        try
                        {
                            //TODO: Check what seems to be a valid DateTime to get and convert
                            value = Convert.ToDateTime(value).ToString();

                        }
                        catch (Exception)
                        {

                            value = value.ToString();
                        }
                        break;
                    default:
                        // IfcString or Default
                        try
                        {

                            value = value.ToString();
                        }
                        catch (Exception)
                        {

                            value = "";
                        }
                        break;
                }
            }
            else
            {

                // Parse value to correct datatype
                switch (property.NominalValue.Type)
                {
                    case "IfcBoolean":
                        
                            value = 0;
                         
                        break;
                    case "IfcInteger":
                        
                            value = 0;
                        break;
                    case "IfcReal":
                        
                            value = 0;
                        break;
                    case "IfcDate":
                        
                            value = "";
                        break;
                    default:
                            value = "";
                        break;
                }
            }

            return value;
        }

        private static ForgeTypeId GetParameterTypeFromProperty(IfcPropertySingleValue property)
        {
            switch (property.NominalValue.Type)
            {
                case "IfcBoolean":
                    return SpecTypeId.Boolean.YesNo;
                case "IfcInteger":
                    return SpecTypeId.Int.Integer;
                case "IfcReal":
                    return SpecTypeId.Length;
                case "IfcDate":
                    //Revit does not support date, so use string
                    return SpecTypeId.String.Text;
                default:
                    // IfcString or Default
                    return SpecTypeId.String.Text;
            }
        }

        public static string GetMappedParameterName(IfcClassificationReference ifcClassificationReference)
        {
            Uri refSourceLocation = ifcClassificationReference.ReferencedSource.Location;

            if (GlobalBsddSettings.bsddsettings.MainDictionary.IfcClassification.Location == refSourceLocation)
            {
                return GlobalBsddSettings.bsddsettings.MainDictionary.ParameterMapping;
            }
            else
            {
                foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
                {
                    if (filterDictionary.IfcClassification.Location == refSourceLocation)
                    {
                        return filterDictionary.ParameterMapping;
                    }
                }
            }
            return "";
        }

        /// <summary>
        /// Creates a Revit bSDD parameter name for the from the given peropertyset and property.
        /// </summary>
        /// <param name="uri">The URI to create the parameter name from.</param>
        /// <returns>The parameter name created from the URI.</returns>
        public static string CreateParameterNameFromPropertySetAndProperty(string propertySet, string property)
        {
            string parameterName = $"bsdd/prop/{propertySet}/{property}";
            return parameterName;
        }
        /// <summary>
        /// Creates a Revit bSDD parameter name for the from the given URI.
        /// </summary>
        /// <param name="uri">The URI to create the parameter name from.</param>
        /// <returns>The parameter name created from the URI.</returns>
        public static string CreateParameterNameFromUri(Uri uri)
        {
            string parameterName = $"bsdd/class/{uri.Host}{uri.PathAndQuery}";
            return parameterName;
        }

        /// <summary>
        /// Creates a parameter name from the IFC classification reference source location.
        /// </summary>
        /// <param name="ifcClassificationReference">The IFC classification reference.</param>
        /// <returns>The parameter name created from the source location.</returns>
        public static string CreateParameterNameFromIFCClassificationReferenceSourceLocation(IfcClassificationReference ifcClassificationReference)
        {
            return CreateParameterNameFromUri(ifcClassificationReference.ReferencedSource.Location);
        }

        /// <summary>
        /// Retrieves the associations from the extended storage for an entity.
        /// </summary>
        /// <param name="entity">The entity from which to retrieve the associations.</param>
        /// <returns>A dictionary of associations with the location as the key.</returns>        
        private static IEnumerable<IfcClassificationReference> getElementTypeClassificationsReferencesFromExtensibleStorage(ElementType elementType)
        {
            // TODO: Implement Ienumerable<Associations> so materials are also added correctly or add a separate function for materials
            Schema schema = GetBsddDataSchema();
            var storageEntity = elementType.GetEntity(schema);


            if (storageEntity.Schema != null)
            {
                var field = schema.GetField(s_IfcClassificationData);
                var jsonString = storageEntity.Get<string>(field);

                if (!string.IsNullOrEmpty(jsonString))
                {
                    return JsonConvert.DeserializeObject<List<IfcClassificationReference>>(jsonString);
                }
            }

            return Enumerable.Empty<IfcClassificationReference>();
        }

        /// <summary>
        /// Retrieves the classification data mapped to the current settings for a given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <returns>A dictionary containing the classification data, where the key is the dictionary URI and the value is a tuple of the identification and name.</returns>
        public static Dictionary<Uri, (string Identification, string Name)> GetClassificationDataFromSettings(ElementType elementType)
        {
            var classificationData = new Dictionary<Uri, (string Identification, string Name)>();
            var activeDictionaries = GetActiveDictionaries();

            foreach (var dictionary in activeDictionaries)
            {
                string bsddParameterValue = GetTypeParameterValueByElementType(elementType, CreateParameterNameFromUri(dictionary.IfcClassification.Location));
                string mappedParameterValue = GetTypeParameterValueByElementType(elementType, dictionary.ParameterMapping);

                string identification = null;
                string name = null;

                if (!string.IsNullOrEmpty(bsddParameterValue))
                {
                    var splitValue = bsddParameterValue.Split(':');
                    identification = splitValue[0];
                    name = splitValue.Length > 1 ? splitValue[1] : splitValue[0];
                }
                if (!string.IsNullOrEmpty(mappedParameterValue))
                {
                    var splitValue = mappedParameterValue.Split(':');
                    identification = splitValue[0];
                    if (string.IsNullOrEmpty(name))
                    {
                        name = splitValue.Length > 1 ? splitValue[1] : splitValue[0];
                    }
                    else
                    {
                        if (splitValue.Length > 1)
                        {
                            name = splitValue[1];
                        }
                    }
                }

                if (!string.IsNullOrEmpty(identification) || !string.IsNullOrEmpty(name))
                {
                    classificationData[dictionary.IfcClassification.Location] = (identification, name);
                }
            }

            return classificationData;
        }

        /// <summary>
        /// Retrieves the associations from the extended storage for an entity.
        /// </summary>
        /// <param name="entity">The entity from which to retrieve the associations.</param>
        /// <returns>A dictionary of associations with the location as the key.</returns>        
        private static Dictionary<Uri, IfcClassificationReference> GetElementTypeAssociations(ElementType elementType)
        {
            var associations = new Dictionary<Uri, IfcClassificationReference>();
            var activeDictionaryData = GetClassificationDataFromSettings(elementType);

            foreach (var association in getElementTypeClassificationsReferencesFromExtensibleStorage(elementType))
            {
                if (association is IfcClassificationReference ifcClassificationReference)
                {
                    try
                    {
                        associations[ifcClassificationReference.ReferencedSource.Location] = ifcClassificationReference;

                    }
                    catch (Exception)
                    {

                    }
                }
            }

            foreach (var entry in activeDictionaryData)
            {
                Uri dictionaryUri = entry.Key;
                (string Identification, string Name) value = entry.Value;

                if (!associations.TryGetValue(dictionaryUri, out var association))
                {
                    // add new IfcClassificationReference to the dictionary based on dictionaryUri, Identification and Name
                    associations[dictionaryUri] = new IfcClassificationReference
                    {
                        Type = "IfcClassificationReference",
                        Identification = value.Identification,
                        Name = value.Name,
                        ReferencedSource = new IfcClassification
                        {
                            Type = "IfcClassification",
                            Location = dictionaryUri,
                        }
                    };
                }
                else
                {
                    //update the existing IfcClassificationReference with the new values from the revit typeEntity
                    var ifcClassificationReference = (IfcClassificationReference)association;
                    ifcClassificationReference.Identification = value.Identification;
                    ifcClassificationReference.Name = value.Name;
                }
            }

            return associations;
        }


        // also create a function that retrieves the combined list of main and filter dictionaries from the global settings
        public static IEnumerable<BsddDictionary> GetActiveDictionaries()
        {
            return new[] { GlobalBsddSettings.bsddsettings.MainDictionary }
                .Concat(GlobalBsddSettings.bsddsettings.FilterDictionaries);
        }

        /// Transforms selected Revit types into a bSDD-compatible ifcJSON structure.
        /// </summary>
        /// <param name="doc">The active Revit document.</param>
        /// <param name="elemList">The list of selected Revit element types.</param>
        /// <returns>A IfcData object representing the ifcJSON structure.</returns>
        public static List<IfcEntity> SelectionToIfcJson(Document doc, List<ElementType> elemList)
        {
            if (doc == null || elemList == null)
            {
                throw new ArgumentNullException(doc == null ? nameof(doc) : nameof(elemList));
            }

            var ifcEntities = new List<IfcEntity>();

            foreach (ElementType elem in elemList)
            {
                if (elem == null)
                {
                    continue;
                }

                var ifcData = CreateIfcEntity(elem);
                ifcEntities.Add(ifcData);
            }

            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }

        // TODO: IFC type should also be read from the mapping files when not present in the revit typeEntity

        /// <summary>
        /// Transforms a Revit element type into an IFC entity.
        /// </summary>
        private static IfcEntity CreateIfcEntity(ElementType elem)
        {
            string familyName = GetElementTypeFamilyName(elem, GetTypeParameterValueByElementType(elem, "IfcName"));
            string typeName = GetElementTypeName(elem, GetTypeParameterValueByElementType(elem, "IfcType"));
            string ifcTag = elem.Id.ToString();
            string typeDescription = GetTypeParameterValueByElementType(elem, "Description");
            string ifcType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString();
            string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();

            var associations = GetElementTypeAssociations(elem);

            var ifcEntity = new IfcEntity
            {
                Type = ifcType,
                Name = $"{familyName} - {typeName}",
                Tag = ifcTag,
                Description = string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription,
                PredefinedType = ifcPredefinedType,
            };

            if (associations != null && associations.Count > 0)
            {
                ifcEntity.HasAssociations = associations.Values.ToList<Association>();
            }

            return ifcEntity;
        }

        /// <summary>
        /// Retrieves the family name of the given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <param name="ifcName">The IFC name, returned if not null or empty.</param>
        /// <returns>The family name or an empty string if unavailable.</returns>
        public static string GetElementTypeFamilyName(ElementType elementType, string ifcName)
        {
            if (!string.IsNullOrEmpty(ifcName))
            {
                return ifcName;
            }

            try
            {
                return elementType.FamilyName;
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Retrieves the name of the given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <param name="ifcType">The IFC type, returned if not null or empty.</param>
        /// <returns>The element type name or an empty string if unavailable.</returns>
        public static string GetElementTypeName(ElementType elementType, string ifcType)
        {
            if (!string.IsNullOrEmpty(ifcType))
            {
                return ifcType;
            }

            try
            {
                return elementType.Name;
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Retrieves the ID of the given element.
        /// </summary>
        /// <param name="element">The element.</param>
        /// <returns>The element ID as a string, or an empty string if unavailable.</returns>
        public static string GetTypeId(Element element)
        {
            try
            {
                return element?.Id?.ToString() ?? string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static dynamic GetTypeParameterValueByElementType(ElementType elementType, string parameterName)
        {
            try
            {
                //ElementType elementType = doc.GetElement(element.GetTypeId()) as ElementType;
                //ElementType elementType = doc.GetElement(element.Id) as ElementType;

                if (elementType?.LookupParameter(parameterName) != null)
                {
                    return _getParameterValueByCorrectStorageType2(elementType.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        private static dynamic _getParameterValueByCorrectStorageType2(Parameter parameter)
        {
            switch (parameter.StorageType)
            {
                case StorageType.ElementId:
                    return parameter.AsElementId().IntegerValue;
                case StorageType.Integer:
                    return parameter.AsInteger();
                case StorageType.None:
                    return parameter.AsString();
                case StorageType.Double:
                    return parameter.AsDouble();
                case StorageType.String:
                    return parameter.AsValueString();
                default:
                    return "";
            };
        }
        public static string GetMaterialName(Element e, Document DbDoc)
        {
            string materialName = "not defined1";
            Autodesk.Revit.DB.Material firstMaterial = null;

            // Reference to the Revit API Document
            Document doc = DbDoc;

            // Reference to the element you are interested in
            ElementId elementId = e.GetTypeId();
            //Element element = doc.GetElement(elementId);

            //// Get the Material Id of the element
            //ICollection<ElementId> materialIds = element.GetMaterialIds(false);
            //foreach (ElementId materialId in materialIds)
            //{
            //    firstMaterial = doc.GetElement(materialId) as Autodesk.Revit.DB.Material;
            if (firstMaterial != null)
            {
                // Found the first material, break out of the loop
                //        break;
            }
            //}

            if (firstMaterial != null)
            {
                //                materialName = firstMaterial.Name;
                // You can access other properties of the material here
                // For example, firstMaterial.Color, firstMaterial.Transparency, etc.
            }
            else
            {
                materialName = "No material found1";
            }

            return materialName;
        }
        public static Uri GetLocationParam(string domain, Element element)
        {
            Uri paramValue = new Uri(domain);

            foreach (Parameter parameter in element.Parameters)
            {
                if (parameter.Definition.Name == "location")
                {
                    paramValue = new Uri(parameter.ToString(), UriKind.Absolute);
                }
            }

            return paramValue;
        }
    }
}
