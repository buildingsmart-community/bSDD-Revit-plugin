using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Architecture;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Selection;
using Revit.IFC.Import.Core;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Xml.Linq;
using Document = Autodesk.Revit.DB.Document;

namespace BsddRevitPlugin.Logic.UI.DockablePanel
{
    public class Select
    {
        /// <summary>
        /// Select all elements in active view and filter out geometrical elements
        /// </summary>
        /// <param name="uiapp"></param>
        /// <returns>List of elementtypes of the geometrical elements in the active view</returns>
        public List<ElementType> AllElementsView(UIApplication uiapp)
        {
            //Get Document
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            //Select all elements in view
            FilteredElementCollector allElementsInView = new FilteredElementCollector(doc, doc.ActiveView.Id);
            allElementsInView.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            
            return ListElements((IList)allElementsInView.ToElements(), doc);
        }

        /// <summary>
        /// Select all elements in active project and filter out geometrical elements
        /// </summary>
        /// <param name="uiapp"></param>
        /// <returns>List of elementtypes of the geometrical elements in the active project</returns>
        public List<ElementType> AllElements(UIApplication uiapp)
        {
            //Get Document
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.DB.Document doc = uidoc.Document;
            //Select alle elementen in document
            FilteredElementCollector allElements = new FilteredElementCollector(doc);
            allElements.WhereElementIsNotElementType().WhereElementIsViewIndependent();
            
            return ListElements((IList)allElements.ToElements(), doc);
        }

        /// <summary>
        /// Select elements by user and filter out geometrical elements. Let's user select in case nothing is selected yet
        /// </summary>
        /// <param name="uiapp"></param>
        /// <returns>List of the geometrical elements of the by user selected elements</returns>
        public List<ElementType> SelectElements(UIApplication uiapp)
        {
            //Select by selection
            List<ElementType> list = new List<ElementType>();
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;
                        
            //Make an ICollection to store the selection before going in selection mode
            ICollection<ElementId> elemIds = uidoc.Selection.GetElementIds();
            //If nothing selected go into selection mode to make an selection. Else select what is selected
            if (elemIds.Count == 0)
            {
                //Select elements in selection mode
                //Make an IList to store the selection
                IList<Reference> collectionSelect = new List<Reference>();
                collectionSelect = uidoc.Selection.PickObjects(ObjectType.Element);
                foreach (Reference reference in collectionSelect)
                {
                    ElementId elementId = reference.ElementId;
                    if (elementId != null)
                    {
                        elemIds.Add(elementId);
                    }
                }
            }
            // Create the FilteredElementCollector with the list of ElementId
            FilteredElementCollector collector = new FilteredElementCollector(doc).WherePasses(new ElementIdSetFilter(elemIds));
            collector.WhereElementIsNotElementType().WhereElementIsViewIndependent();

            IList iList = GetGroupedElements((IList)collector.ToElements(), doc);
            iList = GetAssembledElements(iList, doc);
            List<ElementType> listElemType = ListElements(iList, doc);

            return listElemType;
        }

        /// <summary>
        /// Takes an IList with elements, check or elements have category, If element is stacked wall then break appart, than list all elements
        /// </summary>
        /// <param name="elements"></param>
        /// <param name="doc"></param>
        /// <returns>List of element types</returns>
        public List<ElementType> ListElements(IList elements, Document doc)
        {
            List<Element> list = new List<Element>();
            foreach (Element elem in elements)
            {
                if (elem != null)
                {
                    if(elem.Category != null)
                    {
                        if (elem.Category.Name == "Stacked Walls")
                        {
                            Wall stackedWall = elem as Wall;
                            foreach (var instanceWallId in stackedWall.GetStackedWallMemberIds())
                            {
                                Element stackedWallMember = doc.GetElement(instanceWallId);
                                if (stackedWallMember != null)
                                {
                                    list.Add(doc.GetElement(stackedWallMember.GetTypeId()) as Element);
                                }
                            }
                        }
                        else
                        {
                            list.Add(elem);
                        }
                    }
                }
            }
            List<ElementType> listElemType = new List<ElementType>();
            ElementType elemType;
            foreach (Element elem in list)
            {
                // Get the ElementType of the Element
                elemType = doc.GetElement(elem.GetTypeId()) as ElementType;
                if(elemType == null)
                {
                    elemType = doc.GetElement(elem.Id) as ElementType;
                }

                // Check if the ElementType is already in the list
                if (!listElemType.Contains(elemType))
                {
                    // Add the ElementType to the list
                    listElemType.Add(elemType);
                }
            }
            return listElemType;
        }

        /// <summary>
        /// Check IList for groups, and add all elements in group to IList
        /// </summary>
        /// <param name="elements"></param>
        /// <param name="doc"></param>
        /// <returns>IList with all elements include elements in groups</returns>
        public IList GetGroupedElements(IList elements, Document doc)
        {
            List<Element> list = new List<Element>();
            foreach (Element elem in elements)
            {
                if (elem is Group group)
                {
                    ICollection<ElementId> memberIds = group.GetMemberIds();
                    foreach (ElementId id in memberIds)
                    {
                        list.Add(doc.GetElement(id));
                    }
                }
                else
                {
                    list.Add(doc.GetElement(elem.GetTypeId()) as Element);
                }
            }
            return (IList)list;
        }

        /// <summary>
        /// Check IList for assemblies, and add all elements in assembly to IList
        /// </summary>
        /// <param name="elements"></param>
        /// <param name="doc"></param>
        /// <returns>IList with all elements include elements in assemblies</returns>
        public IList GetAssembledElements(IList elements, Document doc)
        {
            List<Element> list = new List<Element>();
            foreach (Element elem in elements)
            {
                if (elem is AssemblyInstance assemblyInstance)
                {
                    ICollection<ElementId> memberIds = assemblyInstance.GetMemberIds();
                    foreach (ElementId id in memberIds)
                    {
                        list.Add(doc.GetElement(id));
                    }
                }
                else if (elem is AssemblyType assemblyType)
                {
                    ElementId assemblyTypeId = assemblyType.Id;
                    FilteredElementCollector FEcollector = new FilteredElementCollector(doc).OfClass(typeof(AssemblyInstance));
                    List<Element> assemblyElements = new List<Element>();
                    
                    foreach (AssemblyInstance assemblyInstances in FEcollector)
                    {
                        if (assemblyInstances.GetTypeId() == assemblyTypeId)
                        {
                            ICollection<ElementId> memberId = assemblyInstances.GetMemberIds();
                            foreach (ElementId id in memberId)
                            {
                                list.Add(doc.GetElement(id));
                            }
                            break;
                        }
                    }
                }
                else
                {
                    if(elem.GetTypeId() != null)
                    {
                        list.Add(doc.GetElement(elem.Id) as Element);
                    }
                    else
                    {
                        list.Add(doc.GetElement(elem.GetTypeId()) as Element);
                    }
                }
            }
            return (IList)list;
        }
    }
}
