using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using Autodesk.Revit.UI;
using Document = Autodesk.Revit.DB.Document;
using Autodesk.Revit.DB;
using Autodesk.Revit.ApplicationServices;
using BsddRevitPlugin.V2023.Services;
//using BsddRevitPlugin.V2024.Services; //Switch Reverences 2023/2024 to test Revit 2024
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using BsddRevitPlugin.UnitTesting.TestEnviorment;
using System;
using System.Linq;
using System.Threading;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.IfcJson;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_GlobalSelection
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestAddElementsToGlobalSelection()
        {
            // Arrange
            string docName = doc.Title;
            List<ElementType> elementTypes = new Select().AllElements(uiapp);

            // Act
            GlobalSelection.LastSelectedElementsWithDocs[docName] = elementTypes;

            // Assert
            Assert.IsTrue(GlobalSelection.LastSelectedElementsWithDocs.ContainsKey(docName), "Document name not found in dictionary.");
            Assert.AreEqual(elementTypes, GlobalSelection.LastSelectedElementsWithDocs[docName], "Element types do not match.");
        }

        [Test]
        public void TestClearGlobalSelection()
        {
            // Arrange
            string docName = doc.Title;
            List<ElementType> elementTypes = new Select().AllElements(uiapp);
            GlobalSelection.LastSelectedElementsWithDocs[docName] = elementTypes;

            // Act
            GlobalSelection.LastSelectedElementsWithDocs.Clear();

            // Assert
            Assert.IsFalse(GlobalSelection.LastSelectedElementsWithDocs.ContainsKey(docName), "Dictionary should be empty.");
        }
    }

    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_GlobalDocument
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestSetCurrentDocument()
        {
            // Arrange
            Document testDocument = doc;

            // Act
            GlobalDocument.currentDocument = testDocument;

            // Assert
            Assert.AreEqual(testDocument, GlobalDocument.currentDocument, "The current document was not set correctly.");
        }

        [Test]
        public void TestClearCurrentDocument()
        {
            // Arrange
            Document testDocument = doc;
            GlobalDocument.currentDocument = testDocument;

            // Act
            GlobalDocument.currentDocument = null;

            // Assert
            Assert.IsNull(GlobalDocument.currentDocument, "The current document was not cleared correctly.");
        }
    }

    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_GlobalBsddSettings
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestSetBsddSettings()
        {
            // Arrange
            BsddSettings testSettings = new BsddSettings();

            // Act
            GlobalBsddSettings.bsddsettings = testSettings;

            // Assert
            Assert.AreEqual(testSettings, GlobalBsddSettings.bsddsettings, "The bsddsettings property was not set correctly.");
        }

        [Test]
        public void TestClearBsddSettings()
        {
            // Arrange
            BsddSettings testSettings = new BsddSettings();
            GlobalBsddSettings.bsddsettings = testSettings;

            // Act
            GlobalBsddSettings.bsddsettings = null;

            // Assert
            Assert.IsNull(GlobalBsddSettings.bsddsettings, "The bsddsettings property was not cleared correctly.");
        }
    }

    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_BsddDictionary
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestSetIfcClassification()
        {
            // Arrange
            IfcClassification testClassification = new IfcClassification();
            BsddDictionary dictionary = new BsddDictionary();

            // Act
            dictionary.IfcClassification = testClassification;

            // Assert
            Assert.AreEqual(testClassification, dictionary.IfcClassification, "The IfcClassification property was not set correctly.");
        }

        [Test]
        public void TestSetParameterMapping()
        {
            // Arrange
            string testMapping = "TestMapping";
            BsddDictionary dictionary = new BsddDictionary();

            // Act
            dictionary.ParameterMapping = testMapping;

            // Assert
            Assert.AreEqual(testMapping, dictionary.ParameterMapping, "The ParameterMapping property was not set correctly.");
        }

        [Test]
        public void TestClearProperties()
        {
            // Arrange
            IfcClassification testClassification = new IfcClassification();
            string testMapping = "TestMapping";
            BsddDictionary dictionary = new BsddDictionary
            {
                IfcClassification = testClassification,
                ParameterMapping = testMapping
            };

            // Act
            dictionary.IfcClassification = null;
            dictionary.ParameterMapping = null;

            // Assert
            Assert.IsNull(dictionary.IfcClassification, "The IfcClassification property was not cleared correctly.");
            Assert.IsNull(dictionary.ParameterMapping, "The ParameterMapping property was not cleared correctly.");
        }
    }

    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_BsddSettings
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestSetBsddApiEnvironment()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            string testEnvironment = "development";

            // Act
            settings.BsddApiEnvironment = testEnvironment;

            // Assert
            Assert.AreEqual(testEnvironment, settings.BsddApiEnvironment, "The BsddApiEnvironment property was not set correctly.");
        }

        [Test]
        public void TestSetMainDictionary()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            BsddDictionary testDictionary = new BsddDictionary();

            // Act
            settings.MainDictionary = testDictionary;

            // Assert
            Assert.AreEqual(testDictionary, settings.MainDictionary, "The MainDictionary property was not set correctly.");
        }

        [Test]
        public void TestSetIfcDictionary()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            BsddDictionary testDictionary = new BsddDictionary();

            // Act
            settings.IfcDictionary = testDictionary;

            // Assert
            Assert.AreEqual(testDictionary, settings.IfcDictionary, "The IfcDictionary property was not set correctly.");
        }

        [Test]
        public void TestSetFilterDictionaries()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            List<BsddDictionary> testDictionaries = new List<BsddDictionary>
            {
                new BsddDictionary(),
                new BsddDictionary()
            };

            // Act
            settings.FilterDictionaries = testDictionaries;

            // Assert
            Assert.AreEqual(testDictionaries, settings.FilterDictionaries, "The FilterDictionaries property was not set correctly.");
        }

        [Test]
        public void TestSetLanguage()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            string testLanguage = "en";

            // Act
            settings.Language = testLanguage;

            // Assert
            Assert.AreEqual(testLanguage, settings.Language, "The Language property was not set correctly.");
        }

        [Test]
        public void TestSetIncludeTestDictionaries()
        {
            // Arrange
            BsddSettings settings = new BsddSettings();
            bool includeTestDictionaries = true;

            // Act
            settings.IncludeTestDictionaries = includeTestDictionaries;

            // Assert
            Assert.AreEqual(includeTestDictionaries, settings.IncludeTestDictionaries, "The IncludeTestDictionaries property was not set correctly.");
        }

        [Test]
        public void TestClearProperties()
        {
            // Arrange
            BsddSettings settings = new BsddSettings
            {
                BsddApiEnvironment = "development",
                MainDictionary = new BsddDictionary(),
                IfcDictionary = new BsddDictionary(),
                FilterDictionaries = new List<BsddDictionary> { new BsddDictionary() },
                Language = "en",
                IncludeTestDictionaries = true
            };

            // Act
            settings.BsddApiEnvironment = null;
            settings.MainDictionary = null;
            settings.IfcDictionary = null;
            settings.FilterDictionaries = null;
            settings.Language = null;
            settings.IncludeTestDictionaries = false;

            // Assert
            Assert.IsNull(settings.BsddApiEnvironment, "The BsddApiEnvironment property was not cleared correctly.");
            Assert.IsNull(settings.MainDictionary, "The MainDictionary property was not cleared correctly.");
            Assert.IsNull(settings.IfcDictionary, "The IfcDictionary property was not cleared correctly.");
            Assert.IsNull(settings.FilterDictionaries, "The FilterDictionaries property was not cleared correctly.");
            Assert.IsNull(settings.Language, "The Language property was not cleared correctly.");
            Assert.IsFalse(settings.IncludeTestDictionaries, "The IncludeTestDictionaries property was not cleared correctly.");
        }
    }

    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddBridgeData_BsddBridgeData
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;

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
        }

        [Test]
        public void TestSetSettings()
        {
            // Arrange
            BsddBridgeData bridgeData = new BsddBridgeData();
            BsddSettings testSettings = new BsddSettings();

            // Act
            bridgeData.Settings = testSettings;

            // Assert
            Assert.AreEqual(testSettings, bridgeData.Settings, "The Settings property was not set correctly.");
        }

        [Test]
        public void TestSetIfcData()
        {
            // Arrange
            BsddBridgeData bridgeData = new BsddBridgeData();
            List<IfcEntity> testIfcData = new List<IfcEntity>
            {
                new IfcEntity(),
                new IfcEntity()
            };

            // Act
            bridgeData.IfcData = testIfcData;

            // Assert
            Assert.AreEqual(testIfcData, bridgeData.IfcData, "The IfcData property was not set correctly.");
        }

        [Test]
        public void TestSetPropertyIsInstanceMap()
        {
            // Arrange
            BsddBridgeData bridgeData = new BsddBridgeData();
            Dictionary<string, bool> testMap = new Dictionary<string, bool>
            {
                { "Property1", true },
                { "Property2", false }
            };

            // Act
            bridgeData.PropertyIsInstanceMap = testMap;

            // Assert
            Assert.AreEqual(testMap, bridgeData.PropertyIsInstanceMap, "The PropertyIsInstanceMap property was not set correctly.");
        }

        [Test]
        public void TestClearProperties()
        {
            // Arrange
            BsddBridgeData bridgeData = new BsddBridgeData
            {
                Settings = new BsddSettings(),
                IfcData = new List<IfcEntity> { new IfcEntity() },
                PropertyIsInstanceMap = new Dictionary<string, bool> { { "Property1", true } }
            };

            // Act
            bridgeData.Settings = null;
            bridgeData.IfcData = null;
            bridgeData.PropertyIsInstanceMap = null;

            // Assert
            Assert.IsNull(bridgeData.Settings, "The Settings property was not cleared correctly.");
            Assert.IsNull(bridgeData.IfcData, "The IfcData property was not cleared correctly.");
            Assert.IsNull(bridgeData.PropertyIsInstanceMap, "The PropertyIsInstanceMap property was not cleared correctly.");
        }
    }
}






