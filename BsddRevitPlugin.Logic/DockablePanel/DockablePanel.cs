using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;
using System.Windows;

namespace BsddRevitPlugin.Logic.DockablePanel
{
    //Check availability
    public class AvailabilityNoOpenDocument : IExternalCommandAvailability
    {
        public bool IsCommandAvailable(UIApplication a, CategorySet b)
        {
            if (a.ActiveUIDocument == null)
            {
                return true;
            }
            return false;
        }
    }

    //Show/Hide dockable dialog
    [Transaction(TransactionMode.ReadOnly)]
    public class ShowDockableWindow : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            DockablePaneId dpid = new DockablePaneId(new Guid("{D7C963CE-B3CA-426A-8D51-6E8254D21158}"));
            DockablePane dp = commandData.Application.GetDockablePane(dpid);
            if (dp.IsShown())
            {
                dp.Hide();
            } else
            {
                dp.Show();
            }
            return Result.Succeeded;
        }
    }
}
