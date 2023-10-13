using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;
using DockableDialog.Forms;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Data;
using System.Windows.Documents;
using Selectors;
using System.Windows.Controls;
using System.Security.Cryptography.X509Certificates;
using System.Windows.Controls.Primitives;
using BsddRevitPlugin._2023.Model;
using System.Windows.Media.Media3D;

namespace BSDDconnect
{
    public class EventMakeSelection : IExternalEventHandler
    {
        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();
        
        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.SelectElements(uiapp);

            foreach (Element item in elemList)
            {
                try
                {
                    if (
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Location Data"
                        )
                    {
                        ElemManager.AddElem(new Elem() { Type = item.Name, Family = item.Category.Name });
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
        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.AllElements(uiapp);

            foreach (Element item in elemList)
            {
                try
                {
                    if (
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Location Data"
                        )
                    {
                        ElemManager.AddElem(new Elem() { Type = item.Name, Family = item.Category.Name });
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
        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        public void Execute(UIApplication uiapp)
        {
            elemList = Selectorlist.AllElementsView(uiapp);

            foreach (Element item in elemList)
            {
                try
                {
                    if(
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Location Data"
                        )
                    {
                        ElemManager.AddElem(new Elem() { Type = item.Name, Family = item.Category.Name });
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
            var collectionView = new FilteredElementCollector(doc, doc.ActiveView.Id).Cast<Element>().ToList();
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




            TaskDialog.Show("BSDD", String.Join(", ", collectionView));


            return Result.Succeeded;
        }
    }
}
