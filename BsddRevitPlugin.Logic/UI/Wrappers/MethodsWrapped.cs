using Autodesk.Revit.Attributes;
using Autodesk.Revit.Creation;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.Commands;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.IfcJson;
using ASRR.Core.Persistence;
using NLog;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls.Primitives;
using System.Windows.Interop;
using System.Windows.Shapes;
using Document = Autodesk.Revit.DB.Document;
using static System.Net.WebRequestMethods;
using System.Xml.Linq;
using System.Windows.Controls;
using System.Windows.Media.Media3D;
using System.IO;
using CefSharp;
using System.Windows.Forms;
using Autodesk.Revit.DB.IFC;
using System.Windows.Documents;
using static System.Net.Mime.MediaTypeNames;
using System.Diagnostics;
using System.Reflection;
using System.Windows.Media.Imaging;
using Path = System.IO.Path;
using CefSharp.Wpf;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Threading;
using static BsddRevitPlugin.Logic.Model.ElementsManager;
using BsddRevitPlugin.Logic.UI.BsddBridge;

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
            MainData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);

        }
        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }

        private async void UpdateBsddSelection(MainData ifcData)
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
            MainData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }
        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }
        private async void UpdateBsddSelection(MainData ifcData)
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
            MainData selectionData = SelectionToJson(doc, elemList);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }
        public void SetBrowser(ChromiumWebBrowser browserObject)
        {
            browser = browserObject;
        }
        private async void UpdateBsddSelection(MainData ifcData)
        {
            var jsonString = JsonConvert.SerializeObject(ifcData);
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

            var elemType = ifcData.FamilyNameAndTypeName;

            // alle code van Casper
            
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

        public override void Execute(UIApplication uiapp, string args)
        {

            //string addinDirectory = Path.GetDirectoryName(addinLocation);
            GlobalBsddSearch.bsddSearch = new BsddSearch();

            HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            wnd = hwndSource.RootVisual as Window;
            if (wnd != null)
            {
                GlobalBsddSearch.bsddSearch.Owner = wnd;
                //bsddSearch.ShowInTaskbar = false;
                GlobalBsddSearch.bsddSearch.Show();
                //bsddSearch.UpdateSelection(jsonData);

            }
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            var name = doc.Title;
            var path = doc.PathName;

            //BsddBridge.BsddBridge.SetWindow(BsddSearchWindow);
            //BsddBridge.BsddBridge.SetParentWindow(wnd);

            //_bsddSearch = BsddSearchWindow;
            //Instance.ShowMainWindow(uiapp);
        }
        public void Close()
        {
            //System.Windows.Application.Current.Dispatcher.Invoke(() =>
            //{
            //    // Close or hide the window logic
            //    this.Close(); // or this.Hide();
            //});
            wnd.Close();
            GlobalBsddSearch.bsddSearch.Close();
        }

    }

    /// <summary>
    /// Tried to create an instance. This doesn't work yet
    /// </summary>
    public class EventHandlerBsddSearch2 : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        private static EventHandlerBsddSearch2 _instance;
        private static readonly object InstanceLock = new object();

        // ModelessForm instance
        private BsddSearch _bsddSearchWindow;

        // Separate thread to run Ui on
        private Thread _uiThread;

        // ModelessForm instance
        private Window wnd;

        public void Start(string args)
        {
            Raise(args);

        }
        public override void Execute(UIApplication uiapp, string args)
        {

            //string addinDirectory = Path.GetDirectoryName(addinLocation);
            //BsddSearch BsddSearchWindow = new BsddSearch();

            //HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            //wnd = hwndSource.RootVisual as Window;
            //if (wnd != null)
            //{
            //    BsddSearchWindow.Owner = wnd;
            //    //bsddSearch.ShowInTaskbar = false;
            //    BsddSearchWindow.Show();
            //    //bsddSearch.UpdateSelection(jsonData);

            //}
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            var name = doc.Title;
            var path = doc.PathName;

            //BsddBridge.BsddBridge.SetWindow(BsddSearchWindow);
            //BsddBridge.BsddBridge.SetParentWindow(wnd);

            Instance.ShowBsddSearchWindow(uiapp);
        }

        public void ShowBsddSearchWindow(UIApplication uiapp)
        {
            // If we do not have a thread started or has been terminated start a new one
            if (!(_uiThread is null) && _uiThread.IsAlive) return;


            _uiThread = new Thread(() =>
            {
                SynchronizationContext.SetSynchronizationContext(
                    new DispatcherSynchronizationContext(
                        Dispatcher.CurrentDispatcher));
                // The dialog becomes the owner responsible for disposing the objects given to it.
                _bsddSearchWindow = new BsddSearch();
                _bsddSearchWindow.Closed += (s, e) => Dispatcher.CurrentDispatcher.InvokeShutdown();
                _bsddSearchWindow.Show();
                Dispatcher.Run();
            });

            _uiThread.SetApartmentState(ApartmentState.STA);
            _uiThread.IsBackground = true;
            _uiThread.Start();
        }

        public static EventHandlerBsddSearch2 Instance
        {
            get
            {
                lock (InstanceLock)
                {
                    return _instance ?? (_instance = new EventHandlerBsddSearch2());
                }
            }
        }
    }

    [Transaction(TransactionMode.Manual)]
    /// <summary>
    /// This doesn't work yet
    /// </summary>
    public class OpenBsddSearchUiCommand : IExternalCommand
    {
        private static OpenBsddSearchUiCommand _instance;
        private static readonly object InstanceLock = new object();

        // ModelessForm instance
        private BsddSearch _bsddSearchWindow;

        // Separate thread to run Ui on
        private Thread _uiThread;

        private UIControlledApplication uicapp;

        private static readonly Logger Log = LogManager.GetCurrentClassLogger();

        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet _)
        {

            var uiapp = commandData.Application;
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            var name = doc.Title;
            var path = doc.PathName;

            return Execute(commandData.Application);
        }

        public Result Execute(UIApplication uiapp)
        {
            Instance.ShowBsddSearchWindow(uiapp);
            //Do all sorts of shiny stuff with your command. 
            return Result.Succeeded;
        }

        public void ShowBsddSearchWindow(UIApplication uiapp)
        {
            // If we do not have a thread started or has been terminated start a new one
            if (!(_uiThread is null) && _uiThread.IsAlive) return;
            

            _uiThread = new Thread(() =>
            {
                SynchronizationContext.SetSynchronizationContext(
                    new DispatcherSynchronizationContext(
                        Dispatcher.CurrentDispatcher));
                // The dialog becomes the owner responsible for disposing the objects given to it.
                _bsddSearchWindow = new BsddSearch();
                _bsddSearchWindow.Closed += (s, e) => Dispatcher.CurrentDispatcher.InvokeShutdown();
                _bsddSearchWindow.Show();
                Dispatcher.Run();
            });

            _uiThread.SetApartmentState(ApartmentState.STA);
            _uiThread.IsBackground = true;
            _uiThread.Start();
        }

        public void SetUIControlledApp(UIControlledApplication uicappObject)
        {
            uicapp = uicappObject;
        }
        public static OpenBsddSearchUiCommand Instance
        {
            get
            {
                lock (InstanceLock)
                {
                    return _instance ?? (_instance = new OpenBsddSearchUiCommand());
                }
            }
        }
    }

    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            //Select Selectorlist = new Select();
            UIApplication uiapp = commandData.Application;
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.ApplicationServices.Application app = uiapp.Application;
            Document doc = uidoc.Document;

            MyApp.DbDoc = commandData.Application.ActiveUIDocument.Document;
            MyApp.DbUiDoc = commandData.Application.ActiveUIDocument;

            return Result.Succeeded;
        }

        public class MyApp : Autodesk.Revit.UI.IExternalApplication
        {
            public static Autodesk.Revit.DB.Document DbDoc; // The current database document
            public static Autodesk.Revit.UI.UIDocument DbUiDoc; // The current database UIdocument

            public Result OnShutdown(UIControlledApplication application)
            {
                throw new NotImplementedException();
            }

            public Result OnStartup(UIControlledApplication application)
            {
                throw new NotImplementedException();
            }

        }
    }
}
