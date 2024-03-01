using Autodesk.Revit.UI;

namespace BsddRevitPlugin.V2023
{
    public class Startup : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            var browserServiceFactory = new Services.BrowserServiceFactory2023();
            var startup = new BsddRevitPlugin.Common.Startup(application, browserServiceFactory);
            return startup.OnStartup(application);
        }

        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }
    }
}
