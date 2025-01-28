using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using StringAssert = NUnit.Framework.StringAssert;
using Autodesk.Revit.UI;
using Document = Autodesk.Revit.DB.Document;
using Autodesk.Revit.DB;
using Autodesk.Revit.ApplicationServices;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.V2023.Services;
//using BsddRevitPlugin.V2024.Services; //Switch Reverences 2023/2024 to test Revit 2024
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using BsddRevitPlugin.Logic.IfcExport;
using BsddRevitPlugin.Logic.Model;
using System;
using Moq;
using System.Reflection;
using BsddRevitPlugin.Logic.IfcJson;
using System.IO;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_IfcExport_ClassificationReferencePostprocesData
    {
        [Test]
        public void Properties_SetAndGetValues_Correctly()
        {
            // Arrange
            var data = new ClassificationReferencePostprocesData();
            var classificationLocation = "Location1";
            var classificationReferenceLocation = "ReferenceLocation1";
            var classificationReferenceIdentifier = "Identifier1";

            // Act
            data.ClassificationLocation = classificationLocation;
            data.ClassificationReferenceLocation = classificationReferenceLocation;
            data.ClassificationReferenceIdentifier = classificationReferenceIdentifier;

            // Assert
            Assert.AreEqual(classificationLocation, data.ClassificationLocation);
            Assert.AreEqual(classificationReferenceLocation, data.ClassificationReferenceLocation);
            Assert.AreEqual(classificationReferenceIdentifier, data.ClassificationReferenceIdentifier);
        }
    }

    [TestClass]
    public class UnitTests_Logic_IfcExport_IfcPostprocessor
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;
        private IfcPostprocessor instance;

        [OneTimeSetUp]
        public void OneTimeSetUp(
            UIApplication uiapp,
            Application application,
            UIControlledApplication uiControlledApplication,
            ControlledApplication controlledApplication,
            UIDocument uidoc,
            Document doc)
        {
            this.uiapp = uiapp;
            this.application = application;
            this.uiControlledApplication = uiControlledApplication;
            this.controlledApplication = controlledApplication;
            this.uidoc = uidoc;
            this.doc = doc;
        }

        [SetUp]
        public void Setup()
        {
            doc = uiapp.ActiveUIDocument.Document;

            // Ensure doc is not null
            Assert.IsNotNull(doc, "Document is null.");

            // Ensure ActiveView is not null
            Assert.IsNotNull(doc.ActiveView, "Active view is null.");

            instance = new IfcPostprocessor();
        }

        [Test]
        public void TestPrivateReadonlyClassificationReferencesPostprocesData()
        {
            // Arrange
            var mockData = new Mock<ClassificationReferencePostprocesData>();

            IfcPostprocessor ifcPostprocessor = new IfcPostprocessor();
            var fieldInfo = typeof(IfcPostprocessor).GetField("classificationReferencesPostprocesData", BindingFlags.NonPublic | BindingFlags.Instance);

            var mockList = new List<ClassificationReferencePostprocesData> { mockData.Object };
            fieldInfo.SetValue(ifcPostprocessor, mockList);

            var result = fieldInfo.GetValue(ifcPostprocessor) as List<ClassificationReferencePostprocesData>;
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
            Assert.AreEqual(mockData.Object, result[0]);
        }

        [Test]
        public void TestOrCollectIfcClassificationsChangesClassificationReferencePostprocesData()
        {
            //Arrange
            // Define class to run method CollectIfcClassifications
            IfcPostprocessor ifcPostprocessor = new IfcPostprocessor();
            //Set Data
            var data = new ClassificationReferencePostprocesData { ClassificationLocation = "Test Data" };
            List<ClassificationReferencePostprocesData> dataList = new List<ClassificationReferencePostprocesData> { data };

            //Act
            ifcPostprocessor.CollectIfcClassifications(doc);

            // Use reflection to access the private readonly list
            var fieldInfo = typeof(IfcPostprocessor).GetField("classificationReferencesPostprocesData", BindingFlags.NonPublic | BindingFlags.Instance);
            dataList = (List<ClassificationReferencePostprocesData>)fieldInfo.GetValue(ifcPostprocessor);

            // Assert
            Assert.AreNotEqual("Test Data", dataList[0].ClassificationLocation);
        }

        [Test]
        public void TestPostProcess()
        {
            // Arrange
            string tempIfcFilePath = Path.GetTempFileName();
            string ifcFilePath = Path.GetTempFileName();
            File.WriteAllText(tempIfcFilePath, "Some initial content\n=IFCCLASSIFICATIONREFERENCE(Some data)\nMore content");

            var postProcessor = new IfcPostprocessor();

            // Act
            postProcessor.PostProcess(tempIfcFilePath, ifcFilePath);

            // Assert
            Assert.IsFalse(File.Exists(tempIfcFilePath), "Temp IFC file should be deleted after processing.");
            Assert.IsTrue(File.Exists(ifcFilePath), "IFC file should exist after processing.");

            string processedContent = File.ReadAllText(ifcFilePath);
            Assert.IsTrue(processedContent.Contains("=IFCCLASSIFICATIONREFERENCE(Some data)"), "Processed content should contain the original classification reference from tempIfcFilePath.");

            // Clean up
            File.Delete(ifcFilePath);
        }


        // #TODO Test ReplaceClassificationLocation() method
        [Test]
        public void TestReplaceClassificationLocation()
        {
            // Arrange

            // Act

            // Assert
        }

        [Test]
        public void TestWriteLines()
        {
            IfcPostprocessor ifcPostprocessor = new IfcPostprocessor();
            TextWriter writer = new StringWriter();
            TextWriter writerResult = new StringWriter();

            List<string> lines = new List<string>
            {
                "First line",
                "Second line",
                "Third line"
            };

            // Use reflection to access the private readonly list
            MethodInfo method = typeof(IfcPostprocessor).GetMethod("WriteLines", BindingFlags.NonPublic | BindingFlags.Static);

            //Act
            string result = (string)method.Invoke(ifcPostprocessor, new object[] { writer, lines });

            //Assert
            Assert.AreNotEqual(writer, writerResult.ToString());
            StringAssert.Contains("Second line", writer.ToString());
        }

        [Test]
        public void TestGetClassificationReferencePostprocesData()
        {
            // Arrange
            Uri dictionaryUri = new Uri("http://example.com");
            IfcClassificationReference classificationReference = new IfcClassificationReference
            {
                Location = new Uri("http://example.com/location"),
                Identification = "ID123"
            };

            IfcPostprocessor ifcPostprocessor = new IfcPostprocessor();

            // Use reflection to access the private method
            MethodInfo method = typeof(IfcPostprocessor).GetMethod("GetClassificationReferencePostprocesData", BindingFlags.NonPublic | BindingFlags.Instance);

            // Act
            var result = method.Invoke(ifcPostprocessor, new object[] { dictionaryUri, classificationReference });

            // Assert
            Assert.IsNotNull(result);
            var data = result as ClassificationReferencePostprocesData;
            Assert.IsNotNull(data);
            Assert.AreEqual("http://example.com/", data.ClassificationLocation);
            Assert.AreEqual("http://example.com/location", data.ClassificationReferenceLocation);
            Assert.AreEqual("ID123", data.ClassificationReferenceIdentifier);
        }
    }
}
