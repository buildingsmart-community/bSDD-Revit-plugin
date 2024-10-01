//TODO comments

//

/**
 * File summary:
 * - File name: 
 * - Description: 
 * - Development history: 
 * - Copyright: Open Source
*/


#region ================== References ===================

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
using System.Text;
using System.Threading.Tasks;
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
using BsddRevitPlugin.Logic;
using NLog;
using Autodesk.Revit.DB.Events;
using BsddRevitPlugin.Logic.UI;
using System.Security.Principal;
using Autodesk.Internal.InfoCenter;
using System.ComponentModel;
using static BsddRevitPlugin.Logic.Model.MaterialRelAssociatesBuilder;
using BsddRevitPlugin.Logic.Model;
using System.Windows.Documents;
using System.Windows.Forms.Design;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.Model
{
    #region ============== Global Variables ==============
    #endregion

    #region =================== Classes ===================
    #region ============ Class: ElementManager ============
    /// <summary>
    /// 
    /// </summary>
    public static class ElementsManager
    {
        #region =============== Class Variables ===============
        // Element IFCClassification schema
        private static Guid s_schemaId = new Guid("79717CB2-D47B-4EC0-8E74-83A43E7D9F0A");
        private const string s_IfcClassificationData = "IfcClassificationData";
        #endregion //Class Variables

        #region ================= Constructor =================
        #endregion //Constructor

        #region ================ Class methods ================
        // Element IFCClassification schema
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

        /// <summary>
        /// #elements and elementTypes: Filters a list with element types to only types with geometry (no camera's)
        /// ID string generated is M: BsddRevitPlugin.Logic.Model.ElementManager.#
        /// </summary>
        /// <param name="elemSet">List of elements to be filtered.</param>
        /// <returns>Filtered list of geometrical elements (types or instances)</returns>
        public static List<ElementId> ListGeoFilter(Document doc, List<ElementId> elemSet)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Make output class solids with as result only Geometry elements
            List<ElementId> solids = new List<ElementId>();


            Element elem;
            foreach (ElementId id in elemSet)
            {
                elem = doc.GetElement(id);
                if (IsGeometrical(elem))
                {
                    solids.Add(elem.Id);
                }
            }

            logger.Info($"ListGeoFilter: Number of Geometrical elements: {solids.Count}");

            return solids;
        }

        /// <summary>
        /// Checks or the given element is an geometrical element
        /// </summary>
        /// <param name="elem">Element to be checked</param>
        /// <returns></returns>
        public static bool IsGeometrical(Element elem)
        {
            if (elem == null || elem.Category == null) return false;

            if (
                (elem.get_Geometry(new Options()) != null && elem.Category.Name != "Cameras") ||
                ArrayHolder.RevitGeoCategoriesArray.Contains(elem.Category.Name)
            ) return true;

            return false;
        }

        #region =========== CM: Collect parameters ===========
        /// <summary>
        /// Try to find a parameter of a element type based on the parameter name
        /// </summary>
        /// <param name="elementType">The Element Type where is searched on</param>
        /// <param name="parameterName">Name of the parameter what is whished to find</param>
        /// <returns>Value of the parameter if found</returns>
        public static dynamic GetParameterValueByElement(ElementType elementType, string parameterName)
        {
            try
            {
                if (elementType?.LookupParameter(parameterName) != null)
                {
                    return GetParameterValueByCorrectStorageType(elementType.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Try to find a parameter of a element instance based on the parameter name
        /// </summary>
        /// <param name="elementType">The Element instance where is searched on</param>
        /// <param name="parameterName">Name of the parameter what is whished to find</param>
        /// <returns>Value of the parameter if found</returns>
        public static dynamic GetParameterValueByElement(Element element, string parameterName)
        {
            try
            {
                if (element?.LookupParameter(parameterName) != null)
                {
                    return GetParameterValueByCorrectStorageType(element.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Convert the found parameter of "GetParameterValueByElement" to the correct datatype
        /// </summary>
        /// <param name="parameter">Found parameter in "GetParameterValueByElement"</param>
        /// <returns>parameter in specific datatype</returns>
        private static dynamic GetParameterValueByCorrectStorageType(Parameter parameter)
        {
            //get the datatype of the parameter and return it as the found type
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

        /// <summary>
        /// Checks the IFC_EXPORT_ELEMENT_TYPE_AS parameter. If not filled it looks to the IfcExport categorie defined in the Ifc Export Classes of the Revit Ifc Export Options
        /// </summary>
        /// <param name="doc">Open document</param>
        /// <param name="elem">Selected element</param>
        /// <returns>The Ifc category defined to the Revit Category in the table</returns>
        public static String IFCMappingValue(Document doc, Element elem)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //If the override value Ifc_Export_Element_Type_As is filled, return this value
            if (!string.IsNullOrEmpty(elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString()))
            {
                return elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS)?.AsString();
            }

            //Get the category name of the element
            Category elemCategory = elem.Category;
            String cat = elemCategory.Name.ToString();

            //Get the file path of the Ifc Export Classes of the Revit Ifc Export Options
            //txt construction by line: Category<tab> Subcategory<tab> Layer name <tab> Color number<tab>
            String exportCategoryTableFilePath = doc.Application.ExportIFCCategoryTable;

            if (string.IsNullOrEmpty(exportCategoryTableFilePath))
            {
                logger.Error($"IFCMappingValue: exportCategoryTableFilePath not found");
            }

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
                    if (!line.StartsWith("#") && line != "")
                    {
                        string[] splitContent = line.Split(sep.ToCharArray());
                        if (
                            !string.IsNullOrEmpty(splitContent[0]) &&
                            !string.IsNullOrEmpty(splitContent[2])
                        )
                        {
                            // Add to dictionary (category, subcategory and layer name)
                            // #TODO streamliner: how this interacts with subcategorie? splitContent[1]
                            mappingTable.Add(splitContent[0] + "\t" + splitContent[1], splitContent[2]);
                        }
                    }
                    ////Read the next line
                    line = sr.ReadLine();
                }
                //close the file
                sr.Close();
            }
            catch (Exception e)
            {
                logger.Error($"Exception IFCMappingValue: Streamreader failed: {e}");
            };

            try
            {
                // #TODO streamliner: part if todo streamliner: logger.Error($"Mapping table: {mappingTable[cat + "\t"]}");
                return mappingTable[cat + "\t"];
            }
            catch (Exception e)
            {
                logger.Error($"Exception IFCMappingValue: mappingTable[cat + \"\\t\"] didnt work: {e}");
                mappingTable.Add(cat + "\t", "Not Exported");
                return mappingTable[cat + "\t"];
            }
        }

        #region ========== CM: Material association ==========
        /// <summary>
        /// Retrieves the associations from the extended storage for an entity.
        /// </summary>
        /// <param name="entity">The entity from which to retrieve the associations.</param>
        /// <returns>A dictionary of associations with the location as the key.</returns>        
        public static List<Association> GetElementTypeAssociations(List<ElementId> elemSet, Document doc, out Dictionary<Uri, IfcClassificationReference> associationsRef)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            ElementType elementType = null;
            try
            {
                foreach (ElementId id in elemSet)
                {
                    elementType = (ElementType)doc.GetElement(id);
                    break; // Exit the loop after the first element
                }
            }
            catch { }


            //Make list of assosiations to return
            var associations = new List<Association>();

            //make new dictionary to store the Associations
            associationsRef = new Dictionary<Uri, IfcClassificationReference>();

            //Get the classification data mapped to the current settings
            var activeDictionaryData = GetClassificationDataFromSettings(elementType);

            //Get associations from storrage
            foreach (var association in getElemClassRefFromExtensibleStorage(elementType))
            {
                if (association is IfcClassificationReference ifcClassificationReference)
                {
                    associationsRef[ifcClassificationReference.ReferencedSource.Location] = ifcClassificationReference;
                }
            }

            foreach (var entry in activeDictionaryData)
            {
                //store the keys of the dictionary
                Uri dictionaryUri = entry.Key;
                //store the values of the dictionary
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


            #region =================== Builder ====================
            // The client code creates a builder object, passes it to the
            // director and then initiates the construction process. The end
            // result is retrieved from the builder object.
            var director = new Director();
            var builder = new MatRelAssociatesBuilder();
            director.Builder = builder;

            //If Element or ElementType is not Profile based and schema = Ifc2x3
            if (
                elementType != null &&
                elementType.Category.Name != "Structural Beam Systems" &&
                elementType.Category.Name != "Structural Columns" &&
                elementType.Category.Name != "Structural Framing" &&
                elementType.Category.Name != "Structural Trusses"
                //#TODO Ifc4 out of scope: && elementType.Category.Name != Ifc4
                )
            {
                director.BuildMaterial(elemSet, doc);
            }


            //If Element or ElementType is not Profile based and schema = Ifc4
            // #TODO Ifc4 out of scope: director.BuildMaterialConstituentSet();
            /*if (
                elementType != null &&
                elementType.Category.Name != "Structural Beam Systems" ||
                elementType.Category.Name != "Structural Columns" ||
                elementType.Category.Name != "Structural Framing" ||
                elementType.Category.Name != "Structural Trusses" &&
                elementType.Category.Name == Ifc4
                )
            {
                director.BuildMaterialConstituentSet();
            }*/

            //If ElementType is Profile
            if (
                elementType != null &&
                elementType.Category.Name == "Structural Beam Systems" ||
                elementType.Category.Name == "Structural Columns" ||
                elementType.Category.Name == "Structural Framing" ||
                elementType.Category.Name == "Structural Trusses"
                )
            {
                director.BuildMaterialProfileSet(elemSet, doc);
            }

            //If ElementType has layers
            if (
                elementType != null &&
                elementType.Category.Name == "Ceilings" ||
                elementType.Category.Name == "Roofs" ||
                elementType.Category.Name == "Walls" ||
                elementType.Category.Name == "Floors"
                )
            {
                director.BuildMaterialLayerSet(elemSet, doc);
            }

            associations = builder.GetResult().SetAssociations(associations);
            #endregion

            return associations;
        }

        public static List<Association> GetElementAssociations(List<ElementId> elemSet, Document doc)
        {
            Element element = null;
            try
            {
                foreach (ElementId id in elemSet)
                {
                    element = doc.GetElement(id);
                    break; // Exit the loop after the first element
                }
            }
            catch { }

            var associations = new List<Association>();

            Logger logger = LogManager.GetCurrentClassLogger();
            var associationsRef = new Dictionary<Uri, IfcClassificationReference>();
            var activeDictionaryData = GetClassificationDataFromSettings(element);

            foreach (var associationR in getElemClassRefFromExtensibleStorage(element))
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

            #region =================== Builder ====================
            // Creates a builder object, passes it to the director and then initiates the construction process.
            // The end result is retrieved from the builder object.
            var director = new Director();
            var builder = new MatRelAssociatesBuilder();
            director.Builder = builder;


            //If Element or ElementType is not Profile based and schema = Ifc2x3
            if (
                element != null
                )
            {
                director.BuildMaterial(elemSet, doc);
            }


            //If Element or ElementType is not Profile based and schema = Ifc4
            // #TODO Ifc4 out of scope: director.BuildMaterialConstituentSet();

            associations = builder.GetResult().SetAssociations(associations);
            #endregion

            return associations;
        }

        /// <summary>
        /// Retrieves the classification data mapped to the current settings for a given element type.
        /// </summary>
        /// <param name="elementType">The element type.</param>
        /// <returns>A dictionary containing the classification data, where the key is the dictionary URI and the value is a tuple of the identification and name.</returns>
        public static Dictionary<Uri, (string Identification, string Name)> GetClassificationDataFromSettings(ElementType elementType)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Make new dictionary to return the classification data settings
            var classificationData = new Dictionary<Uri, (string Identification, string Name)>();
            //Get active dictionaries and leave empty if there is non
            var activeDictionaries = GetActiveDictionaries();

            //fill dictionary if valid name and Id is found
            foreach (var dictionary in activeDictionaries)
            {
                string bsddParameterValue = "";
                string mappedParameterValue = "";
                // #TODO: sometimes values come back as null, how does this look in the IFC?
                try
                {
                    bsddParameterValue = GetParameterValueByElement(elementType, CreateParameterNameFromUri(dictionary.IfcClassification.Location));
                }
                catch (Exception e)
                {
                    logger.Error($"GetElementAssociations elemType: bsddParameterValue could not be set: {e}");
                }
                try
                {

                    mappedParameterValue = GetParameterValueByElement(elementType, dictionary.ParameterMapping);
                }
                catch (Exception e)
                {

                    logger.Error($"GetElementAssociations elemType: mappedParameterValue could not be set: {e}");
                }

                string identification = null;
                string name = null;

                if (!string.IsNullOrEmpty(bsddParameterValue))
                {
                    //Get Id and name out of location value
                    var splitValue = bsddParameterValue.Split(':');
                    identification = splitValue[0];
                    name = splitValue.Length > 1 ? splitValue[1] : splitValue[0];
                }
                if (!string.IsNullOrEmpty(mappedParameterValue))
                {
                    //Get Id and name out of Parameter mapping value
                    var splitValue = mappedParameterValue.Split(':');
                    identification = splitValue[0];
                    //Do if name is not already filled by location value 
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

                //If both Id and Name are defined fill classificationdata dictionary with uri and location dictionary
                if (!string.IsNullOrEmpty(identification) || !string.IsNullOrEmpty(name))
                {
                    classificationData[dictionary.IfcClassification.Location] = (identification, name);
                }
            }

            //If there is no active dictionary it is left empty
            return classificationData;
        }

        /// <summary>
        /// Retrieves the classification data mapped to the current settings for a given element.
        /// </summary>
        /// <param name="element">The element</param>
        /// <returns>A dictionary containing the classification data, where the key is the dictionary URI and the value is a tuple of the identification and name.</returns>
        public static Dictionary<Uri, (string Identification, string Name)> GetClassificationDataFromSettings(Element element)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Make new dictionary to return the classification data settings
            var classificationData = new Dictionary<Uri, (string Identification, string Name)>();
            //Get active dictionaries and leave empty if there is non
            var activeDictionaries = GetActiveDictionaries();

            //fill dictionary if valid name and Id is found
            foreach (var dictionary in activeDictionaries)
            {
                string bsddParameterValue = "";
                string mappedParameterValue = "";
                string bsddParameterName = CreateParameterNameFromUri(dictionary.IfcClassification.Location);
                // #TODO: sometimes values come back as null, how does this look in the IFC?
                try
                {
                    bsddParameterValue = GetParameterValueByElement(element, CreateParameterNameFromUri(dictionary.IfcClassification.Location));
                }
                catch (Exception e)
                {
                    logger.Error($"GetElementAssociations elem: bsddParameterValue could not be set: {e}");
                }
                try
                {

                    mappedParameterValue = GetParameterValueByElement(element, dictionary.ParameterMapping);
                }
                catch (Exception e)
                {

                    logger.Error($"GetElementAssociations elem: mappedParameterValue could not be set: {e}");
                }

                string identification = null;
                string name = null;

                if (!string.IsNullOrEmpty(bsddParameterValue))
                {
                    //Get Id and name out of location value
                    var splitValue = bsddParameterValue.Split(':');
                    identification = splitValue[0];
                    name = splitValue.Length > 1 ? splitValue[1] : splitValue[0];
                }
                if (!string.IsNullOrEmpty(mappedParameterValue))
                {
                    //Get Id and name out of Parameter mapping value
                    var splitValue = mappedParameterValue.Split(':');
                    identification = splitValue[0];
                    //Do if name is not already filled by location value
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

                //If both Id and Name are defined fill classificationdata dictionary with uri and location dictionary
                if (!string.IsNullOrEmpty(identification) || !string.IsNullOrEmpty(name))
                {
                    classificationData[dictionary.IfcClassification.Location] = (identification, name);
                }
            }

            //If there is no active dictionary it is left empty
            return classificationData;
        }

        /// <summary>
        /// Retrieves the combined list of main and filter dictionaries from the global settings.
        /// If the MainDictionary is null, it is left out.
        /// </summary>
        public static IEnumerable<BsddDictionary> GetActiveDictionaries()
        {
            // Create a list of BsDD Dictionaries to return as Enum
            var activeDictionaries = new List<BsddDictionary>();

            //If settings found in main dictionary of the global BsDD settings return this
            if (GlobalBsddSettings.bsddsettings.MainDictionary != null)
            {
                activeDictionaries.Add(GlobalBsddSettings.bsddsettings.MainDictionary);
            }

            //Remove double dictionaries
            if (GlobalBsddSettings.bsddsettings.FilterDictionaries != null)
            {
                activeDictionaries = activeDictionaries.Concat(GlobalBsddSettings.bsddsettings.FilterDictionaries).ToList();
            }

            return activeDictionaries;
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
        /// get the element classification reference from extensible storage
        /// </summary>
        /// <param name="element">Element</param>
        /// <returns>Deserialized object from the JSON string</returns>
        private static IEnumerable<Association> getElemClassRefFromExtensibleStorage(Element element)
        {
            //Get the current IfcSchema
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

        #region =========== CM: Material relations ===========


        #endregion //CM: Material relations
        #endregion //CM: Material association
        #endregion //CM: Collect parameters

        #region ======== CM: bSDD parameters to Revit ========
        /// <summary>
        /// Save bSDD data to Revit parameters of instance or type element given
        /// </summary>
        /// <param name="doc">Active project document</param>
        /// <param name="ifcEntity">ifcEnity instance or type to convert</param>
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
                    // #TODO convert Int32 to Int64 for future versions of Revit
                    ElementId typeId = new ElementId(idInt);
                    Element elementI = null;
                    ElementType elementT = null;
                    if (doc.GetElement(typeId) as ElementType != null)
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
                    catch (Exception ex)
                    {
                        Console.WriteLine("error");
                        logger.Error($"ERROR ocurred in: Element json, by adding all assosiations to the element in element entity storage. Exception: {ex}");
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
                                    bsddParameterName = CreateParameterNameFromUri(ifcClassificationReference.ReferencedSource.Location);
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
                                    bsddParameterName = CreateParameterNameFromUri(ifcClassificationReference.ReferencedSource.Location);

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
                                    CreateAndSetTypeProperty(elementT, propertySet, property.Name, propertySingleValue.NominalValue);
                                }
                                else if (property.Type == "IfcPropertyEnumeratedValue")
                                {
                                    var propertyEnumeratedValue = property as IfcPropertyEnumeratedValue;
                                    if (propertyEnumeratedValue.EnumerationValues == null || propertyEnumeratedValue.EnumerationValues.Count == 0)
                                    {
                                        continue;
                                    }
                                    var enumerationValue = propertyEnumeratedValue.EnumerationValues.First();
                                    CreateAndSetTypeProperty(elementT, propertySet, property.Name, enumerationValue);
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

        /// <summary>
        /// Get mapped parametername (stored in the documents DataStorage)
        /// </summary>
        /// <param name="ifcClassificationReference"></param>
        /// <returns></returns>
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
        /// Makes a type property in Revit and set its given value from the given propertyname in the given propertyset
        /// </summary>
        /// <param name="elementType"></param>
        /// <param name="propertySet"></param>
        /// <param name="propertyName"></param>
        /// <param name="propertyValue"></param>
        private static void CreateAndSetTypeProperty(ElementType elementType, IfcPropertySet propertySet, string propertyName, IfcValue propertyValue)
        {

            Logger logger = LogManager.GetCurrentClassLogger();

            //Create parameter name for each unique bsdd property
            string bsddParameterName = CreateParameterNameFromPropertySetAndProperty(propertySet.Name, propertyName);

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

        /// <summary>
        /// Creates a Revit bSDD parameter name from the given peropertyset and property.
        /// </summary>
        /// <param name="uri">The URI to create the parameter name from.</param>
        /// <returns>The parameter name created from the URI.</returns>
        public static string CreateParameterNameFromPropertySetAndProperty(string propertySet, string property)
        {
            string parameterName = $"bsdd/prop/{propertySet}/{property}";
            return parameterName;
        }
        #endregion //CM: bSDD parameters to Revit

        #endregion //Class methods
        #endregion //Class: ElementManager
    }
    #endregion //Class: ElementManager
    #endregion //Classes

    #region ============= Wrapper for Testing =============

    public interface IWrapper
    {
        //Methods to test
        string CreateParameterNameFromPropertySetAndProperty(string properyset, string property);
        bool IsGeometrical(Element elem);
    }

    public class Wrapper : IWrapper
    {
        public string CreateParameterNameFromPropertySetAndProperty(string properyset, string property)
        {
            return ElementsManager.CreateParameterNameFromPropertySetAndProperty(properyset, property);
        }

        public bool IsGeometrical(Element elem)
        {
            return ElementsManager.IsGeometrical(elem);
        }
    }


    #endregion
}