using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ASRR.Core.Persistence;
using System.IO;
using Newtonsoft.Json;

namespace BsddRevitPlugin.Logic.Model
{
    public static class SettingsManager
    {
        
        // bSDD plugin settings schema ID
        private static Guid s_schemaId = new Guid("DECC0D30-C1B3-441D-B847-5DB5332EE5B1");
    private const string BsddSettingsFieldName = "BsddSettings";

        /// <summary>
        /// Retrieves or creates the schema for the BSDD plugin settings.
        /// </summary>
        /// <returns>
        /// The schema for the BSDD plugin settings. If the schema does not exist, it is created.
        /// </returns>
        private static Schema GetSettingsSchema()
        {
            Schema schema = Schema.Lookup(s_schemaId);
            if (schema == null)
            {
                SchemaBuilder classificationBuilder = new SchemaBuilder(s_schemaId);
                classificationBuilder.SetSchemaName(BsddSettingsFieldName);
                classificationBuilder.AddSimpleField(BsddSettingsFieldName, typeof(string));
                schema = classificationBuilder.Finish();
            }
            return schema;
        }

        public static BsddSettings LoadDefaultSettings()
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string settingsFilePath = Path.Combine(currentPath, "UI", "Settings"); //BsddSettings.json

            JsonBasedPersistenceProvider jsonBasedPersistenceProvider = new JsonBasedPersistenceProvider(settingsFilePath);

            return jsonBasedPersistenceProvider.Fetch<BsddSettings>();
        }

        /// <summary>
        /// Retrieves a list of DataStorage objects that contain valid entities of a specified schema.
        /// </summary>
        /// <param name="document">The Revit document.</param>
        /// <param name="schema">The schema to filter the DataStorage objects.</param>
        /// <returns>A list of DataStorage objects that contain valid entities of the specified schema.</returns>
        public static IList<DataStorage> GetClassificationInStorage(Document document, Schema schema)
        {
            FilteredElementCollector collector = new FilteredElementCollector(document);
            collector.OfClass(typeof(DataStorage));
            Func<DataStorage, bool> hasTargetData = ds => ds.GetEntity(schema) != null && ds.GetEntity(schema).IsValid();
            return collector.Cast<DataStorage>().Where<DataStorage>(hasTargetData).ToList<DataStorage>();
        }

        /// <summary>
        /// Retrieves the BSDD plugin settings from the document's extensible storage.
        /// </summary>
        /// <param name="doc">The document to read the settings from.</param>
        /// <returns>The BSDD plugin settings, or null if no settings were found.</returns>
        public static BsddSettings ReadSettingsFromDataStorage(Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            Schema schema = GetSettingsSchema();

            IList<DataStorage> dataStorages = GetClassificationInStorage(doc, schema);

            if (dataStorages.Count > 0)
            {
                var dataStorage = dataStorages.First();
                var entity = dataStorage.GetEntity(schema);
                var jsonString = entity.Get<string>(schema.GetField(BsddSettingsFieldName));
                try
                {
                    return JsonConvert.DeserializeObject<BsddSettings>(jsonString);
                }
                catch (Exception ex)
                {
                    logger.Error(ex, "Error deserializing bSDD settings");
                    return null;
                }
            }

            return null;
        }
        /// <summary>
        /// Deletes the BSDD plugin settings from the document's extensible storage.
        /// </summary>
        /// <param name="doc">The document to read the settings from.</param>
        /// <returns>The BSDD plugin settings, or null if no settings were found.</returns>
        public static void DeleteSettingsFromDataStorage(Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            Schema schema = GetSettingsSchema();

            IList<DataStorage> dataStorages = GetClassificationInStorage(doc, schema);

            if (dataStorages.Count > 0)
            {
                var dataStorage = dataStorages.First();
                var entity = dataStorage.GetEntity(schema);
                try
                {
                    using (Transaction tx = new Transaction(doc))
                    {
                        tx.Start("Delete settings dataStorage");
                        dataStorage.DeleteEntity(schema);
                        tx.Commit();
                    }
                }
                catch (Exception exc)
                {
                    logger.Error(exc, "Error deleting DataStorage");
                    throw;
                }
            }

        }

        /// <summary>
        /// Saves the specified settings to the global settings variable.
        /// </summary>
        /// <param name="settings">The settings to be saved.</param>
        public static void SaveSettingsToGlobalVariable(BsddSettings settings)
        {
            GlobalBsddSettings.bsddsettings = settings;
        }

        /// <summary>
        /// Saves the settings to the Revit document's extensible storage.
        /// </summary>
        /// <param name="doc">The Revit document.</param>
        /// <param name="settings">The settings to be saved.</param>
        public static void SaveSettingsToDataStorage(Document doc, BsddSettings settings)
        {
            if (settings == null)
            {
                throw new ArgumentNullException(nameof(settings));
            }

            Logger logger = LogManager.GetCurrentClassLogger();
            Schema schema = GetSettingsSchema();
            IList<DataStorage> dataStorages = GetClassificationInStorage(doc, schema);

            DataStorage dataStorage = dataStorages.FirstOrDefault();
            if (dataStorage == null)
            {
                try
                {
                    using (Transaction tx = new Transaction(doc))
                    {
                        tx.Start("Create new settings in DataStorage");

                        dataStorage = DataStorage.Create(doc);

                        tx.Commit();
                    }
                }
                catch (Exception e)
                {
                    logger.Error(e);
                }
            }

            Entity entity = new Entity(schema);
            
            var settingsJson = JsonConvert.SerializeObject(settings);
            entity.Set<string>(BsddSettingsFieldName, settingsJson);

            try
            {
                using (Transaction tx = new Transaction(doc))
                {
                    tx.Start("Update settings in DataStorage");
                    dataStorage.SetEntity(entity);
                    tx.Commit();
                }
            }
            catch (Exception exc)
            {
                logger.Error(exc, "Error updating DataStorage");
                throw;
            }
        }

        /// <summary>
        /// Applies the settings to global parameters and document's extensible storage.
        /// </summary>
        /// <param name="doc">The Revit document.</param>
        public static BsddSettings ApplySettingsToGlobalParametersAndDataStorage(Document doc)
        {
            BsddSettings settings = ReadSettingsFromDataStorage(doc);
            if (settings == null)
            {
                settings = LoadDefaultSettings();
            }
            SaveSettingsToGlobalVariable(settings);
            SaveSettingsToDataStorage(doc, settings);
            return settings;

        }
        public static void SaveSettingsToGlobalParametersAndDataStorage(Document doc, BsddSettings bsddSettings)
        {
            if (bsddSettings == null)
            {
                bsddSettings = LoadDefaultSettings();
            }
            SaveSettingsToGlobalVariable(bsddSettings);
            SaveSettingsToDataStorage(doc, bsddSettings);

        }
    }
    
}
