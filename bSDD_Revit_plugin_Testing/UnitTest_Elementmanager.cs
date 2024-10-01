using System;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using BsddRevitPlugin.Logic.Model;
using FluentAssertions;
//using System.Xml.Linq;
//using System.Reflection.Metadata;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Document = Autodesk.Revit.DB.Document;
using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.DB.Structure;
using Autodesk.Revit.DB.Architecture;

// #TODO: Test in Revit 2024
//Unmark below linem to use tests in Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]


namespace bSDD_Revit_plugin_Testing
{
    public class bSDD_Revit_plugin_Tests()
    {
                
        //UIApplication uiapp;

        [SetUp]
        public void Setup(UIApplication uiapp)
        {
            //this.uiapp = uiapp;
        }
        
        [Test]
        public void Take_propertyset_namen_and_propert_and_put_in_expected_string_format()
            => new Wrapper()
                .CreateParameterNameFromPropertySetAndProperty("propertySet", "property")
                .Should().Be("bsdd/prop/propertySet/property");

        [Test]
        public void Check_or_given_element_is_geometry() //requirement/test scenario not implemented
            => new Wrapper()
                .IsGeometrical(new DummyTestObject().RandomElementInDoc())
                .Should().Be(true);


        /*[Test]
        public void Check_or_given_element_is_geometry()
        {

            //foreach (BuiltInCategory category in Enum.GetValues(typeof(BuiltInCategory)))
            //{
            //    Console.WriteLine(category.ToString());
            //}

            DummyTestObject dummy = new DummyTestObject();

            Wrapper wrapper = new Wrapper();
            wrapper.IsGeometrical(new DummyTestObject().randomElementInDoc())
                .Should().Be(true);
        }*/
        

        
        
        
        //example test
        /*[Test]
        public void Test1()
        {
            Document doc = uiapp.ActiveUIDocument?.Document;
            if (doc == null)
                Assert.Ignore("No document open");

            System.Console.WriteLine(doc.Title);
            

            using (Transaction transaction = new Transaction(doc))
            {
                transaction.Start("Change Author");

                doc.ProjectInformation.Author = "NewAuthor";

                transaction.Commit();
            }

                System.Console.WriteLine(uiapp.Application.VersionBuild);
        }*/
    }

    public class DummyTestObject()
    {
        readonly UIApplication uiapp;

        DummyTestObject(UIApplication uiapp) : this()
        {
            this.uiapp = uiapp;
        }

        public Element ElementOfCategory(string cat)
        {
            Document doc = uiapp.ActiveUIDocument.Document;
            if (doc == null)
            {
                Assert.Ignore("No document open"); return null;
            }
            else
            {
                FilteredElementCollector collector = new FilteredElementCollector(doc);

                Element elem = collector
                    .OfCategory(BuiltInCategory.OST_Walls)
                    .WhereElementIsNotElementType()
                    .FirstOrDefault();

                return elem;
            }            
        }

        public Element RandomElementInDoc()
        {
            Document doc = uiapp.ActiveUIDocument.Document;
            if (doc == null)
            {
                Assert.Ignore("No document open"); return null;
            }
            else
            {
                // Collect all elements in the document
                FilteredElementCollector collector = new FilteredElementCollector(doc).WhereElementIsNotElementType();
                List<Element> elements = collector.ToList();

                // Check if there are any elements
                if (elements.Count == 0)
                {
                    Assert.Ignore("No Elements"); return null;
                }

                // Get a random element
                Random random = new Random();
                int index = random.Next(elements.Count);
                Element randomElement = elements[index];

                return randomElement;
            }                
        }
    }
}