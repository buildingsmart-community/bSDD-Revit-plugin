using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public static void SetIfcDataToRevit(Document doc, IfcData ifcData)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            
            const string nlfsbParameter = "Assembly Code";
            const string basisproductParameter = "Description";
            const string ifcEntityParameter = "Export Type to IFC As";
            const string ifcPredefinedtypeParameter = "Type IFC Predefined Type";

            using (Transaction tx = new Transaction(doc))
            {
                tx.Start("Update Parameters");

                int idInt = Convert.ToInt32(ifcData.Tag);
                ElementId typeId = new ElementId(idInt);
                ElementType elementType = doc.GetElement(typeId) as ElementType;

                string bsddParameterName = "";
                string parameterMappedName = "";



                ForgeTypeId specType = SpecTypeId.String.Text;
                ForgeTypeId groupType = GroupTypeId.Ifc;

                Schema schema = GetSchema();
                var f = schema.GetField("IFCClassification");
                Entity test = new Entity(schema);
                test.Set(f, Newtonsoft.Json.JsonConvert.SerializeObject(ifcData.HasAssociations));
                elementType.SetEntity(test);

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

                            bsddParameterName = "bsdd/" + refSourceLocation;

                            //Add a project parameter for the bsdd classification in call Revit categories if it does not exist
                            Utilities.Parameters.CreateProjectParameterForAllCategories(doc, bsddParameterName, "tempGroupName", specType, groupType, false);


                            // TODO: Get mapped parameter name from extended datastorage
                            if (GlobalBsddSettings.bsddsettings.MainDictionary.DictionaryUri == refSourceLocation)
                            {
                                parameterMappedName = GlobalBsddSettings.bsddsettings.MainDictionary.ParameterMapping;
                                break;
                            }
                            else
                            {
                                foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
                                {
                                    if (filterDictionary.DictionaryUri == refSourceLocation)
                                    {
                                        parameterMappedName = filterDictionary.ParameterMapping;
                                        break;
                                    }
                                }
                            }
                            List<IfcClassificationReference> ifcClassificationReferences = new List<IfcClassificationReference>();
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
        // Element IFCClassification schema
        private static Guid s_schemaId = new Guid("79717CB2-D47B-4EC0-8E74-83A43E7D9F0A");
        private static Schema GetSchema()
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

            // TODO: Build the Json object genericly by reading all bsdd/... parameters from Revit, parse the json inside it and add it to the IfcClassificationReference list.

            const string mainClassificationLocation = "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0";
            const string mainClassificationName = "Basis bouwproducten";

            const string ifcClassificationLocation = "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3";
            const string ifcClassificationName = "IFC";

            const string nlsfbClassificationLocation = "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021";
            const string nlsfbClassificationName = "DigiBase Demo NL-SfB tabel 1";


            Uri mainClassificationUri = _getBsddDomainUri(mainClassificationLocation);
            Uri ifcClassificationUri = _getBsddDomainUri(ifcClassificationLocation);
            Uri nlsfbClassificationUri = _getBsddDomainUri(nlsfbClassificationLocation);

            var bsddBridgeData = new BsddBridgeData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (ElementType elem in elemList)
            {
                string familyName = GetElementTypeFamilyName(doc, elem, GetTypeParameterValueByElementType(elem, "IfcName"));
                string typeName = GetElementTypeName(doc, elem, GetTypeParameterValueByElementType(elem, "IfcType"));
                string ifcTag = elem.Id.ToString();
                //string ifcTag = GetTypeId(elem);
                string type_description = GetTypeParameterValueByElementType(elem, "Description");
                string ifcType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS).AsString();
                //string ifcType = GetTypeParameterValueByElementType(elem, "Export Type to IFC As");
                string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE).AsString();
                //string ifcPredefinedType = GetTypeParameterValueByElementType(elem, "Type IFC Predefined Type");
                string loc_domain = GetTypeParameterValueByElementType(elem, "bsdd_domain");
                string loc_domainentry = GetTypeParameterValueByElementType(elem, "bsdd_domain_entry");
                string uniformatCode = elem.get_Parameter(BuiltInParameter.UNIFORMAT_CODE).AsString();
                string uniformatDescription = elem.get_Parameter(BuiltInParameter.UNIFORMAT_DESCRIPTION).AsString();


                string mainClassificationReferenceIdentification = null;
                string mainClassificationReferenceName = null;

                string ifcClassificationReferenceIdentification = null;
                string ifcClassificationReferenceName = null;

                string nlsfbClassificationReferenceIdentification = null;
                string nlsfbClassificationReferenceName = null;

                if (type_description != null)
                {
                    mainClassificationReferenceIdentification = type_description.Replace(" ", "");
                    mainClassificationReferenceName = type_description;
                }

                if (ifcType != null)
                {
                    ifcClassificationReferenceIdentification = ifcType.Replace(" ", "");
                    ifcClassificationReferenceName = ifcType;
                }

                if (ifcClassificationReferenceIdentification != null && ifcClassificationReferenceName != null && ifcPredefinedType != null)
                {
                    ifcClassificationReferenceIdentification = ifcClassificationReferenceIdentification + ifcPredefinedType;
                    ifcClassificationReferenceName = ifcClassificationReferenceName + "." + ifcPredefinedType;
                }

                if (uniformatCode != null)
                {
                    nlsfbClassificationReferenceIdentification = uniformatCode.Replace(" ", "");
                    nlsfbClassificationReferenceName = uniformatDescription;
                }

                Uri mainClassificationReferenceUri = _getBsddClassificationUri(mainClassificationUri, mainClassificationReferenceIdentification);
                Uri ifcClassificationReferenceUri = _getBsddClassificationUri(ifcClassificationUri, ifcClassificationReferenceIdentification);
                Uri nlsfbClassificationReferenceUri = _getBsddClassificationUri(nlsfbClassificationUri, nlsfbClassificationReferenceIdentification);

                if (loc_domain != null) mainClassificationUri = new Uri(loc_domain);
                if (loc_domainentry != null) mainClassificationReferenceUri = new Uri(loc_domainentry);

                IfcData ifcData = new IfcData
                {
                    Type = ifcType,
                    Name = familyName + " - " + typeName,
                    Tag = ifcTag,
                    Description = type_description,
                    PredefinedType = ifcPredefinedType,
                   
                };
                List<Association> hasAssociations = new List<Association>();
                foreach (Parameter typeparameter in elem.Parameters)
                {
                    string typeParameterName = typeparameter.Definition.Name;
                    // TODO: Get the Ifcclassifications from extended datastorage
                    // fill "name": "<extendable storage>else<bsdd param>",
                    // fill "identification": "<extendable storage>else<mapped param>else<bsdd param>"

                    if (typeParameterName.StartsWith("bsdd/"))
                    {
                        var jsonstring = GetTypeParameterValueByElementType(elem, typeParameterName);

                        if (jsonstring != null)
                        {
                            hasAssociations.Add(Newtonsoft.Json.JsonConvert.DeserializeObject<IfcClassificationReference>(jsonstring));
                        }
                    }

                    
                }
                if (hasAssociations != null)
                {
                    ifcData.HasAssociations = hasAssociations;
                }
                ifcDataLst.Add(ifcData);


            }
            //JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

            bsddBridgeData.Settings = GlobalBsddSettings.bsddsettings;
            bsddBridgeData.IfcData = ifcDataLst;
            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(bsddBridgeData);
            return bsddBridgeData;
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
