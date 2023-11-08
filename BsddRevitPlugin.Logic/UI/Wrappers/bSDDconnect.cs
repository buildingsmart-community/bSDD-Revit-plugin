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
using CefSharp;


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
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (Element item in elemList)
            {
                HostObject HostItem = item as HostObject;
                
                IfcData ifcData = new IfcData
                {
                    Type = GetParamValueByName("Export Type to IFC As", item),
                    Name = GetParamValueByName("IfcName", item),
                    Description = GetParamValueByName("IfcDescription", item),
                    PredefinedType = GetParamValueByName("Type IFC Predefined Type", item),
                    HasAssociations = new List<Association>
                    {
                        new IfcClassificationReference
                        {
                            Type = item.Name,
                            Name = GetParamValueByName("Assembly Description", item),
                            Location = GetLocationParam(item),
                            Identification = GetParamValueByName("Assembly Code", item),
                            ReferencedSource = new IfcClassification
                            {
                                Type = item.Name,
                                Name = GetFamilyName(item),
                                Location = GetLocationParam(item)
                            }
                        },
                        new IfcMaterial
                        {
                            //Type = HostItem.GetType().ToString(),
                            Name = GetMaterial(item),
                            Description = GetParamValueByName("Assembly Code", item)
                        }
                    }
                };
                
                ifcDataLst.Add(ifcData);
            }
            //JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(ifcDataLst);
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

        public string GetParamValueByName(string name, Element e)
        {
            var paramValue = string.Empty;

            foreach (Parameter parameter in e.Parameters)
            {
                if (parameter.Definition.Name == name)
                {
                    paramValue = parameter.AsString();
                }
            }
            return paramValue;
        }

        public Autodesk.Revit.DB.Material GetMaterial(Element e)
        {
            UIDocument uiDoc = new UIDocument(Command.MyApp.DbDoc);
            Document doc = uiDoc.Document;

            Type tp = e.GetType();
            CompoundStructure structure = null;
            switch (tp.Name)
            {
                case "Wall":
                    Wall wall = e as Wall;
                    structure = wall.WallType.GetCompoundStructure();
                    break;
                case "Floor":
                    Floor floor = e as Floor;
                    structure = floor.FloorType.GetCompoundStructure();
                    break;
                case "FootPrintRoof":
                    FootPrintRoof roof = e as FootPrintRoof;
                    structure = roof.RoofType.GetCompoundStructure();
                    break;
                default:
                    structure = null;
                    break;
            }

            Autodesk.Revit.DB.Material material = doc.GetElement(structure.GetMaterialId(0)) as Autodesk.Revit.DB.Material;

            return material;
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



        public void Execute(UIApplication uiapp)
        {

            var MyWindow = new bSDDSelector();
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

    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIApplication uiapp = commandData.Application;
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            Select Selectorlist = new Select();
            MyApp.DbDoc = commandData.Application.ActiveUIDocument.Document;

            return Result.Succeeded;
        }

        public class MyApp : Autodesk.Revit.UI.IExternalApplication
        {
            public static Autodesk.Revit.DB.Document DbDoc; // The current database document

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
