using Autodesk.Revit.Attributes;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Commands;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Resources;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Media.Imaging;

namespace BsddRevitPlugin.Common
{
    /// <summary>
    /// This class is responsible for starting up the Revit plugin.
    /// </summary>
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Startup : IExternalApplication
    {
        /// <summary>
        /// This method is called when the add-in is shut down.
        /// </summary>
        /// <param name="application">The UIControlledApplication object representing the Revit application.</param>
        /// <returns>A Result object indicating whether the shutdown was successful.</returns>
        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }

        /// <summary>
        /// This method is called when the add-in is started up. It registers a dockable panel for the Revit project and adds ribbon buttons to the UI.
        /// </summary>
        /// <param name="application">The UIControlledApplication object representing the Revit application.</param>
        /// <returns>A Result object indicating whether the startup was successful.</returns>
        public Result OnStartup(UIControlledApplication application)
        {
            // Get the current add-in location
            string addinLocation = Assembly.GetExecutingAssembly().Location;
            string addinDirectory = Path.GetDirectoryName(addinLocation);

            // Register Dockable panel for Revit project when it is opened.
            RegisterDockPanel(application, addinDirectory);

            // Add ribbon buttons to the UI.
            AddRibbonButtons(application);

            // Open logs.
            Main.Instance.OpenLogs();

            return Result.Succeeded;
        }

        // BitmapImage NewBitmapImage(
        //     Assembly a, string imageName)
        // {
        //     Stream s = a.GetManifestResourceStream(imageName);
        //     BitmapImage img = new BitmapImage();
        //     img.BeginInit();
        //     img.StreamSource = s;
        //     img.EndInit();
        //     return img;
        // }

        // private System.Windows.Media.ImageSource BmpImageSource(string embeddedPath)
        // {
        //     Stream stream = this.GetType().Assembly.GetManifestResourceStream(embeddedPath);
        //     var decoder = new BmpBitmapDecoder(stream, BitmapCreateOptions.PreservePixelFormat, BitmapCacheOption.Default);
        //     return decoder.Frames[0];
        // }


        /// <summary>
        /// This method adds ribbon buttons to the Revit UI.
        /// </summary>
        /// <param name="application">The UIControlledApplication object representing the Revit application.</param>
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

            // Create the main button.
            PushButtonData pbd = new PushButtonData("Popup", "Click Me", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.Popup");
            PushButtonData pbd1 = new PushButtonData("IFCexporter", "IFC export", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.IFCexporter");
            PushButtonData pbd2 = new PushButtonData("ParameterChange", "Parameters\raanpassen", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ParameterAanpassen");
            PushButtonData pbddp = new PushButtonData("Show/Hide", "Show/Hide selector", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ShowDockableWindow");
            RibbonPanel panel = application.CreateRibbonPanel(eTabName, "bSDD");
            PushButton pb = panel.AddItem(pbd) as PushButton;
            PushButton pb1 = panel.AddItem(pbd1) as PushButton;
            PushButton pb2 = panel.AddItem(pbd2) as PushButton;
            PushButton pbdp = panel.AddItem(pbddp) as PushButton;

            // Set button tooltips.
            pb.ToolTip = "This is a sample Revit button";
            pbdp.ToolTip = "Show/hide bSDD selection panel";

            // Set button images.
            pb.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
            pb1.ToolTip = "This is a sample Revit button";
            pb1.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
            pb2.ToolTip = "This is a sample Revit button";
            pb2.LargeImage = ResourceImage.GetIcon("bsdd-label.png");

            pbdp.ToolTip = "Show/hide bSDD selection panel";
            pbdp.LargeImage = ResourceImage.GetIcon("bsdd-label.png");
        }

        #region DockablePanel

        /// <summary>
        /// This method registers a dockable panel for the Revit project.
        /// </summary>
        /// <param name="app">The UIControlledApplication object representing the Revit application.</param>
        /// <param name="addinLocation">The location of the add-in.</param>
        private void RegisterDockPanel(UIControlledApplication app, string addinLocation)
        {
            // Create a new bSDDPanel object and link it to the main window.
            bSDDPanel MainDockableWindow = new bSDDPanel(addinLocation);
            DockablePaneProviderData data = new DockablePaneProviderData();

            // Create a new DockablePane Id.
            DockablePaneId dpid = new DockablePaneId(new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158"));

            // Register the dockable panel.
            app.RegisterDockablePane(dpid, "bSDD", MainDockableWindow as IDockablePaneProvider);
        }

        #endregion
    }
}
