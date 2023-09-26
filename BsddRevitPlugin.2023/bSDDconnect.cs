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

namespace bSDDconnect
{
    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        static List<Element> elemList = new List<Element>();

        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIApplication uiapp = commandData.Application;
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            elemList.Clear();
            Select Selectorlist = new Select();
            //elemList = Selectorlist.AllElements(uiapp);

            elemList = Selectorlist.AllElementsView(uiapp);

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

            using (Transaction tx = new Transaction(doc))
            {
                //print
                StringBuilder sb = new StringBuilder();
                tx.Start("transaction");
                if (elemList != null && elemList.Count > 0)
                {
                    foreach (Element elem in elemList)
                    {
                        sb.Append("\n" + elem.Name);
                    }
                    TaskDialog.Show("Titel: ", sb.ToString());
                }
                tx.Commit();
            };
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
