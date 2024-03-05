using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BIM.IFC.Export.UI;
using System.Web.Script.Serialization;

namespace BsddRevitPlugin.Logic.Model
{
    public class IfcExportManager
    {

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
        private Schema m_jsonSchema = GetExportSchema();
        private static Guid s_jsonSchemaId = new Guid("c2a3e6fe-ce51-4f35-8ff1-20c34567b687");
        private const string ifcExportFieldName = "IFCExportConfigurationMap";
        private const string s_configMapField = "MapField";
        private const string bsddExportConfigurationName = "Bsdd export settings";

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

            using (Transaction transaction = new Transaction(document, "Create DataStorage"))
            {
                transaction.Start();

                DataStorage configStorage;
                configStorage = DataStorage.Create(document);
                Entity mapEntity = new Entity(m_jsonSchema);
                string configData = configuration.SerializeConfigToJson();
                mapEntity.Set<string>(s_configMapField, configData);
                configStorage.SetEntity(mapEntity);

                transaction.Commit();
            }
            return configuration;
        }
        public static IFCExportConfiguration GetDefaultExportConfiguration(Autodesk.Revit.DB.Document document)
        {

            //Create an instance of the IFC Export Configuration Class
            IFCExportConfiguration configuration = IFCExportConfiguration.CreateDefaultConfiguration();

            configuration.Name = bsddExportConfigurationName;

            //Apply the IFC Export Setting (Those are equivalent to the Export Setting in the IFC Export User Interface)
            //General
            configuration.IFCVersion = IFCVersion.IFC2x3CV2;
            configuration.ExchangeRequirement = 0;
            configuration.IFCFileType = 0;
            configuration.SpaceBoundaries = 0;
            configuration.SplitWallsAndColumns = false;

            //Additional Content
            //Should check if this works
#if REVIT_2023
            configuration.ExportLinkedFiles = false;
            configuration.ActiveViewId = document.ActiveView.Id.IntegerValue;
            configuration.ActivePhaseId = -1; //This errors (not found)
#elif REVIT_2024
            configuration.ExportLinkedFiles = LinkedFileExportAs.DontExport;
            configuration.ActiveViewId = document.ActiveView.Id;
            configuration.ActivePhaseId = -1; //This errors (not found)
#else
            // Default option
#endif
            configuration.VisibleElementsOfCurrentView = true;
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
        public static IList<DataStorage> GetSavedConfigurations(Autodesk.Revit.DB.Document document, Schema schema)
        {
            FilteredElementCollector collector = new FilteredElementCollector(document);
            collector.OfClass(typeof(DataStorage));
            Func<DataStorage, bool> hasTargetData = ds => (ds.GetEntity(schema) != null && ds.GetEntity(schema).IsValid());

            return collector.Cast<DataStorage>().Where<DataStorage>(hasTargetData).ToList<DataStorage>();
        }
    }
}
