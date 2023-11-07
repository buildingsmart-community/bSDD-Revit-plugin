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
            //    IfcData ifcData = new IfcData
            //    {
            //        IsDefinedBy = new List<IfcPropertySet>()
            //            {
            //                new IfcPropertySet
            //                {
            //                    Name = item.Name
            //                }
            //            },
            //        HasAssociations = new List<IfcClassificationReference>()
            //            {
            //                new IfcClassificationReference
            //                {
            //                Name = item.Name,
            //                Identification = "test"
            //                },
            //                new IfcClassificationReference
            //                {
            //                Name = "testing",
            //                Identification = "test2"
            //                }
            //            }
            //    };



            //    ifcDataLst.Add(ifcData);
            }
            ////JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

            //var provider = new JsonBasedPersistenceProvider("C://temp");

            //provider.Persist(ifcDataLst);
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
            
            return Result.Succeeded;
        }
    }
}
