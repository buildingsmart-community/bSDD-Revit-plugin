using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ASRR.Core.Persistence;
using System.IO;

namespace BsddRevitPlugin.Logic.Model
{
    public static class SettingsManager
    {

        // Settings schema
        private static Guid s_schemaId = new Guid("D5CF8E88-86CF-421A-9FAD-202D1A278D4C");
        private static Schema GetSettingsSchema()
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
        public static void ApplySettingsToGlobalParametersAndDataStorage(Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();

            //Get settings schema
            Schema schema = GetSettingsSchema();

            //Check if settings are allready in DataStorage
            IList<DataStorage> dataStorages = GetClassificationInStorage(doc, schema);

            if (dataStorages.Count == 0)
            {
                //Read json settings and parse to BsddSettings class
                string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                string settingsFilePath = currentPath + "\\UI\\Settings"; //BsddSettings.json

                JsonBasedPersistenceProvider jsonBasedPersistenceProvider = new JsonBasedPersistenceProvider(settingsFilePath);
                GlobalBsddSettings.bsddsettings = jsonBasedPersistenceProvider.Fetch<BsddSettings>();

                //Create new DataStorage
                try
                {
                    using (Transaction tx = new Transaction(doc))
                    {
                        tx.Start("Update dataStorage");

                        DataStorage dataStorage = DataStorage.Create(doc);
                        Entity entity = new Entity(schema);
                        entity.Set<string>(schema.GetField("BsddSettings"), Newtonsoft.Json.JsonConvert.SerializeObject(GlobalBsddSettings.bsddsettings));
                        dataStorage.SetEntity(entity);

                        tx.Commit();
                    }
                }
                catch (Exception exc)
                {
                    logger.Error(exc, "Error creating DataStorage");
                    throw;
                }

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
}
