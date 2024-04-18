using BIM.IFC.Export.UI;
using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.V2024.Services
{
    public class ServiceFactory2024 : IServiceFactory
    {
        public IBrowserService CreateBrowserService()
        {
            return new BrowserService2024();
        }
        public IIfcExportService CreateIfcExportService()
        {
            return new IfcExportService2024();
        }
    }
}
