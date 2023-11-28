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

namespace BsddRevitPlugin.Logic.UI.Wrappers
{

    public class EventMakeSelection : RevitEventWrapper<string>
    {

        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        ChromiumWebBrowser browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            // Get all elements selected
            elemList = Selectorlist.SelectElements(uiapp);

            // Filter elements to remove non-element categories
            elemList = ListFilter(elemList);

            // Pack data into json format
            BsddBridgeData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);

        }
        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }

        private async void UpdateBsddSelection(BsddBridgeData ifcData)
        {
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
    }

    public class EventSelectAll : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();
        Select Selectorlist = new Select();

        ChromiumWebBrowser browser;
        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            // Get all elements in project
            elemList = Selectorlist.AllElements(uiapp);

            // Filter elements to remove non-element categories
            elemList = ListFilter(elemList);

            // Pack data into json format
            BsddBridgeData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }
        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }
        private async void UpdateBsddSelection(BsddBridgeData ifcData)
        {
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
    }

    public class EventSelectView : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        static List<Element> elemList = new List<Element>();

        Select Selectorlist = new Select();
        ChromiumWebBrowser browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            // Get all elements in view
            elemList = Selectorlist.AllElementsView(uiapp);

            // Filter elements to remove non-element categories
            elemList = ListFilter(elemList);

            // Pack data into json format
            BsddBridgeData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }
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


    public class UpdateElementtypeWithIfcData : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcData ifcData;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SetIfcDataToRevit(doc, ifcData);
        }
        public void SetIfcData(IfcData ifcDataObject)
        {
            ifcData = ifcDataObject;
        }

    }



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
