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
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using System;
using Moq;
using System.Reflection;
using System.IO;
using Newtonsoft.Json;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_IfcJson_IfcJson
    {
        [Test]
        public void CanSerializeAndDeserialize_IfcEntity()
        {
            // Arrange
            var association = new Association
            {
                Type = "ExampleType",
                Name = "ExampleName"
            };

            List<Association> assList = new List<Association>();
            assList.Add(association);

            var property = new IfcProperty
            {
                Name = "ExampleName",
                Specification = "ExampleSpecification"
            };

            List<IfcProperty> propList = new List<IfcProperty>();
            propList.Add(property);

            var propertyset = new IfcPropertySet
            {
                Type = "ExampleType",
                Name = "ExampleName",
                HasProperties = propList
            };

            List<IfcPropertySet> propSetList = new List<IfcPropertySet>();
            propSetList.Add(propertyset);

            var entity = new IfcEntity
            {
                Type = "ExampleType",
                Name = "ExampleName",
                Description = "ExampleDescription",
                ObjectType = "ExampleObjectType",
                Tag = "ExampleTag",
                PredefinedType = "ExamplePredefinedType",
                HasAssociations = assList,
                IsDefinedBy = propSetList
            };

            // Act
            var json = JsonConvert.SerializeObject(entity);
            var deserialized = JsonConvert.DeserializeObject<IfcEntity>(json);

            // Assert
            Assert.AreEqual(entity.Type, deserialized.Type);
            Assert.AreEqual(entity.Name, deserialized.Name);
            Assert.AreEqual(entity.Description, deserialized.Description);
            Assert.AreEqual(entity.ObjectType, deserialized.ObjectType);
            Assert.AreEqual(entity.Tag, deserialized.Tag);
            Assert.AreEqual(entity.PredefinedType, deserialized.PredefinedType);
            Assert.AreEqual(entity.HasAssociations[0].Type, deserialized.HasAssociations[0].Type);
            Assert.AreEqual(entity.HasAssociations[0].Name, deserialized.HasAssociations[0].Name);
            Assert.AreEqual(entity.IsDefinedBy[0].Type, deserialized.IsDefinedBy[0].Type);
            Assert.AreEqual(entity.IsDefinedBy[0].Name, deserialized.IsDefinedBy[0].Name);
            Assert.AreEqual(entity.IsDefinedBy[0].HasProperties[0].Type, deserialized.IsDefinedBy[0].HasProperties[0].Type);
            Assert.AreEqual(entity.IsDefinedBy[0].HasProperties[0].Name, deserialized.IsDefinedBy[0].HasProperties[0].Name);
            Assert.AreEqual(entity.IsDefinedBy[0].HasProperties[0].Specification, deserialized.IsDefinedBy[0].HasProperties[0].Specification);
        }

        [Test]
        public void CanSerializeAndDeserialize_IfcClassificationReference()
        {
            // Arrange
            var classi = new IfcClassification
            {
                Type = "ExampleType",
                Source = "ExampleSource",
                Edition = "ExampleEdition",
                EditionDate = new DateTime(2025, 1, 16, 20, 45, 0),
                Name = "ExampleName",
                Description = "ExampleDescription",
                Location = new Uri("http://example.com")
            };

            var classRef = new IfcClassificationReference
            {
                Location = new Uri("http://example.com"),
                Identification = "ExampleIdentification",
                ReferencedSource = classi,
                Type = "ExampleAssociationType",
                Name = "ExampleAssociationName"
            };

            // Act
            var json = JsonConvert.SerializeObject(classRef);
            var deserialized = JsonConvert.DeserializeObject<IfcClassificationReference>(json);

            // Assert
            Assert.AreEqual(classRef.Location, deserialized.Location);
            Assert.AreEqual(classRef.Identification, deserialized.Identification);
            Assert.AreEqual(classRef.ReferencedSource.Type, deserialized.ReferencedSource.Type);
            Assert.AreEqual(classRef.ReferencedSource.Source, deserialized.ReferencedSource.Source);
            Assert.AreEqual(classRef.ReferencedSource.Edition, deserialized.ReferencedSource.Edition);
            Assert.AreEqual(classRef.ReferencedSource.EditionDate, deserialized.ReferencedSource.EditionDate);
            Assert.AreEqual(classRef.ReferencedSource.Name, deserialized.ReferencedSource.Name);
            Assert.AreEqual(classRef.ReferencedSource.Description, deserialized.ReferencedSource.Description);
            Assert.AreEqual(classRef.ReferencedSource.Location, deserialized.ReferencedSource.Location);
            Assert.AreEqual(classRef.Type, deserialized.Type);
            Assert.AreEqual(classRef.Name, deserialized.Name);
        }

        [Test]
        public void CanSerializeAndDeserialize_IfcMaterial()
        {
            // Arrange
            var material = new IfcMaterial
            {
                Description = "ExampleDescription",
                MaterialName = "ExampleMaterialName",
                MaterialType = "ExampleMaterialType",
                Type = "ExampleAssociationType",
                Name = "ExampleAssociationName"
            };

            // Act
            var json = JsonConvert.SerializeObject(material);
            var deserialized = JsonConvert.DeserializeObject<IfcMaterial>(json);

            // Assert
            Assert.AreEqual(material.Description, deserialized.Description);
            Assert.AreEqual(material.MaterialName, deserialized.MaterialName);
            Assert.AreEqual(material.MaterialType, deserialized.MaterialType);
            Assert.AreEqual(material.Type, deserialized.Type);
            Assert.AreEqual(material.Name, deserialized.Name);
        }

        [Test]
        public void CanSerializeAndDeserialize_IfcPropertySingleValue()
        {
            // Arrange
            var value = new IfcValue
            {
                Type = "ExampleType",
                Value = "ExampleValue"
            };

            var propertySingleValue = new IfcPropertySingleValue
            {
                NominalValue = value,
                Name = "ExamplePropertyName",
                Specification = "ExamplePropertySpecification"
            };

            // Act
            var json = JsonConvert.SerializeObject(propertySingleValue);
            var deserialized = JsonConvert.DeserializeObject<IfcPropertySingleValue>(json);

            // Assert
            Assert.AreEqual(propertySingleValue.NominalValue.Type, deserialized.NominalValue.Type);
            Assert.AreEqual(propertySingleValue.NominalValue.Value, deserialized.NominalValue.Value);
            Assert.AreEqual(propertySingleValue.Type, deserialized.Type);
            Assert.AreEqual(propertySingleValue.Name, deserialized.Name);
            Assert.AreEqual(propertySingleValue.Specification, deserialized.Specification);
        }

        [Test]
        public void CanSerializeAndDeserialize_IfcPropertyEnumeratedValue()
        {
            // Arrange
            var value = new IfcValue
            {
                Type = "ExampleType",
                Value = "ExampleValue"
            };

            List<IfcValue> valueList = new List<IfcValue>();
            valueList.Add(value);

            HashSet<IfcValue> valueHashSet = new HashSet<IfcValue>();
            valueList.Add(value);

            var propertyEnumeration = new IfcPropertyEnumeration
            {
                Type = "ExampleType",
                Name = "ExampleValue",
                EnumerationValues = valueHashSet
            };

            var propertyEnumeratedValue = new IfcPropertyEnumeratedValue
            {
                EnumerationValues = valueList,
                EnumerationReference = propertyEnumeration,
                Name = "ExamplePropertyName",
                Specification = "ExamplePropertySpecification"
            };

            // Act
            var json = JsonConvert.SerializeObject(propertyEnumeratedValue);
            var deserialized = JsonConvert.DeserializeObject<IfcPropertyEnumeratedValue>(json);

            // Assert
            Assert.AreEqual(propertyEnumeratedValue.Type, deserialized.Type);
            Assert.AreEqual(propertyEnumeratedValue.EnumerationValues[0].Type, deserialized.EnumerationValues[0].Type);
            Assert.AreEqual(propertyEnumeratedValue.EnumerationValues[0].Value, deserialized.EnumerationValues[0].Value);
            Assert.AreEqual(propertyEnumeratedValue.EnumerationReference.Type, deserialized.EnumerationReference.Type);
            Assert.AreEqual(propertyEnumeratedValue.EnumerationReference.Name, deserialized.EnumerationReference.Name);
            Assert.IsTrue(propertyEnumeratedValue.EnumerationReference.EnumerationValues.SetEquals(deserialized.EnumerationReference.EnumerationValues));
        }
    }
}
