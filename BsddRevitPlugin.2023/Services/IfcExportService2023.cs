using Autodesk.Revit.DB;
using BIM.IFC.Export.UI;
using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.V2023.Services
{
    internal class IfcExportService2023 : IfcExportService
    {
        protected override void SetExportLinkedFiles(IFCExportConfiguration configuration)
        {
            configuration.ExportLinkedFiles = false;
        }
        protected override void SetActiveViewId(IFCExportConfiguration configuration, Autodesk.Revit.DB.Document document)
        {
            configuration.ActiveViewId = document.ActiveView.Id.IntegerValue;
        }
        protected override void SetActivePhaseId(IFCExportConfiguration configuration)
        {
            configuration.ActivePhaseId = -1;
            //configuration.ActivePhaseId = (int)ElementId.InvalidElementId.Value;
            ////configuration.ActivePhaseId = document.ActiveView.get_Parameter(BuiltInParameter.VIEW_PHASE).AsElementId()?.Value ?? ElementId.InvalidElementId.Value;
        }
    }

}