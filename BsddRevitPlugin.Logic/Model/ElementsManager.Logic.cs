using ASRR.Core.Persistence;
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
using System.IO;


namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManagerLogic
    {
        //TODO: Split this class into smaller classes serving ElementsManager.cs (FA ParameterDataManagement)

        // Element IFCClassification schema
        public static Guid s_schemaId = new Guid("79717CB2-D47B-4EC0-8E74-83A43E7D9F0A");
        public const string s_IfcClassificationData = "IfcClassificationData";
        public static Schema GetBsddDataSchema()
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

        public static void SetIfcEntityToElementDataStorage(IfcEntity ifcEntity, ElementType elementType)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

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
                logger.Error($"Failed to set datastorage for element '{elementType.Name}'!");
                Console.WriteLine("error");
            }
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
        public static IEnumerable<IfcClassificationReference> getElementTypeClassificationsReferencesFromExtensibleStorage(ElementType elementType)
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
            Logger logger = LogManager.GetCurrentClassLogger();
            var classificationData = new Dictionary<Uri, (string Identification, string Name)>();
            var activeDictionaries = GetActiveDictionaries();

            foreach (var dictionary in activeDictionaries)
            {
                string bsddParameterValue = "";
                string mappedParameterValue = "";
                // TODO: sometimes values come back as null, how does this look in the IFC?
                try
                {
                    bsddParameterValue = GetTypeParameterValueByElementType(elementType, CreateParameterNameFromUri(dictionary.IfcClassification.Location));

                }
                catch (Exception e)
                {
                    logger.Error(e);
                }
                try
                {

                    mappedParameterValue = GetTypeParameterValueByElementType(elementType, dictionary.ParameterMapping);
                }
                catch (Exception e)
                {

                    logger.Error(e);
                }

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
        public static Dictionary<Uri, IfcClassificationReference> GetElementTypeAssociations(ElementType elementType)
        {

            Logger logger = LogManager.GetCurrentClassLogger();
            var associations = new Dictionary<Uri, IfcClassificationReference>();
            var activeDictionaryData = GetClassificationDataFromSettings(elementType);


            foreach (var association in getElementTypeClassificationsReferencesFromExtensibleStorage(elementType))
            {
                if (association is IfcClassificationReference ifcClassificationReference)
                {
                    associations[ifcClassificationReference.ReferencedSource.Location] = ifcClassificationReference;
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


        /// <summary>
        /// Retrieves the combined list of main and filter dictionaries from the global settings.
        /// If the MainDictionary is null, it is left out.
        /// </summary>
        public static IEnumerable<BsddDictionary> GetActiveDictionaries()
        {
            var activeDictionaries = new List<BsddDictionary>();

            if (GlobalBsddSettings.bsddsettings.MainDictionary != null)
            {
                activeDictionaries.Add(GlobalBsddSettings.bsddsettings.MainDictionary);
            }

            if (GlobalBsddSettings.bsddsettings.FilterDictionaries != null)
            {
                activeDictionaries = activeDictionaries.Concat(GlobalBsddSettings.bsddsettings.FilterDictionaries).ToList();
            }

            return activeDictionaries;
        }


        // TODO: IFC type should also be read from the mapping files when not present in the revit typeEntity

        /// <summary>
        /// Transforms a Revit element type into an IFC entity.
        /// </summary>
        public static IfcEntity CreateIfcEntity(ElementType elem, Document doc)
        {
            string familyName = GetElementTypeFamilyName(elem, GetTypeParameterValueByElementType(elem, "IfcName"));
            string typeName = GetElementTypeName(elem, GetTypeParameterValueByElementType(elem, "IfcType"));
            string ifcTag = elem.Id.ToString();
            string typeDescription = GetTypeParameterValueByElementType(elem, "Description");
            string ifcType = IFCMappingValue(doc, elem);
            string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
            string objectType = GetTypeParameterValueByElementType(elem, "IfcObjectType[Type]");

            var ifcEntity = new IfcEntity
            {
                Type = ifcType,
                Name = $"{familyName} - {typeName}",
                Tag = ifcTag,
                Description = string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription,
                PredefinedType = ifcPredefinedType,
                ObjectType = objectType,
            };

            //embed propertysets bsdd/prop/ in Ifc Defenition
            List<IfcPropertySet> propertySets = IfcDefinition(elem);
            if (propertySets != null && propertySets.Count > 0)
            {
                ifcEntity.IsDefinedBy = propertySets;
            }

            var associations = GetElementTypeAssociations(elem);
            if (associations != null && associations.Count > 0)
            {
                ifcEntity.HasAssociations = associations.Values.ToList<Association>();
            }

            //Embed Ifc Definition Ifc Entity
            //ifcEntity.IsDefinedBy = isDefinedBy;

            return ifcEntity;
        }

        /// <summary>
        /// Retrieves the IfcDefinition filled with the parameters who starts with bsdd/prop/ of the given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <returns>The IfcDefinition with the bsdd parameters</returns>
        public static List<IfcPropertySet> IfcDefinition(ElementType elementType)
        {
            var propertySetsDictionary = new Dictionary<string, List<IfcProperty>>();

            foreach (Parameter parameter in elementType.Parameters)
            {
                string parameterName = parameter.Definition.Name;

                if (!parameter.HasValue ||
                    (!parameterName.StartsWith("bsdd/prop/", StringComparison.Ordinal) &&
                    !IfcParameterMappings.IfcParameters.Contains(parameterName, StringComparer.Ordinal)))
                {
                    continue;
                }
                if(parameterName == "Category" && parameter.IsReadOnly == true)
                {
                    continue;
                } 

                string[] parameterParts = parameterName.StartsWith("bsdd/prop/", StringComparison.Ordinal)
                    ? parameterName.Remove(0, 10).Split('/')
                    : new string[] { "", parameterName };

                string propertySetName = parameterParts[0];
                string propertyName = parameterParts[1];

                var property = IfcProperties.GetIfcPropertySingleValue(propertyName, parameter);

                if (!propertySetsDictionary.ContainsKey(propertySetName))
                {
                    propertySetsDictionary[propertySetName] = new List<IfcProperty>();
                }

                propertySetsDictionary[propertySetName].Add(property);
            }

            var propertySets = new List<IfcPropertySet>();

            foreach (var propertySetPair in propertySetsDictionary)
            {
                var propertySet = new IfcPropertySet
                {
                    Type = "IfcPropertySet",
                    Name = propertySetPair.Key,
                    HasProperties = propertySetPair.Value
                };

                propertySets.Add(propertySet);
            }

            return propertySets;
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
        public static dynamic _getParameterValueByCorrectStorageType2(Parameter parameter)
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

        public static String IFCMappingValue(Document doc, Element elem)
        {
            if (elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString() != null &&
                elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString() != "")
            {
                return elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString();
            }

            //krijg category van element
            String cat = "null";
            if (elem.Category != null)
            {
                Category elemCategory = elem.Category;
                cat = elemCategory.Name.ToString();
            }
            

            /* Vind alle subcategories van de categorie
            if (elemCategory != null)
            {
                // Retrieve the subcategories of the element's category
                foreach (Category subcategory in elemCategory.SubCategories)
                {
                    string subcategoryName = subcategory.Name;
                    // Now you have the subcategory name!
                    // You can use it as needed in your code.
                    // For example, print it to the console:
                }
            }
            //Vind alle subcategories van de categorie */


            //txt opbouw per regel: Category<tab> Subcategory<tab> Layer name < tab > Color number<tab>
            String exportCategoryTableFilePath = doc.Application.ExportIFCCategoryTable;

            // Dictionary to store the mapping between Revit categories and IFC class names
            Dictionary<string, string> mappingTable = new Dictionary<string, string>();

            String line;
            try
            {
                //Pass the file path and file name to the StreamReader constructor
                StreamReader sr = new StreamReader(exportCategoryTableFilePath);
                line = sr.ReadLine();
                String sep = "\t";
                while (line != null)
                {
                    if (line.StartsWith("#") || line == null)
                    {

                    }
                    else
                    {
                        string[] splitContent = line.Split(sep.ToCharArray());
                        // Dictionary to store the mapping between Revit categories and IFC class names
                        mappingTable.Add(splitContent[0] + "\t" + splitContent[1], splitContent[2]);
                    }

                    //Read the next line
                    line = sr.ReadLine();
                }
                //close the file
                sr.Close();
                Console.ReadLine();
            }
            catch
            {

            };
            string result;
            try
            {
                //Needed due to mappingtable not containing certain categories such as "Runs".
                result = mappingTable[cat + "\t"];
            }
            catch (Exception e)
            {
                result = "";
            }

            return result;
        }
    }
}