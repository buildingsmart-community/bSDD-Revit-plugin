using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BIM.IFC.Export.UI;
using BsddRevitPlugin.Logic.IfcExport;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.Translations;
using NLog;
using Revit.IFC.Common.Extensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Document = Autodesk.Revit.DB.Document;
using SaveFileDialog = System.Windows.Forms.SaveFileDialog;


namespace BsddRevitPlugin.Common.Commands
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class IFCexporter : IExternalCommand
    {
        public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document document = uiDoc.Document;
                ElementId activeViewId = uiDoc.ActiveView.Id;

                IIfcExportService ifcExportService = GlobalServiceFactory.Factory.CreateIfcExportService();

                //Create an Instance of the IFC Export Class
                IFCExportOptions ifcExportOptions = new IFCExportOptions();

                //Get the bsdd confguration from document or create a new one
                IFCExportConfiguration bsddIFCExportConfiguration = ifcExportService.GetOrSetBsddConfiguration(document);

                //Somehow UpdateOptions() can't handle the activeViewId, so we set it manually to -1
                bsddIFCExportConfiguration.ActivePhaseId = -1;

                // Create an instance of the IFCCommandOverrideApplication class
                IFCCommandOverrideApplication ifcCommandOverrideApplication = new IFCCommandOverrideApplication();

                ////Trying to fix phases
                ////Also check https://forums.autodesk.com/t5/revit-api-forum/ifc-export-options/td-p/9686404
                //// Create an instance of CommandEvent
                //CommandEventArgs commandEvent = null;
                //// Call the OnIFCExport methods
                //ifcCommandOverrideApplication.OnIFCExport(uiApp, commandEvent);

                using (Transaction transaction = new Transaction(document, "bSDD IFC export"))
                {
                    List<IFCClassification> bsddClassifications = IfcClassificationManager.GetAllIfcClassificationsInProject();
                    List<IFCClassification> storedClassifications = IfcClassificationManager.GetStoredClassifications(document);

                    // Only restore the first item in the list, like revit-ifc does
                    storedClassifications = storedClassifications.Any() ? new List<IFCClassification> { storedClassifications[0] } : new List<IFCClassification>();

                    // Store temporary bSDD Classifications
                    IfcClassificationManager.UpdateClassifications(new Transaction(document, "Store temporary bSDD Classifications"), document, bsddClassifications, IfcClassificationManager.getBsddClassificationParameterMap());

                    IFCExport(document, ifcExportOptions, bsddIFCExportConfiguration, activeViewId, ifcExportService);

                    // Restore saved Classifications
                    IfcClassificationManager.UpdateClassifications(new Transaction(document, "Restore saved Classifications"), document, storedClassifications);
                }
                return Result.Succeeded;
            }
            catch (Exception ex)
            {
                TaskDialog.Show("Error", "An error occurred: " + ex.Message);
                message = ex.Message;
                return Result.Failed;
            }
        }

        /// <summary>
        /// Exports the document to an IFC file using the specified IFC export options, BSDD IFC export configuration and active view.
        /// </summary>
        /// <param name="document">The document to export.</param>
        /// <param name="ifcExportOptions">The IFC export options.</param>
        /// <param name="bsddIFCExportConfiguration">The BSDD IFC export configuration.</param>
        /// <param name="activeViewId">The ID of the active view.</param>
        /// <param name="ifcExportService">The IFC export service.</param>
        private void IFCExport(Document document, IFCExportOptions ifcExportOptions, IFCExportConfiguration bsddIFCExportConfiguration, ElementId activeViewId, IIfcExportService ifcExportService)
        {
            // Start the IFC-transaction
            Transaction transaction = new Transaction(document, "Export IFC");
            transaction.Start();

            // Add bSDD properties to user defined properties parameter mapping table
            string activeParameterFilePath = bsddIFCExportConfiguration.ExportUserDefinedPsetsFileName;
            string combinedParameterFilePath = ifcExportService.GetBsddPropertiesAsParameterfile(document, activeParameterFilePath);
            bsddIFCExportConfiguration.ExportUserDefinedPsets = true;
            bsddIFCExportConfiguration.ExportUserDefinedPsetsFileName = combinedParameterFilePath;

            //Set the ExportIFCCommonPropertySets to false, so it doesn't interfere with the user defined IFC property sets added by the BSDD plugin
            HandleIFCCommonPropertySets(bsddIFCExportConfiguration);

            //Pass the setting of the myIFCExportConfiguration to the IFCExportOptions
            bsddIFCExportConfiguration.UpdateOptions(ifcExportOptions, activeViewId);

            // Create a SaveFile Dialog to enable a location to export the IFC to
            SaveFileDialog saveFileDialog = new SaveFileDialog
            {
                // Set properties of the SaveFileDialog
                //saveFileDialog.Filter = "IFC Files (*.ifc)|*.rvt|All Files (*.*)|*.*";
                Filter = "IFC Files (*.ifc)|*.ifc",
                FilterIndex = 1,
                RestoreDirectory = true
            };

            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                // Get the selected file path
                string ifcFilePath = saveFileDialog.FileName;
                string ifcFileName = Path.GetFileName(ifcFilePath);
                string directory = Path.GetDirectoryName(ifcFilePath);

                // Check if the file path is not empty
                if (!string.IsNullOrEmpty(ifcFilePath))
                {
                    WriteAndPostProcessIFC(document, ifcExportOptions, ifcFilePath, ifcFileName, transaction);
                }
            }
        }

        /// <summary>
        /// Writes and post-processes an IFC file.
        /// Post-processing includes improving bSDD classifications in the IFC file.
        /// </summary>
        /// <param name="document">The Revit document to export.</param>
        /// <param name="ifcExportOptions">The IFC export options.</param>
        /// <param name="ifcFilePath">The path of the IFC file to export.</param>
        /// <param name="ifcFileName">The name of the IFC file to export.</param>
        /// <param name="transaction">The transaction to use for exporting.</param>
        private void WriteAndPostProcessIFC(Document document, IFCExportOptions ifcExportOptions, string ifcFilePath, string ifcFileName, Transaction transaction)
        {
            try
            {
                string tempDirectoryPath = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                Directory.CreateDirectory(tempDirectoryPath);
                if (!Directory.Exists(tempDirectoryPath))
                {
                    throw new Exception("Failed to create temporary directory.");
                }

                string tempIfcFilePath = Path.Combine(tempDirectoryPath, Path.GetFileName(ifcFilePath));

                IfcPostprocessor postprocessor = new IfcPostprocessor();
                postprocessor.CollectIfcClassifications(document);

                document.Export(tempDirectoryPath, ifcFileName, ifcExportOptions);
                if (!File.Exists(tempIfcFilePath))
                {
                    throw new Exception("Failed to export document.");
                }
                transaction.Commit();

                postprocessor.PostProcess(tempIfcFilePath, ifcFilePath);

                Directory.Delete(tempDirectoryPath, true);

            }
            catch (Exception ex)
            {
                TaskDialog.Show("Error", "An error occurred in writing and postprocessing IFC: " + ex.Message);
                throw;
            }
        }

        /// <summary>
        /// Warns the user against adding IFC common property sets to the IFC export configuration.
        /// Because it might interfere with the IFC property sets added by the bSDD plugin.
        /// </summary>
        /// <param name="bsddIFCExportConfiguration">The IFC export configuration.</param>
        private void HandleIFCCommonPropertySets(IFCExportConfiguration bsddIFCExportConfiguration)
        {

            LanguageConverter languageConverter = new LanguageConverter();
            string currentLanguage = GlobalBsddSettings.bsddsettings.Language;

            if (!bsddIFCExportConfiguration.ExportIFCCommonPropertySets)
            {
                return;
            }

            TaskDialog dialog = new TaskDialog(languageConverter.Translate("IFCExport_TaskDialogName", currentLanguage))
            {
                MainInstruction = languageConverter.Translate("IFCExport_TaskDialogMessage", currentLanguage),
                CommonButtons = TaskDialogCommonButtons.Yes | TaskDialogCommonButtons.No
            };

            if (dialog.Show() == TaskDialogResult.Yes)
            {
                bsddIFCExportConfiguration.ExportIFCCommonPropertySets = false;
            }
        }
    }
}