//TODO comments

#region ================== References ===================
using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Architecture;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;
using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.UI.DockablePanel
{
    public class Select
    {
        public List<Element> AllElementsView(UIApplication uiapp)
        {
            //Select all elements in view
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            FilteredElementCollector allElementsInView = new FilteredElementCollector(doc, doc.ActiveView.Id);
            allElementsInView.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            IList elementsInView = (IList)allElementsInView.ToElements();
            foreach (Element elem in elementsInView)
            {
                list.Add(doc.GetElement(elem.Id) as Element);
            }

            return list;
        }
        public List<Element> AllElements(UIApplication uiapp)
        {
            //Select alle elementen in document
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            FilteredElementCollector allElements = new FilteredElementCollector(doc);
            allElements.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            IList elementsAll = (IList)allElements.ToElements();
            foreach (Element elem in elementsAll)
            {
                list.Add(doc.GetElement(elem.Id) as Element);
            }
            return list;
        }

        public List<Element> SelectElements(UIApplication uiapp)
        {
            //Select by selection
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            IList<Reference> collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
            foreach (Reference element in collectionSelect)
            {
                Element elem = doc.GetElement(element);
                list.Add(doc.GetElement(elem.Id) as Element);
            }
            return list;
        }
    }
}
#endregion