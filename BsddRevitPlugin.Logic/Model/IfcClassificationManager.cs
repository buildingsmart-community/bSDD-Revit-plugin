using Autodesk.Revit.DB.ExtensibleStorage;
using Autodesk.Revit.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using Revit.IFC.Common.Extensions;
using BsddRevitPlugin.Logic.IfcJson;

namespace BsddRevitPlugin.Logic.Model
{
    public class IfcClassificationManager
    {

        // Classification schema ID used by Revit to store IFC classification information
        //private static Guid classificationSchemaId = new Guid("ca32408a-9370-4ea2-82f7-95a7d66e7198");
        private static Guid classificationSchemaId = new Guid("9A5A28C2-DDAC-4828-8B8A-3EE97118017A");

        private const string classificationName = "ClassificationName";
        private const string classificationSource = "ClassificationSource";
        private const string classificationEdition = "ClassificationEdition";
        private const string classificationEditionDate_Day = "ClassificationEditionDate_Day";
        private const string classificationEditionDate_Month = "ClassificationEditionDate_Month";
        private const string classificationEditionDate_Year = "ClassificationEditionDate_Year";
        private const string classificationLocation = "ClassificationLocation";
        // Not in v1.
        private const string classificationFieldName = "ClassificationFieldName";

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
                schemaBuilder.AddSimpleField(classificationFieldName, typeof(string));

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
        public static void UpdateClassifications(Transaction transaction, Document document, List<IFCClassification> classifications, bool bsddExport, Dictionary<string, string> bsddClassificationMappings = null)
        {
            Schema schema = GetRevitClassificationSchema();
            if (schema != null)
            {
                List<string> newClassificationLocations = new List<string>(classifications.Where(c => c.ClassificationLocation != null).Select(c => c.ClassificationLocation));
                IList<IFCClassification> storedClassifications = GetStoredClassifications(document).ToList();
                List<string> updatedClassificationLocations = new List<string>();

                // Create or update classifications
                foreach (IFCClassification classification in classifications)
                {
                    string location = classification.ClassificationLocation;
                    IFCClassification storedClassification = storedClassifications.FirstOrDefault(c => c.ClassificationLocation == location);

                    if (storedClassification == null)
                    {
                        // Create new classification
                        transaction.Start("Create IFC Classification in DataStorage");
                        string classificationParameter = null;
                        if (bsddClassificationMappings != null && bsddClassificationMappings.ContainsKey(classification.ClassificationLocation))
                        {
                            classificationParameter = bsddClassificationMappings[classification.ClassificationLocation];
                        }
                        Entity classificationEntity = ConvertToRevitSchemaIfcClassification(schema, classification, bsddExport, classificationParameter);
                        DataStorage newClassification = DataStorage.Create(document);
                        newClassification.SetEntity(classificationEntity);
                        transaction.Commit();
                        updatedClassificationLocations.Add(location);
                    }
                    else
                    {
                        // Update existing classification
                        DataStorage existingClassificationDataStorage = GetClassificationDataStorage(document, storedClassification);
                        IFCClassification existingClassificationAsIfc = ConvertFromRevitSchemaIfcClassification(existingClassificationDataStorage, schema);

                        if (!classification.IsUnchanged(existingClassificationAsIfc))
                        {
                            transaction.Start("Update IFC Classification in DataStorage");
                            Entity classificationEntity = ConvertToRevitSchemaIfcClassification(schema, classification, bsddExport);
                            existingClassificationDataStorage.SetEntity(classificationEntity);
                            transaction.Commit();
                        }
                        updatedClassificationLocations.Add(location);
                    }
                }

                // Refresh stored classifications
                storedClassifications = GetStoredClassifications(document).ToList();

                // Remove classifications that are not in the new set and have not been updated
                foreach (IFCClassification storedClassification in storedClassifications)
                {
                    string location = storedClassification.ClassificationLocation;
                    if (!newClassificationLocations.Contains(location) && !updatedClassificationLocations.Contains(location))
                    {
                        transaction.Start("Delete IFC Classification from DataStorage");
                        DataStorage existingClassificationDataStorage = GetClassificationDataStorage(document, storedClassification);
                        document.Delete(existingClassificationDataStorage.Id);
                        transaction.Commit();
                    }
                }
            }
        }

        public static List<IFCClassification> GetStoredClassifications(Document document)
        {
            Schema schema = GetRevitClassificationSchema();
            if (schema != null)
            {
                IList<DataStorage> existingClassifications = GetClassificationsInStorage(document, schema);
                List<IFCClassification> classifications = new List<IFCClassification>();

                foreach (DataStorage existingClassification in existingClassifications)
                {
                    IFCClassification classification = ConvertFromRevitSchemaIfcClassification(existingClassification, schema);
                    classifications.Add(classification);
                }

                return classifications;
            }

            return null;
        }

        private static string GetLocationFromEntity(DataStorage dataStorage, Schema schema)
        {
            return dataStorage.GetEntity(schema).Get<string>(schema.GetField(classificationLocation));
        }

        public static List<IFCClassification> GetAllIfcClassificationsInProject()
        {
            // Create a classification set in which every dictionary will be collected
            List<IFCClassification> dictionaryCollection = new List<IFCClassification>();

            // Convert main dictionary to Revit IFCClassification and add to collection
            IfcClassification mainClassification = GlobalBsddSettings.bsddsettings.MainDictionary.IfcClassification;
            dictionaryCollection.Add(ConvertToRevitIfcClassification(mainClassification));

            // Convert each filter dictionary to Revit IFCClassification and add to collection
            foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
            {
                IfcClassification filterClassification = filterDictionary.IfcClassification;
                dictionaryCollection.Add(ConvertToRevitIfcClassification(filterClassification));
            }

            return dictionaryCollection;
        }

        public static Dictionary<string, BsddDictionary> getAllDictionariesInProject()
        {
            Dictionary<string, BsddDictionary> dictionaryCollection = new Dictionary<string, BsddDictionary>();

            // Convert main dictionary to Revit IFCClassification and add to collection
            BsddDictionary mainDictionary = GlobalBsddSettings.bsddsettings.MainDictionary;
            dictionaryCollection.Add(mainDictionary.IfcClassification.Location.ToString(), mainDictionary);

            // Convert each filter dictionary to Revit IFCClassification and add to collection
            foreach (var filterDictionary in GlobalBsddSettings.bsddsettings.FilterDictionaries)
            {
                dictionaryCollection.Add(filterDictionary.IfcClassification.Location.ToString(), filterDictionary);
            }

            return dictionaryCollection;
        }

        public static Dictionary<string, string> getBsddClassificationParameterMap()
        {
            Dictionary<string, string> bsddClassificationParameterMap = new Dictionary<string, string>();

            Dictionary<string, BsddDictionary> allDictionaries = getAllDictionariesInProject();

            foreach (var dictionaryEntry in allDictionaries)
            {
                string classificationMapping = dictionaryEntry.Value.ParameterMapping;
                if (!string.IsNullOrEmpty(classificationMapping))
                {
                    bsddClassificationParameterMap.Add(dictionaryEntry.Key, classificationMapping);
                }
            }

            return bsddClassificationParameterMap;
        }

        private static DataStorage GetClassificationDataStorage(Document document, IFCClassification classification)
        {
            Schema schema = GetRevitClassificationSchema();
            IList<DataStorage> existingClassifications = GetClassificationsInStorage(document, schema);
            string location = classification.ClassificationLocation;
            return existingClassifications.FirstOrDefault(c => GetLocationFromEntity(c, schema) == location);
        }

        private static IFCClassification ConvertToRevitIfcClassification(IfcJson.IfcClassification ifcJsonClassification)
        {
            return new IFCClassification
            {
                ClassificationName = ifcJsonClassification.Name,
                ClassificationSource = ifcJsonClassification.Source,
                ClassificationEdition = ifcJsonClassification.Edition,
                ClassificationEditionDate = ifcJsonClassification.EditionDate,
                ClassificationLocation = ifcJsonClassification.Location.ToString()
            };
        }

        public static List<IFCClassification> ConvertToRevitIfcClassifications(List<IfcJson.IfcClassification> ifcJsonClassifications)
        {
            List<IFCClassification> revitIfcClassifications = new List<IFCClassification>();
            foreach (IfcJson.IfcClassification ifcJsonClassification in ifcJsonClassifications)
            {
                revitIfcClassifications.Add(ConvertToRevitIfcClassification(ifcJsonClassification));
            }
            return revitIfcClassifications;
        }   

        private static IfcClassification ConvertFromRevitIfcClassification(IFCClassification revitIfcClassification)
        {
            Uri locationUri;
            bool success = Uri.TryCreate(revitIfcClassification.ClassificationLocation, UriKind.Absolute, out locationUri);
            if (!success)
            {
                locationUri = null;
            }
            return new IfcClassification
            {
                Name = revitIfcClassification.ClassificationName,
                Source = revitIfcClassification.ClassificationSource,
                Edition = revitIfcClassification.ClassificationEdition,
                EditionDate = revitIfcClassification.ClassificationEditionDate,
                Location = locationUri
            };
        }

        private static Entity ConvertToRevitSchemaIfcClassification(Schema schema, IFCClassification classification, bool bsddExport, string classificationParameter = null)
        {
            Entity classificationEntity = new Entity(schema);

            classificationEntity.Set<string>(classificationName, classification.ClassificationName ?? string.Empty);
            classificationEntity.Set<string>(classificationSource, classification.ClassificationSource ?? string.Empty);
            classificationEntity.Set<string>(classificationEdition, classification.ClassificationEdition ?? string.Empty);

            if (classification.ClassificationEditionDate != null)
            {
                classificationEntity.Set<Int32>(classificationEditionDate_Day, classification.ClassificationEditionDate.Day);
                classificationEntity.Set<Int32>(classificationEditionDate_Month, classification.ClassificationEditionDate.Month);
                classificationEntity.Set<Int32>(classificationEditionDate_Year, classification.ClassificationEditionDate.Year);
            }
            if (bsddExport)
            {
                if (!string.IsNullOrEmpty(classification.ClassificationLocation))
                {
                    classificationEntity.Set<string>(classificationLocation, classification.ClassificationLocation);

                    List<string> fieldNames = new List<string>();
                    Uri locationUri;
                    bool success = Uri.TryCreate(classification.ClassificationLocation, UriKind.Absolute, out locationUri);
                    if (success)
                    {
                        string parameterNameFromUri = ElementsManager.CreateParameterNameFromUri(locationUri);
                        if (!string.IsNullOrEmpty(parameterNameFromUri))
                        {
                            fieldNames.Add(parameterNameFromUri);
                        }
                    }

                    // // Add classification parameter to the list of field names as an additional mapped field
                    // // Decided against this due to possible data consistency issues
                    // if (!string.IsNullOrEmpty(classificationParameter))
                    // {
                    //     fieldNames.Add(classificationParameter);
                    // }

                    classificationEntity.Set<string>(classificationFieldName, string.Join(",", fieldNames));
                }
                else
                {
                    if (!string.IsNullOrEmpty(classification.ClassificationFieldName))
                    {
                        List<string> fieldNames = new List<string>
                        {
                            classification.ClassificationFieldName
                        };
                        classificationEntity.Set<string>(classificationFieldName, string.Join(",", fieldNames));
                    }
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(classification.ClassificationLocation))
                {
                    classificationEntity.Set<string>(classificationLocation, classification.ClassificationLocation);
                }
                if (!string.IsNullOrEmpty(classification.ClassificationFieldName))
                {
                    List<string> fieldNames = new List<string>
                    {
                        classification.ClassificationFieldName
                    };
                    classificationEntity.Set<string>(classificationFieldName, string.Join(",", fieldNames));
                }
            }

            return classificationEntity;
        }

        private static IFCClassification ConvertFromRevitSchemaIfcClassification(DataStorage dataStorage, Schema schema)
        {
            Entity classificationEntity = dataStorage.GetEntity(schema);
            IFCClassification classification = new IFCClassification
            {
                ClassificationName = classificationEntity.Get<string>(classificationName),
                ClassificationSource = classificationEntity.Get<string>(classificationSource),
                ClassificationEdition = classificationEntity.Get<string>(classificationEdition),
                ClassificationEditionDate = new DateTime(
                    classificationEntity.Get<Int32>(classificationEditionDate_Year),
                    classificationEntity.Get<Int32>(classificationEditionDate_Month),
                    classificationEntity.Get<Int32>(classificationEditionDate_Day)
                ),
                ClassificationLocation = classificationEntity.Get<string>(classificationLocation),
                ClassificationFieldName = classificationEntity.Get<string>(classificationFieldName)
            };

            return classification;
        }

    }
}
