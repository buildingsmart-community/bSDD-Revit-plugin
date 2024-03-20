using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.V2023.Services
{
    public class BrowserServiceFactory2023 : IBrowserServiceFactory
    {
        public IBrowserService CreateBrowserService()
        {
            return new BrowserService2023();
        }
    }
}
