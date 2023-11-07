using System.Collections.Generic;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class ParameterAanpassen : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            // Get the active document
            UIDocument uiDoc = commandData.Application.ActiveUIDocument;
            Document doc = uiDoc.Document;


            List<ElementId> elementTypeIds = new List<ElementId>();

            // Create a filtered element collector to get all the elements in the document
            FilteredElementCollector collector = new FilteredElementCollector(doc);

            // Filter elements by IsElementType property to get only ElementTypes
            ICollection<Element> elementTypes = collector
                .WhereElementIsElementType()
                .ToElements();

            // Get the ElementIds of all the ElementTypes
            foreach (Element elementType in elementTypes)
            {
                elementTypeIds.Add(elementType.Id);
            }


            // Get all ID's to adjust
            List<int> sourceList = new List<int> { 350319, 350304 };

            // Element IDs to edit
            List<ElementId> elementIdsToEdit = new List<ElementId> {};
            sourceList.ForEach(item => elementIdsToEdit.Add(new ElementId(item)));

            // Parameter name to edit
            string parameterName = "Type Comments";

            // New parameter value
            string newParameterValue = "Dit werkt!"; // Change this value as needed

            // Start a transaction
            using (Transaction tx = new Transaction(doc, "Edit Parameters"))
            {
                if (tx.Start() == TransactionStatus.Started)
                {
                    // Loop through the element IDs and edit the parameter
                    foreach (ElementId elementId in elementIdsToEdit)
                    //foreach (ElementId elementId in elementTypeIds)
                    {
                        Element element = doc.GetElement(elementId);

                        // Check if the element is valid and can have the specified parameter
                        if (element != null && element.IsValidObject) //&& element.CanHaveParameter(parameterName))
                        {
                            // Get the parameter by name
                            Parameter parameter = element.LookupParameter(parameterName);

                            //if (parameter != null && parameter.StorageType == StorageType.String)
                            //{
                                // Set the new parameter value
                                parameter.Set(newParameterValue);
                            //}
                            //else
                            //{
                                // Handle the case when the parameter is not found or is of a different type
                            //    var value = parameter.AsString();
                            //    TaskDialog.Show("Error", value);
                            //}
                        }
                        else
                        {
                            // Handle the case when the element is not valid or cannot have the specified parameter
                            TaskDialog.Show("Error", "Element not valid or cannot have the specified parameter.");
                        }
                    }

                    // Commit the transaction
                    tx.Commit();
                    return Result.Succeeded;
                }
                else
                {
                    // Handle the case when the transaction fails to start
                    TaskDialog.Show("Error", "Transaction failed to start.");
                    return Result.Failed;
                }
            }
        }
    }
}
