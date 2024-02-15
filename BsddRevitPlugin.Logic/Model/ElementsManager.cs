using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB.Mechanical;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Policy;
using System.Windows.Controls;

namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManager
    {

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
        public static void SetIfcDataToRevitElement(Document doc, IfcData ifcData)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            
            try
            {
                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("Update Parameters");

                    //Get the elementType
                    int idInt = Convert.ToInt32(ifcData.Tag);
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
                    var field = schema.GetField("IFCClassification");
                    Entity entity = new Entity(schema);
                    entity.Set(field, Newtonsoft.Json.JsonConvert.SerializeObject(ifcData.HasAssociations));
                    elementType.SetEntity(entity);

                    //Set Revit parameters for each association
                    foreach (var association in ifcData.HasAssociations)
                    {
                        switch (association)
                        {
                            case IfcClassificationReference ifcClassificationReference:
                                // do something with ifcClassificationReference

                                //<---- this is temporary, the referencesource.location should be provided in the given json

                                string url = ifcClassificationReference.Location.ToString();
                                int index = url.IndexOf("/class");

                                if (index > 0)
                                {
                                    url = url.Substring(0, index);
                                }
                                ifcClassificationReference.ReferencedSource.Location = new Uri(url, UriKind.Absolute);

                                //--------->
                                string refSourceLocation = ifcClassificationReference.ReferencedSource.Location.ToString();

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

                                    //Add the bsdd value to the parameter
                                    if (typeParameterName == bsddParameterName)
                                    {
                                        typeparameter.Set(ifcClassificationReference.Identification + ":" + ifcClassificationReference.Name);
                                    }
                                    //Add the bsdd value to the mapped parameter
                                    if (typeParameterName == parameterMappedName)
                                    {
                                        typeparameter.Set(ifcClassificationReference.Identification);
                                    }
                                }
                                break;

                            case IfcMaterial ifcMaterial:
                                // do something with ifcMaterial
                                break;
                        }
                    }
                    tx.Commit();
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
        public static string GetMappedParameterName(IfcClassificationReference ifcClassificationReference)
        {
            string refSourceLocation = ifcClassificationReference.ReferencedSource.Location.ToString();

            if (GlobalBsddSettings.bsddsettings.MainDictionary.DictionaryUri == refSourceLocation)
            {
                return GlobalBsddSettings.bsddsettings.MainDictionary.ParameterMapping;
            }
            else
            {
                foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
                {
                    if (filterDictionary.DictionaryUri == refSourceLocation)
                    {
                        return filterDictionary.ParameterMapping;
                    }
                }
            }
            return "";
        }
        public static string CreateParameterNameFromIFCClassificationReferenceSourceLocation(IfcClassificationReference ifcClassificationReference)
        {
            string refSourceLocation = ifcClassificationReference.ReferencedSource.Location.ToString();
            int index = refSourceLocation.IndexOf("//");
            string refSourceLocation2 = refSourceLocation.Substring(index + 2);
            return "bsdd/" + refSourceLocation;
        }
        // Element IFCClassification schema
        private static Guid s_schemaId = new Guid("79717CB2-D47B-4EC0-8E74-83A43E7D9F0A");
        private static Schema GetBsddDataSchema()
        {
            Schema schema = Schema.Lookup(s_schemaId);
            if (schema == null)
            {
                SchemaBuilder classificationBuilder = new SchemaBuilder(s_schemaId);
                classificationBuilder.SetSchemaName("BsddData");
                classificationBuilder.AddSimpleField("IFCClassification", typeof(string));
                schema = classificationBuilder.Finish();
            }
            return schema;
        }
        public static BsddBridgeData SelectionToJson(Document doc, List<ElementType> elemList)
        {
            try
            {
                var bsddBridgeData = new BsddBridgeData();
                List<IfcData> ifcDataLst = new List<IfcData>();

                foreach (ElementType elem in elemList)
                {
                    //Get the element type parameters
                    string familyName = GetElementTypeFamilyName(doc, elem, GetTypeParameterValueByElementType(elem, "IfcName"));
                    string typeName = GetElementTypeName(doc, elem, GetTypeParameterValueByElementType(elem, "IfcType"));
                    string ifcTag = elem.Id.ToString();
                    //string ifcTag = GetTypeId(elem);
                    string type_description = GetTypeParameterValueByElementType(elem, "Description");
                    string ifcType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS).AsString();
                    //string ifcType = GetTypeParameterValueByElementType(elem, "Export Type to IFC As");
                    string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE).AsString();
                    //string ifcPredefinedType = GetTypeParameterValueByElementType(elem, "Type IFC Predefined Type");


                    List<Association> hasAssociations = new List<Association>();

                    try
                    {

                        //Get bsdd data schema for classification reading
                        Schema schema = GetBsddDataSchema();

                        //Get schema entity and field, add to List<Association>
                        var entity = elem.GetEntity(schema);
                        var field = schema.GetField("IFCClassification");
                        var jsonstring = entity.Get<string>(field);
                        //var jsonstring = entity.Get<string>(schema.GetField("IFCClassification"));
                        hasAssociations = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Association>>(jsonstring);
                    }
                    catch (Exception)
                    {

                    }

                    //Overwriting properties from current Revit values:
                    //Value leading are:
                    //"name": First: <bsdd/...>(value after :) Second: <extendable storage> (currently in hasAssociations)
                    //"identification": First: <bsdd/...>(value after :) Second: <mapped parameter>(from bsddSettings) Third: <extendable storage> (currently in hasAssociations)
                    foreach (var association in hasAssociations)
                    {
                        switch (association)
                        {
                            case IfcClassificationReference ifcClassificationReference:
                                // do something with ifcClassificationReference

                                //Get bsddParameterValue
                                string bsddParameterName = CreateParameterNameFromIFCClassificationReferenceSourceLocation(ifcClassificationReference);
                                string bsddParameterValue = GetTypeParameterValueByElementType(elem, bsddParameterName);

                                //Get mapped parameter value
                                string mappedParameterName = GetMappedParameterName(ifcClassificationReference);
                                string mappedParameterValue = GetTypeParameterValueByElementType(elem, mappedParameterName);

                                //Set Name:
                                if (bsddParameterValue != null)
                                {
                                    ifcClassificationReference.Name = bsddParameterValue.Split(':')[1];
                                }

                                //set Identification:
                                if (mappedParameterValue != null)
                                {
                                    ifcClassificationReference.Identification = mappedParameterValue.Split(':')[1];
                                }
                                else if (bsddParameterValue != null)
                                {
                                    ifcClassificationReference.Identification = bsddParameterValue.Split(':')[0];
                                }

                                break;

                            case IfcMaterial ifcMaterial:
                                // do something with ifcMaterial
                                break;
                        }

                    }

                    IfcData ifcData = new IfcData
                    {
                        Type = ifcType,
                        Name = familyName + " - " + typeName,
                        Tag = ifcTag,
                        Description = type_description,
                        PredefinedType = ifcPredefinedType,

                    };

                    if (hasAssociations != null || hasAssociations.Count != 0)
                    {
                        ifcData.HasAssociations = hasAssociations;
                    }
                    ifcDataLst.Add(ifcData);


                }

                //Add current settings to the bsddBridgeData
                bsddBridgeData.Settings = GlobalBsddSettings.bsddsettings;

                //Set ifcData for all elements
                bsddBridgeData.IfcData = ifcDataLst;

                //Parse to Json object
                var provider = new JsonBasedPersistenceProvider("C://temp");
                provider.Persist(bsddBridgeData);

                return bsddBridgeData;
            }
            catch (Exception)
            {

                throw;
            }
            

        }

        private static Uri _getBsddDomainUri(string domain)
        {
            return new Uri(domain);
        }
        private static Uri _getBsddClassificationUri(Uri domain, string code)
        {
            return new Uri(domain + "/class/" + code);
        }
        public static string GetElementTypeFamilyName(Document doc, ElementType e, string IfcName)
        {
            if (IfcName != null && IfcName != "")
            {
                return IfcName;
            }
            else
            {
                try
                {
                    return e.FamilyName;
                }
                catch
                {
                    return "";
                }
            }


        }
        public static string GetElementTypeName(Document doc, ElementType e, string IfcType)
        {
            if (IfcType != null && IfcType != "")
            {
                return IfcType;
            }
            else
            {
                try
                {
                    return e.Name;
                }
                catch
                {
                    return "";
                }
            }
        }
        public static string GetTypeId(Element e)
        {
            try
            {
                ElementId eId = e.Id;
                if (eId == null) return "";
                return eId.ToString();
            }
            catch
            {
                return "";
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
