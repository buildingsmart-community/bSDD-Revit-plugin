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
using static NLog.LayoutRenderers.Wrappers.ReplaceLayoutRendererWrapper;

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

    public class ListAdjust
    {
        public List<Element> ListFilter(List<Element> elemList)
        {
            List<Element> elemListFiltered = new List<Element>();

            foreach (Element item in elemList)
            {
                try
                {
                    if (item != null && item.Category != null)
                    {
                        if (
                        item.Category.Name != "Levels" &&
                        item.Category.Name != "Location Data" &&
                        item.Category.Name != "Model Groups" &&
                        item.Category.Name != "RVT Links" &&
                        item.Category.Name != "Family Symbol" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".dwg" &&
                        item.Category.Name.Substring(System.Math.Max(0, item.Category.Name.Length - 4)) != ".pdf"
                        )
                        {
                            elemListFiltered.Add(item);
                        }
                    }
                }
                catch { }
            }
            return elemListFiltered;
        }

        public MainData elemToJSON(List<Element> elemList)
        {
            #region handmatig json vullen
            ////of dit
            //string JSONstring = "[\r\n";
            //int totalCount = elemList.Count();
            //int count = 0;

            //foreach (Element item in elemList)
            //{
            //    JSONstring += "    {\r\n";
            //    JSONstring += "        \"type\": \"" + GetParamValueByName("Export Type to IFC As", item) + "\",\r\n";
            //    JSONstring += "        \"name\": \"" + GetParamValueByName("IfcName", item) + "\",\r\n";
            //    JSONstring += "        \"description\": \"" + GetParamValueByName("IfcDescription", item) + "\",\r\n";
            //    JSONstring += "        \"predefinedType\": \"" + GetParamValueByName("Type IFC Predefined Type", item) + "\",\r\n";
            //    JSONstring += "        \"HasAssociations\":\r\n";
            //    JSONstring += "        [\r\n";
            //    JSONstring += "            {\r\n";
            //    JSONstring += "                \"type\": \"IfcClassificationReference\",\r\n";
            //    JSONstring += "                \"name\": \"" + GetParamValueByName("Assembly Description", item) + "\",\r\n";
            //    JSONstring += "                \"location\": \"" + GetLocationParam(item) + "\",\r\n";
            //    JSONstring += "                \"identification\": \"" + GetParamValueByName("Assembly Code", item) + "\",\r\n";
            //    JSONstring += "                \"referencedSource\":\r\n";
            //    JSONstring += "                {\r\n";
            //    JSONstring += "                    \"type\": \"IfcClassification\",\r\n";
            //    JSONstring += "                    \"name\": \"DigiBase Demo NL-SfB tabel 1\",\r\n";
            //    JSONstring += "                    \"location\": \"" + GetLocationParam(item) + "\"\r\n";
            //    JSONstring += "                }\r\n";
            //    JSONstring += "            }";

            //    int totalCount1 = item.GetMaterialIds(false).Count();
            //    if (totalCount1 > 0)
            //    {
            //        JSONstring += ",\r\n";
            //    }
            //    else
            //    {
            //        JSONstring += "\r\n";
            //    };
            //    int count1 = 0;
            //    foreach (ElementId m in item.GetMaterialIds(false))
            //    {
            //        JSONstring += "            {\r\n";
            //        JSONstring += "                \"type\": \"IfcMaterial\",\r\n";
            //        JSONstring += "                \"name\": \"" + GetParamValueByName("name", item) + "\",\r\n";
            //        JSONstring += "                \"description\": \"" + GetParamValueByName("description", item) + "\"\r\n";
            //        JSONstring += "            }";
            //        if ((count1 + 1) == totalCount1)
            //        {
            //        }
            //        else
            //        {
            //            JSONstring += ",";
            //        }
            //        count1++;
            //        JSONstring += "\r\n";
            //    }
            //    JSONstring += "        ]\r\n";
            //    JSONstring += "    }";
            //    if ((count + 1) == totalCount)
            //    {

            //    }
            //    else
            //    {
            //        JSONstring += ",";
            //    };
            //    count++;
            //    JSONstring += "\r\n";
            //}
            //JSONstring += "]";
            //string folder = @"C:\Temp\";
            //string fileName = "List`1.json";
            //string fullPath = folder + fileName;
            //System.IO.File.WriteAllText(fullPath, JSONstring);
            #endregion

            const string domain = "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten";
            List<string> filterDomains = new List<string>(){
                "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten",
                "https://identifier.buildingsmart.org/uri/digibase/nlsfb"
            };

            MainData mainData = new MainData();
            List<IfcData> ifcDataLst = new List<IfcData>();

            foreach (Element item in elemList)
            {
                string code = GetParamValueByName("Assembly Code", item);
                Uri domainUri = GetBsddDomainUri(domain);
                Uri classificationUri = GetBsddClassificationUri(domainUri, code);
                IfcData ifcData = new IfcData
                {
                    Type = GetParamValueByName("Export Type to IFC As", item),
                    Name = GetFamilyName(item, GetParamValueByName("IfcName", item)),
                    TypeName = GetFamilyTypeName(item, GetParamValueByName("IfcType", item)),
                    FamilyNameAndTypeName = GetFamilyName(item, GetParamValueByName("IfcName", item)) + " - " + GetFamilyTypeName(item, GetParamValueByName("IfcType", item)),
                    TypeId = GetTypeId(item),
                    Description = GetParamValueByName("IfcDescription", item),
                    PredefinedType = GetParamValueByName("Type IFC Predefined Type", item),
                    HasAssociations = new List<Association>
                    {
                        new IfcClassificationReference
                        {
                            Type = "IfcClassificationReference",
                            Name = GetParamValueByName("Assembly Description", item),
                            Location = classificationUri, // GetLocationParam(domain, item),
                            Identification = code,
                            ReferencedSource = new IfcClassification
                            {
                                Type = "IfcClassification",
                                Name = "DigiBase Demo NL-SfB tabel 1",
                                Location = domainUri
                            }
                        },
                        //new IfcMaterial
                        //{
                        //    //MaterialType = item.GetMaterialIds(false).First().ToString(),
                        //    MaterialName = "MaterialName",//GetMaterialName(item, Command.MyApp.DbDoc),
                        //    Description = "Description"//GetParamValueByName("Assembly Code", item)
                        //}
                    }
                };

                ifcDataLst.Add(ifcData);


            }
            //JObject json = JObject.Parse(JsonConvert.SerializeObject(ifcDataLst));

            mainData.Name = "testIFC";
            mainData.setDomain(domain);
            mainData.setFilterDomains(filterDomains);
            mainData.IfcData = ifcDataLst;
            var provider = new JsonBasedPersistenceProvider("C://temp");
            provider.Persist(mainData);
            return mainData;
        }

        public static string GetFamilyName(Element e, string IfcName)
        {
            if (IfcName != null && IfcName != "")
            {
                return IfcName;
            }
            else
            {
                try
                {
                    ElementId eId = e.Id;
                    if (eId == null) return "";
                    var elementType = e.Document.GetElement(eId) as ElementType;
                    return elementType.FamilyName;
                }
                catch
                {
                    return "";
                }
            }         
        }

        public static string GetTypeId(Element e)
        {
            try
            {
                ElementId eId = e.Id;
                if (eId == null) return "";
                return eId.ToString();
            }
            catch
            {
                return "";
            }
        }

    public static string GetFamilyTypeName(Element e, string IfcType)
        {
            if (IfcType != null && IfcType != "")
            {
                return IfcType;
            }
            else
            {
                try
                {
                    return e.Name;
                }
                catch 
                {
                    return "";
                }
            }
        }

        public string GetParamValueByName(String par, Element e)
        {
            Parameter p = e.LookupParameter(par);
            if (p != null)
            {
                switch (p.StorageType)
                {
                    case StorageType.Double:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.ElementId:
                        if (p.AsElementId().IntegerValue.ToString() == "" || p.AsElementId().IntegerValue.ToString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsElementId().IntegerValue.ToString();
                        }
                    case StorageType.Integer:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.None:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsValueString();
                        }
                    case StorageType.String:
                        if (p.AsValueString() == "" || p.AsValueString() == null)
                        {
                            return null;
                        }
                        else
                        {
                            return p.AsString();
                        }
                    default: return "n/a";
                }
            }
            else
            {
                return null;
            }
        }

        public Uri GetBsddDomainUri(string domain)
        {
            return new Uri(domain);
        }

        public Uri GetBsddClassificationUri(Uri domain, string code)
        {
            return new Uri(domain, code);
        }

        public Uri GetLocationParam(string domain, Element element)
        {
            Uri paramValue = new Uri(domain);

            foreach (Parameter parameter in element.Parameters)
            {
                if (parameter.Definition.Name == "location")
                {
                    paramValue = new Uri(parameter.ToString(), UriKind.Absolute);
                }
            }

            return paramValue;
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
