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
using BsddRevitPlugin.Logic.Commands;
using System;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_Commands_RelayCommand
    {
        private UIApplication uiapp;
        private Application application;
        private UIControlledApplication uiControlledApplication;
        private ControlledApplication controlledApplication;
        private UIDocument uidoc;
        private Document doc;
        private bool _canExecuteCalled;
        private bool _executeCalled;

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
            _canExecuteCalled = false;
            _executeCalled = false;

            // Ensure doc is not null
            Assert.IsNotNull(doc, "Document is null.");

            // Ensure ActiveView is not null
            Assert.IsNotNull(doc.ActiveView, "Active view is null.");
        }

        [Test]
        public void CanExecute_ReturnsTrue_WhenPredicateIsTrue()
        {
            // Arrange
            Predicate<object> canExecute = param => true;
            Action<object> execute = param => { };
            var command = new RelayCommand(execute, canExecute);

            // Act
            var result = command.CanExecute(null);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void CanExecute_ReturnsFalse_WhenPredicateIsFalse()
        {
            // Arrange
            Predicate<object> canExecute = param => false;
            Action<object> execute = param => { };
            var command = new RelayCommand(execute, canExecute);

            // Act
            var result = command.CanExecute(null);

            // Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void Execute_CallsExecuteAction()
        {
            // Arrange
            Predicate<object> canExecute = param => true;
            Action<object> execute = param => { _executeCalled = true; };
            var command = new RelayCommand(execute, canExecute);

            // Act
            command.Execute(null);

            // Assert
            Assert.IsTrue(_executeCalled);
        }

        [Test]
        public void CanExecuteChanged_EventIsRaised()
        {
            // Arrange
            Predicate<object> canExecute = param => true;
            Action<object> execute = param => { };
            var command = new BsddRevitPlugin.Logic.Commands.RelayCommand(execute, canExecute);
            bool eventRaised = false;
            command.CanExecuteChanged += (sender, args) => eventRaised = true;

            // Act
            command.RaiseCanExecuteChanged();

            // Assert
            Assert.IsTrue(eventRaised);
        }
    }
}
