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
using Newtonsoft.Json.Linq;
using Autodesk.Revit.UI.Selection;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_IfcJson_IfcJsonConverter
    {
        [Test]
        public void Test_CanConvert()
        {
            // Arrange
            IfcJsonConverter converter = new IfcJsonConverter();

            // Use the actual type IfcEntity
            Type validType = typeof(IfcEntity);
            Type invalidType = typeof(string); // or any other type that is not IfcEntity

            // Act
            bool canConvert = converter.CanConvert(validType);
            bool canNotConvert = converter.CanConvert(invalidType);

            // Assert
            Assert.IsTrue(canConvert);
            Assert.IsFalse(canNotConvert);
        }

        [Test]
        public void Test_ReadJson()
        {
            // Arrange
            IfcJsonConverter ifcJsonConverter = new IfcJsonConverter();

            // Create a sample JSON string that represents an IfcEntity
            string json = @"
            {
                ""type"": ""IfcEntityType"",
                ""name"": ""SampleName"",
                ""description"": ""SampleDescription"",
                ""objectType"": ""SampleObjectType"",
                ""tag"": ""SampleTag"",
                ""predefinedType"": ""SamplePredefinedType"",
                ""hasAssociations"": 
                [
                    { 
                        ""type"": ""IfcClassificationReference"", ""Property1"": ""Value1"" 
                    },
                    { 
                        ""type"": ""IfcMaterial"", ""Property2"": ""Value2"" 
                    }
                ],
                ""isDefinedBy"": 
                [
                    {
                        ""type"": ""IfcPropertySet"",
                        ""hasProperties"": 
                        [
                            { 
                                ""type"": ""IfcPropertySingleValue"", ""Property3"": ""Value3"" 
                            },
                            { 
                                ""type"": ""IfcPropertyEnumeratedValue"", ""Property4"": ""Value4"" 
                            }
                        ]
                    }
                ]
            }";

            JsonReader reader = new JsonTextReader(new StringReader(json));
            Type objectType = typeof(IfcEntity);
            object existingValue = null;
            JsonSerializer serializer = new JsonSerializer();

            // Use the actual type IfcEntity
            Type validType = typeof(IfcEntity);
            Type invalidType = typeof(string); // or any other type that is not IfcEntity

            // Act
            object readJsonObject = ifcJsonConverter.ReadJson(reader, objectType, existingValue, serializer);

            // Assert
            Assert.IsNotNull(readJsonObject);
            Assert.IsInstanceOf<IfcEntity>(readJsonObject);

            // Additional assertions to verify the properties of the deserialized object
            IfcEntity ifcEntity = (IfcEntity)readJsonObject;
            Assert.AreEqual("IfcEntityType", ifcEntity.Type);
            Assert.AreEqual("SampleName", ifcEntity.Name);
            Assert.AreEqual("SampleDescription", ifcEntity.Description);
            Assert.AreEqual("SampleObjectType", ifcEntity.ObjectType);
            Assert.AreEqual("SampleTag", ifcEntity.Tag);
            Assert.AreEqual("SamplePredefinedType", ifcEntity.PredefinedType);

            // Verify associations
            Assert.AreEqual(2, ifcEntity.HasAssociations.Count);
            Assert.IsInstanceOf<IfcClassificationReference>(ifcEntity.HasAssociations[0]);
            Assert.IsInstanceOf<IfcMaterial>(ifcEntity.HasAssociations[1]);

            // Verify property sets
            Assert.AreEqual(1, ifcEntity.IsDefinedBy.Count);
            IfcPropertySet propertySet = ifcEntity.IsDefinedBy[0];
            Assert.AreEqual(2, propertySet.HasProperties.Count);
            Assert.IsInstanceOf<IfcPropertySingleValue>(propertySet.HasProperties[0]);
            Assert.IsInstanceOf<IfcPropertyEnumeratedValue>(propertySet.HasProperties[1]);
        }
    }
}
