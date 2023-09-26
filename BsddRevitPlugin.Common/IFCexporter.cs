using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using ComboBox = System.Windows.Forms.ComboBox;
using Form = System.Windows.Forms.Form;
using TextBox = System.Windows.Forms.TextBox;
using System;
using System.IO;
using System.Reflection;
using System.Text;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace IFCexporter
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Command : IExternalCommand
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


                using (FolderBrowserDialog folderDialog = new FolderBrowserDialog())
                using (Transaction transaction = new Transaction(doc, "Export IFC with Namespace"))
                {
                    folderDialog.Description = "Select a folder for exporting files.";
                    if (folderDialog.ShowDialog() == DialogResult.OK)
                    {
                        string selectedFolderPath = folderDialog.SelectedPath;
                        //TaskDialog.Show("Selected Folder Path", $"You selected the following folder path:\n{selectedFolderPath}");

                        List<string> predefinedValues = new List<string>
                        {
                            "IFC 2x2",
                            "IFC 2x3",
                            "IFC 4"
                        };

                        // Show a form with a dropdown list
                        using (var form = new Form())
                        {
                            form.Text = "Select Folder and Value";
                            form.Size = new System.Drawing.Size(300, 150);

                            // Folder path label
                            var folderLabel = new Label
                            {
                                Text = "Selected Folder Path:",
                                Location = new System.Drawing.Point(10, 10)
                            };
                            form.Controls.Add(folderLabel);

                            // Folder path text box
                            var folderTextBox = new TextBox
                            {
                                Location = new System.Drawing.Point(10, 30),
                                Size = new System.Drawing.Size(250, 20),
                                ReadOnly = true
                            };
                            form.Controls.Add(folderTextBox);

                            // Dropdown list
                            var ifcValueBox = new ComboBox
                            {
                                Location = new System.Drawing.Point(10, 60),
                                Size = new System.Drawing.Size(250, 21),
                                DropDownStyle = ComboBoxStyle.DropDownList
                            };
                            ifcValueBox.Items.AddRange(predefinedValues.ToArray());
                            form.Controls.Add(ifcValueBox);

                            // OK button
                            var exportButton = new Button
                            {
                                Text = "Export",
                                Location = new System.Drawing.Point(10, 100),
                                DialogResult = DialogResult.OK
                            };
                            form.Controls.Add(exportButton);

                            // Show the form and handle user interaction
                            if (form.ShowDialog() == DialogResult.OK)
                            {
                                string IFCversion = ifcValueBox.SelectedItem.ToString();
                                TaskDialog.Show("Result", $"Selected Folder: {selectedFolderPath}\nSelected Value: {IFCversion}");




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



                                // Export the IFC file
                                doc.Export(selectedFolderPath, "Exported with Namespace", exportOptions);

                                // Commit the transaction
                                transaction.Commit();
                                TaskDialog.Show("IFC-Export", "An IFC-export was executed.");
                            }
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










namespace IFCexporter
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Main : IExternalCommand
    {
        public Result Execute(
          ExternalCommandData commandData,
          ref string message,
          ElementSet elements)
        {
            UIApplication uiApp = commandData.Application;
            UIDocument uiDoc = uiApp.ActiveUIDocument;
            Document doc = uiDoc.Document;


            // Transaction to export IFC
            using (Transaction transaction = new Transaction(doc))
            {
                transaction.Start("Export IFC");

                try
                {
                    // Set IFC export options based on loaded settings
                    IFCExportOptions exportOptions = new IFCExportOptions();

                    // Set other options here as needed
                    exportOptions.AddOption("IFCVersion", 21.ToString());
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

                    exportOptions.AddOption("ExportUserDefinedPsets", false.ToString());
                    exportOptions.AddOption("ExportUserDefinedPsetsFileName", "");

                    exportOptions.AddOption("ExportUserDefinedParameterMapping", false.ToString());
                    exportOptions.AddOption("ExportUserDefinedParameterMappingFileName", "");

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

                    // Specify the IFC file path
                    string ifcFilePath = "C:/Users/caoe/OneDrive - Heijmans N.V/Bureaublad/";

                    // Export the IFC file
                    doc.Export(ifcFilePath, "Test1.ifc", exportOptions);
                    transaction.Commit();

                    TaskDialog.Show("IFC-Export", "An IFC-export was executed.");
                }
                catch (Exception ex)
                {
                    TaskDialog.Show("Error", "An error occurred: " + ex.Message);
                    transaction.RollBack();
                    return Result.Failed;
                }
            }

            return Result.Succeeded;
        }

    }

}
