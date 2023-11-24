
using ASRR.Core.Persistence;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using NLog;
using System;
using System.Collections.Generic;
using static ASRR.Revit.Core.Elements.Parameters.Dto.RevitParameter;


namespace BsddRevitPlugin.Logic.Model
{
    public static class ElementsManager
    {

        public static List<Element> ListFilter(List<Element> elemList)
        {
            List<Element> elemListFiltered = new List<Element>();

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
                            elemListFiltered.Add(item);
                        }
                    }
                }
                catch { }
            }
            return elemListFiltered;
        }
        public static MainData SelectionToJson(Document doc, List<Element> elemList)
        {

            const string domain = "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten";
            List<string> filterDomains = new List<string>(){
                "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten",
                "https://identifier.buildingsmart.org/uri/digibase/nlsfb"
            };

            MainData mainData = new MainData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (Element elem in elemList)
            {

                string code = GetTypeParameterValue(doc, elem, "Assembly Code");
                Uri domainUri = _getBsddDomainUri(domain);
                Uri classificationUri = _getBsddClassificationUri(domainUri, code);

                string loc_domain = GetParameterValue(elem, "bsdd_domain");
                string loc_domainentry = GetParameterValue(elem, "bsdd_domainentry");

                Uri location_domain = new Uri("https://www.volkerwessels.nl");
                Uri location_domain_entry = new Uri("https://www.volkerwessels.nl");

                if (loc_domain != null) location_domain = new Uri(GetParameterValue(elem, loc_domain));
                if (loc_domainentry != null) location_domain_entry = new Uri(GetParameterValue(elem, loc_domainentry));
                


                IfcData ifcData = new IfcData
                {
                    Type = GetTypeParameterValue(doc, elem, "Export Type to IFC As"),
                    //Name = GetTypeParameterValue(doc, elem, "IfcName"),
                    Name = GetFamilyName(doc, elem) + " - " + GetTypeName(doc, elem),
                    FamilyNameAndTypeName = GetFamilyName(doc, elem) + " - " + GetTypeName(doc, elem),
                    TypeId = elem.Id.ToString(),
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
                            Name = GetTypeParameterValue(doc, elem,"Assembly Description"),
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
            //ElementId eId = e.GetTypeId(); 
            ElementId eId = e.Id; 
            ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType; 
            
            return elementType.FamilyName;
        }
        public static string GetTypeName(Document doc, Element e)
        {
            //ElementId eId = e.GetTypeId();
            ElementId eId = e.Id;
            ElementType elementType = (ElementType)doc.GetElement(eId) as ElementType;
           
            return elementType.Name;
        }
        public static string GetFamilyName(Element e)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            var eId = e?.GetTypeId();
            logger.Debug("0000");
            if (eId == null) return "1";
            logger.Debug("1111");
            var elementType = e.Document.GetElement(eId) as ElementType;
            logger.Debug("2222");
            return elementType?.FamilyName ?? eId.ToString();
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
