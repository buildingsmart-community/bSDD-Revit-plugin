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
using Ignore = NUnit.Framework.IgnoreAttribute;

//Enable to test Revit 2024
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Version", "2024")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Open", "true")]
//[assembly: System.Reflection.AssemblyMetadata("NUnit.Close", "true")]


namespace UnitTesting_BSDD_Revit_Plugin
{
    [TestClass]
    public class UnitTests_Logic_UI_BsddBridge_BsddSearchBridge
    {
        [Test]
        // Constructor
        [Ignore("Unnessacary test")]
        public void Test_BsddSearchBridge()
        {
            // Arrange


            // Act


            // Assert

        }

        [Test]
        [Ignore("Unnessacary test")]
        public void Test_SetParentWindow()
        {
            // Arrange


            // Act


            // Assert

        }

        [Test]
        [Ignore("Never used")]
        public void Test_save()
        {
            // Arrange


            // Act


            // Assert

        }

        [Test]
        [Ignore("Never used")]
        public void Test_cancel()
        {
            // Arrange


            // Act


            // Assert

        }

        [Test]
        [Ignore("Never used")]
        public void Test_loadBridgeData()
        {
            // Arrange


            // Act


            // Assert

        }


    }
}





