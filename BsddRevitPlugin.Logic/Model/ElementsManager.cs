
using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Media.Media3D;
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
            string nlfsbCode = "";
            string description = "";
            foreach (var association in ifcData.HasAssociations)
            {
                switch (association)
                {
                    case IfcClassificationReference ifcClassificationReference:
                        // do something with ifcClassificationReference
                        if (ifcClassificationReference.ReferencedSource.Name == "NL-SfB 2005")
                        {
                            nlfsbCode = ifcClassificationReference.Identification;
                        }
                        else if (ifcClassificationReference.ReferencedSource.Name == "VolkerWessels Bouw & vastgoed")
                        {
                            description = ifcClassificationReference.Identification;
                        }
                        break;
                    case IfcMaterial ifcMaterial:
                        // do something with ifcMaterial
                        break;

                }

            }

            using (Transaction tx = new Transaction(doc))
            {
                tx.Start("Param");

                int idInt = Convert.ToInt32(ifcData.Tag);
                ElementId id = new ElementId(idInt);
                Element elem = doc.GetElement(id);

                Parameter p = elem.get_Parameter(BuiltInParameter.UNIFORMAT_CODE);
                var paramset = p.Set(nlfsbCode);

                SetParameterValue(elem, "Description", description);

                tx.Commit();
            }
        }
        public static BsddBridgeData SelectionToJson(Document doc, List<Element> elemList)
        {

            const string domain = "https://identifier.buildingsmart.org/uri/digibase/bim-basis-objecten";
            List<string> filterDomains = new List<string>(){
                "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3",
                "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
            };

            var mainData = new BsddBridgeData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (Element elem in elemList)
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
                    Type = GetTypeParameterValue(doc, elem, "Export Type to IFC As"),
                    Name = GetFamilyName(doc, elem, GetTypeParameterValue(doc, elem, "IfcName")) + " - " + GetTypeName(doc, elem, GetTypeParameterValue(doc, elem, "IfcType")),
                    Tag = GetTypeId(elem),
                    Description = GetParameterValue(elem, "Description"),
                    PredefinedType = GetTypeParameterValue(doc, elem, "Type IFC Predefined Type"),
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
                        },
                        new IfcMaterial
                        {
                            //MaterialId = GetMaterialId(doc, elem).Id.ToString(),
                            //MaterialType = GetMaterialId(doc, elem).MaterialCategory,
                            MaterialName = GetMaterial(doc, elem).Name,
                            Description = "Description"//GetParamValueByName("Assembly Code", item)
                        }
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


        public static Autodesk.Revit.DB.Material GetMaterial(Document doc, Element e)
        {
            ElementId matId = null;
            List<ElementId> matIds = new List<ElementId>();
            ICollection<ElementId> materialIds;

            var exactType = e.GetType().Name;
            if (exactType == "WallType" || exactType == "FloorType" || exactType == "RoofType")
            {
                CompoundStructure compoundStructure = null;
                if (exactType == "WallType")
                {
                    WallType wallType = e as WallType;
                    compoundStructure = wallType.GetCompoundStructure();
                }
                if (exactType == "FloorType")
                {
                    FloorType floorType = e as FloorType;
                    compoundStructure = floorType.GetCompoundStructure();
                }
                if (exactType == "RoofType")
                {
                    FloorType roofType = e as FloorType;
                    compoundStructure = roofType.GetCompoundStructure();
                }
                var layers = compoundStructure.GetLayers();
                foreach (var item in layers)
                {
                    matId = item.MaterialId;
                    if (matId != null)
                    {
                        break;
                    }
                }
            }
            else
            {
                materialIds = e.GetMaterialIds(false);
                foreach (var materialId in materialIds)
                {
                    if (materialId != null)
                    {
                        // Found the first material, break out of the loop
                        matId = materialId;
                        break;
                    }
                }
            }

            try
            {
                return doc.GetElement(matId) as Autodesk.Revit.DB.Material;
            }
            catch (Exception)
            {
                throw;
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

    }
}
