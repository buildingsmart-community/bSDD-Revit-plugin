using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Commands;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.IfcJson;
using ASRR.Core.Persistence;
using NLog;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls.Primitives;
using System.Windows.Interop;
using System.Windows.Shapes;
using Document = Autodesk.Revit.DB.Document;
using static System.Net.WebRequestMethods;
using System.Xml.Linq;
using System.Windows.Controls;
using System.Windows.Media.Media3D;
using System.IO;
using CefSharp;
using System.Windows.Forms;
using Autodesk.Revit.DB.IFC;
using System.Windows.Documents;
using static System.Net.Mime.MediaTypeNames;
using System.Diagnostics;
using System.Reflection;
using System.Windows.Media.Imaging;
using Path = System.IO.Path;

namespace BsddRevitPlugin.Logic.UI.Wrappers
{
    public class EventMakeSelection : IExternalEventHandler
    {

        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        public void Execute(UIApplication uiapp)
        {
            //logger.Debug("hoi");
            elemList = Selectorlist.SelectElements(uiapp);
            ListAdjust lst = new ListAdjust();
            elemList = lst.ListFilter(elemList);
            lst.elemToJSON(elemList);

            //foreach (Element item in elemList)
            //{
            //    try
            //    {
            //        ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = (item as FamilySymbol).FamilyName, Type = item.Name, Id = item.Id });
            //    }
            //    catch
            //    {
            //        ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = item.Category.Name, Type = item.Name, Id = item.Id });
            //    }
            //}
        }

        public string GetName()
        {
            return "";
        }
    }

    public class EventSelectAll : IExternalEventHandler
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.AllElements(uiapp);
            ListAdjust lst = new ListAdjust();
            elemList = lst.ListFilter(elemList);
            lst.elemToJSON(elemList);
        }

        public string GetName()
        {
            return "";
        }
    }

    public class EventSelectView : IExternalEventHandler
    {
        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.AllElementsView(uiapp);
            ListAdjust lst = new ListAdjust();
            elemList = lst.ListFilter(elemList);
            lst.elemToJSON(elemList);
        }

        public string GetName()
        {
            return "";
        }
    }

    public class ListAdjust
    {
        public List<Element> ListFilter(List<Element> elemList)
        {
            List<Element> elemListFiltered = new List<Element>();

            foreach (Element item in elemList)
            {
                try
                {
                    if (item.Category != null)
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

        public void elemToJSON(List<Element> elemList)
        {

            //of dit
            string JSONstring = "[\r\n";
            int totalCount = elemList.Count();
            int count = 0;

            foreach (Element item in elemList)
            {
                JSONstring += "    {\r\n";
                JSONstring += "        \"type\": \"" + GetParamValueByName("Export Type to IFC As", item) + "\",\r\n";
                JSONstring += "        \"name\": \"" + GetParamValueByName("IfcName", item) + "\",\r\n";
                JSONstring += "        \"description\": \"" + GetParamValueByName("IfcDescription", item) + "\",\r\n";
                JSONstring += "        \"predefinedType\": \"" + GetParamValueByName("Type IFC Predefined Type", item) + "\",\r\n";
                JSONstring += "        \"HasAssociations\":\r\n";
                JSONstring += "        [\r\n";
                JSONstring += "            {\r\n";
                JSONstring += "                \"type\": \"IfcClassificationReference\",\r\n";
                JSONstring += "                \"name\": \"" + GetParamValueByName("Assembly Description", item) + "\",\r\n";
                JSONstring += "                \"location\": \"" + GetLocationParam(item) + "\",\r\n";
                JSONstring += "                \"identification\": \"" + GetParamValueByName("Assembly Code", item) + "\",\r\n";
                JSONstring += "                \"referencedSource\":\r\n";
                JSONstring += "                {\r\n";
                JSONstring += "                    \"type\": \"IfcClassification\",\r\n";
                JSONstring += "                    \"name\": \"DigiBase Demo NL-SfB tabel 1\",\r\n";
                JSONstring += "                    \"location\": \"" + GetLocationParam(item) + "\"\r\n";
                JSONstring += "                }\r\n";
                JSONstring += "            }";

                int totalCount1 = item.GetMaterialIds(false).Count();
                if( totalCount1 > 0 ) 
                {
                    JSONstring += ",\r\n";
                } else {
                    JSONstring += "\r\n";
                };
                int count1 = 0;
                foreach (ElementId m in item.GetMaterialIds(false))
                {
                    JSONstring += "            {\r\n";
                    JSONstring += "                \"type\": \"IfcMaterial\",\r\n";
                    JSONstring += "                \"name\": \"" + GetParamValueByName("name", item) + "\",\r\n";
                    JSONstring += "                \"description\": \"" + GetParamValueByName("description", item) + "\"\r\n";
                    JSONstring += "            }";
                    if ((count1 + 1) == totalCount1)
                    {
                    }
                    else
                    {
                        JSONstring += ",";
                    }
                    count1++;
                    JSONstring += "\r\n";
                }
                JSONstring += "        ]\r\n";
                JSONstring += "    }";
                if ((count + 1) == totalCount)
                {

                }
                else
                {
                    JSONstring += ",";
                };
                count++;
                JSONstring += "\r\n";
            }
            JSONstring += "]";
            string folder = @"C:\Temp\";
            string fileName = "List`1.json";
            string fullPath = folder + fileName;
            System.IO.File.WriteAllText(fullPath, JSONstring);
        

        //of dit
        //List<IfcData> ifcDataLst = new List<IfcData>();

        //foreach (Element item in elemList)
        //{
        //    IfcData ifcData = new IfcData
        //    {
        //        Type = GetParamValueByName("Export Type to IFC As", item),
        //        Name = GetParamValueByName("IfcName", item),
        //        Description = GetParamValueByName("IfcDescription", item),
        //        PredefinedType = GetParamValueByName("Type IFC Predefined Type", item),
        //        HasAssociations = new List<Association>
        //        {
        //            new IfcClassificationReference
        //            {
        //                Type = "IfcClassificationReference",
        //                Name = GetParamValueByName("Assembly Description", item),
        //                Location = GetLocationParam(item),
        //                Identification = GetParamValueByName("Assembly Code", item),
        //                ReferencedSource = new IfcClassification
        //                {
        //                    Type = "IfcClassification",
        //                    Name = "DigiBase Demo NL-SfB tabel 1",
        //                    Location = GetLocationParam(item)
        //                }
        //            },
        //            new IfcMaterial
        //            {
        //                //MaterialType = item.GetMaterialIds(false).First().ToString(),
        //                MaterialName = "MaterialName",//GetMaterialName(item, Command.MyApp.DbDoc),
        //                Description = "Description"//GetParamValueByName("Assembly Code", item)
        //            }
        //        }
        //    };

        //    ifcDataLst.Add(ifcData);


        //}
        ////JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

        //var provider = new JsonBasedPersistenceProvider("C://temp");
        //provider.Persist(ifcDataLst);
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

        public string GetParamValueByName(String par, Element e)
        {
            Parameter p = e.LookupParameter(par);
            if (p != null)
            {
                switch (p.StorageType)
                {
                    case StorageType.Double:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.ElementId:
                        if (p.AsElementId().IntegerValue.ToString() == "" || p.AsElementId().IntegerValue.ToString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsElementId().IntegerValue.ToString();
                        }
                    case StorageType.Integer:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.None:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.String:
                        if(p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        } 
                        else
                        {
                            return p.AsString();
                        }
                    default: return "n/a";
                }
            }
            else
            {
                return null;
            }
        }

        public string GetMaterialName(Element e, Document DbDoc)
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

        public Uri GetLocationParam(Element e)
        {
            Uri paramValue = null;
            
            foreach (Parameter parameter in e.Parameters)
            {
                if (parameter.Definition.Name == "location")
                {
                    paramValue = new Uri(parameter.ToString(), UriKind.Absolute);
                }
            }
            
            return paramValue;
        }

    }
        

    public class EventTest : IExternalEventHandler
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();


        public void Execute(UIApplication uiapp)
        {
            logger.Debug(elemList);
            Document doc = uiapp.ActiveUIDocument.Document;

            using (Transaction transaction = new Transaction(doc, "Type Comments"))
            {
                transaction.Start();

                string idString = "766645";
                int idInt = Convert.ToInt32(idString);
                ElementId id = new ElementId(idInt);
                Element eFromId = doc.GetElement(id);

                string idString2 = "594824";
                int idInt2 = Convert.ToInt32(idString2);
                ElementId id2 = new ElementId(idInt2);
                Element eTypeFromId = doc.GetElement(id2);

                Parameter p = eFromId.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);
                Parameter p2 = eTypeFromId.get_Parameter(BuiltInParameter.ALL_MODEL_TYPE_COMMENTS);

                p.Set("Testing");
                p2.Set("TestingType");

                transaction.Commit();
            }



            //    foreach (Element item in elemList)
            //    {
            //        try
            //        {
            //            SetParameterValue(item, "Type Comments", "Test");
            //        }
            //        catch { }
            //    }
        }

        public string GetName()
        {
            return "";
        }
    }



    public class EventTest2 : IExternalEventHandler
    {
        Logger logger = LogManager.GetCurrentClassLogger();


        string addinLocation = Assembly.GetExecutingAssembly().Location;

        public void Execute(UIApplication uiapp)
        {

            string addinDirectory = Path.GetDirectoryName(addinLocation);
            var MyWindow = new bSDDSelector(addinDirectory);
            HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            Window wnd = hwndSource.RootVisual as Window;
            if (wnd != null)
            {
                MyWindow.Owner = wnd;
                //MyWindow.ShowInTaskbar = false;
                MyWindow.Show();
            }
        }

        public string GetName()
        {
            return "";
        }
    }
    public class EventTest3 : IExternalEventHandler
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        MainData sharedData;

        public void SetData(MainData data2)
        {
            sharedData = data2;
        }


        public void Execute(UIApplication uiapp)
        {
            var JSONData = sharedData;
            string json = JSONData.ToString();
            TaskDialog.Show("Success", json);
        }

        public string GetName()
        {
            return "";
        }
    }

    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            //Select Selectorlist = new Select();
            UIApplication uiapp = commandData.Application;
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.ApplicationServices.Application app = uiapp.Application;
            Document doc = uidoc.Document;

            MyApp.DbDoc = commandData.Application.ActiveUIDocument.Document;
            MyApp.DbUiDoc = commandData.Application.ActiveUIDocument;

            return Result.Succeeded;
        }

        public class MyApp : Autodesk.Revit.UI.IExternalApplication
        {
            public static Autodesk.Revit.DB.Document DbDoc; // The current database document
            public static Autodesk.Revit.UI.UIDocument DbUiDoc; // The current database UIdocument

            public Result OnShutdown(UIControlledApplication application)
            {
                throw new NotImplementedException();
            }

            public Result OnStartup(UIControlledApplication application)
            {
                throw new NotImplementedException();
            }

        }
    }
}
