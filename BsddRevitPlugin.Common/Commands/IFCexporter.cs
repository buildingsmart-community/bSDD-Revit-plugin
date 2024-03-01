using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB.IFC;
using Autodesk.Revit.UI;
using BIM.IFC.Export.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using NLog;
using Revit.IFC.Common.Enums;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;
using System.Windows.Controls;
using System.Windows.Forms;
using OpenFileDialog = System.Windows.Forms.OpenFileDialog;
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
                Document doc = uiDoc.Document;
                ElementId activeViewId = uiDoc.ActiveView.Id;

                using (Transaction transaction = new Transaction(doc, "Export IFC"))
                {


                    //Create an Instance of the IFC Export Class
                    IFCExportOptions IFCExportOptions = new IFCExportOptions();

                    //Get the bsdd confguration from document or create a new one
                    IFCExportConfiguration bsddIFCExportConfiguration = GetOrSetBsddConfiguration(doc);

                    //Define the of a 3d view to export
                    ElementId ExportViewId = null;

                    //Pass the setting of the myIFCExportConfiguration to the IFCExportOptions
                    bsddIFCExportConfiguration.UpdateOptions(IFCExportOptions, activeViewId);


                    //AddSavedConfigurations(doc);
                    //IFCExportConfigurationsMap configurationsMap = new IFCExportConfigurationsMap();
                    //configurationsMap.AddBuiltInConfigurations();
                    //configurationsMap.AddSavedConfigurations();
                    //configurationsMap.AddOrReplace(myIFCExportConfiguration);
                    //configurationsMap.UpdateSavedConfigurations(configurationsMap);

                    //UpdateSavedConfigurations(doc, configurationsMap);


                    //Schema schema = GetExportSchema();
                    //var savedConfigurations = GetSavedConfigurations(doc, schema);

                    //foreach (var storedSetup in savedConfigurations)
                    //{
                    //    try
                    //    {
                    //        Entity configEntity = storedSetup.GetEntity(schema);
                    //        string configData = configEntity.Get<string>(s_configMapField);

                    //    }
                    //    catch (Exception e)
                    //    {
                    //        logger.Info(e);
                    //    }
                    //}
                    //myIFCExportConfiguration.Name = "Test";
                    //myIFCExportConfiguration.ActiveViewId = activeViewId.IntegerValue;
                    //myIFCExportConfiguration.ExportUserDefinedPsets = true;
                    //myIFCExportConfiguration.VisibleElementsOfCurrentView = true;


                    //AddOrReplace(myIFCExportConfiguration);
                    //UpdateSavedConfigurations(doc, new IFCExportConfigurationsMap());


                    //IFCExportConfigurationsMap test = new IFCExportConfigurationsMap();
                    //test.UpdateSavedConfigurations();

                    //IFCExportConfigurationsMap.UpdateSavedConfigurations();

                    //IFCExportConfigurationsMap.GetSavedConfigurations(schema);

                    //Set IfcClassifications in the project according to the main- and filterdictionaries
                    IfcClassificationManager.UpdateClassifications(new Transaction(doc, "Update Classifications"), doc, IfcClassificationManager.GetAllIfcClassificationsInProject());

                    //Set IFC version
                    string IFCversion = "IFC 2x3";

                    //// HIERONDER DE LINK NAAR DE PARAMETER MAPPING FILE en de EXPORTLAYERS UIT HET BESTAND
                    string fpParameterMapping = null;
                    string fpExportLayers = null;
                    //// HIERONDER DE LINK NAAR DE PARAMETER MAPPING FILE en de EXPORTLAYERS UIT HET BESTAND





                    //Maak string van alle parameters beginnend met bsdd voor de Export User Defined Propertysets
                    // Create a string to hold all parameters starting with bsdd for the Export User Defined Propertysets
                    string add_BSDD_UDPS = null;

                    // Create a list to hold all BSDD parameters
                    IList<Parameter> param = new List<Parameter>();

                    // Get all BSDD parameters from the document
                    param = GetAllBsddParameters(doc);

                    // Organize the BSDD parameters by property set name
                    var organizedParameters = RearrageParamatersForEachPropertySet(param);

                    // Loop through all property sets
                    foreach (var parameters in organizedParameters)
                    {
                        //Start with 1 epmty line
                        add_BSDD_UDPS += System.Environment.NewLine + "#" + System.Environment.NewLine + "#";

                        // Format:
                        // #
                        // #
                        // PropertySet:	<Pset Name>	I[nstance]/T[ype]	<element list separated by ','>
                        // #
                        // <Property Name 1>	<Data type>	<[opt] Revit parameter name, if different from IFC>
                        // <Property Name 2>	<Data type>	<[opt] Revit parameter name, if different from IFC>
                        // ...
                        // Add the initial format for the property set to the string
                        add_BSDD_UDPS += System.Environment.NewLine + $"PropertySet:\t{parameters.Key}\tT\tIfcElementType";
                        add_BSDD_UDPS += System.Environment.NewLine + "#" + System.Environment.NewLine + "#\tThis propertyset has been generated by the BSDD Revit plugin" + System.Environment.NewLine + "#" + System.Environment.NewLine;

                        // Loop through all parameters
                        foreach (Parameter p in parameters.Value)
                        {
                            string parameterName = p.Definition.Name.ToString();

                            // Split the definition name by '/'
                            string[] parts = parameterName.Split('/');

                            // Check if there are at least 3 parts
                            if (parts.Length >= 4)
                            {
                                // Get the property set name
                                add_BSDD_UDPS += "\t" + parts[3] + "\t";
                            }
                            else
                            {
                                // Get the property set name
                                add_BSDD_UDPS += "\t" + parameterName + "\t";
                            }


                            //datatypes convert 
                            //C# byte, sbyte, short, ushort, int, uint, long, ulong, float, double, decimal, char, bool, object, string, DataTime
                            //Ifc Area, Boolean, ClassificationReference, ColorTemperature, Count, Currency, 
                            //ElectricalCurrent, ElectricalEfficacy, ElectricalVoltage, Force, Frequency, Identifier, 
                            //Illuminance, Integer, Label, Length, Logical, LuminousFlux, LuminousIntensity, 
                            //NormalisedRatio, PlaneAngle, PositiveLength, PositivePlaneAngle, PositiveRatio, Power, 
                            //Pressure, Ratio, Real, Text, ThermalTransmittance, ThermodynamicTemperature, Volume, 
                            //VolumetricFlowRate

                            // Convert the parameter data type to the corresponding IFC data type and add it to the string
                            if (p.StorageType.ToString() == "String")
                            {
                                add_BSDD_UDPS += "Text";
                            }
                            else if (p.StorageType.ToString() == "Double")
                            {
                                add_BSDD_UDPS += "Real";
                            }
                            else
                            {
                                add_BSDD_UDPS += p.StorageType.ToString();
                            }


                            // Add the parameter name to the string
                            add_BSDD_UDPS += "\t" + parameterName;

                            // Add a new line to the string
                            add_BSDD_UDPS += System.Environment.NewLine;

                        }
                        // Create a string of all parameters starting with bsdd for the Export User Defined Propertysets
                    }

                    // Start the IFC-transaction
                    transaction.Start("Export IFC");

                    //Create a new temp file for the user defined parameter mapping file
                    string randomFileName = System.IO.Path.GetRandomFileName();
                    string tempFilePath = System.IO.Path.Combine(System.IO.Path.GetTempPath(), randomFileName.Remove(randomFileName.Length - 4) + ".txt");

                    #region Try to get in-session: did not work

                    // Get the active IFC export configuration
                    IFCExportConfiguration activeConfiguration = IFCExportConfiguration.GetInSession();
                    IFCExportConfigurationsMap iFCExportConfigurationsMap = new IFCExportConfigurationsMap();

                    //var conf = iFCExportConfigurationsMap.AddBuiltInConfigurations();

                    IFCExportConfiguration inSessionConfiguration = new IFCExportConfiguration
                    {

                    };

                    // Create a new IFC export options object
                    IFCExportOptions exportOpt = new IFCExportOptions();

                    // Set the options based on the active configuration
                    exportOpt.FileVersion = activeConfiguration.IFCVersion;
                    exportOpt.SpaceBoundaryLevel = activeConfiguration.SpaceBoundaries;
                    exportOpt.ExportBaseQuantities = activeConfiguration.ExportBaseQuantities;
                    exportOpt.WallAndColumnSplitting = activeConfiguration.SplitWallsAndColumns;
                    exportOpt.AddOption("VisibleElementsOfCurrentView", activeConfiguration.VisibleElementsOfCurrentView.ToString());
                    exportOpt.AddOption("Use2DRoomBoundaryForVolume", activeConfiguration.Use2DRoomBoundaryForVolume.ToString());
                    exportOpt.AddOption("UseFamilyAndTypeNameForReference", activeConfiguration.UseFamilyAndTypeNameForReference.ToString());
                    exportOpt.AddOption("ExportInternalRevitPropertySets", activeConfiguration.ExportInternalRevitPropertySets.ToString());
                    exportOpt.AddOption("ExportIFCCommonPropertySets", activeConfiguration.ExportIFCCommonPropertySets.ToString());
                    exportOpt.AddOption("Export2DElements", activeConfiguration.Export2DElements.ToString());
                    exportOpt.AddOption("ExportPartsAsBuildingElements", activeConfiguration.ExportPartsAsBuildingElements.ToString());
                    exportOpt.AddOption("UseActiveViewGeometry", activeConfiguration.UseActiveViewGeometry.ToString());
                    exportOpt.AddOption("ExportSpecificSchedules", activeConfiguration.ExportSpecificSchedules.ToString());
                    exportOpt.AddOption("IncludeSiteElevation", activeConfiguration.IncludeSiteElevation.ToString());
                    exportOpt.AddOption("UseOnlyTriangulation", activeConfiguration.UseOnlyTriangulation.ToString());
                    exportOpt.AddOption("ExportBoundingBox", activeConfiguration.ExportBoundingBox.ToString());
                    exportOpt.AddOption("ExportSolidModelRep", activeConfiguration.ExportSolidModelRep.ToString());
                    exportOpt.AddOption("ExportSchedulesAsPsets", activeConfiguration.ExportSchedulesAsPsets.ToString());
                    exportOpt.AddOption("ExportUserDefinedPsetsFileName", activeConfiguration.ExportUserDefinedPsetsFileName.ToString());
                    exportOpt.AddOption("ExportLinkedFiles", activeConfiguration.ExportLinkedFiles.ToString());
                    exportOpt.AddOption("IncludeSteelElements", activeConfiguration.IncludeSteelElements.ToString());
                    exportOpt.AddOption("StoreIFCGUID", true.ToString());
                    exportOpt.FilterViewId = new ElementId(activeConfiguration.ActiveViewId);

                    if (param.Count > 0)
                    {
                        exportOpt.AddOption("ExportUserDefinedPsets", true.ToString());
                        exportOpt.AddOption("ExportUserDefinedParameterMappingFileName", tempFilePath);

                    }
                    else
                    {
                        exportOpt.AddOption("ExportUserDefinedPsets", activeConfiguration.ExportUserDefinedPsets.ToString());

                    }

                    logger.Info($"exportOptions {exportOpt.FileVersion}");
                    logger.Info($"exportOptions ExportBaseQuantities {exportOpt.ExportBaseQuantities}");

                    #endregion
                    #region exportOptions hardcoded
                    // Start IFC Export Options (when
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
                    exportOptions.AddOption("ExportUserDefinedPsets", true.ToString());
                    exportOptions.AddOption("ExportUserDefinedPsetsFileName", tempFilePath);
                    exportOptions.AddOption("ExportInternalRevitPropertySets", false.ToString());
                    exportOptions.AddOption("ExportUserDefinedParameterMapping", true.ToString());
                    exportOptions.AddOption("ExportUserDefinedParameterMappingFileName", tempFilePath);
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
                    exportOptions.FilterViewId = activeViewId;
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

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //exportOptions.AddOption("ExportUserDefinedPsets", false.ToString());
                    //exportOptions.AddOption("ExportUserDefinedPsetsFileName", "");

                    exportOptions.AddOption("ExportInternalRevitPropertySets", false.ToString());
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    #endregion


                    // Get the selected file path
                    string mappingParameterFilePath = activeConfiguration.ExportUserDefinedPsetsFileName;

                    //Copy user defined parameter mapping file to temp file
                    if (File.Exists(mappingParameterFilePath))
                    {
                        File.Copy(mappingParameterFilePath, tempFilePath, true);
                    }


                    using (StreamWriter writer = new StreamWriter(tempFilePath, true))
                    {
                        writer.WriteLine(add_BSDD_UDPS);
                    }


                    ////using (var formP = new System.Windows.Forms.Form())
                    ////{
                    ////    //Create OpenFileDialog
                    ////    TaskDialog.Show("Pick ParameterMapping File", "Pick a file for Parameter Mapping");
                    ////    OpenFileDialog openFileDialog = new OpenFileDialog();
                    ////    openFileDialog.Filter = "Text Files (*.txt)|*.txt";
                    ////    openFileDialog.FilterIndex = 1;
                    ////    openFileDialog.Multiselect = false;

                    ////    // Show OpenFileDialog and get the result
                    ////    DialogResult resultP = openFileDialog.ShowDialog(formP);

                    ////    // Check if the user clicked OK in the OpenFileDialog
                    ////    if (resultP == DialogResult.OK)
                    ////    {
                    ////        // Get the selected file path
                    ////        string mappingParameterFilePath = openFileDialog.FileName;

                    ////        //// NIEUW

                    ////        if (File.Exists(mappingParameterFilePath))
                    ////        {
                    ////            File.Copy(mappingParameterFilePath, tempFilePath, true);
                    ////        }


                    ////        //// NIEUW
                    ////        //        // Add the option for IFC Export Classes Family Mapping
                    ////        //        exportOptions.AddOption("ExportUserDefinedParameterMapping", true.ToString());
                    ////        //        exportOptions.AddOption("ExportUserDefinedParameterMappingFileName", mappingParameterFilePath);
                    ////    }
                    ////    using (StreamWriter writer = new StreamWriter(tempFilePath, true))
                    ////    {
                    ////        writer.WriteLine(add_BSDD_UDPS);
                    ////    }
                    ////}




                    // Add option with a new IFC Class System

                    using (var form = new System.Windows.Forms.Form())
                    {
                        // Create OpenFileDialog
                        TaskDialog.Show("Export Layers", "Pick a file for Export Layers");
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


                    TaskDialog.Show("IFC-Export", "Save IFC As");
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
                            doc.Export(directory, fileName, exportOpt);

                            // Commit the transaction
                            transaction.Commit();
                            TaskDialog.Show("IFC-Export", "An IFC-export was executed.");
                        }
                    }


                    System.IO.File.Delete(tempFilePath);
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

        public IList<Parameter> GetAllBsddParameters(Autodesk.Revit.DB.Document doc)
        {
            // Apply the filter to the elements in the active document
            FilteredElementCollector collector = new FilteredElementCollector(doc);
            collector.WhereElementIsElementType();
            ICollection<Element> allElements = collector.ToElements();

            IList<Parameter> param = new List<Parameter>();

            foreach (Element e in allElements)
            {
                ParameterSet pSet = e.Parameters;
                bool exist;

                foreach (Parameter p in pSet)
                {
                    if (p.Definition.Name.StartsWith("bsdd/prop/"))
                    {
                        exist = false;
                        foreach (Parameter pm in param)
                        {
                            if (pm.Definition.Name == p.Definition.Name && pm.StorageType == p.StorageType)
                            {
                                exist = true;
                            }
                        }

                        if (exist == false)
                        {
                            param.Add(p);
                        }
                    }
                }
            }

            //param = param.Distinct().ToList();

            return param;
        }
        public Dictionary<string, IList<Parameter>> RearrageParamatersForEachPropertySet(IList<Parameter> parameters)
        {
            // Create a dictionary to hold the parameters grouped by property set name
            Dictionary<string, IList<Parameter>> propertySetGroups = new Dictionary<string, IList<Parameter>>();

            // Loop through all parameters
            foreach (Parameter p in parameters)
            {
                // Split the definition name by '/'
                string[] parts = p.Definition.Name.Split('/');

                // Check if there are at least 3 parts
                if (parts.Length >= 3)
                {
                    // Get the property set name
                    string propertySetName = parts[2];

                    // Check if the property set name is already in the dictionary
                    if (!propertySetGroups.ContainsKey(propertySetName))
                    {
                        // If not, add it with a new list
                        propertySetGroups[propertySetName] = new List<Parameter>();
                    }

                    // Add the parameter to the list for this property set name
                    propertySetGroups[propertySetName].Add(p);
                }
            }

            return propertySetGroups;
        }

        // bSDD plugin settings schema ID
        private Schema m_jsonSchema = null;
        private static Guid s_jsonSchemaId = new Guid("c2a3e6fe-ce51-4f35-8ff1-20c34567b687");
        private const string ifcExportFieldName = "IFCExportConfigurationMap";
        private const string s_configMapField = "MapField";
        private const string bsddExportConfigurationName = "Bsdd export settings";

        private Dictionary<String, IFCExportConfiguration> m_configurations = new Dictionary<String, IFCExportConfiguration>();
        /// <summary>
        /// Retrieves or creates the schema for the BSDD plugin settings.
        /// </summary>
        /// <returns>
        /// The schema for the BSDD plugin settings. If the schema does not exist, it is created.
        /// </returns>
        private static Schema GetExportSchema()
        {
            Schema schema = Schema.Lookup(s_jsonSchemaId);
            if (schema == null)
            {
                SchemaBuilder schemaBuilder = new SchemaBuilder(s_jsonSchemaId);
                schemaBuilder.SetSchemaName(ifcExportFieldName);
                schemaBuilder.AddSimpleField(s_configMapField, typeof(string));
                schema = schemaBuilder.Finish();
            }
            return schema;
        }
        public IFCExportConfiguration GetOrSetBsddConfiguration(Document doc)
        {
            IList<DataStorage> savedConfigurations = GetSavedConfigurations(doc, m_jsonSchema);

            if (savedConfigurations.Count > 0)
            {
                foreach (var configurationData in savedConfigurations)
                {

                    Entity configEntity = configurationData.GetEntity(m_jsonSchema);
                    string configData = configEntity.Get<string>(s_configMapField);

                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    ser.RegisterConverters(new JavaScriptConverter[] { new IFCExportConfigurationConverter() });
                    IFCExportConfiguration configuration = ser.Deserialize<IFCExportConfiguration>(configData);

                    if (configuration.Name == bsddExportConfigurationName)
                    {
                        return configuration;
                    }
                }

                return CreateNewBsddConfigurationInDataStorage(doc);

            }
            return CreateNewBsddConfigurationInDataStorage(doc);

        }
        public IFCExportConfiguration CreateNewBsddConfigurationInDataStorage(Autodesk.Revit.DB.Document document)
        {
            IFCExportConfiguration configuration = GetDefaultExportConfiguration(document);

            //Add to DataStorage
            DataStorage configStorage;
            configStorage = DataStorage.Create(document);
            Entity mapEntity = new Entity(m_jsonSchema);
            string configData = configuration.SerializeConfigToJson();
            mapEntity.Set<string>(s_configMapField, configData);
            configStorage.SetEntity(mapEntity);

            return configuration;
        }
        public static IFCExportConfiguration GetDefaultExportConfiguration(Autodesk.Revit.DB.Document document) {

            //Create an instance of the IFC Export Configuration Class
            IFCExportConfiguration configuration = IFCExportConfiguration.CreateDefaultConfiguration();

            //Apply the IFC Export Setting (Those are equivalent to the Export Setting in the IFC Export User Interface)
            //General
            configuration.IFCVersion = IFCVersion.IFC2x3;
            configuration.ExchangeRequirement = 0;
            configuration.IFCFileType = 0;
            configuration.ActivePhaseId = 0;
            configuration.SpaceBoundaries = 0;
            configuration.SplitWallsAndColumns = false;

            //Additional Content
            configuration.ExportLinkedFiles = false;
            configuration.VisibleElementsOfCurrentView = true;
            configuration.ActiveViewId = document.ActiveView.Id.IntegerValue;
            configuration.ExportRoomsInView = false;
            configuration.IncludeSteelElements = true;
            configuration.Export2DElements = false;

            //Property Sets
            configuration.ExportInternalRevitPropertySets = false;
            configuration.ExportIFCCommonPropertySets = true;
            configuration.ExportBaseQuantities = true;
            //configuration material prop sets
            configuration.ExportSchedulesAsPsets = false;
            configuration.ExportSpecificSchedules = false;
            configuration.ExportUserDefinedPsets = false;
            configuration.ExportUserDefinedPsetsFileName = "";
            configuration.ExportUserDefinedParameterMapping = false;
            configuration.ExportUserDefinedParameterMappingFileName = "";

            //Level of Detail
            configuration.TessellationLevelOfDetail = 0.5;

            //Advanced
            configuration.ExportPartsAsBuildingElements = false;
            configuration.ExportSolidModelRep = false;
            configuration.UseActiveViewGeometry = false;
            configuration.UseFamilyAndTypeNameForReference = false;
            configuration.Use2DRoomBoundaryForVolume = false;
            configuration.IncludeSiteElevation = false;
            configuration.StoreIFCGUID = true;
            configuration.ExportBoundingBox = false;
            configuration.UseOnlyTriangulation = false;
            configuration.UseTypeNameOnlyForIfcType = false;
            configuration.UseVisibleRevitNameAsEntityName = false;

            //Geographic Reference

            return configuration; 
        
        }
        public static IList<DataStorage> GetSavedConfigurations(Document document, Schema schema)
        {
            FilteredElementCollector collector = new FilteredElementCollector(document);
            collector.OfClass(typeof(DataStorage));
            Func<DataStorage, bool> hasTargetData = ds => (ds.GetEntity(schema) != null && ds.GetEntity(schema).IsValid());

            return collector.Cast<DataStorage>().Where<DataStorage>(hasTargetData).ToList<DataStorage>();
        }
        public void UpdateSavedConfigurations(Document doc , IFCExportConfigurationsMap initialConfigs)
        {
            // update the configurations to new map schema.
            if (m_jsonSchema == null)
            {
                m_jsonSchema = Schema.Lookup(s_jsonSchemaId);
            }

            // Are there any setups to save or resave?
            List<IFCExportConfiguration> setupsToSave = new List<IFCExportConfiguration>();
            foreach (IFCExportConfiguration configuration in m_configurations.Values)
            {
                // Store in-session settings in the cached in-session configuration
                if (configuration.IsInSession)
                {
                    IFCExportConfiguration.SetInSession(configuration);
                    continue;
                }

                // Only add to setupsToSave if it is a new or changed configuration
                if (initialConfigs.HasName(configuration.Name))
                {
                    if (!ConfigurationComparer.ConfigurationsAreEqual(initialConfigs[configuration.Name], configuration))
                        setupsToSave.Add(configuration);
                    else if (!configuration.IsBuiltIn)
                        setupsToSave.Add(configuration);
                }
                else
                    setupsToSave.Add(configuration);
            }

            // If there are no setups to save, and if the schema is not present (which means there are no
            // previously existing setups which might have been deleted) we can skip the rest of this method.
            if (setupsToSave.Count <= 0 && m_jsonSchema == null)
                return;

            if (m_jsonSchema == null)
            {
                SchemaBuilder builder = new SchemaBuilder(s_jsonSchemaId);
                builder.SetSchemaName("IFCExportConfigurationMap");
                builder.AddSimpleField(s_configMapField, typeof(String));
                m_jsonSchema = builder.Finish();
            }

            // It won't start any transaction if there is no change to the configurations
            if (setupsToSave.Count > 0)
            {
                // Overwrite all saved configs with the new list
                Transaction transaction = new Transaction(doc, "Update export settings");
                try
                {
                    transaction.Start(BIM.IFC.Export.UI.Properties.Resources.SaveConfigurationChanges);
                    IList<DataStorage> savedConfigurations = GetSavedConfigurations(doc, m_jsonSchema);
                    int savedConfigurationCount = savedConfigurations.Count<DataStorage>();
                    int savedConfigurationIndex = 0;
                    foreach (IFCExportConfiguration configuration in setupsToSave)
                    {
                        DataStorage configStorage;
                        if (savedConfigurationIndex >= savedConfigurationCount)
                        {
                            configStorage = DataStorage.Create(IFCCommandOverrideApplication.TheDocument);
                        }
                        else
                        {
                            configStorage = savedConfigurations[savedConfigurationIndex];
                            savedConfigurationIndex++;
                        }

                        Entity mapEntity = new Entity(m_jsonSchema);
                        string configData = configuration.SerializeConfigToJson();
                        mapEntity.Set<string>(s_configMapField, configData);
                        configStorage.SetEntity(mapEntity);
                    }

                    List<ElementId> elementsToDelete = new List<ElementId>();
                    for (; savedConfigurationIndex < savedConfigurationCount; savedConfigurationIndex++)
                    {
                        DataStorage configStorage = savedConfigurations[savedConfigurationIndex];
                        elementsToDelete.Add(configStorage.Id);
                    }
                    if (elementsToDelete.Count > 0)
                        IFCCommandOverrideApplication.TheDocument.Delete(elementsToDelete);

                    transaction.Commit();
                }
                catch (System.Exception)
                {
                    if (transaction.HasStarted())
                        transaction.RollBack();
                }
            }
        }
        /// <summary>
        /// Adds a configuration to the map.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public void AddOrReplace(IFCExportConfiguration configuration)
        {
            if (m_configurations.ContainsKey(configuration.Name))
            {
                if (m_configurations[configuration.Name].IsBuiltIn)
                    m_configurations[configuration.Name].UpdateBuiltInConfiguration(configuration);
                else
                    m_configurations[configuration.Name] = configuration;
            }
            else
            {
                m_configurations.Add(configuration.Name, configuration);
            }
        }
        public void AddSavedConfigurations(Document document)
        {
            try
            {
                // In this latest schema, the entire configuration for one config is stored as a json string in the entirety
                if (m_jsonSchema == null)
                {
                    m_jsonSchema = Schema.Lookup(s_jsonSchemaId);
                    if (m_jsonSchema != null)
                    {
                        foreach (DataStorage storedSetup in GetSavedConfigurations(document, m_jsonSchema))
                        {
                            try
                            {
                                Entity configEntity = storedSetup.GetEntity(m_jsonSchema);
                                string configData = configEntity.Get<string>(s_configMapField);

                                JavaScriptSerializer ser = new JavaScriptSerializer();
                                ser.RegisterConverters(new JavaScriptConverter[] { new IFCExportConfigurationConverter() });
                                IFCExportConfiguration configuration = ser.Deserialize<IFCExportConfiguration>(configData);
                                AddOrReplace(configuration);
                            }
                            catch (Exception)
                            {
                                // don't skip all configurations if an exception occurs for one
                            }
                        }
                    }
                }

                // Add the last selected configurations if any
                if (IFCExport.LastSelectedConfig != null && IFCExport.LastSelectedConfig.Count > 0)
                {
                    foreach (KeyValuePair<string, IFCExportConfiguration> lastSelConfig in IFCExport.LastSelectedConfig)
                    {
                        AddOrReplace(lastSelConfig.Value);
                    }
                }
            }
            catch (System.Exception)
            {
                // to avoid fail to show the dialog if any exception throws in reading schema.
            }
        }



    }
}










