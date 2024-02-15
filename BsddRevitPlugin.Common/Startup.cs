using ASRR.Core.Persistence;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Events;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Resources;
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

            application.ViewActivated
              += new EventHandler<ViewActivatedEventArgs>(
                OnViewActivated);






            // Register Dockable panel for Revit project when it is opened.
            RegisterDockPanel(application);

            // Add ribbon buttons to the UI.
            AddRibbonButtons(application);

            // Open logs.
            Main.Instance.OpenLogs();


            return Result.Succeeded;
        }


        void OnViewActivated(
          object sender,
          ViewActivatedEventArgs e)
        {
            Autodesk.Revit.DB.View vPrevious = e.PreviousActiveView;
            Autodesk.Revit.DB.View vCurrent = e.CurrentActiveView;
            if (vPrevious.Document.PathName != vCurrent.Document.PathName)
            {
                // TODO: if there are extended datastorage settings, set them to the Global Settings


                // TODO: if statement: if settings are in extended datastorage, use those. Else make new ones.
                Schema schema = GetSchema();

                IList<DataStorage> dataStorages = GetClassificationInStorage(vCurrent.Document, schema);

                if (dataStorages.Count == 0)
                {
                    //Read json settings and parse to BsddSettings class
                    string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                    string settingsFilePath = currentPath + "\\UI\\Settings"; //BsddSettings.json

                    JsonBasedPersistenceProvider jsonBasedPersistenceProvider = new JsonBasedPersistenceProvider(settingsFilePath);
                    GlobalBsddSettings.bsddsettings = jsonBasedPersistenceProvider.Fetch<BsddSettings>();

                    //Create new DataStorage
                    DataStorage dataStorage = DataStorage.Create(vCurrent.Document);
                    Entity entity = new Entity(schema);
                    entity.Set<string>(schema.GetField("BsddSettings"), Newtonsoft.Json.JsonConvert.SerializeObject(GlobalBsddSettings.bsddsettings));
                    dataStorage.SetEntity(entity);
                }
                else
                {
                    var dataStorage = dataStorages.First();

                    var entity = dataStorage.GetEntity(schema);
                    var jsonstring = entity.Get<string>(schema.GetField("BsddSettings"));
                    GlobalBsddSettings.bsddsettings = Newtonsoft.Json.JsonConvert.DeserializeObject<BsddSettings>(jsonstring);

                }

            }

        }

        // Settings schema
        private static Guid s_schemaId = new Guid("D5CF8E88-86CF-421A-9FAD-202D1A278D4C");
        private static Schema GetSchema()
        {
            Schema schema = Schema.Lookup(s_schemaId);
            if (schema == null)
            {
                SchemaBuilder classificationBuilder = new SchemaBuilder(s_schemaId);
                classificationBuilder.SetSchemaName("BsddSettings");
                classificationBuilder.AddSimpleField("BsddSettings", typeof(string));
                schema = classificationBuilder.Finish();
            }
            return schema;
        }
        private static IList<DataStorage> GetClassificationInStorage(Document document, Schema schema)
        {
            FilteredElementCollector collector = new FilteredElementCollector(document);
            collector.OfClass(typeof(DataStorage));
            Func<DataStorage, bool> hasTargetData = ds => (ds.GetEntity(schema) != null && ds.GetEntity(schema).IsValid());

            return collector.Cast<DataStorage>().Where<DataStorage>(hasTargetData).ToList<DataStorage>();
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

            // Create parameter change button.
            PushButtonData parameterChangeButtonData = new PushButtonData("ParameterChange", "Parameters\raanpassen", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ParameterAanpassen");
            PushButton parameterChangeButton = panel.AddItem(parameterChangeButtonData) as PushButton;
            parameterChangeButton.ToolTip = "This is a sample Revit button";
            parameterChangeButton.LargeImage = ResourceImage.GetIcon("BsddLabel.ico");


            // Create parameter change button.
            PushButtonData parameterAddButtonData = new PushButtonData("ParamAdd", "Parameters\rtoevoegen", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ParameterCheck");
            PushButton parameterAddButton = panel.AddItem(parameterAddButtonData) as PushButton;
            parameterAddButton.ToolTip = "This is a sample Revit button";
            parameterAddButton.LargeImage = ResourceImage.GetIcon("BsddLabel.ico");

            // Create selection panel toggle button.
            PushButtonData selectionPanelButtonData = new PushButtonData("Show/Hide", "bSDD selection", executingAssemblyPath, "BsddRevitPlugin.Common.Commands.ShowDockableWindow");
            PushButton selectionPanelButton = panel.AddItem(selectionPanelButtonData) as PushButton;
            selectionPanelButton.ToolTip = "Show/hide bSDD selection panel";
            selectionPanelButton.LargeImage = ResourceImage.GetIcon("BsddLabel.ico");
        }

        #region DockablePanel

        /// <summary>
        /// This method registers a dockable panel for the Revit project.
        /// </summary>
        /// <param name="app">The UIControlledApplication object representing the Revit application.</param>
        private void RegisterDockPanel(UIControlledApplication app)
        {
            // Create a new BsddSelection object and link it to the main window.
            BsddSelection MainDockableWindow = new BsddSelection();
            DockablePaneProviderData data = new DockablePaneProviderData();

            // Create a new DockablePane Id.
            DockablePaneId dpid = new DockablePaneId(new Guid("D7C963CE-B3CA-426A-8D51-6E8254D21158"));

            // Register the dockable panel.
            app.RegisterDockablePane(dpid, "bSDD", MainDockableWindow as IDockablePaneProvider);
        }

        #endregion
    }
}
