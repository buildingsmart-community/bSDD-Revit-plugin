using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.V2023.Services
{
    public class ServiceFactory2023 : IServiceFactory
    {
        public IBrowserService CreateBrowserService()
        {
            return new BrowserService2023();
        }
        public IIfcExportService CreateIfcExportService()
        {
            return new IfcExportService2023();
        }
    }
}
