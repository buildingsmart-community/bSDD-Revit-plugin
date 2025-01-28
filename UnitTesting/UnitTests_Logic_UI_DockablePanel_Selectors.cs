using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
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
//using Ignore = Microsoft.VisualStudio.TestTools.UnitTesting.IgnoreAttribute;
using Ignore = NUnit.Framework.IgnoreAttribute;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_UI_DockablePanel_Selectors_Select
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
        public void TestSelectAllElementsInFilledDocument(UIApplication uiapp)
        {
            // Validate the result
            Assert.IsNotNull(new Select().AllElements(uiapp));
            Assert.IsTrue(new Select().AllElements(uiapp).Count > 0);
            Assert.IsTrue(new Select().AllElements(uiapp).Count >= new Select().AllElementsView(uiapp).Count);
        }

        [Test]
        public void TestSelectAllElementsViewInFilledDocument()
        {
            // Validate the result
            Assert.IsNotNull(new Select().AllElementsView(uiapp));
            Assert.IsTrue(new Select().AllElementsView(uiapp).Count > 0);
            Assert.IsTrue(new Select().AllElementsView(uiapp).Count <= new Select().AllElements(uiapp).Count);
        }

        [Test]
        [Ignore("Temporarily ignoring to avoid having to manual select every test session")]
        public void TestSelectManualInFilledDocument()
        {
            // Select Elements
            List<ElementType> Selection = new Select().SelectElements(uiapp);

            // Validate the result
            Assert.IsNotNull(Selection, "Selection is null: " + Selection.Count());
            Assert.IsTrue(Selection.Count > 0, "Selection count is zero.");
            Assert.IsTrue(Selection.Count <= new Select().AllElementsView(uiapp).Count, "Selection count exceeds total elements.");
        }
    }
}
