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
using System.Security.Cryptography;
using Revit.IFC.Export.Exporter.PropertySet;
using Revit.IFC.Import.Utility;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using Revit.IFC.Export.Toolkit;
using Revit.IFC.Import.Data;
using Autodesk.Revit.DB.IFC;
using Autodesk.Revit.DB.Architecture;
using Material = Autodesk.Revit.DB.Material;
using Document = Autodesk.Revit.DB.Document;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Windows.Media.Media3D;
using System.Windows.Media;
using Autodesk.Revit.Creation;
using System.Xml.Linq;
using Autodesk.Revit.DB.Structure;
using System.Windows.Controls;
using Autodesk.Revit.DB.Mechanical;
using System.Collections;
using Autodesk.Revit.DB.Visual;
using Revit.IFC.Export.Utility;
using System.Reflection;
using System.Windows.Input;


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


        public static List<ElementType> ListFilter(List<ElementType> elemList, Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            List<ElementType> elemListFiltered = new List<ElementType>();

            string typeId;
            List<string> idList = new List<string>();
            foreach (ElementType item in elemList)
            {
                try
                {
                    if (item != null &&
                        item.IsValidObject == true &&
                        item.Category != null &&
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
                catch { }
            }

            elemListFiltered = elemListFiltered.Distinct().ToList();
            return elemListFiltered;
        }

        public static List<Element> ListFilter(List<Element> elemList, Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            List<Element> elemListFiltered = new List<Element>();

            Categories all_categories = doc.Settings.Categories;
            List<String> cats_model = new List<String>();

            foreach (Category cat in all_categories)
            {
                if (cat.CategoryType == CategoryType.Model)
                {
                    cats_model.Add(cat.Name);
                }
            }
            
            foreach (Element item in elemList)
            {
                try
                {
                    if (item.Category != null &&
                        cats_model.Contains(item.Category.Name) &&
                        item.Category.Name != "Detail Items" &&
                        item.Category.Name != "Coordination Model" &&
                        item.Category.Name != "Sheets" &&
                        item.Category.Name != "Curtain Grids" &&
                        item.Category.Name != "Materials" &&
                        item.Category.Name != "Areas" &&
                        item.Category.Name != "Rooms" &&
                        item.Category.Name != "Spaces" &&
                        item.Category.Name != "Raster Images" &&
                        item.Category.Name != "Filled region" &&
                        item.Category.Name != "Point Clouds" &&
                        item.Category.Name != "Analysis Results" &&
                        item.Category.Name != "Analysis Display Style" &&
                        item.Category.Name != "Project Information" &&
                        item.Category.Name != "Lines" &&
                        item.Category.Name != "Site" &&
                        item.Category.Name != "HVAC Zones" &&
                        item.Category.Name != "Imports in Families" &&
                        item.Category.Name != "RVT Links" &&
                        //item.Category.Name != "Runs" && //OST_StairsRuns
                        item != null &&
                        item.IsValidObject == true &&
                        item.LevelId != null &&
                        item.get_Geometry(new Options()) != null &&
                        item.Category.Name.IsNormalized() == true &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            elemListFiltered.Add(item);
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

                    //Get the elementType or element
                    int idInt = Convert.ToInt32(ifcEntity.Tag);
                    ElementId typeId = new ElementId(idInt);
                    Element elementI = null;
                    ElementType elementT = null;
                    if (doc.GetElement(typeId) as ElementType != null )
                    {
                        elementT = doc.GetElement(typeId) as ElementType;
                    }
                    else
                    {
                        elementI = doc.GetElement(typeId);
                    }
                    var element = elementT ?? elementI;

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
                        element.SetEntity(entity);
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
                                    parametersToCreate.Add(new ParameterCreation(bsddParameterName, specType));

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
                                bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, property.Name);
                                parametersToCreate.Add(new ParameterCreation(bsddParameterName, specType));
                            }
                        }
                    }
                    //First create all parameters at once (in Release creating parameters seperately sometimes fails)
                    //Add a project parameter for the bsdd parameter in all Revit categorices if it does not exist 
                    //NOTE: THIS IS UP FOR DISCUSSION, AS IT MIGHT NOT BE NECESSARY TO ADD THE PARAMETER TO ALL CATEGORIES
                    Parameters.CreateProjectParametersForAllCategories(doc, parametersToCreate, "tempGroupName", groupType, false);

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
                                    foreach (Parameter typeparameter in element.Parameters)
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
                                    createAndSetTypeProperty(elementT, propertySet, property.Name, propertySingleValue.NominalValue);
                                }
                                else if (property.Type == "IfcPropertyEnumeratedValue")
                                {
                                    var propertyEnumeratedValue = property as IfcPropertyEnumeratedValue;
                                    if (propertyEnumeratedValue.EnumerationValues == null || propertyEnumeratedValue.EnumerationValues.Count == 0)
                                    {
                                        continue;
                                    }
                                    var enumerationValue = propertyEnumeratedValue.EnumerationValues.First();
                                    createAndSetTypeProperty(elementT, propertySet, property.Name, enumerationValue);
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

        private static void createAndSetTypeProperty(ElementType elementType, IfcPropertySet propertySet, string propertyName, IfcValue propertyValue)
        {

            Logger logger = LogManager.GetCurrentClassLogger();

            //Create parameter name for each unique the bsdd property
            string bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, propertyName);

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

            if (propertyValue.Value != null)
            {
                dynamic value = GetParameterValueInCorrectDatatype(propertyValue);

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
                            logger.Info($"Property {propertyName}  could not be set for elementType {elementType.Name},'{elementType.Id}'. Exception: {e.Message}");
                        }
                    }
                }
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
                Element element = doc.GetElement(typeId);

                //Get all instances of the elementtype
                FilteredElementCollector collector = new FilteredElementCollector(doc);
                List<Element> elements = new List<Element>();
                if (elementType != null)
                {
                    elements = collector
                    .WhereElementIsNotElementType()
                    .Where(e => e.GetTypeId() == elementType.Id)
                    .ToList();
                } else
                {
                    elements.Add(doc.GetElement(typeId));
                }
                
                        

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
        /// Converts the value of the given IFC property to the correct datatype.
        /// </summary>
        /// <param name="propertyValue">The IFC property to convert.</param>
        /// <returns>The converted value, or a default value if the conversion fails.</returns>
        private static dynamic GetParameterValueInCorrectDatatype(IfcValue propertyValue)
        {
            dynamic value = propertyValue.Value;

            // Parse value to correct datatype
            switch (propertyValue.Type)
            {
                case "IfcBoolean":
                    value = TryConvertValue(value, new Func<dynamic, dynamic>(v => (bool)v ? 1 : 0), 0);
                    break;
                case "IfcInteger":
                    value = TryConvertValue(value, new Func<dynamic, dynamic>(v => Convert.ToInt32(v)), 0);
                    break;
                case "IfcReal":
                    value = TryConvertValue(value, new Func<dynamic, dynamic>(v => Convert.ToDouble(v)), 0);
                    break;
                case "IfcDate":
                case "IfcDateTime":
                    //TODO: Check what seems to be a valid DateTime to get and convert
                    value = TryConvertValue(value, new Func<dynamic, dynamic>(v => Convert.ToDateTime(v).ToString()), "");
                    break;
                default:
                    // IfcText, IfcLabel, IfcIdentifier or Default
                    value = TryConvertValue(value, new Func<dynamic, dynamic>(v => v.ToString()), "");
                    break;
            }

            return value;
        }


        /// <summary>
        /// Tries to convert a value using the given conversion function.
        /// </summary>
        /// <param name="value">The value to convert.</param>
        /// <param name="convert">The conversion function to use.</param>
        /// <param name="defaultValue">The default value to return if the conversion fails.</param>
        /// <returns>The converted value, or the default value if the conversion fails.</returns>
        private static dynamic TryConvertValue(dynamic value, Func<dynamic, object> convert, dynamic defaultValue)
        {
            try
            {
                return value != null ? convert(value) : defaultValue;
            }
            catch (Exception)
            {
                return defaultValue;
            }
        }


        // Revit UI Project Parameter Types:
        //
        // Text             The parameter data should be interpreted as a string of text.
        // Integer          The parameter data should be interpreted as a whole number, positive or negative.
        // Angle            The parameter data represents an angle.
        // Area	            The parameter data represents an area.
        // Cost per Area    ???
        // Distance         ???
        // Length	        The parameter data represents a length. (in feet)
        // MassDensity	    The data value will be represented as a MassDensity.
        // Number	        The parameter data should be interpreted as a real number, possibly including decimal points.
        // Rotation Angle   The data value will be represented as a Rotation.
        // Slope	        The data value will be represented as a Slope.
        // Speed            ???
        // Time             ???
        // Volume           The parameter data represents a volume.
        // Currency         The data value will be represented as a Currency.
        // URL	            A text string that represents a web address.              
        // Material	        The value of this property is considered to be a material.
        // Fill Pattern	    ???
        // Image	        The value of this parameter is the id of an image.
        // YesNo	        A boolean value that will be represented as Yes or No.
        // MultilineText	The value of this parameter will be represented as multiline text.

        // IFC simple value data types:
        // https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcSimpleValue.htm
        //
        // IfcBinary            BINARY IfcBinary is a defined type of simple data type BINARY which may be used to encode binary data such as embedded textures.
        // IfcBoolean           BOOLEAN (TRUE or FALSE)
        // IfcDate              STRING (YYYY-MM-DD)
        // IfcDateTime          STRING (YYYY-MM-DDThh:mm:ss)
        // IfcDuration          STRING
        // IfcIdentifier        STRING(255) for identification purposes. An identifier is an alphanumeric string which allows an individual thing to be identified. It may not provide natural-language meaning. it should be restricted to max. 255 characters.
        // IfcInteger           INTEGER In principle, the domain of IfcInteger (being an Integer) is all integer numbers.
        // IfcLabel             STRING(255) A label is the term by which something may be referred to. It is a string which represents the human-interpretable name of something and shall have a natural-language meaning. it should be restricted to max. 255 characters.
        // IfcLogical           LOGICAL (TRUE, FALSE or UNKNOWN)
        // IfcPositiveInteger   IfcInteger > 0
        // IfcReal              REAL In principle, the domain of IfcReal (being a Real) is all rational, irrational and scientific real numbers.
        // IfcText              STRING A text is an alphanumeric string of characters which is intended to be read and understood by a human being. It is for information purposes only.
        // IfcTime              STRING (hh:mm:ss)
        // IfcTimeStamp         INTEGER
        // IfcURIReference      STRING

        // bSDD Property DataTypes:
        // https://github.com/buildingSMART/bSDD/blob/master/Documentation/bSDD%20JSON%20import%20model.md#property
        //
        // Boolean          IfcBoolean
        // Character        IfcText
        // Integer          IfcInteger
        // Real             IfcReal
        // String           IfcText
        // Time             IfcDateTime

        /// <summary>
        /// Determines the Revit parameter type from an IFC property.
        /// </summary>
        /// <param name="property">The IFC property.</param>
        /// <returns>The corresponding Revit parameter type.</returns>
        private static ForgeTypeId GetParameterTypeFromProperty(IfcValue ifcValue)
        {
            // The type of the nominal value in the IFC property
            string valueType = ifcValue.Type;

            // Map the IFC type to the corresponding Revit parameter type
            switch (valueType)
            {
                case "IfcBoolean":
                    // Map IfcBoolean to Revit's YesNo type
                    return SpecTypeId.Boolean.YesNo;

                case "IfcInteger":
                    // Map IfcInteger to Revit's Integer type
                    return SpecTypeId.Int.Integer;

                case "IfcReal":
                    // Map IfcReal to Revit's Number type
                    return SpecTypeId.Number;

                case "IfcDate":
                case "IfcDateTime":
                    // Revit does not support date types, so map IfcDate and IfcDateTime to Revit's Text type
                    return SpecTypeId.String.Text;

                case "IfcText":
                case "IfcLabel":
                case "IfcIdentifier":
                    // Map IfcText to Revit's Text type
                    return SpecTypeId.String.Text;

                default:
                    // If the IFC type is not recognized, default to Revit's Text type
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
        private static void getElementTypeClassificationsReferencesFromExtensibleStorage(ElementType elementType, out IEnumerable<IfcClassificationReference> a, out IEnumerable<IfcMaterial> b)
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
                    a = JsonConvert.DeserializeObject<List<IfcClassificationReference>>(jsonString);
                    b = JsonConvert.DeserializeObject<List<IfcMaterial>>(jsonString);
                }
            }

            a = Enumerable.Empty<IfcClassificationReference>();
            b = Enumerable.Empty<IfcMaterial>();
        }

        private static IEnumerable<IfcMaterial> getElementTypeIfcRelAssociatesMaterialFromExtensibleStorage(ElementType elementType)
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
                    return JsonConvert.DeserializeObject<List<IfcMaterial>>(jsonString);
                }
            }

            return Enumerable.Empty<IfcMaterial>();
        }


        private static IEnumerable<Association> getElementClassificationsReferencesFromExtensibleStorage(Element element)
        {
            // TODO: Implement IEnumerable<Associations> so materials are also added correctly or add a separate function for materials
            
            Schema schema = GetBsddDataSchema();
            var storageEntity = element.GetEntity(schema);


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
                    bsddParameterValue = GetParameterValueByElement(elementType, CreateParameterNameFromUri(dictionary.IfcClassification.Location));

                }
                catch (Exception e)
                {
                    logger.Error(e);
                }
                try
                {

                    mappedParameterValue = GetParameterValueByElement(elementType, dictionary.ParameterMapping);
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

        public static Dictionary<Uri, (string Identification, string Name)> GetClassificationDataFromSettings(Element element)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            var classificationData = new Dictionary<Uri, (string Identification, string Name)>();
            var activeDictionaries = GetActiveDictionaries();

            foreach (var dictionary in activeDictionaries)
            {
                string bsddParameterValue = "";
                string mappedParameterValue = "";
                string bsddParameterName = CreateParameterNameFromUri(dictionary.IfcClassification.Location);
                // TODO: sometimes values come back as null, how does this look in the IFC?
                try
                {
                    bsddParameterValue = GetParameterValueByElement(element, CreateParameterNameFromUri(dictionary.IfcClassification.Location));

                }
                catch (Exception e)
                {
                    logger.Error(e);
                }
                try
                {

                    mappedParameterValue = GetParameterValueByElement(element, dictionary.ParameterMapping);
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
        public static List<Association> GetElementTypeAssociations(ElementType elementType, Document doc, out Dictionary<Uri, IfcClassificationReference> associationsRef)
        {

            var associations = new List<Association>();

            Logger logger = LogManager.GetCurrentClassLogger();
            //make new dictionary
            associationsRef = new Dictionary<Uri, IfcClassificationReference>();
            //
            var activeDictionaryData = GetClassificationDataFromSettings(elementType);
                        
            foreach (var association in getElementClassificationsReferencesFromExtensibleStorage(elementType))
            {
                if (association is IfcClassificationReference ifcClassificationReference)
                {
                    associationsRef[ifcClassificationReference.ReferencedSource.Location] = ifcClassificationReference;
                }
            }

            foreach (var entry in activeDictionaryData)
            {
                Uri dictionaryUri = entry.Key;
                (string Identification, string Name) value = entry.Value;

                if (!associationsRef.TryGetValue(dictionaryUri, out var association))
                {
                    // add new IfcClassificationReference to the dictionary based on dictionaryUri, Identification and Name
                    associationsRef[dictionaryUri] = new IfcClassificationReference
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


            //Material associations
            var associationsMat = new Dictionary<ElementId, IfcMaterial>();
            var associationsMatLayerset = new Dictionary<ElementId, IfcMaterialLayerSet>();
            var associationsMatProfileset = new Dictionary<ElementId, IfcMaterialProfileSet>();
            var associationsMatProfile = new IfcMaterialProfile();
            var associationsMatConstituentSet = new Dictionary<ElementId, IfcMaterialConstituentSet>();

            if (GetElementMaterialsProfileset(elementType, doc) != null)
            {
                ElementId elemId = elementType.Id;
                associationsMatProfileset[elemId] = GetElementMaterialsProfileset(elementType, doc);
            }

            if (GetElementMaterialsLayerset(elementType, doc) != null)
            {
                ElementId elemId = elementType.Id;
                associationsMatLayerset[elemId] = GetElementMaterialsLayerset(elementType, doc);
            }

            if(GetElementMatConstituentSet(elementType, doc) != null)
            {
                ElementId elemId = elementType.Id;
                associationsMatConstituentSet[elemId] = GetElementMatConstituentSet(elementType, doc);
            }
            else if (GetElementMaterials(elementType, doc) != null)
            {
                foreach (Material mat in GetElementMaterials(elementType, doc))
                {

                    ElementId elemId = mat.Id;
                    if (!associationsMat.TryGetValue(elemId, out var association))
                    {
                        //get the description value
                        BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                        string descriptionValue = "";

                        Parameter description = mat.get_Parameter(desiredBIP);
                        if (description != null)
                        {
                            descriptionValue = description.AsString();
                        }

                        // add new IfcMaterial to the dictionary based on dictionaryUri, Identification and Name
                        associationsMat[elemId] = new IfcMaterial
                        {
                            Name = mat.Name,
                            Description = descriptionValue,
                            Category = mat.Category.Name,
                            //HasRepresentation = mat.,
                            //IsRelatedWith = mat.,
                            //RelatesTo = mat.,
                            Type = "IfcMaterial",
                        };
                    }
                    else
                    {
                        //update the existing IfcClassificationReference with the new values from the revit typeEntity
                        var ifcMaterial = (IfcMaterial)association;
                        ifcMaterial.Name = mat.Name;
                    }
                }
            }



            //combine associations
            foreach (KeyValuePair<Uri, IfcClassificationReference> pair in associationsRef)
            {
                Association association = new Association();
                association = (IfcClassificationReference)pair.Value;
                associations.Add(association);
            }

            foreach (KeyValuePair<ElementId, IfcMaterial> pair in associationsMat)
            {
                Association association = new Association();
                association = (IfcMaterial)pair.Value;
                associations.Add(association);
            }

            foreach (KeyValuePair<ElementId, IfcMaterialLayerSet> pair in associationsMatLayerset)
            {
                Association association = new Association();
                association = (IfcMaterialLayerSet)pair.Value;
                associations.Add(association);
            }

            foreach (KeyValuePair<ElementId, IfcMaterialConstituentSet> pair in associationsMatConstituentSet)
            {
                Association association = new Association();
                association = (IfcMaterialConstituentSet)pair.Value;
                associations.Add(association);
            }

            foreach (KeyValuePair<ElementId, IfcMaterialProfileSet> pair in associationsMatProfileset)
            {
                Association association = new Association();
                association = (IfcMaterialProfileSet)pair.Value;
                associations.Add(association);
            }

            return associations;
        }

        public static List<Association> GetElementAssociations(Element element, Document doc)
        {
            var associations = new List<Association>();


            Logger logger = LogManager.GetCurrentClassLogger();
            var associationsRef = new Dictionary<Uri, IfcClassificationReference>();
            var activeDictionaryData = GetClassificationDataFromSettings(element);


            foreach (var associationR in getElementClassificationsReferencesFromExtensibleStorage(element))
            {
                if (associationR is IfcClassificationReference ifcClassificationReference)
                {
                    associationsRef[ifcClassificationReference.ReferencedSource.Location] = ifcClassificationReference;
                }
            }

            foreach (var entry in activeDictionaryData)
            {
                Uri dictionaryUri = entry.Key;
                (string Identification, string Name) value = entry.Value;

                if (!associationsRef.TryGetValue(dictionaryUri, out var associationR))
                {
                    // add new IfcClassificationReference to the dictionary based on dictionaryUri, Identification and Name
                    associationsRef[dictionaryUri] = new IfcClassificationReference
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
                    var ifcClassificationReference = (IfcClassificationReference)associationR;
                    ifcClassificationReference.Identification = value.Identification;
                    ifcClassificationReference.Name = value.Name;
                }
            }

            //Material associations
            var associationsMat = new Dictionary<ElementId, IfcMaterial>();
            
            List<Material> materials = new List<Material>();
            materials = GetElementMaterials(element, doc);

            if (materials != null)
            {
                foreach (Material mat in materials)
                {

                    ElementId elemId = mat.Id;
                    if (!associationsMat.TryGetValue(elemId, out var associationM))
                    {
                        // add new IfcMaterial to the dictionary based on elementId and IfcMaterial
                        associationsMat[elemId] = new IfcMaterial
                        {
                            Type = "IfcMaterial",
                            Name = mat.Name,
                        };
                    }
                    else
                    {
                        //update the existing IfcClassificationReference with the new values from the revit typeEntity
                        var ifcMaterial = (IfcMaterial)associationM;
                        ifcMaterial.Type = mat.GetType().ToString();
                        ifcMaterial.Name = mat.Name;
                    }
                }
            }
            


            
            //combine associations
            foreach (KeyValuePair < Uri, IfcClassificationReference > pair in associationsRef)
            {
                Association association = new Association();
                association = (IfcClassificationReference)pair.Value;
                associations.Add(association);
            }
            
            foreach (KeyValuePair<ElementId, IfcMaterial> pair in associationsMat)
            {
                Association association = new Association();
                association = (IfcMaterial)pair.Value;
                associations.Add(association);
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

        /// Transforms selected Revit types into a bSDD-compatible ifcJSON structure.
        /// </summary>
        /// <param name="doc">The active Revit document.</param>
        /// <param name="elemList">The list of selected Revit element types.</param>
        /// <returns>A IfcData object representing the ifcJSON structure.</returns>
        ///
        public static List<IfcEntity> SelectionToIfcJson(Document doc, List<Element> elemList)
        {
            if (doc == null || elemList == null)
            {
                throw new ArgumentNullException(doc == null ? nameof(doc) : nameof(elemList));
            }

            var ifcEntities = new List<IfcEntity>();
            List<ElementType> elemListType = new List<ElementType>();
            ElementId id;
            ElementType type;
            foreach (var elem in elemList)
            {
                id = elem.GetTypeId();
                type = doc.GetElement(id) as ElementType;
                elemListType.Add(type);
            }
            elemList = ListFilter(elemList, doc);
            elemListType = ListFilter(elemListType, doc);

            if (elemList != null)
            {
                foreach (Element elem in elemList)
                {
                    if (elem == null)
                    {
                        continue;
                    }

                    var ifcData = CreateIfcEntity(elem, doc);
                    ifcEntities.Add(ifcData);
                }
            }

            if (elemListType != null)
            {
                foreach (ElementType elem in elemListType)
                {
                    if (elem == null)
                    {
                        continue;
                    }

                    var ifcData = CreateIfcEntity(elem, doc);
                    ifcEntities.Add(ifcData);
                }
            }


            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
        }


        // TODO: IFC type should also be read from the mapping files when not present in the revit typeEntity

        /// <summary>
        /// Transforms a Revit element type into an IFC entity.
        /// </summary>
        private static IfcEntity CreateIfcEntity(ElementType elem, Document doc)
        {
            bool instance = false;
            string familyName = GetElementName(elem, GetParameterValueByElement(elem, "IfcName"));
            string typeName = GetElementName(elem, GetParameterValueByElement(elem, "IfcType"));
            string ifcTag = elem.Id.ToString();
            string typeDescription = GetParameterValueByElement(elem, "Description");
            string ifcType = IFCMappingValue(doc, elem);
            string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
            //string materials = GetElementMaterials(elem, doc);

            var ifcEntity = new IfcEntity
            {
                Instance = instance,
                Type = ifcType,
                Name = $"T: {typeName} - {familyName}",
                //Material = materials,
                Tag = ifcTag,
                Description = string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription,
                PredefinedType = ifcPredefinedType,
            };

            //embed propertysets bsdd/prop/ in Ifc Defenition
            List<IfcPropertySet> propertySets = IfcDefinition(doc, elem);
            if (propertySets != null && propertySets.Count > 0)
            {
                ifcEntity.IsDefinedBy = propertySets;
            }

            var associations = GetElementTypeAssociations(elem, doc, out Dictionary<Uri, IfcClassificationReference> a);
            if (associations != null && associations.Count > 0)
            {
                ifcEntity.HasAssociations = associations;
            }

            return ifcEntity;
        }

        private static IfcEntity CreateIfcEntity(Element elem, Document doc)
        {
            ElementId elemTypeId = elem.GetTypeId();
            ElementType elemType = doc.GetElement(elemTypeId) as ElementType;
            
            bool instance = true;
            string familyName = GetElementName(elemType ?? elem, GetParameterValueByElement(elemType ?? elem, "IfcName"));
            string typeName = GetElementName(elemType ?? elem, GetParameterValueByElement(elemType ?? elem, "IfcType"));
            string ifcTag = elem.Id.ToString();
            string typeDescription = GetParameterValueByElement(elemType ?? elem, "Description");
            string ifcType = IFCMappingValue(doc, elem);
            string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
            //string materials = GetElementMaterials(elem, doc);

            var ifcEntity = new IfcEntity
            {
                Instance = instance,
                Type = ifcType,
                Name = $"I: {typeName} - {familyName}",
                //Material = materials,
                Tag = ifcTag,
                Description = string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription,
                PredefinedType = ifcPredefinedType,
            };

            //embed propertysets bsdd/prop/ in Ifc Defenition
            ifcEntity.IsDefinedBy = IfcDefinition(doc, elem);

            var associations = GetElementAssociations(elem, doc);
            if (associations != null && associations.Count > 0)
            {
                ifcEntity.HasAssociations = associations;
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
        public static List<IfcPropertySet> IfcDefinition(Document doc, Element elem)
        {
            Dictionary<IfcPropertySet, Dictionary<IfcPropertySingleValue, IfcValue>> ifcProps = new Dictionary<IfcPropertySet, Dictionary<IfcPropertySingleValue, IfcValue>>();
            List<IfcPropertySet> isDefinedBy = new List<IfcPropertySet>();
            IfcPropertySet ifcPropSet = new IfcPropertySet();
            List<IfcProperty> hasProperties = new List<IfcProperty>();
            IfcPropertySingleValue ifcPropValue = new IfcPropertySingleValue();
            IfcValue nominalValue = new IfcValue();
            string[] promptArr = null;
            List<string> pSetDone = new List<string>();

            foreach (Parameter parameter in elem.Parameters)
            {
                if (parameter.Definition.Name.StartsWith("bsdd/prop/", false, null) == true)
                {
                    if (parameter.HasValue == true)
                    {
                        //Remove bsdd/prop/ from property name and split property name in property [1] value and propertyset [0]
                        promptArr = parameter.Definition.Name.Remove(0, 10).Split('/');

                        if (!pSetDone.Contains(promptArr[0]))
                        {
                            hasProperties = new List<IfcProperty>();
                            foreach (Parameter paramPSet in elem.Parameters)
                            {
                                if (paramPSet.Definition.Name.StartsWith("bsdd/prop/" + promptArr[0], false, null) == true)
                                {
                                    if (paramPSet.HasValue == true)
                                    {
                                        if(paramPSet.Definition.GetDataType() != SpecTypeId.Reference.Material)
                                        {
                                            //Define nominalvalue Type and Value
                                            nominalValue = new IfcValue();
                                            ForgeTypeId paramTypeId = paramPSet.Definition.GetDataType();

                                            switch (paramTypeId)
                                            {
                                                case var _ when paramTypeId == SpecTypeId.Boolean.YesNo:
                                                    nominalValue.Type = "IfcBoolean"; //BOOLEAN
                                                    nominalValue.Value = paramPSet.AsInteger(); //0 or 1
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Int.Integer:
                                                    nominalValue.Type = "IfcInteger"; //INTEGER
                                                    nominalValue.Value = paramPSet.AsInteger();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Int.NumberOfPoles:
                                                    nominalValue.Type = "IfcCountMeasure"; //NUMBER
                                                    nominalValue.Value = paramPSet.AsInteger();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.String.Url:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.String.Text:
                                                    nominalValue.Type = "IfcText"; //STRING
                                                    nominalValue.Value = paramPSet.AsString();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.String.MultilineText:
                                                    nominalValue.Type = "IfcText"; //STRING
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Reference.Material:
                                                    nominalValue.Type = "IfcMaterial"; //??
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Reference.LoadClassification:
                                                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Reference.Image:
                                                    nominalValue.Type = "Ifc";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Reference.FillPattern:
                                                    nominalValue.Type = "IfcInteger";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/

                                                case var _ when paramTypeId == SpecTypeId.Acceleration:
                                                    nominalValue.Type = "IfcAccelerationMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AirFlow:
                                                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AirFlowDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByCoolingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AirFlowDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Angle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.AngularSpeed:
                                                    nominalValue.Type = "IfcAngularVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ApparentPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ApparentPowerDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Area:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByCoolingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AreaDividedByHeatingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.AreaForce:
                                                    nominalValue.Type = "IfcPlanarForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.AreaForceScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.AreaSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.BarDiameter:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CableTraySize:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m*m not existing in ifc? */
                                                /*case var _ when paramTypeId == SpecTypeId.ColorTemperature:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ConduitSize:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.CoolingLoad:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CoolingLoadDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostPerArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostRateEnergy:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.CostRatePower:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.CrackWidth:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.CrossSection:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Currency:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Current:
                                                    nominalValue.Type = "IfcElectricCurrentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Custom:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.DecimalSheetLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DemandFactor:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Diffusivity:
                                                    nominalValue.Type = "IfcMoistureDiffusivityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //m2 / s but not IfcKinematicViscosityMeasure was not found
                                                /*case var _ when paramTypeId == SpecTypeId.Displacement:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m1? */
                                                case var _ when paramTypeId == SpecTypeId.Distance:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DuctInsulationThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.DuctLiningThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.DuctSize:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                m* m not existing in ifc ? */
                                                case var _ when paramTypeId == SpecTypeId.Efficacy:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //lm / W lummen per Watt no entity found
                                                case var _ when paramTypeId == SpecTypeId.ElectricalFrequency:
                                                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ElectricalPotential:
                                                    nominalValue.Type = "IfcElectricVoltageMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ElectricalPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalPowerDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                W / m3 no entity found*/
                                                case var _ when paramTypeId == SpecTypeId.ElectricalResistivity:
                                                    nominalValue.Type = "IfcElectricResistanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperature:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.ElectricalTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Energy:
                                                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Factor:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Flow:
                                                    nominalValue.Type = "IfcVolumetricFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.FlowPerPower:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Force:
                                                    nominalValue.Type = "IfcForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ForceScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatCapacityPerArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatGain:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                Delta? */
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoad:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByArea:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.HeatingLoadDividedByVolume:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.HeatTransferCoefficient:
                                                    nominalValue.Type = "IfcThermalTransmittanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.HvacDensity:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                NotFiniteNumberException clear what density exactly*/
                                                case var _ when paramTypeId == SpecTypeId.HvacEnergy:
                                                    nominalValue.Type = "IfcEnergyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacFriction:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                //F or FR (Friction) not found
                                                case var _ when paramTypeId == SpecTypeId.HvacMassPerTime:
                                                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                // kg / s = Mass per time = flowrate
                                                case var _ when paramTypeId == SpecTypeId.HvacPower:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacPowerDensity:
                                                    nominalValue.Type = "IfcHeatFluxDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacPressure:
                                                    nominalValue.Type = "IfcPressureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.HvacRoughness:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.HvacSlope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacTemperature:
                                                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                // k (Kelvin) per s
                                                case var _ when paramTypeId == SpecTypeId.HvacVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.HvacViscosity:
                                                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Illuminance:
                                                    nominalValue.Type = "IfcIlluminanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.IsothermalMoistureCapacity:
                                                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Length:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.LinearForce:
                                                    nominalValue.Type = "IfcLinearForceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.LinearForceScale:
                                                    nominalValue.Type = "IfcLinearForceMeasure";
                                                    nominalValue.Value = paramPset.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.LinearMoment:
                                                    nominalValue.Type = "IfcLinearMomentMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.LinearMomentScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.LineSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Luminance:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.LuminousFlux:
                                                    nominalValue.Type = "IfcLuminousFluxMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.LuminousIntensity:
                                                    nominalValue.Type = "IfcLuminousIntensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Mass:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassPerUnitArea:
                                                    nominalValue.Type = "IfcAreaDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MassPerUnitLength:
                                                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Moment:
                                                    nominalValue.Type = "IfcTorqueMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.MomentOfInertia:
                                                    nominalValue.Type = "IfcMomentOfInertiaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.MomentScale:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Number:
                                                    nominalValue.Type = "IfcReal"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Period:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Permeability:
                                                    nominalValue.Type = "IfcVaporPermeabilityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeDimension:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeInsulationThickness:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeMassPerUnitLength:
                                                    nominalValue.Type = "IfcMassPerLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipeSize:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingDensity:
                                                    nominalValue.Type = "IfcMassDensityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PipingFriction:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.PipingMass:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingMassPerTime:
                                                    nominalValue.Type = "IfcMassFlowRateMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PipingRoughness:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.PipingSlope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingTemperature:
                                                    nominalValue.Type = "IfcThermodynamicTemperatureMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingTemperatureDifference:
                                                    nominalValue.Type = "IfcTemperatureRateOfChangeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingViscosity:
                                                    nominalValue.Type = "IfcDynamicViscosityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PipingVolume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.PointSpringCoefficient:
                                                    nominalValue.Type = "IfcLinearStiffnessMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.PowerPerFlow:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.PowerPerLength:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.Pulsation:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementArea:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementAreaPerUnitLength:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementCover:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ReinforcementSpacing:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.ReinforcementVolume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Rotation:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.RotationalLineSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.RotationalPointSpringCoefficient:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.RotationAngle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SectionArea:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.SectionDimension:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.SectionModulus:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.SectionProperty:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.SheetLength:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SiteAngle:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Slope:
                                                    nominalValue.Type = "IfcPlaneAngleMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SpecificHeat:
                                                    nominalValue.Type = "IfcSpecificHeatCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SpecificHeatOfVaporization:
                                                    nominalValue.Type = "IfcHeatingValueMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Speed:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.Stationing:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                /*case var _ when paramTypeId == SpecTypeId.StationingInterval:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;*/
                                                case var _ when paramTypeId == SpecTypeId.Stress:
                                                    nominalValue.Type = "IfcModulusOfElasticityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.StructuralFrequency:
                                                    nominalValue.Type = "IfcFrequencyMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.StructuralVelocity:
                                                    nominalValue.Type = "IfcLinearVelocityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.SurfaceAreaPerUnitLength:
                                                    nominalValue.Type = "IfcAreaMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalConductivity:
                                                    nominalValue.Type = "IfcThermalConductivityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalExpansionCoefficient:
                                                    nominalValue.Type = "IfcThermalExpansionCoefficientMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.ThermalGradientCoefficientForMoistureCapacity:
                                                    nominalValue.Type = "IfcIsothermalMoistureCapacityMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                /*case var _ when paramTypeId == SpecTypeId.ThermalMass:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.ToString();
                                                    break;
                                                capacity to store energie J / K or J / Celcium Degrees*/
                                                case var _ when paramTypeId == SpecTypeId.ThermalResistance:
                                                    nominalValue.Type = "IfcThermalResistanceMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Time:
                                                    nominalValue.Type = "IfcTimeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.UnitWeight:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Volume:
                                                    nominalValue.Type = "IfcVolumeMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WarpingConstant:
                                                    nominalValue.Type = "IfcWarpingConstantMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Wattage:
                                                    nominalValue.Type = "IfcPowerMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.Weight:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WeightPerUnitLength:
                                                    nominalValue.Type = "IfcMassMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;
                                                case var _ when paramTypeId == SpecTypeId.WireDiameter:
                                                    nominalValue.Type = "IfcLengthMeasure"; //REAL
                                                    nominalValue.Value = paramPSet.AsDouble();
                                                    break;

                                                default:
                                                    nominalValue.Type = "IfcText";
                                                    nominalValue.Value = paramPSet.AsString();
                                                    break;
                                            }

                                            //Define property NominalValue, name and value
                                            ifcPropValue = new IfcPropertySingleValue
                                            {
                                                NominalValue = nominalValue,
                                                Name = paramPSet.Definition.Name.Remove(0, 10).Split('/')[1]
                                            };

                                            hasProperties.Add(ifcPropValue);
                                        }
                                    }
                                }
                            }
                            //Embed name en value in propertyset with name Arr[0] 
                            ifcPropSet = new IfcPropertySet();
                            ifcPropSet.Type = "IfcPropertySet";
                            ifcPropSet.Name = promptArr[0];
                            ifcPropSet.HasProperties = hasProperties;

                            isDefinedBy.Add(ifcPropSet);

                            pSetDone.Add(promptArr[0]);
                        }
                    }
                }
            }
            //embed propertyset in Ifc Defenition
            return isDefinedBy;
        }

        /// <summary>
        /// Retrieves the family name of the given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <param name="ifcName">The IFC name, returned if not null or empty.</param>
        /// <returns>The family name or an empty string if unavailable.</returns>
        public static string GetElementName(Element element, string ifcName)
        {
            if (!string.IsNullOrEmpty(ifcName))
            {
                return ifcName;
            }

            try
            {
                return element.Name;
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
        public static string GetElementName(ElementType elementType, string ifcType)
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

        public static dynamic GetParameterValueByElement(ElementType elementType, string parameterName)
        {
            try
            {
                //ElementType elementType = doc.GetElement(element.GetTypeId()) as ElementType;
                //ElementType elementType = doc.GetElement(element.Id) as ElementType;

                if (elementType?.LookupParameter(parameterName) != null)
                {
                    return _getParameterValueByCorrectStorageType(elementType.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static dynamic GetParameterValueByElement(Element element, string parameterName)
        {
            try
            {
                //ElementType elementType = doc.GetElement(element.GetTypeId()) as ElementType;
                //ElementType elementType = doc.GetElement(element.Id) as ElementType;

                if (element?.LookupParameter(parameterName) != null)
                {
                    return _getParameterValueByCorrectStorageType(element.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        private static dynamic _getParameterValueByCorrectStorageType(Parameter parameter)
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

        
        public static List<Material> GetElementMaterials(Element e, Document doc)
        {
            //schema
            //https://help.autodesk.com/view/RVT/2022/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Revit_Geometric_Elements_Material_Element_Material_html

            // koppeling materialen via IfcRelAssociatesMaterial
            // verbindt een IfcElement met een IfcMaterial, IfcMaterialLayerSet (layered element zoals wall), of IfcMaterialProfileSet (profielen).

            // IfcElement(bijv.IfcWall, IfcBeam, IfcColumn)
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterial

            //Make material list
            List<Material> mat = new List<Material>();

            if (
                e != null &&
                e.Category.Name != "Structural Beam Systems" &&
                e.Category.Name != "Structural Columns" &&
                e.Category.Name != "Structural Framing" &&
                e.Category.Name != "Structural Trusses"
                )
            {

                // Find out or there are any material parameters
                foreach (Parameter parameter in e.Parameters)
                {
                    // Check if the parameter is related to materials
                    if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                    {
                        Material Pmat = null;
                        ElementId materialId = parameter.AsElementId();
                        if (-1 == materialId.IntegerValue)
                        {
                            //Invalid ElementId, assume the material is "By Category"
                            if (null != e.Category)
                            {
                                Pmat = e.Category.Material;
                                if (Pmat != null)
                                {
                                    mat.Add(Pmat);
                                }
                            }
                        }
                        else
                        {
                            Pmat = doc.GetElement(materialId) as Material;
                            mat.Add(Pmat);
                        }
                    }
                }
            }

            if (mat.Count > 0)
            {
                return mat;
            }
            else
            {
                return null;
            }
        }

        public static IfcMaterialConstituentSet GetElementMatConstituentSet(Element e, Document doc)
        {
            //schema
            //https://help.autodesk.com/view/RVT/2022/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Revit_Geometric_Elements_Material_Element_Material_html

            // koppeling materialen via IfcRelAssociatesMaterial
            // verbindt een IfcElement met een IfcMaterial, IfcMaterialLayerSet (layered element zoals wall), of IfcMaterialProfileSet (profielen).

            // IfcElement(bijv.IfcWall, IfcBeam, IfcColumn)
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialConstituentSet
            //          |
            //          | -- IfcMaterialConstituent
            //              |
            //              | -- IfcMaterial
            //          | -- IfcMaterialConstituent
            //              |
            //              | -- IfcMaterial

            //Make material list
            Dictionary<Material, String> matDict = new Dictionary<Material, String>();

            if (
                e != null &&
                e.Category.Name != "Structural Beam Systems" &&
                e.Category.Name != "Structural Columns" &&
                e.Category.Name != "Structural Framing" &&
                e.Category.Name != "Structural Trusses"
                )
            {

                // Find out or there are any material parameters
                foreach (Parameter parameter in e.Parameters)
                {
                    // Check if the parameter is related to materials
                    if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                    {
                        Material Pmat = null;
                        ElementId materialId = parameter.AsElementId();
                        if (-1 == materialId.IntegerValue)
                        {
                            //Invalid ElementId, assume the material is "By Category"
                            if (null != e.Category)
                            {
                                Pmat = e.Category.Material;
                                if (Pmat != null)
                                {
                                    matDict.Add(Pmat, parameter.Definition.Name);
                                }
                            }
                        }
                        else
                        {
                            Pmat = doc.GetElement(materialId) as Material;
                            matDict.Add(Pmat, "");
                        }
                    }
                }
            }
            
            if (matDict.Count > 1)
            {
                //Define IfcMaterialConstituentSet
                IfcMaterialConstituentSet ifcMaterialConstituentSet = new IfcMaterialConstituentSet();

                List<IfcMaterialConstituent> ifcMaterialConstituentList = new List<IfcMaterialConstituent>();
                foreach (KeyValuePair<Material, String> entry in matDict)
                {
                    //get the description value
                    BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                    string descriptionValue = "N/A";

                    Parameter description = entry.Key.get_Parameter(desiredBIP);
                    if (description != null)
                    {
                        descriptionValue = description.AsString();
                    }

                    //Convert Revit material to IfcMaterial
                    IfcMaterial ifcMaterial = new IfcMaterial();
                    ifcMaterial.Name = entry.Key.Name;
                    ifcMaterial.Description = descriptionValue;
                    ifcMaterial.Category = entry.Key.Category.Name;
                    //ifcMaterial.HasRepresentation = ;
                    //ifcMaterial.IsRelatedWith = ;
                    //ifcMaterial.RelatesTo = ;
                    ifcMaterial.Type = "IfcMaterial";

                    //Make IfcMaterialConstituent
                    IfcMaterialConstituent ifcMaterialConstituent = new IfcMaterialConstituent();
                    ifcMaterialConstituent.Name = entry.Value;
                    ifcMaterialConstituent.Description = "N/A";
                    ifcMaterialConstituent.Material = ifcMaterial;
                    //ifcMaterialConstituent.Fraction = ;
                    //ifcMaterialConstituent.Category = ;
                    //ifcMaterialConstituent.ToMaterialConstituentSet = ifcMaterialConstituentSet;
                    ifcMaterialConstituentList.Add(ifcMaterialConstituent);
                }


                ifcMaterialConstituentSet.Name = e.Name;
                ifcMaterialConstituentSet.Description = "N/A";
                ifcMaterialConstituentSet.MaterialConstituents = ifcMaterialConstituentList;
   
                return ifcMaterialConstituentSet;
            }
            else
            {
                return null;
            }
        }

        public static IfcMaterialProfileSet GetElementMaterialsProfileset(ElementType e, Document doc)
        {
            // IfcElement(bijv.IfcBeam, IfcColumn)
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialProfileSet
            //          |
            //          | --IfcMaterialProfile(1..n)
            //              |
            //              | --IfcProfileDef(bijv.IfcRectangleProfileDef, IfcCircleProfileDef)
            //              | --IfcMaterial

            //Make materila list
            List<IfcMaterialProfile> matProfileSet = new List<IfcMaterialProfile>();

            //Make material list
            List<Material> mat = new List<Material>();

            // #Is elem Profile
            if (
                e != null &&
                    (
                    e.Category.Name == "Structural Beam Systems" ||
                    e.Category.Name == "Structural Columns" ||
                    e.Category.Name == "Structural Framing" ||
                    e.Category.Name == "Structural Trusses"
                    )
                )
            {
                // Find out or there are any material parameters
                foreach (Parameter parameter in e.Parameters)
                {
                    // Check if the parameter is related to materials
                    if (parameter.Definition.GetDataType() == SpecTypeId.Reference.Material)
                    {
                        Material Pmat = null;
                        ElementId materialId = parameter.AsElementId();
                        if (-1 == materialId.IntegerValue)
                        {
                            //Invalid ElementId, assume the material is "By Category"
                            if (null != e.Category)
                            {
                                Pmat = e.Category.Material;
                                if (Pmat != null)
                                {
                                    mat.Add(Pmat);
                                }
                            }
                        }
                        else
                        {
                            Pmat = doc.GetElement(materialId) as Material;
                            mat.Add(Pmat);
                        }
                    }
                }

            }

            for (int i = 0; i < mat.Count; i++)
            {
                if (mat[i] == null)
                {
                    mat.RemoveAt(mat.IndexOf(mat[i]));
                    i--;
                }
            }

            foreach (Material material in mat)
            {
                if (material != null)
                {
                    //get the description value
                    BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                    string descriptionValue = "N/A";

                    Parameter description = material.get_Parameter(desiredBIP);
                    if (description != null)
                    {
                        descriptionValue = description.AsString();
                    }

                    //Convert Revit material to IfcMaterial
                    IfcMaterial ifcMaterial = new IfcMaterial();
                    ifcMaterial.Name = material.Name;
                    ifcMaterial.Description = descriptionValue;
                    ifcMaterial.Category = material.Category.Name;
                    /*
                    ifcMaterial.HasRepresentation = ;
                    ifcMaterial.IsRelatedWith = ;
                    ifcMaterial.RelatesTo = ;
                    */
                    ifcMaterial.Name = material.Name;
                    ifcMaterial.Type = "IfcMaterial";

                    //Make IfcMaterialProfile
                    IfcMaterialProfile ifcMaterialProfile = new IfcMaterialProfile();
                    ifcMaterialProfile.Name = material.Name;
                    ifcMaterialProfile.Description = "N/A";
                    ifcMaterialProfile.Material = ifcMaterial;
                    //ifcMaterialProfile.Profile = ;
                    ifcMaterialProfile.Priority = 0;
                    //ifcMaterialProfile.Category = ;
                    matProfileSet.Add(ifcMaterialProfile);
                }
            }

            if (matProfileSet.Count > 0)
            {
                //Define IfcProfileDef
                IfcProfileDef ifcProfileDef = new IfcProfileDef();
                //ifcProfileDef.ProfileType = ;
                ifcProfileDef.ProfileName = e.Name;
                //ifcProfileDef.HasExternalReference = ;
                //ifcProfileDef.HasProperties = ;

                //Define IfcCompositeProfileDef
                IfcCompositeProfileDef ifcCompositeProfileDef = new IfcCompositeProfileDef();
                ifcProfileDef.ProfileName = e.Name;
                ifcProfileDef.ProfileName = e.Name;
                ifcCompositeProfileDef.Profiles = ifcProfileDef;
                ifcCompositeProfileDef.Label = "ifcCompositeProfileDef";

                //Define IfcMaterialProfileSet
                IfcMaterialProfileSet ifcMaterialProfileSet = new IfcMaterialProfileSet();
                ifcMaterialProfileSet.Name = e.Name;
                ifcMaterialProfileSet.Description = "N/A";
                ifcMaterialProfileSet.MaterialProfiles = matProfileSet;
                ifcMaterialProfileSet.CompositeProfile = ifcCompositeProfileDef;
                ifcMaterialProfileSet.Type = "IfcMaterialProfileSet";

                return ifcMaterialProfileSet;
            }
            else
            {
                return null;
            }
        }

        public static IfcMaterialLayerSet GetElementMaterialsLayerset(ElementType e, Document doc)
        {
            // IfcWall
            //  |
            //  | --IfcRelAssociatesMaterial
            //      |
            //      | --IfcMaterialLayerSet
            //          |
            //          | --IfcMaterial(Baksteen)
            //          | --IfcMaterial(Isolatie)
            //          | --IfcMaterial(Gipsplaat)

            //Make materila list
            List<IfcMaterialLayer> matLayerSet = new List<IfcMaterialLayer>();

            //Get HostObject by query existing FamilyInstances with the same ElementType
            var instances1 = new FilteredElementCollector(doc)
                .OfClass(typeof(FamilyInstance))
                .Cast<FamilyInstance>()
                .Where(fi => fi.Symbol.Id == e.Id);

            //take first element out of elementtype
            List<Element> collectorEF = new FilteredElementCollector(doc)
                .WhereElementIsNotElementType()
                .ToList<Element>();
            List<Element> listEI = collectorEF.Where(q => q.GetTypeId() == e.Id).ToList<Element>();
            Element instances = listEI[0];
            CompoundStructure compoundStructure = null;

            // #Is elem with compound structure
            if (
                e != null ||
                e.Category.Name == "Ceilings" ||
                e.Category.Name == "Roofs" ||
                e.Category.Name == "Walls" ||
                e.Category.Name == "Floors"
                )
            {
                if (e.Category.Name == "Walls")
                {
                    Wall wall = instances as Wall;
                    compoundStructure = wall.WallType.GetCompoundStructure();
                }
                else if (e.Category.Name == "Floors")
                {
                    Floor floor = instances as Floor;
                    compoundStructure = floor.FloorType.GetCompoundStructure();
                }
                else if (e.Category.Name == "Ceilings")
                {
                    try
                    {
                        Ceiling ceiling = instances as Ceiling;
                        CeilingType CT = doc.GetElement(ceiling.GetTypeId()) as CeilingType;
                        compoundStructure = CT.GetCompoundStructure();
                    }
                    catch { }
                }
                else if (e.Category.Name == "Roofs")
                {
                    RoofBase roof = instances as RoofBase;
                    compoundStructure = roof.RoofType.GetCompoundStructure();
                }
                
                if (compoundStructure != null)
                {
                    var layers = compoundStructure.GetLayers();
                    if (layers == null)
                    {
                        //find category and subcategory corresponding to the compoundstructure layer
                    }
                    foreach (var layer in layers)
                    {
                        Material material = doc.GetElement(layer.MaterialId) as Material;
                        
                        if (material != null)
                        {
                            //get the description value
                            BuiltInParameter desiredBIP = BuiltInParameter.ALL_MODEL_DESCRIPTION;
                            string descriptionValue = "N/A";

                            Parameter description = material.get_Parameter(desiredBIP);
                            if (description != null)
                            {
                                descriptionValue = description.AsString();
                            }

                            //Convert Revit material to IfcMaterial
                            IfcMaterial ifcMaterial = new IfcMaterial();
                            ifcMaterial.Name = material.Name;
                            ifcMaterial.Description = descriptionValue;
                            ifcMaterial.Category = material.Category.Name;
                            /*
                            ifcMaterial.HasRepresentation = ;
                            ifcMaterial.IsRelatedWith = ;
                            ifcMaterial.RelatesTo = ;
                            */
                            ifcMaterial.Name = material.Name;
                            ifcMaterial.Type = "IfcMaterial";

                            //Make IfcMaterialLayer
                            IfcMaterialLayer ifcMaterialLayer = new IfcMaterialLayer();
                            ifcMaterialLayer.Material = ifcMaterial;
                            ifcMaterialLayer.LayerThickness = layer.Width * 304.8;
                            //ifcMaterialLayer.IsVentilated = ;
                            ifcMaterialLayer.Name = material.Name;
                            ifcMaterialLayer.Description = "N/A";
                            ifcMaterialLayer.Category = layer.Function.ToString();
                            ifcMaterialLayer.Priority = 0;
                            matLayerSet.Add(ifcMaterialLayer);
                        }
                    }
                }
            }

            if(matLayerSet.Count > 0)
            {
                IfcMaterialLayerSet ifcMaterialLayerSet = new IfcMaterialLayerSet();
                ifcMaterialLayerSet.IfcMaterialLayer = matLayerSet;
                ifcMaterialLayerSet.LayerSetName = "N/A";
                ifcMaterialLayerSet.Description = "N/A";
                //calculate total length
                double thickness = 0;
                foreach (IfcMaterialLayer layer in ifcMaterialLayerSet.IfcMaterialLayer)
                {
                    thickness = thickness + layer.LayerThickness;
                }
                ifcMaterialLayerSet.TotalThickness = thickness;
                ifcMaterialLayerSet.Name = e.Name;
                ifcMaterialLayerSet.Type = "IfcMaterialLayerSet";

                return ifcMaterialLayerSet;
            }
            else
            {
                return null;
            }
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
            Category elemCategory = elem.Category;
            String cat = elemCategory.Name.ToString();

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

            try
            {
                return mappingTable[cat + "\t"];
            }
            catch
            {
                mappingTable.Add(cat + "\t", "Not Exported");
                return mappingTable[cat + "\t"];
            }
        }


    }
}






