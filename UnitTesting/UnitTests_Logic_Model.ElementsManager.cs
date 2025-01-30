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

        [Test]
        public void Test_SetIfcDataToRevitElement()
        {
            // Arrange
            //RevitEventWrapper<string> wrapper = RevitEventWrapper<string>;
            //wrapper.Execute(uiapp);
            List<ElementType> elemList = new List<ElementType>();
            Element elem = elemList[0];
            Object _lock;
            _lock = new object();

            // Maak een stub voor DataFetcher
            //var fetcherStub = new Mock<DataFetcher>();
            //fetcherStub.Setup(f => f.FetchData()).Returns("stub data");

            //TType _savedArgs;
            //TType args;

            //lock (_lock)
            //{
            //    args = _savedArgs;
            //    _savedArgs = default;
            //}

            // Act
            //ElementsManager.SetIfcDataToRevitElement(doc, bsddBrigeData);

            // Assert
            //Assert.Throws<ArgumentNullException>(() => ElementsManager.SelectionToIfcJson(null, elemList));
            //Assert.Throws<ArgumentNullException>(() => ElementsManager.SelectionToIfcJson(doc, null));
        }
    }
}

