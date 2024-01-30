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

        public static List<Element> ListFilter(List<Element> elemList)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            List<Element> elemListFiltered = new List<Element>();


            string typeId;
            List<string> idList = new List<string>();
            foreach (Element item in elemList)
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
        public static BsddBridgeData SelectionToJson(Document doc, List<Element> elemList)
        {

            const string mainClassificationLocation = "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0";
            const string mainClassificationName = "BIM Basis Objecten";

            const string ifcClassificationLocation = "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3";
            const string ifcClassificationName = "IFC";

            const string nlsfbClassificationLocation = "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021";
            const string nlsfbClassificationName = "DigiBase Demo NL-SfB tabel 1";

            List<string> filterClassificationLocations = new List<string>(){
                ifcClassificationLocation,
                nlsfbClassificationLocation
            };

            Uri mainClassificationUri = _getBsddDomainUri(mainClassificationLocation);
            Uri ifcClassificationUri = _getBsddDomainUri(ifcClassificationLocation);
            Uri nlsfbClassificationUri = _getBsddDomainUri(nlsfbClassificationLocation);

            var bsddBridgeData = new BsddBridgeData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (Element elem in elemList)
            {
                string familyName = GetFamilyName(doc, elem, GetTypeParameterValue(doc, elem, "IfcName"));
                string typeName = GetTypeName(doc, elem, GetTypeParameterValue(doc, elem, "IfcType"));
                string ifcTag = GetTypeId(elem);
                string type_description = GetParameterValue(elem, "Description");
                string ifcType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_ELEMENT_TYPE_AS).AsString();
                string ifcPredefinedType = elem.get_Parameter(BuiltInParameter.IFC_EXPORT_PREDEFINEDTYPE_TYPE).AsString();
                string loc_domain = GetParameterValue(elem, "bsdd_domain");
                string loc_domainentry = GetParameterValue(elem, "bsdd_domain_entry");
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
                    HasAssociations = new List<Association>
                    {
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = mainClassificationReferenceName,
                            Location = mainClassificationReferenceUri,
                            Identification = mainClassificationReferenceIdentification,
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = mainClassificationName,
                                Location =  mainClassificationUri
                            }
                        },
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = ifcClassificationReferenceName,
                            Location = ifcClassificationReferenceUri,
                            Identification = ifcClassificationReferenceIdentification,
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = ifcClassificationName,
                                Location = ifcClassificationUri
                            }
                        },
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = nlsfbClassificationReferenceName,
                            Location = nlsfbClassificationReferenceUri,
                            Identification = nlsfbClassificationReferenceIdentification,
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = nlsfbClassificationName,
                                Location = nlsfbClassificationUri
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

            bsddBridgeData.Name = "testIFC";
            bsddBridgeData.setDomain(mainClassificationLocation);
            bsddBridgeData.setFilterDomains(filterClassificationLocations);
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
