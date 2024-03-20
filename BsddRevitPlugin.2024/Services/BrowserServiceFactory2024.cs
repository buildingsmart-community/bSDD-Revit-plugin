using BsddRevitPlugin.Logic.UI.Services;

namespace BsddRevitPlugin.V2024.Services
{
    public class BrowserServiceFactory2024 : IBrowserServiceFactory
    {
        public IBrowserService CreateBrowserService()
        {
            return new BrowserService2024();
        }
    }
}
