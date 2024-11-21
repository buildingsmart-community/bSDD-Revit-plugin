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

            //Make an IList to store the selection
            IList<Reference> collectionSelect = new List<Reference>();
            //Make an ICollection to store the selection before going in selection mode
            ICollection<ElementId> elemIds = uidoc.Selection.GetElementIds();
            //If nothing selected go into selection mode to make an selection. Else select what is selected
            if (elemIds.Count == 0)
            {
                //Select elements in selection mode
                collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
            } else {
                //Get one by one the elementId's of the stored selection set and transform them into the IList<Reference> collection
                foreach (ElementId id in elemIds)
                {
                    Element element = doc.GetElement(id); // Get the Element
                    if (element != null)
                    {
                        Reference reference = new Reference(element); // Make a new Reference
                        collectionSelect.Add(reference); // Add the Reference to the IList
                    }
                }
            }

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
