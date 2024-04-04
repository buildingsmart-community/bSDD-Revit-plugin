using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.IfcJson;
using System;
using System.Collections.Generic;
using System.Linq;
using BsddRevitPlugin.Logic.UI.BsddBridge;

namespace BsddRevitPlugin.Logic.Model
{
    public class IfcClassificationManager
    {

        // Classification schema ID used by Revit to store IFC classification information
        private static Guid classificationSchemaId = new Guid("ca32408a-9370-4ea2-82f7-95a7d66e7198");

        private const string classificationName = "ClassificationName";
        private const string classificationSource = "ClassificationSource";
        private const string classificationEdition = "ClassificationEdition";
        private const string classificationEditionDate_Day = "ClassificationEditionDate_Day";
        private const string classificationEditionDate_Month = "ClassificationEditionDate_Month";
        private const string classificationEditionDate_Year = "ClassificationEditionDate_Year";
        private const string classificationLocation = "ClassificationLocation";

        /// <summary>
        /// Represents a schema for IFC classification data in Revit.
        /// </summary>
        /// <returns>The Revit IFC classification schema.</returns>
        private static Schema GetRevitClassificationSchema()
        {
            Schema existingSchema = Schema.Lookup(classificationSchemaId);
            if (existingSchema == null)
            {
                SchemaBuilder schemaBuilder = new SchemaBuilder(classificationSchemaId);
                schemaBuilder.SetSchemaName("IfcClassification");

                schemaBuilder.AddSimpleField(classificationName, typeof(string));
                schemaBuilder.AddSimpleField(classificationSource, typeof(string));
                schemaBuilder.AddSimpleField(classificationEdition, typeof(string));
                schemaBuilder.AddSimpleField(classificationEditionDate_Day, typeof(Int32));
                schemaBuilder.AddSimpleField(classificationEditionDate_Month, typeof(Int32));
                schemaBuilder.AddSimpleField(classificationEditionDate_Year, typeof(Int32));
                schemaBuilder.AddSimpleField(classificationLocation, typeof(string));

                existingSchema = schemaBuilder.Finish();
            }
            return existingSchema;
        }

        /// <summary>
        /// Get IFC Classifications Information from the Extensible Storage in Revit document.
        /// </summary>
        /// <param name="document">The document storing the Classification.</param>
        /// <param name="schema">The schema for storing Classification.</param>
        /// <returns>Returns list of IFC Classification in the storage.</returns>
        private static IList<DataStorage> GetClassificationsInStorage(Document document, Schema schema)
        {
            FilteredElementCollector collector = new FilteredElementCollector(document);
            collector.OfClass(typeof(DataStorage));
            Func<DataStorage, bool> hasTargetData = ds => ds.GetEntity(schema) != null && ds.GetEntity(schema).IsValid();

            return collector.Cast<DataStorage>().Where<DataStorage>(hasTargetData).ToList<DataStorage>();
        }

        /// <summary>
        /// Updates the IFC Classifications in the document.
        /// </summary>
        /// <param name="transaction">The active transaction used to save the classifications.</param>
        /// <param name="document">The document storing the saved Classification.</param>
        /// <param name="classifications">The set of Classification items to save.</param>
        public static void UpdateClassifications(Transaction transaction, Document document, HashSet<IfcClassification> classifications)
        {
            Schema schema = GetRevitClassificationSchema();
            if (schema != null)
            {
                IList<DataStorage> existingClassifications = GetClassificationsInStorage(document, schema);

                foreach (IfcClassification classification in classifications)
                {
                    string location = classification.Location.ToString();

                    Entity classificationEntity = new Entity(schema);
                    classificationEntity.Set<string>(classificationName, classification.Name);
                    classificationEntity.Set<string>(classificationSource, classification.Source); // location is a workaround for IFC2x3, should be classification.Source
                    classificationEntity.Set<string>(classificationEdition, classification.Edition);
                    if (classification.EditionDate != null)
                    {
                        classificationEntity.Set<Int32>(classificationEditionDate_Day, classification.EditionDate.Day);
                        classificationEntity.Set<Int32>(classificationEditionDate_Month, classification.EditionDate.Month);
                        classificationEntity.Set<Int32>(classificationEditionDate_Year, classification.EditionDate.Year);
                    }
                    classificationEntity.Set<string>(classificationLocation, location);

                    DataStorage existingClassification = existingClassifications.FirstOrDefault(c => GetLocationFromEntity(c, schema) == location);

                    if (existingClassification != null)
                    {
                        transaction.Start("Update IFC Classification DataStorage");
                        existingClassification.SetEntity(classificationEntity);
                        transaction.Commit();
                    }
                    else
                    {
                        // Create a new classification if one with the same location does not already exist
                        if (!existingClassifications.Any(c => GetLocationFromEntity(c, schema) == location))
                        {
                            transaction.Start("Create IFC Classification DataStorage");
                            DataStorage newClassification = DataStorage.Create(document);
                            newClassification.SetEntity(classificationEntity);
                            transaction.Commit();
                        }
                    }
                }
            }
        }

        private static string GetLocationFromEntity(DataStorage dataStorage, Schema schema)
        {
            return dataStorage.GetEntity(schema).Get<string>(schema.GetField(classificationLocation));
        }

        public static HashSet<IfcClassification> GetAllIfcClassificationsInProject()
        {
       
            // Create a classification set in which every dictionary will be collected
            HashSet<IfcClassification> dictionaryCollection = new HashSet<IfcClassification>
                    {
                        GlobalBsddSettings.bsddsettings.MainDictionary.IfcClassification
                    };
            foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
            {
                dictionaryCollection.Add(filterDictionary.IfcClassification);
            }

            return dictionaryCollection;
        }
       
    }
}
