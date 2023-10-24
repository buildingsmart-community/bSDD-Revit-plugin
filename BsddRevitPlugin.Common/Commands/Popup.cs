using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;

namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    public class Popup : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                TaskDialog.Show("bSDD Revit plugin", "Looks like this worked! CvO");
                return Result.Succeeded;
            }
            catch (Exception e)
            {
                TaskDialog.Show("bSDD Revit plugin", $"Exception found: {e.Message}");
                return Result.Failed;
            }
        }
    }
}
