using ASRR.Core.Persistence;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Events;
using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Events;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Resources;
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;

namespace BsddRevitPlugin.Common
{
    /// <summary>
    /// This class is responsible for starting up the Revit plugin.
    /// </summary>
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Startup : IExternalApplication
    {
        private UIControlledApplication _application;
        private IBrowserService _selectionBrowserService;

        public Startup(UIControlledApplication application, IBrowserServiceFactory browserServiceFactory)
        {
            GlobalBrowserServiceFactory.Factory = browserServiceFactory;

            _application = application;
            _selectionBrowserService = browserServiceFactory.CreateBrowserService();
        }

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

            // Subscribe to the DocumentCreated event
            _application.ControlledApplication.DocumentCreated += Application_DocumentCreated;

            // Subscribe to the DocumentOpened event
            _application.ControlledApplication.DocumentOpened += Application_DocumentOpened;




            // Register Dockable panel for Revit project when it is opened.
            RegisterDockPanel(application);

            // Add ribbon buttons to the UI.
            AddRibbonButtons(application);

            // Open logs.
            Main.Instance.OpenLogs();


            return Result.Succeeded;
        }



        // Event handler for DocumentOpened event
        private void Application_DocumentOpened(object sender, Autodesk.Revit.DB.Events.DocumentOpenedEventArgs e)

        {
            //BsddRevitPlugin.Logic.Model.SettingsManager.DeleteSettingsFromDataStorage(e.Document);
            BsddRevitPlugin.Logic.Model.SettingsManager.ApplySettingsToGlobalParametersAndDataStorage(e.Document);
        }


        private void Application_DocumentCreated(object sender, Autodesk.Revit.DB.Events.DocumentCreatedEventArgs e)

        {

            //BsddRevitPlugin.Logic.Model.SettingsManager.DeleteSettingsFromDataStorage(e.Document);
            BsddRevitPlugin.Logic.Model.SettingsManager.ApplySettingsToGlobalParametersAndDataStorage(e.Document);
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

            RibbonPanel panel = application.CreateRibbonPanel(eTabName, "bSDD");

            // Create IFC export button.
            PushButtonData ifcExportButtonData = new PushButtonData("IFCexporter", "IFC export", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.IFCexporter");
            PushButton ifcExportButton = panel.AddItem(ifcExportButtonData) as PushButton;
            ifcExportButton.ToolTip = "Export to IFC using bSDD settings";
            ifcExportButton.LargeImage = ResourceImage.GetIcon("IfcExport.ico");

            // Create selection panel toggle button.
            PushButtonData selectionPanelButtonData = new PushButtonData("Show/Hide", "bSDD selection", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ShowDockableWindow");
            PushButton selectionPanelButton = panel.AddItem(selectionPanelButtonData) as PushButton;
            selectionPanelButton.ToolTip = "Show/hide bSDD selection panel";
            selectionPanelButton.LargeImage = ResourceImage.GetIcon("BsddLabel.ico");

            #if DEBUG
            // Create parameter change button.
            PushButtonData tempTestButtonData = new PushButtonData("TestButton", "Test-\rknop", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.TempTestButton");
            PushButton tempTestButton = panel.AddItem(tempTestButtonData) as PushButton;
            tempTestButton.ToolTip = "This is a sample Revit button";
            tempTestButton.LargeImage = ResourceImage.GetIcon("BsddLabel.ico");
            #endif

        }

        #region DockablePanel

        /// <summary>
        /// This method registers a dockable panel for the Revit project.
        /// </summary>
        /// <param name="app">The UIControlledApplication object representing the Revit application.</param>
        private void RegisterDockPanel(UIControlledApplication app)
        {
            // Create a new BsddSelection object and link it to the main window.
            BsddSelection MainDockableWindow = new BsddSelection(_selectionBrowserService);
            DockablePaneProviderData data = new DockablePaneProviderData();

            // Create a new DockablePane Id.
            DockablePaneId dpid = new DockablePaneId(new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158"));

            // Register the dockable panel.
            app.RegisterDockablePane(dpid, "bSDD", MainDockableWindow as IDockablePaneProvider);
        }

        #endregion
    }
}
