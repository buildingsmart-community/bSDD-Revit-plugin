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
using static BsddRevitPlugin.Logic.Model.ElementsManagerLogic;


namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManager
    {
        /// <summary>
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

                var ifcData = CreateIfcEntity(elem, doc);
                ifcEntities.Add(ifcData);
            }

            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }
        /// <summary>
        /// Set the IFC data from the bSDD UI to the correct Revit element.
        /// </summary>
        /// <param name="doc"></param>
        /// <param name="ifcEntity"></param>
        public static void SetIfcDataToRevitElement(Document doc, IfcEntity ifcEntity)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            logger.Info($"Element json {JsonConvert.SerializeObject(ifcEntity)}");

            //TODO: rework this method to do the following:
            //Dictionary<string, ParameterCreation> parametersToCreate = new Dictionary<string, ParameterCreation>();
            //Dictionary<string, string> parametersToSet = new Dictionary<string, string>();
            // Read IFC data from the entity
            // Get Attributes
            // Get classifications / materials
            // Get properties
            // and add to parametersToCreate and parametersToSet
            // Create parameters for all parameters in parametersToCreate
            // Set parameters for all parameters in parametersToSet

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

                    //Get all classifications and properties from the ifcEntity
                    var associations = ifcEntity.HasAssociations;
                    var isDefinedBy = ifcEntity.IsDefinedBy;

                    //Create a list of parameters to create
                    List<ParameterCreation> parametersToCreate = new List<ParameterCreation>();

                    //Add classification parameters to the list
                    //Set Revit parameters for each association
                    if (associations != null)
                    {
                        foreach (var association in associations)
                        {
                            switch (association)
                            {
                                case IfcClassificationReference ifcClassificationReference:
                                    // do something with ifcClassificationReference

                                    //Create parameter name for each unique the bsdd classificationReference
                                    bsddParameterName = CreateParameterNameFromIFCClassificationReferenceSourceLocation(ifcClassificationReference);
                                    parametersToCreate.Add(new ParameterCreation(bsddParameterName, specType, Parameters.ExistingProjectParameter(doc, bsddParameterName)));

                                    break;

                                case IfcMaterial ifcMaterial:
                                    // do something with ifcMaterial
                                    break;
                            }
                        }
                    }

                    //Add property parameters to the list
                    if (isDefinedBy != null)
                    {
                        foreach (var propertySet in isDefinedBy)
                        {
                            foreach (var property in propertySet.HasProperties)
                            {
                                if (property.Type == null)
                                {
                                    continue;
                                }

                                if (property.Type == "IfcPropertySingleValue")
                                {
                                    var propertySingleValue = property as IfcPropertySingleValue;
                                    if (propertySingleValue.NominalValue == null)
                                    {
                                        continue;
                                    }
                                    specType = GetParameterTypeFromProperty(propertySingleValue.NominalValue);
                                }
                                else if (property.Type == "IfcPropertyEnumeratedValue")
                                {
                                    var propertyEnumeratedValue = property as IfcPropertyEnumeratedValue;
                                    if (propertyEnumeratedValue.EnumerationValues == null || propertyEnumeratedValue.EnumerationValues.Count == 0)
                                    {
                                        continue;
                                    }
                                    var enumerationValue = propertyEnumeratedValue.EnumerationValues.First();
                                    specType = GetParameterTypeFromProperty(enumerationValue);
                                }
                                bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, property);
                                parametersToCreate.Add(new ParameterCreation(bsddParameterName, specType, Parameters.ExistingProjectParameter(doc, bsddParameterName)));
                            }
                        }
                    }

                    string objectTypeParamName = "IfcObjectType[Type]";
                    if (ifcEntity.ObjectType != null)
                    {
                        parametersToCreate.Add(new ParameterCreation(objectTypeParamName, SpecTypeId.String.Text, Parameters.ExistingProjectParameter(doc, objectTypeParamName)));
                    }

                    //First create all parameters at once (in Release creating parameters seperately sometimes fails)
                    List<Category> currentCategoryLst = new List<Category>() { elementType.Category };
                    Parameters.CreateProjectParameters(doc, parametersToCreate, "tempGroupName", groupType, false, currentCategoryLst);

                    //Set Revit parameters for each association
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

                                            //Allways add a object type
                                            case var name when name == objectTypeParamName:
                                                if (ifcEntity.ObjectType != null)
                                                {
                                                    typeparameter.Set(ifcEntity.ObjectType);
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
                    if (isDefinedBy != null)
                    {
                        foreach (var propertySet in isDefinedBy)
                        {
                            foreach (var property in propertySet.HasProperties)
                            {
                                if (property.Type == null)
                                {
                                    continue;
                                }

                                if (property.Type == "IfcPropertySingleValue")
                                {
                                    var propertySingleValue = property as IfcPropertySingleValue;
                                    if (propertySingleValue.NominalValue == null)
                                    {
                                        continue;
                                    }
                                    createAndSetTypeProperty(elementType, propertySet, property, propertySingleValue.NominalValue);
                                }
                                else if (property.Type == "IfcPropertyEnumeratedValue")
                                {
                                    var propertyEnumeratedValue = property as IfcPropertyEnumeratedValue;
                                    if (propertyEnumeratedValue.EnumerationValues == null || propertyEnumeratedValue.EnumerationValues.Count == 0)
                                    {
                                        continue;
                                    }
                                    var enumerationValue = propertyEnumeratedValue.EnumerationValues.First();
                                    createAndSetTypeProperty(elementType, propertySet, property, enumerationValue);
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
        /// <summary>
        /// Highlight/select the elements in Revit
        /// </summary>
        /// <param name="uidoc"></param>
        /// <param name="ifcEntity"></param>
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
        /// <summary>
        /// Filter the current selection
        /// </summary>
        /// <param name="elemList"></param>
        /// <returns></returns>
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
                        item.Category.Name != "Stacked Walls" &&
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
    }
}