using System;
using System.IO;
using System.Collections.Generic;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;


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
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                using (Transaction transaction = new Transaction(doc, "Export IFC"))
                {
                    string IFCversion = "IFC 2x3";

                    // Start the IFC-transaction
                    transaction.Start("Export IFC");

                    // Start IFC Export Options
                    IFCExportOptions exportOptions = new IFCExportOptions();

                    // IFC VERSION METHOD 1 //
                    if (IFCversion == "IFC 2x2")
                    { exportOptions.FileVersion = IFCVersion.IFC2x2; }
                    else if (IFCversion == "IFC 4")
                    { exportOptions.FileVersion = IFCVersion.IFC4; }
                    else
                    { exportOptions.FileVersion = IFCVersion.IFC2x3; }
                    // IFC VERSION METHOD 1 //

                    // IFC VERSION METHOD 2 //
                    //exportOptions.AddOption("IFCVersion", 21.ToString());

                    //IFC2x3 - Coordination View 2.0: 20
                    //IFC2x3 - 21 BASIC
                    //IFC2x3 - Coordination View 2.0 (AutoCAD): 22
                    //IFC2x3 - GSA Concept Design BIM 2010: 23
                    //IFC2x3 - Industry Foundation Classes (IFC2x3): 24
                    //IFC2x3 - Coordination View 2.0 (Nemetschek Allplan): 25
                    //IFC2x3 - Coordination View 2.0 (GRAPHISOFT ArchiCAD): 26
                    //IFC2x3 - Coordination View 2.0 (Tekla Structures): 27
                    //IFC2x3 - Structural Analysis View 2.0: 28
                    //IFC2x3 - Coordination View 2.0 (Dassault Systems CATIA): 29
                    //IFC2x3 - Reference View 2.0: 30
                    //IFC4 - Reference View 1.2 (Experimental): 31
                    //IFC4 - Addendum 2 (Experimental): 32
                    //IFC4 - Addendum 2 (Export as IFC4): 33
                    //IFC4 - Reference View 1.2 (Export as IFC4): 34
                    //IFC4 - Addendum 2 (Experimental Import): 35
                    //IFC4 - Addendum 2 (Export as IFC2x3): 36
                    //IFC4 - Addendum 2 (Reference View 1.2 Import): 37
                    //IFC4 - Addendum 2 (Reference View 1.2 Export as IFC2x3): 38
                    //IFC4 - Addendum 2 (Reference View 1.2 Export as IFC4): 39
                    //IFC4 - Design Transfer View 1.2: 40
                    //IFC4 - Reference View 1.2 (Export as IFC2x3): 41
                    //IFC4 - Reference View 1.2 (Export as IFC4): 42
                    //IFC4 - Addendum 2 (Export as IFC4): 43
                    //IFC4 - Coordination View 2.0: 44
                    //IFC4 - Reference View 1.2: 45
                    //IFC4 - Design Transfer View 1.2 (Export as IFC4): 46
                    // IFC VERSION METHOD 2 //

                    exportOptions.AddOption("ExchangeRequirement", 3.ToString());
                    exportOptions.AddOption("IFCFileType", 0.ToString());
                    //exportOptions.AddOption("ActivePhaseId", 86961.ToString());
                    exportOptions.AddOption("SpaceBoundaries", 1.ToString());
                    exportOptions.AddOption("SplitWallsAndColumns", false.ToString());
                    exportOptions.AddOption("IncludeSteelElements", false.ToString());
                    exportOptions.AddOption("Export2DElements", false.ToString());
                    exportOptions.AddOption("ExportLinkedFiles", false.ToString());
                    exportOptions.AddOption("VisibleElementsOfCurrentView", true.ToString());
                    exportOptions.AddOption("ExportRoomsInView", false.ToString());
                    exportOptions.AddOption("ExportInternalRevitPropertySets", false.ToString());
                    exportOptions.AddOption("ExportIFCCommonPropertySets", true.ToString());
                    exportOptions.AddOption("ExportBaseQuantities", true.ToString());
                    exportOptions.AddOption("ExportSchedulesAsPsets", false.ToString());
                    exportOptions.AddOption("ExportSpecificSchedules", false.ToString());


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //exportOptions.AddOption("ExportUserDefinedPsets", false.ToString());
                    //exportOptions.AddOption("ExportUserDefinedPsetsFileName", "");

                    exportOptions.AddOption("ExportInternalRevitPropertySets", true.ToString());

                    //exportOptions.AddOption("ExportUserDefinedParameterMapping", false.ToString());
                    //exportOptions.AddOption("ExportUserDefinedParameterMappingFileName", "");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    exportOptions.AddOption("TessellationLevelOfDetail", 0.5.ToString());
                    exportOptions.AddOption("ExportPartsAsBuildingElements", false.ToString());
                    exportOptions.AddOption("ExportSolidModelRep", false.ToString());
                    exportOptions.AddOption("UseActiveViewGeometry", true.ToString());
                    exportOptions.AddOption("UseFamilyAndTypeNameForReference", true.ToString());
                    exportOptions.AddOption("Use2DRoomBoundaryForVolume", false.ToString());
                    exportOptions.AddOption("IncludeSiteElevation", false.ToString());
                    exportOptions.AddOption("StoreIFCGUID", true.ToString());
                    exportOptions.AddOption("ExportBoundingBox", false.ToString());
                    exportOptions.AddOption("UseOnlyTriangulation", false.ToString());
                    exportOptions.AddOption("UseTypeNameOnlyForIfcType", true.ToString());
                    exportOptions.AddOption("UseVisibleRevitNameAsEntityName", true.ToString());
                    //exportOptions.AddOption("SelectedSite", "MF");
                    //exportOptions.AddOption("SitePlacement", 0.ToString());
                    //exportOptions.AddOption("GeoRefCRSName", "");
                    //exportOptions.AddOption("GeoRefCRSDesc", "");
                    //exportOptions.AddOption("GeoRefEPSGCode", "");
                    //exportOptions.AddOption("GeoRefGeodeticDatum", "");
                    //exportOptions.AddOption("GeoRefMapUnit", "");
                    //exportOptions.AddOption("ExcludeFilter", "");
                    //exportOptions.AddOption("COBieCompanyInfo", "");
                    //exportOptions.AddOption("COBieProjectInfo", "");
                    //exportOptions.AddOption("Name", "Setup 1");



                    //ONDERZOEK NAAR UITLEZEN VAN IFC CLASSES EN OPSLAAN IN EEN STORE/FYSIEKE FILE
                    // ALS BESTAAND PAD GEVONDEN KAN WORDEN, GEBRUIK PAD, ANDERS BOVENSTAAND TOEPASSEN
                    //  


                    // Add option with a new IFC Class System

                    using (var form = new System.Windows.Forms.Form())
                    {
                        // Create OpenFileDialog
                        OpenFileDialog openFileDialog = new OpenFileDialog();
                        openFileDialog.Filter = "Text Files (*.txt)|*.txt";
                        openFileDialog.FilterIndex = 1;
                        openFileDialog.Multiselect = false;

                        // Show OpenFileDialog and get the result
                        DialogResult result = openFileDialog.ShowDialog(form);

                        // Check if the user clicked OK in the OpenFileDialog
                        if (result == DialogResult.OK)
                        {
                            // Get the selected file path
                            string mappingFilePath = openFileDialog.FileName;

                            // Add the option for IFC Export Classes Family Mapping
                            exportOptions.AddOption("ExportLayers", mappingFilePath);
                        }
                    }



                    // Create a SaveFile Dialog to enable a location to export the IFC to
                    SaveFileDialog saveFileDialog = new SaveFileDialog();

                    // Set properties of the SaveFileDialog
                    //saveFileDialog.Filter = "IFC Files (*.ifc)|*.rvt|All Files (*.*)|*.*";
                    saveFileDialog.Filter = "IFC Files (*.ifc)|*.ifc"; 
                    saveFileDialog.FilterIndex = 1;
                    saveFileDialog.RestoreDirectory = true;

                    if (saveFileDialog.ShowDialog() == DialogResult.OK)
                    {
                        // Get the selected file path
                        string filePath = saveFileDialog.FileName;
                        string fileName = Path.GetFileName(filePath); // Get the filename
                        string directory = Path.GetDirectoryName(filePath); // Get the directory

                        // Check if the file path is not empty
                        if (!string.IsNullOrEmpty(filePath))
                        {
                            // Export the IFC file
                            doc.Export(directory, fileName, exportOptions);

                            // Commit the transaction
                            transaction.Commit();
                            TaskDialog.Show("IFC-Export", "An IFC-export was executed.");
                        }
                    }          
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
    }
}
