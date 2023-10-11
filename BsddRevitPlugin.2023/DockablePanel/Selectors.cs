using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;
using System.Collections;
using System.Collections.Generic;
using System.Windows.Controls;

namespace Selectors
{
    class Select
    {
        public List<Element> AllElementsView(UIApplication uiapp)
        {
            //Select all elements in view
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;
            FilteredElementCollector allElementsInView = new FilteredElementCollector(doc, doc.ActiveView.Id);
            IList elementsInView = (IList)allElementsInView.ToElements();
            foreach (Element elem in elementsInView)
            {
                list.Add(elem);
            }
            
            return list;
        }

        public List<Element> AllElements(UIApplication uiapp)
        {
            //Select alle elementen in document
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;
            FilteredElementCollector allElements = new FilteredElementCollector(doc);
            IList elementsAll = (IList)allElements.ToElements();
            foreach (Element elem in elementsAll)
            {
                list.Add(elem);
            }
            return list;
        }

        public List<Element> SelectElements(UIApplication uiapp)
        {
            //Select by selection
            List<Element> list = new List<Element>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;
            IList<Reference> collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
            foreach (Reference element in collectionSelect)
            {
                Element e = doc.GetElement(element);
                list.Add(e);
            }
            return list;
        }
    }
}
