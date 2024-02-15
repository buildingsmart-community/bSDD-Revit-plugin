using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.UI.View;
using CefSharp;
using CefSharp.Wpf;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using static BsddRevitPlugin.Logic.Model.ElementsManager;
using Document = Autodesk.Revit.DB.Document;

/// <summary>
/// Represents an abstract base class for handling Revit selection events.
/// </summary>
namespace BsddRevitPlugin.Logic.UI.Wrappers
{

    public abstract class EventRevitSelection : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<ElementType> elemList = new List<ElementType>();

        protected Select Selectorlist = new Select();
        ChromiumWebBrowser browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;
            elemList = GetSelection(uiapp);

            // Filter elements to remove non-element categories
            elemList = ListFilter(elemList);

            // Pack data into json format
            BsddBridgeData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }

        protected abstract List<ElementType> GetSelection(UIApplication uiapp);

        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }

        private async void UpdateBsddSelection(BsddBridgeData ifcData)
        {
            var settings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };
            var jsonString = JsonConvert.SerializeObject(ifcData, settings);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
    }

    /// <summary>
    /// Selection event for manualy selecting elements in Revit.
    /// </summary>
    public class EventMakeSelection : EventRevitSelection
    {
        protected override List<ElementType> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.SelectElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in Revit.
    /// </summary>
    public class EventSelectAll : EventRevitSelection
    {
        protected override List<ElementType> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in the current Revit view.
    /// </summary>
    public class EventSelectView : EventRevitSelection
    {
        protected override List<ElementType> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElementsView(uiapp);
        }
    }


    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class UpdateElementtypeWithIfcData : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcData ifcData;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SetIfcDataToRevitElement(doc, ifcData);
        }
        public void SetIfcData(IfcData ifcDataObject)
        {
            ifcData = ifcDataObject;
        }

    }

    /// <summary>
    /// Represents an event handler for the BsddSearch event that is fired from the BsddSelection window.
    /// </summary>
    public class EventHandlerBsddSearch : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();


        // ModelessForm instance
        private Window wnd;
        private BsddSearch _bsddSearch;
        private BsddBridgeData _bsddBridgeData;

        public override void Execute(UIApplication uiapp, string args)
        {

            //string addinDirectory = Path.GetDirectoryName(addinLocation);
            _bsddSearch = new BsddSearch();
            _bsddSearch.UpdateBsddBridgeData(_bsddBridgeData);

            HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            wnd = hwndSource.RootVisual as Window;
            if (wnd != null)
            {
                _bsddSearch.Owner = wnd;
                //bsddSearch.ShowInTaskbar = false;
                _bsddSearch.Show();
                //bsddSearch.UpdateSelection(jsonData);

            }
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            var name = doc.Title;
            var path = doc.PathName;
        }

        public void setBsddBridgeData(BsddBridgeData bsddBridgeData)
        {
            _bsddBridgeData = bsddBridgeData;
        }

    }

}
