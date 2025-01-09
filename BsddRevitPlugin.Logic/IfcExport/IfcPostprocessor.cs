using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autodesk.Revit.DB;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.IfcJson;
using NLog;
using System.Diagnostics;

namespace BsddRevitPlugin.Logic.IfcExport
{
    /// <summary>
    /// Class to hold the data needed for post-processing classification references.
    /// </summary>
    public class ClassificationReferencePostprocesData
    {
        public string ClassificationLocation { get; set; }
        public string ClassificationReferenceLocation { get; set; }
        public string ClassificationReferenceIdentifier { get; set; }
    }

    public class IfcPostprocessor
    {
        private readonly List<ClassificationReferencePostprocesData> classificationReferencesPostprocesData = new List<ClassificationReferencePostprocesData>();

        /// <summary>
        /// Collects IFC classifications from a Revit document.
        /// </summary>
        /// <param name="doc">The Revit document to collect classifications from.</param>
        public void CollectIfcClassifications(Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            Stopwatch stopwatch = Stopwatch.StartNew();

            FilteredElementCollector elementTypes = new FilteredElementCollector(doc).OfClass(typeof(ElementType));
            
            foreach (ElementType elementType in elementTypes)
            {
                if (elementType != null)
                {
                    var elementTypeAssociations = ElementsManagerLogic.GetElementTypeAssociations(elementType);
                    foreach (var association in elementTypeAssociations)
                    {
                        var classificationData = GetClassificationReferencePostprocesData(association.Key, association.Value);
                        if (classificationData != null)
                        {
                            classificationReferencesPostprocesData.Add(classificationData);
                        }
                    }
                }
            }
            stopwatch.Stop();
            logger.Info($"CollectIfcClassifications executed in {stopwatch.ElapsedMilliseconds} ms");
        }

        // #TODO Remove if good tested
        public void CollectIfcClassificationsOld(Document doc)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            Stopwatch stopwatch = Stopwatch.StartNew();

            FilteredElementCollector collector = new FilteredElementCollector(doc).OfClass(typeof(ElementType));
            IList<Element> elements = collector.ToElements();

            foreach (Element element in elements)
            {
                ElementType elementType = element as ElementType;
                if (elementType != null)
                {
                    var elementTypeAssociations = ElementsManagerLogic.GetElementTypeAssociations(elementType);
                    foreach (var association in elementTypeAssociations)
                    {

                        var classificationData = GetClassificationReferencePostprocesData(association.Key, association.Value);
                        if (classificationData != null)
                        {
                            classificationReferencesPostprocesData.Add(classificationData);
                        }

                    }
                }
            }
            stopwatch.Stop();
            logger.Info($"CollectIfcClassifications executed in {stopwatch.ElapsedMilliseconds} ms");
        }

        /// <summary>
        /// Post-processes an IFC file.
        /// </summary>
        /// <param name="tempIfcFilePath">The path to the temporary IFC file to process.</param>
        /// <param name="ifcFilePath">The path to write the processed IFC file to.</param>
        public void PostProcess(string tempIfcFilePath, string ifcFilePath)
        {
            Logger logger = LogManager.GetCurrentClassLogger();
            Stopwatch stopwatch = Stopwatch.StartNew();

            if (!File.Exists(tempIfcFilePath))
            {
                throw new FileNotFoundException("Temp IFC file not found", tempIfcFilePath);
            }

            using (var reader = new StreamReader(tempIfcFilePath))
            using (var writer = new StreamWriter(ifcFilePath))
            {
                const int batchSize = 1000;
                var lines = new List<string>(batchSize);
                string line;

                while ((line = reader.ReadLine()) != null)
                {
                    int index = line.IndexOf("=IFCCLASSIFICATIONREFERENCE(");
                    if (index != -1)
                    {
                        line = ReplaceClassificationLocation(line, index);
                    }

                    lines.Add(line);

                    if (lines.Count >= batchSize)
                    {
                        WriteLines(writer, lines);
                        lines.Clear();
                    }
                }

                // Write any remaining lines
                if (lines.Count > 0)
                {
                    WriteLines(writer, lines);
                }
            }
            if (!File.Exists(ifcFilePath))
            {
                throw new Exception("Failed to post-process the exported file.");
            }

            File.Delete(tempIfcFilePath);
            if (File.Exists(tempIfcFilePath))
            {
                logger.Warn("Failed to delete temporary IFC file.");
            }

            stopwatch.Stop();
            logger.Info($"PostProcess executed in {stopwatch.ElapsedMilliseconds} ms");
        }

        /// <summary>
        /// Replaces the classification location in a line if it contains a classification reference.
        /// </summary>
        /// <param name="line">The line to replace the classification location in.</param>
        /// <param name="index">The index to start searching for the classification reference at.</param>
        /// <returns>The line with the classification location replaced, if it contained a classification reference.</returns>
        private string ReplaceClassificationLocation(string line, int index)
        {
            foreach (var data in classificationReferencesPostprocesData)
            {
                string combinedString = $"{data.ClassificationLocation}','{data.ClassificationReferenceIdentifier}";
                string replacementString = $"{data.ClassificationReferenceLocation}','{data.ClassificationReferenceIdentifier}";

                int combinedIndex = line.IndexOf(data.ClassificationReferenceIdentifier, index);

                if (combinedIndex != -1)
                {
                    line = line.Replace(combinedString, replacementString);
                    break;
                }
            }

            return line;
        }

        /// <summary>
        /// Writes lines to a TextWriter.
        /// </summary>
        /// <param name="writer">The TextWriter to write lines to.</param>
        /// <param name="lines">The lines to write.</param>
        private static void WriteLines(TextWriter writer, List<string> lines)
        {
            foreach (var line in lines)
            {
                writer.WriteLine(line);
            }
        }

        /// <summary>
        /// Returns the classification reference data for a IfcClassificationReference and DictionaryUri.
        /// </summary>
        /// <param name="dictionaryUri">The DictionaryUri of the classification reference.</param>
        /// <param name="classificationReference">The IfcClassificationReference to get data for.</param>
        /// <returns>A ClassificationReferencePostprocesData object containing the classification reference data.</returns>
        private ClassificationReferencePostprocesData GetClassificationReferencePostprocesData(Uri dictionaryUri, IfcClassificationReference classificationReference)
        {
            if (dictionaryUri == null || classificationReference == null || classificationReference.Location == null || classificationReference.Identification == null)
            {
                return null;
            }
            return new ClassificationReferencePostprocesData
            {
                ClassificationLocation = dictionaryUri.ToString(),
                ClassificationReferenceLocation = classificationReference.Location.ToString(),
                ClassificationReferenceIdentifier = classificationReference.Identification.ToString()
            };
        }
    }
}