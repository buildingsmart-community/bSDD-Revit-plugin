
using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using static ASRR.Revit.Core.Elements.Parameters.Dto.RevitParameter;


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
                            logger.Debug("Aantal: " + idList.Count());
                            logger.Debug("TypeId: " + typeId);
                            int count = idList.Count();
                            int number = 1;
                            foreach (string result in idList)
                            {
                                // do something with each item
                                logger.Debug("result: " + result);
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
            //string nlfsbCode = "";
            //string description = "";
            //foreach (var association in ifcData.HasAssociations)
            //{
            //    switch (association)
            //    {
            //        case IfcClassificationReference ifcClassificationReference:
            //            // do something with ifcClassificationReference
            //            if (ifcClassificationReference.ReferencedSource.Name == "NL-SfB 2005")
            //            {
            //                nlfsbCode = ifcClassificationReference.Identification;
            //            }
            //            else if (ifcClassificationReference.ReferencedSource.Name == "VolkerWessels Bouw & vastgoed")
            //            {
            //                description = ifcClassificationReference.Identification;
            //            }
            //            break;
            //        case IfcMaterial ifcMaterial:
            //            // do something with ifcMaterial
            //            break;

            //    }

            //}

            string nlfsbValue = "";
            string basisproductValue = "";
            string ifcEntityValue = "";
            string ifcPredefinedtypeValue = "";

            const string nlfsbParameter = "Assembly Code";
            const string basisproductParameter = "Description";
            const string ifcEntityParameter = "Export Type to IFC As";
            const string ifcPredefinedtypeParameter = "Type IFC Predefined Type";

            if (ifcData.Type != null)
            {
                ifcEntityValue = ifcData.Type;
            }
            if (ifcData.PredefinedType != null)
            {
                ifcPredefinedtypeValue = ifcData.PredefinedType;
            }

            foreach (var association in ifcData.HasAssociations)
            {
                switch (association)
                {
                    case IfcClassificationReference ifcClassificationReference:
                        // do something with ifcClassificationReference
                        if (ifcClassificationReference.ReferencedSource.Name == "DigiBase Demo NL-SfB tabel 1") 
                        {
                            nlfsbValue = ifcClassificationReference.Identification;
                        }
                        else if (ifcClassificationReference.ReferencedSource.Name == "NL-SfB 2005")
                        {
                            nlfsbValue = ifcClassificationReference.Identification;
                        }
                        else if (ifcClassificationReference.ReferencedSource.Name == "BIM Basis Objecten")
                        {
                            basisproductValue = ifcClassificationReference.Identification;
                        }
                        break;

                    case IfcMaterial ifcMaterial:
                        // do something with ifcMaterial
                        break;

                }
            }

            using (Transaction tx = new Transaction(doc))
            {
                tx.Start("Update Parameters");

                List<Parameter> typeparameters = new List<Parameter>();

                int idInt = Convert.ToInt32(ifcData.Tag);
                ElementId typeId = new ElementId(idInt);
                Element elementType = doc.GetElement(typeId);

                foreach (Parameter typeparameter in elementType.Parameters)
                {
                    typeparameters.Add(typeparameter);
                }

                foreach (Parameter typeparameter in typeparameters)
                {
                    string paramName = typeparameter.Definition.Name;
                    //TaskDialog.Show("Success", paramName);

                    if (!typeparameter.IsReadOnly)
                    {
                        switch (paramName)
                        {
                            case nlfsbParameter:
                                logger.Debug("NL/SfB: " + nlfsbValue.ToString());
                                typeparameter.Set(nlfsbValue);
                                break;
                            case basisproductParameter:
                                logger.Debug("BasisProduct: " + basisproductValue.ToString());
                                typeparameter.Set(basisproductValue);
                                break;
                            case ifcEntityParameter:
                                logger.Debug("IfcEntity: " + ifcEntityValue.ToString());
                                typeparameter.Set(ifcEntityValue);
                                break;
                            case ifcPredefinedtypeParameter:
                                logger.Debug("IfcPredefinedtype: " + ifcPredefinedtypeValue.ToString());
                                typeparameter.Set(ifcPredefinedtypeValue);
                                break;
                        }
                    }
                }

                tx.Commit();
            }
        }
        public static BsddBridgeData SelectionToJson(Document doc, List<ElementType> elemList)
        {

            const string domain = "https://identifier.buildingsmart.org/uri/digibase/bim-basis-objecten";
            List<string> filterDomains = new List<string>(){
                "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3",
                "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
            };

            var mainData = new BsddBridgeData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (ElementType elem in elemList)
            {

                string code = elem.get_Parameter(BuiltInParameter.UNIFORMAT_CODE).AsString();
                Uri domainUri = _getBsddDomainUri(domain);
                Uri classificationUri = _getBsddClassificationUri(domainUri, code);

                string loc_domain = GetParameterValue(elem, "bsdd_domain");
                string loc_domainentry = GetParameterValue(elem, "bsdd_domain_entry");

                Uri location_domain = new Uri("https://www.volkerwessels.nl");
                Uri location_domain_entry = new Uri("https://www.volkerwessels.nl");

                if (loc_domain != null) location_domain = new Uri(loc_domain);
                if (loc_domainentry != null) location_domain_entry = new Uri(loc_domainentry);



                IfcData ifcData = new IfcData
                {
                    //Type = GetParameterValue2(elem, "Export Type to IFC As"),
                    Type = GetTypeParameterValue2(doc, elem, "Export Type to IFC As"),
                    Name = GetFamilyName(doc, elem, GetParameterValue(elem, "IfcName")) + " - " + GetTypeName(doc, elem, GetParameterValue(elem, "IfcType")),
                    Tag = GetTypeId(elem),
                    Description = GetParameterValue(elem, "Description"),
                    PredefinedType = GetParameterValue2(elem, "Type IFC Predefined Type"),
                    HasAssociations = new List<Association>
                    {
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = GetParameterValue(elem,"Description"),
                            Location = location_domain_entry,
                            Identification = GetParameterValue( elem, "Description"),
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = "BIM Basis Objecten",
                                Location =  location_domain
                            }
                        },
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = elem.get_Parameter(BuiltInParameter.UNIFORMAT_DESCRIPTION).AsString(),
                            Location = classificationUri,
                            Identification = GetTypeParameterValue(doc, elem, "Assembly Code"),
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = "DigiBase Demo NL-SfB tabel 1",
                                Location = domainUri
                            }
                        }
                        //new IfcMaterial
                        //{
                        //    //MaterialType = item.GetMaterialIds(false).First().ToString(),
                        //    MaterialName = "MaterialName",//GetMaterialName(item, Command.MyApp.DbDoc),
                        //    Description = "Description"//GetParamValueByName("Assembly Code", item)
                        //}
                    }
                };

                ifcDataLst.Add(ifcData);


            }
            //JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

            mainData.Name = "testIFC";
            mainData.setDomain(domain);
            mainData.setFilterDomains(filterDomains);
            mainData.IfcData = ifcDataLst;
            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(mainData);
            return mainData;
        }

        private static Uri _getBsddDomainUri(string domain)
        {
            return new Uri(domain);
        }

        private static Uri _getBsddClassificationUri(Uri domain, string code)
        {
            return new Uri(domain, code);
        }
        public static string GetFamilyName(Document doc, Element e)
        {

            try
            {
                ElementId eId = e.Id;
                ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType;

                return elementType.FamilyName;
            }
            catch
            {
                return "";
            }
        }
        public static string GetFamilyName(Document doc, Element e, string IfcName)
        {
            if (IfcName != null && IfcName != "")
            {
                return IfcName;
            }
            else
            {
                try
                {
                    ElementId eId = e.Id;
                    ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType;

                    return elementType.FamilyName;
                }
                catch
                {
                    return "";
                }
            }


        }

        public static dynamic GetParameterValue2(ElementType element, string parameterName)
        {
            try
            {
                if (element?.LookupParameter(parameterName) != null)
                {
                    return _getParameterValueByCorrectStorageType2(element.LookupParameter(parameterName));
                }

                return null;
            }
            catch (Exception arg)
            {
                return null;
            }
        }

        public static dynamic GetTypeParameterValue2(Document doc, ElementType element, string parameterName)
        {
            try
            {
                //ElementType elementType = doc.GetElement(element.GetTypeId()) as ElementType;
                ElementType elementType = doc.GetElement(element.Id) as ElementType;

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
            switch(parameter.StorageType)
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
        public static string GetTypeName(Document doc, Element e)
        {
            try
            {
                //ElementId eId = e.GetTypeId();
                ElementId eId = e.Id;
                ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType;

                return elementType.Name;
            }
            catch
            {
                return "";
            }
        }
        public static string GetTypeName(Document doc, Element e, string IfcType)
        {
            if (IfcType != null && IfcType != "")
            {
                return IfcType;
            }
            else
            {
                try
                {
                    //ElementId eId = e.GetTypeId();
                    ElementId eId = e.Id;
                    ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType;

                    return elementType.Name;
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
