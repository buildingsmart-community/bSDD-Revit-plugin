

using Autodesk.Revit.UI;

namespace BsddRevitPlugin.V2024
{
    public class Startup : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            var serviceFactory = new Services.ServiceFactory2024();
            var startup = new Common.Startup(application, serviceFactory);
            return startup.OnStartup(application);
        }

        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }
    }
}
