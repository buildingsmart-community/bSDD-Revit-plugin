using Autodesk.Revit.Attributes;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Resources;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows;
using System.Windows.Media.Imaging;
using UIFramework;

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
            //Registreer Dockable panel voor Revit project geopend wordt.
            RegisterDockPanel(application);

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

            PushButtonData pbd = new PushButtonData("Popup", "Click Me", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.Popup");
            PushButtonData pbd1 = new PushButtonData("IFCexporter", "IFC export", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.IFCexporter");
            PushButtonData pbd2 = new PushButtonData("ParameterChange", "Parameters\raanpassen", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ParameterAanpassen");
            PushButtonData pbddp = new PushButtonData("Show/Hide", "Show/Hide selector", executingAssemblyPath, "DockablePanel.ShowDockableWindow");
            RibbonPanel panel = application.CreateRibbonPanel(eTabName, "bsDD");
            // Create the main button.
            PushButton pb = panel.AddItem(pbd) as PushButton;
            PushButton pb1 = panel.AddItem(pbd1) as PushButton;
            PushButton pb2 = panel.AddItem(pbd2) as PushButton;
            PushButton pbdp = panel.AddItem(pbddp) as PushButton;

            pb.ToolTip = "This is a sample Revit button";
            pb.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
            pb1.ToolTip = "This is a sample Revit button";
            pb1.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
            pb2.ToolTip = "This is a sample Revit button";
            pb2.LargeImage = ResourceImage.GetIcon("bsdd-label.png");

            pbdp.ToolTip = "Show/hide bSDD selection panel";
            pbdp.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
        }

        #region DockablePanel

        private void RegisterDockPanel(UIControlledApplication app)
        {
            //Koppel het window aan de Mainpage
            //bSDDPanel MainDockableWindow = new bSDDPanel();
            DockablePaneProviderData data = new DockablePaneProviderData();

            //Maak een ID aan
            DockablePaneId dpid = new DockablePaneId(new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158"));

            //app.RegisterDockablePane(dpid, "bSDD", MainDockableWindow as IDockablePaneProvider);

        }

        #endregion
    }
}
