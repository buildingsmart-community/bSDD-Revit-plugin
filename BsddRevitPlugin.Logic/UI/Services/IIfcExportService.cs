using Autodesk.Revit.DB;
using BIM.IFC.Export.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.UI.Services
{
    public interface IIfcExportService
    {
        IFCExportConfiguration GetDefaultExportConfiguration(Autodesk.Revit.DB.Document document);
        IFCExportConfiguration GetOrSetBsddConfiguration(Autodesk.Revit.DB.Document document);
        IList<Parameter> GetAllBsddParameters(Autodesk.Revit.DB.Document document);
        Dictionary<string, IList<Parameter>> RearrageParamatersForEachPropertySet(IList<Parameter> parameters);
    }
}
