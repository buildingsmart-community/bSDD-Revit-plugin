using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using StringAssert = NUnit.Framework.StringAssert;
using Autodesk.Revit.UI;
using Document = Autodesk.Revit.DB.Document;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.ExtensibleStorage;
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
using System.Security.Principal;
using System.Security.Policy;
using Ignore = NUnit.Framework.IgnoreAttribute;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_Model_ElementsManager_Logic
    {
        [Test]
        public void Test_GetBsddDataSchema()
        {
            // Arrange

            // Act
            Schema schema = ElementsManagerLogic.GetBsddDataSchema();

            // Assert
            Assert.IsNotNull(schema);
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_SetIfcEntityToElementDataStorage()
        {
            // Arrange
            var mockIfcEntity = new Mock<IfcEntity>();
            var mockElementType = new Mock<ElementType>(new object());

            // Act
            // Gives an System.NotSupportedException
            ElementsManagerLogic.SetIfcEntityToElementDataStorage(mockIfcEntity.Object, mockElementType.Object);

            // Assert
            Assert.IsNotNull(mockElementType);
            // Verify that the method has been called exactly once
            mockElementType.Verify(m => m.SetEntity(It.IsAny<Entity>()), Times.Once);
        }

        [Test]
        public void Test_CreateParameterNameFromUri()
        {
            // Arrange
            Uri uri = new Uri("https://www.example.com:443/path/to/resource");

            // Act
            string parameterName = ElementsManagerLogic.CreateParameterNameFromUri(uri);

            // Assert
            Assert.AreEqual("bsdd/class/", parameterName.Substring(0, 11));
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_CreateParameterNameFromIFCClassificationReferenceSourceLocation()
        {
            // Arrange
            var ifcClassificationReference = new IfcClassificationReference();
            Uri uri = new Uri("https://www.example.com:443/path/to/resource");
            ifcClassificationReference.ReferencedSource.Location = uri;

            // Act
            string returnValue = ElementsManagerLogic.CreateParameterNameFromIFCClassificationReferenceSourceLocation(ifcClassificationReference);

            // Assert
            Assert.AreEqual("bsdd/class/", returnValue.Substring(0, 11));
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_getElementTypeClassificationsReferencesFromExtensibleStorage()
        {
            // Arrange
            var proxy = new Object();
            var mockElementType = new Mock<ElementType>(proxy);

            // Act
            IEnumerable<IfcClassificationReference> interfaceEnum = ElementsManagerLogic.getElementTypeClassificationsReferencesFromExtensibleStorage(mockElementType.Object);

            // Assert
            Assert.IsNotNull(interfaceEnum);
            Assert.IsEmpty(interfaceEnum);
            Assert.IsInstanceOf<IEnumerable<IfcClassificationReference>>(interfaceEnum);
        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetClassificationDataFromSettings()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetElementTypeAssociations()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetActiveDictionaries()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_CreateIfcEntity()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_IfcDefinition()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetElementTypeFamilyName()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetElementTypeName()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetTypeId()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_GetTypeParameterValueByElementType()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_getParameterStorageType()
        {
            // Arrange

            // Act

            // Assert

        }

        [Test] // #TODO: skipped course it is static void method, what is very complicated to test
        [Ignore("complicated to test, todo")]
        public void Test_IFCMappingValue()
        {
            // Arrange

            // Act

            // Assert

        }
    }
}
