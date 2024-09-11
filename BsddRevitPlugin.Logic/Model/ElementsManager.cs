//TODO comments

//!!!!!!!!!!!!!!!!!!!!!!!!Element en ElementType omgezet in ElementSet. Nu wordt ElementType overal overgeslagen.

/**
 * File summary:
 * - File name: 
 * - Description: 
 * - Development history: 
 * - Copyright: Open Source
*/

#region ================== References ===================
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
using System.Windows.Documents;
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
        /// Transforms a Revit element instance into an IFC entity.
        /// </summary>
        /// <param name="elem">Element instance</param>
        /// <param name="doc">Currently open document</param>
        /// <returns>Fully filled IfcEntity</returns>
        private static IfcEntity CreateIfcEntity(List<ElementId> elemSet, Document doc)
        {
            Element element = null;
            ElementType elementType = null;
            try
            {
                foreach (ElementId id in elemSet)
                {
                    if(doc.GetElement(id) is ElementType)
                    {
                        elementType = doc.GetElement(id) as ElementType;
                        break; // Exit the loop after the first element (there is only 1 element)
                    } 
                    else if (doc.GetElement(id) is Element)
                    {
                        element = doc.GetElement(id);
                        break; // Exit the loop after the first element (there is only 1 element)
                    }
                }
            }
            catch { }
           

            if (element != null)
            {
                ElementId elemTypeId = element.GetTypeId();
                ElementType elemType = doc.GetElement(elemTypeId) as ElementType;

                //Collect input for IfcEntity defenition
                string familyName = GetParameterValueByElement(elemType ?? element, "IfcName") ?? element.Name ?? "n/a";
                string typeName = GetParameterValueByElement(elemType ?? element, "IfcType") ?? element.Name ?? "n/a";
                string ifcTag = element.Id.ToString();
                string typeDescription = GetParameterValueByElement(elemType ?? element, "Description") ?? "n/a";
                string ifcType = IFCMappingValue(doc, element);
                string ifcPredefinedType = element.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
                //string materials = GetElementMaterials(elem, doc);
                var associations = GetElementAssociations(elemSet, doc);

                //Create IfcEntity by IfcEntityBuilder
                IfcEntity ifcEntity = new IfcEntityBuilder()
                    .AddInstance(true)
                    .AddType(ifcType)
                    .AddName($"I: {typeName} - {familyName}")
                    //.AddMaterial()
                    .AddTag(ifcTag)
                    .AddDescription(string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription)
                    .AddPredefinedType(ifcPredefinedType)
                    .AddIsDefinedBy(IfcDefinition(doc, element))
                    .AddHasAssociations(associations)
                    .Build();

                return ifcEntity;
            } else if (elementType != null)
            {
                //Collect input for IfcEntity defenition
                string familyName = GetParameterValueByElement(elementType, "IfcName") ?? elementType.Name ?? "n/a";
                string typeName = GetParameterValueByElement(elementType, "IfcType") ?? elementType.Name ?? "n/a";
                string ifcTag = elementType.Id.ToString();
                string typeDescription = GetParameterValueByElement(elementType, "Description") ?? "n/a";
                string ifcType = IFCMappingValue(doc, elementType);
                string ifcPredefinedType = elementType.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE)?.AsString();
                //string materials = GetElementMaterials(elem, doc);
                var associations = GetElementTypeAssociations(elemSet, doc, out Dictionary<Uri, IfcClassificationReference> a);

                //Create IfcEntity by IfcEntityBuilder
                IfcEntity ifcEntity = new IfcEntityBuilder()
                    .AddInstance(false)
                    .AddType(ifcType)
                    .AddName($"T: {typeName} - {familyName}")
                    //.AddMaterial()
                    .AddTag(ifcTag)
                    .AddDescription(string.IsNullOrWhiteSpace(typeDescription) ? null : typeDescription)
                    .AddPredefinedType(ifcPredefinedType)
                    .AddIsDefinedBy(IfcDefinition(doc, elementType))
                    .AddHasAssociations(associations)
                    .Build();

                return ifcEntity;
            }

            return null;            
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
                    return _getParameterValueByCorrectStorageType(elementType.LookupParameter(parameterName));
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
                    return _getParameterValueByCorrectStorageType(element.LookupParameter(parameterName));
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
        private static dynamic _getParameterValueByCorrectStorageType(Parameter parameter)
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
        #endregion //Class methods
        #endregion //Class: ElementManager




        /// <summary>
        /// instance or type element
        /// </summary>
        /// <param name="doc">Active project document</param>
        /// <param name="ifcEntity"></param>
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
                    catch(Exception ex)
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

        
        



        /// Transforms selected Revit types into a bSDD-compatible ifcJSON structure.
        /// </summary>
        /// <param name="doc">The active Revit document.</param>
        /// <param name="elemList">The list of selected Revit element types.</param>
        /// <returns>A IfcData object representing the ifcJSON structure.</returns>
        ///
        public static List<IfcEntity> SelectionToIfcJson(Document doc, List<ElementId> elemSet)
        {
            if (doc == null || elemSet == null)
            {
                throw new ArgumentNullException(doc == null ? nameof(doc) : nameof(elemSet));
            }

            var ifcEntities = new List<IfcEntity>();
            List<ElementId> elemSetType = new List<ElementId>();
            Element type;
            ElementId typeId;
            foreach (ElementId id in elemSet)
            {
                type = doc.GetElement(id);
                typeId = type.GetTypeId();
                
                if (elemSetType == null || elemSetType.Contains(typeId) == false)
                {
                    elemSetType.Add(typeId);
                }
            }
            //elemSet.AddRange(elemSetType);
            //Check or is Geometrie
            elemSet = ListGeoFilter(doc, elemSet);
            elemSetType = ListGeoFilter(doc, elemSetType);

            List<ElementId> listItem = new List<ElementId>();
            if (elemSet != null)
            {
                foreach (ElementId id in elemSet)
                {
                    listItem.Add(id);
                    var ifcData = CreateIfcEntity(listItem , doc);
                    ifcEntities.Add(ifcData);
                    listItem.Clear();
                }
            }

            if (elemSetType != null)
            {
                foreach (ElementId idType in elemSetType)
                {
                    listItem.Add(idType);
                    var ifcData = CreateIfcEntity(listItem, doc);
                    ifcEntities.Add(ifcData);
                    listItem.Clear();
                }
            }


            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcEntities);

            return ifcEntities;
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

        
        public static bool IsGeometrical(Element elem)
        {
            if (elem == null || elem.Category == null) return false;
            if ((elem.get_Geometry(new Options()) != null && elem.Category.Name != "Cameras")) return true;

            string[] revitGeoCategorie = { 
                //"Abutment Foundation Tags",
                //"Abutment Pile Tags",
                //"Abutment Tags",
                //"Abutment Wall Tags",
                "Abutments",
                "Air Terminals",
                //"Alignment Station Label Sets",
                //"Alignment Station Labels",
                //"Alignment Tags",
                //"Alignments",
                //"Analytical Member Tags",
                //"Analytical Members",
                //"Analytical Opening Tags",
                //"Analytical Openings",
                //"Analytical Panel Tags",
                //"Analytical Panels",
                //"Anchor Tags",
                //"Approach Slab Tags",
                //"Area Based Load Tags",
                //"Area Polylines",
                //"Area Tags",
                "Areas",
                "Assemblies",
                //"Audio Visual Device Tags",
                "Audio Visual Devices",
                //"Bearing Tags",
                "Bearings",
                //"Bolt Tags",
                //"Bridge Arch Tags",
                //"Bridge Cable Tags",
                "Bridge Cables",
                //"Bridge Cross Bracing Tags",
                //"Bridge Deck Tags",
                "Bridge Decks",
                //"Bridge Diaphragm Tags",
                "Bridge Framing",
                //"Bridge Girder Tags",
                //"Bridge Truss Tags",
                "Cable Tray Fittings",
                "Cable Trays",
                //"Callouts",
                "Casework",
                //"Casework Tags",
                //"Ceiling Tags",
                "Ceilings",
                //"Color Fill Legends",
                //"Column Tags",
                "Columns",
                "Communication Devices",
                "Conduit Fittings",
                "Conduits",
                //"Constraints",
                //"Contour Labels",
                //"Curtain Panel Tags",
                "Curtain Panels",
                "Curtain Systems",
                //"Curtain Wall Mullion Tags",
                "Curtain Wall Mullions",
                "Data Devices",
                //"Demolished",
                //"Detail Items",
                //"Dimensions",
                //"Door Tags",
                "Doors",
                "Duct Accessories",
                "Duct Fittings",
                "Duct Insulations",
                "Duct Linings",
                "Duct Placeholders",
                "Ducts",
                "Electrical Equipment",
                //"Electrical Equipment Tags",
                //"Electrical Fixture Tags",
                "Electrical Fixtures",
                //"Elevations",
                "Entourage",
                //"Entourage Tags",
                //"Existing",
                //"Expansion Joint Tags",
                "Expansion Joints",
                //"Fascia Tags",
                //"Filled region",
                "Fire Alarm Devices",
                "Fire Protection",
                "Flex Ducts",
                "Flex Pipes",
                "Floors",
                "Food Service Equipment",
                //"Food Service Equipment Tags",
                "Furniture",
                "Furniture Systems",
                //"Generic Annotations",
                //"Generic Model Tags",
                "Generic Models",
                //"Grids",
                //"Gutter Tags",
                //"Handrail Tags",
                "Hardscape",
                //"Hardscape Tags",
                //"Hole Tags",
                "HVAC Zones",
                "Imports in Families",
                //"Levels",
                "Lighting Devices",
                //"Lighting Fixture Tags",
                "Lighting Fixtures",
                //"Lines",
                "Mass",
                "Massing",
                //"Mechanical Control Device Tags",
                "Mechanical Control Devices",
                "Mechanical Equipment",
                //"Mechanical Equipment Set Boundary Lines",
                //"Mechanical Equipment Set Tags",
                //"Mechanical Equipment Tags",
                "Medical Equipment",
                //"Medical Equipment Tags",
                "MEP Fabrication Containment",
                "MEP Fabrication Ductwork",
                "MEP Fabrication Hangers",
                "MEP Fabrication Pipework",
                //"Model Group Tags",
                //"Multi-Category Tags",
                //"New",
                "Nurse Call Devices",
                //"Pad Tags",
                //"Panel Schedule Graphics",
                "Parking",
                "Parts",
                //"Path of Travel Tags",
                //"Pier Cap Tags",
                //"Pier Column Tags",
                //"Pier Foundation Tags",
                //"Pier Pile Tags",
                //"Pier Tags",
                //"Pier Tower Tags",
                //"Pier Wall Tags",
                "Piers",
                "Pipe Accessories",
                "Pipe Fittings",
                "Pipe Insulations",
                "Pipe Placeholders",
                "Pipes",
                //"Plan Region",
                "Planting",
                //"Planting Tags",
                //"Plate Tags",
                "Plumbing Equipment",
                //"Plumbing Equipment Tags",
                //"Plumbing Fixture Tags",
                "Plumbing Fixtures",
                //"Point Clouds",
                //"Profile Tags",
                //"Property Line Segment Tags",
                //"Property Tags",
                //"Railing Tags",
                "Railings",
                //"Ramp Tags",
                "Ramps",
                //"Raster Images",
                //"Reference Planes",
                //"Road Tags",
                "Roads",
                //"Roof Soffit Tags",
                //"Roof Tags",
                "Roofs",
                //"Room Polylines",
                //"Room Tags",
                "Rooms",
                "Ruled Curtain System",
                //"RVT Link Tags",
                //"Schedule Graphics",
                //"Scope Boxes",
                //"Sections",
                "Security Devices",
                "Shaft Openings",
                //"Shear Stud Tags",
                "Signage",
                //"Signage Tags",
                "Site",
                //"Site Tags",
                //"Slab Edge Tags",
                "Spaces",
                "Specialty Equipment",
                //"Specialty Equipment Tags",
                //"Spot Coordinates",
                //"Spot Elevations",
                //"Spot Slopes",
                "Sprinklers",
                //"Stair Landing Tags",
                //"Stair Paths",
                //"Stair Run Tags",
                //"Stair Support Tags",
                //"Stair Tags",
                //"Stair Tread/Riser Numbers",
                "Stairs",
                "Structural Area Reinforcement",
                "Structural Beam Systems",
                //"Structural Column Tags",
                "Structural Columns",
                "Structural Connections",
                "Structural Fabric Areas",
                //"Structural Fabric Areas Boundary",
                "Structural Fabric Reinforcement",
                //"Structural Fabric Reinforcement Boundary",
                "Structural Fabric Reinforcement Fabric Wire",
                //"Structural Foundation Tags",
                "Structural Foundations",
                "Structural Framing",
                //"Structural Framing Tags",
                "Structural Path Reinforcement",
                "Structural Rebar",
                "Structural Rebar Couplers",
                //"Structural Stiffener Tags",
                "Structural Stiffeners",
                //"Structural Tendon Tags",
                "Structural Tendons",
                //"Structural Truss Tags",
                "Structural Trusses",
                "Telephone Devices",
                "Temporary",
                //"Temporary Structure Tags",
                "Temporary Structures",
                //"Text Notes",
                //"Title Blocks",
                //"Top Rail Tags",
                "Topography",
                "Vertical Circulation",
                //"Vertical Circulation Tags",
                //"Vibration Damper Tags",
                //"Vibration Isolator Tags",
                //"Vibration Management",
                //"Vibration Management Tags",
                //"View Titles",
                //"Wall Sweep Tags",
                //"Wall Tags",
                "Walls",
                "Walls/Interior:1",
                "Walls/Exterior:2",
                "Walls/Foundation:3",
                "Walls/Retaining:4",
                //"Weld Tags",
                //"Window Tags",
                "Windows",
                "Wires"
            };

            if(elem.Category != null)
            {
                if (revitGeoCategorie.Contains(elem.Category.Name))
                {
                    return true;
                }
            }
            
            return false;
        }
        

    }
    #endregion
    #endregion

    #region =============== Public methods ===============

    #endregion
}







