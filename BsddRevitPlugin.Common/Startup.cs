using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Events;
using BIM.IFC.Export.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using BsddRevitPlugin.Resources;
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Runtime;
using System.Threading;
using System.Windows.Controls;
using System.Windows.Threading;

namespace BsddRevitPlugin.Common
{
    /// <summary>
    /// This class is responsible for starting up the Revit plugin.
    /// </summary>
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Startup : IExternalApplication
    {
        EventUseLastSelection eventUseLastSelection;
        ExternalEvent SelectEULS;


        private UIControlledApplication _application;
        private IBrowserService _selectionBrowserService;
        private BsddSelection MainDockableWindow;

        public Startup(UIControlledApplication application, IBrowserServiceFactory browserServiceFactory)
        {
            GlobalBrowserServiceFactory.Factory = browserServiceFactory;

            _application = application;
            _selectionBrowserService = browserServiceFactory.CreateBrowserService();
            GlobalBrowserService.publicSelectionBrowserService = _selectionBrowserService;
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
        /// The binding to the Export IFC command in Revit.
        /// </summary>
        private AddInCommandBinding m_ifcCommandBinding;
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

            // Subscribe to the DocumentChanged event
            _application.ControlledApplication.DocumentChanged += Application_DocumentChanged;

            // Subscribe to the ViewActivated event
            _application.ViewActivated += Application_ViewActivated;


            // Register Dockable panel for Revit project when it is opened.
            RegisterDockPanel(application);

            // Add ribbon buttons to the UI.
            AddRibbonButtons(application);
#if DEBUG 
            // Open logs.
            Main.Instance.OpenLogs();
#endif

            return Result.Succeeded;
        }

        // Event handler for DocumentOpened event
        private void Application_DocumentOpened(object sender, Autodesk.Revit.DB.Events.DocumentOpenedEventArgs e)

        {
            //Create an Instance of the IFC Export Manager
            IfcExportManager ifcexportManager = new IfcExportManager();

            //Get the bsdd confguration from document or create a new one
            IFCExportConfiguration bsddIFCExportConfiguration = ifcexportManager.GetOrSetBsddConfiguration(e.Document);

            RefreshSettingsAndSelection(e.Document);
        }

        private void Application_DocumentCreated(object sender, Autodesk.Revit.DB.Events.DocumentCreatedEventArgs e)

        {
            //Create an Instance of the IFC Export Manager
            IfcExportManager ifcexportManager = new IfcExportManager();

            //Get the bsdd confguration from document or create a new one
            IFCExportConfiguration bsddIFCExportConfiguration = ifcexportManager.GetOrSetBsddConfiguration(e.Document);

            RefreshSettingsAndSelection(e.Document);
        }


        // Event handler for DocumentCevent
        private void Application_DocumentChanged(object sender, Autodesk.Revit.DB.Events.DocumentChangedEventArgs e)

        {
            RefreshSettingsAndSelection(e.GetDocument());
        }

        private void Application_ViewActivated(object sender, ViewActivatedEventArgs e)
        {
            string oldview = "";
            string newview = "";
            if (e.PreviousActiveView != null)
            {
                try
                {
                    oldview = e.PreviousActiveView.Document.PathName;

                }
                catch (Exception)
                {

                }
            }
            try
            {
                newview = e.CurrentActiveView.Document.PathName;

            }
            catch (Exception)
            {

            }

            // Check if the document of the new active view is different from the current document
            if (oldview != newview)
            {
                RefreshSettingsAndSelection(e.CurrentActiveView.Document);
            }
        }
        private void RefreshSettingsAndSelection(Document doc)
        {
            //Allways set current document
            GlobalDocument.currentDocument = doc;

            //Set settings to global parameters and data storage, trigger UI update
            var settings = BsddRevitPlugin.Logic.Model.SettingsManager.ApplySettingsToGlobalParametersAndDataStorage(doc);
            MainDockableWindow.UpdateSettings(settings);

            // Initialize the event
            eventUseLastSelection = new EventUseLastSelection();

            // Give current browser to event
            eventUseLastSelection.SetBrowser(_selectionBrowserService);

            // Initialize external events
            SelectEULS = ExternalEvent.Create(eventUseLastSelection);

            // Update the selection UI with the last selection
            SelectEULS.Raise();


            List<ElementType> types = new List<ElementType>();
            try
            {
                types.AddRange(GlobalSelection.LastSelectedElementsWithDocs[doc.PathName]);
            }
            catch (System.Exception)
            {

            }
            // Pack data into json format
            List<IfcEntity> selectionData = BsddRevitPlugin.Logic.Model.ElementsManager.SelectionToIfcJson(doc, types);

            // Send MainData to BsddSelection html
            eventUseLastSelection.UpdateBsddSelection(selectionData);



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
            MainDockableWindow = new BsddSelection(_selectionBrowserService);
            DockablePaneProviderData data = new DockablePaneProviderData();
            // Create a new DockablePane Id.
            DockablePaneId dpid = new DockablePaneId(new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158"));

            // Register the dockable panel.
            app.RegisterDockablePane(dpid, "bSDD", MainDockableWindow as IDockablePaneProvider);
        }

        #endregion
    }
}
