

using Autodesk.Revit.UI;

namespace BsddRevitPlugin.V2024
{
    public class Startup : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            var browserServiceFactory = new Services.BrowserServiceFactory2024();
            var startup = new BsddRevitPlugin.Common.Startup(application, browserServiceFactory);


            return startup.OnStartup(application);
        }

        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }
    }
}
