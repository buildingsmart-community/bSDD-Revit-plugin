using Autodesk.Revit.Attributes;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Resources;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Media.Imaging;

namespace BsddRevitPlugin.Common
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Startup : IExternalApplication
    {
        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }

        public Result OnStartup(UIControlledApplication application)
        {
            AddRibbonButtons(application);
            Main.Instance.OpenLogs();

            return Result.Succeeded;
        }

        BitmapImage NewBitmapImage(
            Assembly a, string imageName)
        {
            Stream s = a.GetManifestResourceStream(imageName);
            BitmapImage img = new BitmapImage();
            img.BeginInit();
            img.StreamSource = s;
            img.EndInit();
            return img;
        }

        private System.Windows.Media.ImageSource BmpImageSource(string embeddedPath)
        {
            Stream stream = this.GetType().Assembly.GetManifestResourceStream(embeddedPath);
            var decoder = new BmpBitmapDecoder(stream, BitmapCreateOptions.PreservePixelFormat, BitmapCacheOption.Default);
            return decoder.Frames[0];
        }

        private void AddRibbonButtons(UIControlledApplication application)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string executingAssemblyPath = assembly.Location;
            Debug.Print(executingAssemblyPath);
            string executingAssemblyName = assembly.GetName().Name;
            Console.WriteLine(executingAssemblyName);
            string eTabName = "bSDD";

            try
            {
                application.CreateRibbonTab(eTabName);
            }
            catch (Autodesk.Revit.Exceptions.ArgumentException)
            {
                // tab already exists
            }

            PushButtonData pbd = new PushButtonData("Sample", "Click Me", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.Popup");
            RibbonPanel panel = application.CreateRibbonPanel(eTabName, "bSDD");

            // Create the main button.
            PushButton pb = panel.AddItem(pbd) as PushButton;

            pb.ToolTip = "This is a sample Revit button";
            pb.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
        }
    }
}
