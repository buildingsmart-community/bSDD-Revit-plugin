using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.View;
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
            logger.Debug("hoi");
            elemList = Selectorlist.SelectElements(uiapp);

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
                        item.Category.Name.Substring(Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            try
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = (item as FamilySymbol).FamilyName, Type = item.Name, Id = item.Id });
                            }
                            catch
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = item.Category.Name, Type = item.Name, Id = item.Id });
                            }
                        }
                    }
                }
                catch { }
            }
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

            logger.Debug(elemList);

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
                            try
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = (item as FamilySymbol).FamilyName, Type = item.Name, Id = item.Id });
                            }
                            catch
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = item.Category.Name, Type = item.Name, Id = item.Id });
                            }
                        }
                    }
                }
                catch { }
            }
        }

        public string GetName()
        {
            return "";
        }
    }

    public class EventSelectView : IExternalEventHandler
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();


        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.AllElementsView(uiapp);

            logger.Debug(elemList);

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
                        item.Category.Name.Substring(Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            try
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = (item as FamilySymbol).FamilyName, Type = item.Name, Id = item.Id });
                            }
                            catch
                            {
                                ElemManager.AddElem(new Elem() { Category = item.Category.Name, Family = item.Category.Name, Type = item.Name, Id = item.Id });
                            }
                        }
                    }
                }
                catch { }
            }
        }

        public string GetName()
        {
            return "";
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

            //using(Transaction t = new Transaction(doc, "Modify Project Name"))
            //{
            //    t.Start();
            //    doc.ProjectInformation.GetParameters("Project Name")[0].Set("Space Elevator");
            //    t.Commit();
            //}


            Select Selectorlist = new Select();
            //elemList = Selectorlist.AllElements(uiapp);

            //elemList = Selectorlist.AllElementsView(uiapp);

            //elemList = Selectorlist.AllSelectedElements(uiapp);


            //Knop keuze:
            //Alle elementen in view
            //var collectionView = new FilteredElementCollector(doc, doc.ActiveView.Id).Cast<Element>().ToList();
            //By Categorie

            //Selectie
            //Er is al een selectie
            //Er is nog geen selectie: Maak nieuwe selectie
            //                    IList<Reference> collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
            //zet in lijst
            //                    List<ElementId> ids = (from Reference r in collectionSelect select r.ElementId).ToList();


            //Geef standaarden aan?

            //Verwijder niet van toepassing zijnde elementen uit de lijst

            //Waarschuw dat elementen van dezelfde families die niet geselecteerd zijn ook worden gewijzigd/bewerkt 
            //Zet elementen per family en type in een lijst met status code rood/oranje/geel/groen
            //Rood: Nog niet gekoppeld
            //Oranje: Gekoppeld, maar nog niet volledig
            //Geel: Gekoppeld, niet volledig maar voldoende
            //Groen: Volledig gekoppeld

            //Loop family type lijst
            //Pak volgende family type
            //Koppel data in Pop-up menu <--BSDD
            //Haal parameters en waarden op uit BSDD volgens de juiste standaard
            //Check of parameters bestaan, anders toevoegen
            //verschil tussen loadable/system families
            //Shared parameters GUIDs in bsDD?
            //Voeg UI velden toe van parameters, gruis uit wat niet meer te wijzigen is
            //Volgende/Gereed/annuleren knop als gebruiker klaar is met huidige type
            //Bij annuleren vraag stellen om reeds opgegeven koppelingen te behouden of niet
            //Volgende item

            /////Veel van hierboven zit in de UI kant
            /////Er moet een JSON opgebouwd worden met de geselelcteerde elementen
            /////En een json ontvangen kunnen worden en teruggezet worden in de elementen

            /////Waarom alles in .2023 plugin file
            /////Sommige namespaces hebben ._2023?
            /////Logger!




            return Result.Succeeded;
        }
    }
}
