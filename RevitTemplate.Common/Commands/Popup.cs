using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;

namespace RevitTemplate.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class Popup : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                TaskDialog.Show("ASRR Sample Addin", "Looks like this worked!");
                return Result.Succeeded;
            }
            catch (Exception e)
            {
                TaskDialog.Show("ASRR Sample Addin", $"Exception found: {e.Message}");
                return Result.Failed;
            }
        }
    }
}
