using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Architecture;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;
using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;

namespace BsddRevitPlugin.Logic.UI.DockablePanel
{
    public class Select
    {
        public List<ElementType> AllElementsView(UIApplication uiapp)
        {
            //Select all elements in view
            List<ElementType> list = new List<ElementType>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            FilteredElementCollector allElementsInView = new FilteredElementCollector(doc, doc.ActiveView.Id);
            allElementsInView.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            IList elementsInView = (IList)allElementsInView.ToElements();
            foreach (Element elem in elementsInView)
            {
                if (elem.Category.Name == "Stacked Walls")
                {
                    Wall stackedWall = elem as Wall;
                    foreach (var instanceWallId in stackedWall.GetStackedWallMemberIds())
                    {
                        Element stackedWallMember = doc.GetElement(instanceWallId);
                        if (stackedWallMember != null)
                        {
                            list.Add(doc.GetElement(stackedWallMember.GetTypeId()) as ElementType);
                        }
                    }
                }
                else
                {
                    list.Add(doc.GetElement(elem.GetTypeId()) as ElementType);
                }
            }
            
            return list;
        }

        public List<ElementType> AllElements(UIApplication uiapp)
        {
            //Select alle elementen in document
            List<ElementType> list = new List<ElementType>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            FilteredElementCollector allElements = new FilteredElementCollector(doc);
            allElements.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            IList elementsAll = (IList)allElements.ToElements();
            foreach (Element elem in elementsAll)
            {
                if (elem.Category !=  null)
                {
                    if (elem.Category.Name == "Stacked Walls")
                    {
                        Wall stackedWall = elem as Wall;
                        foreach (var instanceWallId in stackedWall.GetStackedWallMemberIds())
                        {
                            Element stackedWallMember = doc.GetElement(instanceWallId);
                            if (stackedWallMember != null)
                            {
                                list.Add(doc.GetElement(stackedWallMember.GetTypeId()) as ElementType);
                            }
                        }
                    }
                    else
                    {
                        list.Add(doc.GetElement(elem.GetTypeId()) as ElementType);
                    }
                }

            }
            return list;
        }

        public List<ElementType> SelectElements(UIApplication uiapp)
        {
            //Select by selection
            List<ElementType> list = new List<ElementType>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            IList<Reference> collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
            foreach (Reference element in collectionSelect)
            {
                Element elem = doc.GetElement(element);

                if (elem.Category.Name == "Stacked Walls")
                {
                    Wall stackedWall = elem as Wall;
                    foreach (var instanceWallId in stackedWall.GetStackedWallMemberIds())
                    {
                        Element stackedWallMember = doc.GetElement(instanceWallId);
                        if (stackedWallMember != null)
                        {
                            list.Add(doc.GetElement(stackedWallMember.GetTypeId()) as ElementType);
                        }
                    }
                }
                else
                {
                    list.Add(doc.GetElement(elem.GetTypeId()) as ElementType);
                }
            }
            return list;
        }
    }
}
