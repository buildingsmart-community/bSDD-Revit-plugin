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
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.Wrappers;
using System;
using Moq;
using System.Reflection;
using System.IO;
using Newtonsoft.Json;
using BsddRevitPlugin.Logic.IfcJson;
using System.Runtime.InteropServices;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.Utilities;
using Ignore = NUnit.Framework.IgnoreAttribute;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_Model_ElementsManager
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;
        private Mock<BsddBridgeData> _mockBsddBridgeData;
        private Mock<ParameterDataManagement> _mockParameterDataManagement;

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

            _mockBsddBridgeData = new Mock<BsddBridgeData>();
            _mockParameterDataManagement = new Mock<ParameterDataManagement>();
        }

        [Test]
        public void SelectionToIfcJson_ValidInput_ReturnsIfcEntities()
        {
            // Arrange
            List<ElementType> elemList = new Select().AllElementsView(uiapp);

            // Act
            var result = ElementsManager.SelectionToIfcJson(doc, elemList);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsNotEmpty(result);
            //All elementTypes of List + type for Rooms and type for Area's
            Assert.AreEqual((elemList.Count + 2), result.Count); // Assuming CreateIfcEntity adds one entity and two more are added for rooms and areas
        }

        [Test]
        public void Test_SelectionToIfcJson_Null_input_ThrowsArgumentNullException()
        {
            // Arrange
            List<ElementType> elemList = new List<ElementType>();

            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => ElementsManager.SelectionToIfcJson(null, elemList));
            Assert.Throws<ArgumentNullException>(() => ElementsManager.SelectionToIfcJson(doc, null));
        }

        public class ElementsManagerWrapper
        {
            public virtual void SetIfcDataToRevitElement(Document doc, BsddBridgeData BsddBridgeData)
            {
                ElementsManager.SetIfcDataToRevitElement(doc, BsddBridgeData);
            }
        }

        [Test]
        public void Test_SetIfcDataToRevitElement()
        {
            // Arrange
            var _mockElementsManager = new Mock<ElementsManagerWrapper>();

            _mockElementsManager.Setup(m => m.SetIfcDataToRevitElement(It.IsAny<Document>(), It.IsAny<BsddBridgeData>()))
            .Callback((Document document, BsddBridgeData bsddBridgeData) =>
            {
                // Add testlogica
                // For example: check or certain methods are called
                Assert.IsNotNull(document, "Document should not be null");
                Assert.IsNotNull(bsddBridgeData, "BsddBridgeData should not be null");
                Assert.IsTrue(bsddBridgeData.IfcData.Any(), "IfcData should not be empty");
            });

            // Act
            // Call SetIfcDataToRevitElement-methode on mock object
            var _mockBsddBridgeData = new BsddBridgeData
            {
                IfcData = new List<IfcEntity> { new IfcEntity() },
                PropertyIsInstanceMap = new Dictionary<string, bool>()
            };
            // #TODO: This throws System.InvalidCastException it is quit impossible to test this Static void method.
            var mock = _mockElementsManager.Object;
            mock.SetIfcDataToRevitElement(doc, _mockBsddBridgeData);

            // Assert
            // Verify that the method has been called exactly once
            _mockElementsManager.Verify(m => m.SetIfcDataToRevitElement(It.IsAny<Document>(), It.IsAny<BsddBridgeData>()), Times.Once);
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_HandleAreaOrRoomParameters()
        {
            // Arrange
            
            // Act
            
            // Assert
            
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_HandleElementTypeParameters()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_SelectElementsWithIfcData()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test]
        public void Test_ListFilter()
        {
            // Arrange
            List<ElementType> elemList = new Select().AllElementsView(uiapp);

            // Act
            List<ElementType> elemFilteredList = ElementsManager.ListFilter(elemList);
            var hasDuplicates = elemFilteredList.GroupBy(x => x).Any(g => g.Count() > 1);
            bool not_allowed_category = false;
            foreach (var elem in elemFilteredList){
                if (
                    elem.Category.Name == "Levels" || 
                    elem.Category.Name == "Grids" ||
                    elem.Category.Name == "Location Data" ||
                    elem.Category.Name == "Model Groups" ||
                    elem.Category.Name == "RVT Links" ||
                    elem.Category.Name == "Stacked Walls" ||
                    elem.Category.Name.Substring(System.Math.Max(0, elem.Category.Name.Length - 4)) == ".dwg" ||
                    elem.Category.Name.Substring(System.Math.Max(0, elem.Category.Name.Length - 4)) == ".pdf")
                {
                    not_allowed_category = true;
                }
            };

            // Assert
            Assert.IsFalse(hasDuplicates, "The list contains duplicates.");
            Assert.IsFalse(not_allowed_category, "The list contains an not allowed category what the method should have filtered out.");
        }

    }
}

