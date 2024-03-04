using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using Newtonsoft.Json;
using NLog;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Interop;
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

        // This list will store the last selected elements
        public static List<ElementType> LastSelectedElements { get; private set; } = new List<ElementType>();
        public static Dictionary<Document ,  List<ElementType> > LastSelectedElementsWithDocs { get; private set; } = new Dictionary<Document, List<ElementType>>();

        protected Select Selectorlist = new Select();
        private IBrowserService browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            if (!(this is EventUseLastSelection))
            {
                var elemList = GetSelection(uiapp);
                // Update LastSelectedElements for other events
                LastSelectedElements.Clear();
                LastSelectedElements.AddRange(elemList);
                LastSelectedElements = ListFilter(LastSelectedElements);

                if (LastSelectedElementsWithDocs.ContainsKey(doc))
                {
                    //if contains, always make sure the value is the updated list
                    LastSelectedElementsWithDocs[doc].Clear();
                    LastSelectedElementsWithDocs[doc] = LastSelectedElements;
                }
                else
                {
                    //if first time, add to dictionary
                    LastSelectedElementsWithDocs.Add(doc, LastSelectedElements);

                }


            }

            // Pack data into json format
            List<IfcEntity> selectionData = SelectionToIfcJson(doc, LastSelectedElements);

            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }

        protected abstract List<ElementType> GetSelection(UIApplication uiapp);

        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddSelection(List<IfcEntity> ifcData)
        {
            var settings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };
            var jsonString = JsonConvert.SerializeObject(ifcData);
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }
        public void UpdateLastSelection(Document doc)
        {

            if (LastSelectedElements.First().Document.PathName != doc.PathName)
            {
                //If current selection is from another document

                if (LastSelectedElementsWithDocs.ContainsKey(doc))
                {
                    //if contains, always make sure the value is the updated list
                    LastSelectedElements.Clear();
                    LastSelectedElements.AddRange(LastSelectedElementsWithDocs[doc]);
                }
                else
                {
                    //if first time, clear list
                    LastSelectedElements.Clear();

                }

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

    public class EventUseLastSelection : EventRevitSelection
    {
        protected override List<ElementType> GetSelection(UIApplication uiapp)
        {
            // Use the last selected elements
            return EventRevitSelection.LastSelectedElements;
        }
    }


    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class UpdateElementtypeWithIfcData : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcEntity ifcData;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SetIfcDataToRevitElement(doc, ifcData);
        }
        public void SetIfcData(IfcEntity ifcDataObject)
        {
            ifcData = ifcDataObject;
        }

    }

    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class SelectElementsWithIfcData : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcEntity ifcData;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SelectElementsWithIfcData(doc, ifcData);
        }
        public void SetIfcData(IfcEntity ifcDataObject)
        {
            ifcData = ifcDataObject;
        }

    }

    /// <summary>
    /// Represents a class that triggers the writing of settings into the BsddSettings object and the DataStorage.
    /// </summary>
    public class UpdateSettings : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        BsddSettings settings;

        public override void Execute(UIApplication uiapp, string args)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            SettingsManager.SaveSettingsToGlobalVariable(settings);
            SettingsManager.SaveSettingsToDataStorage(doc, settings);
        }
        public void SetSettings(BsddSettings settingsObject)
        {
            settings = settingsObject;
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
        private ExternalEvent _bsddLastSelectionEvent;

        public EventHandlerBsddSearch(ExternalEvent bsddLastSelectionEvent)
        {
            _bsddLastSelectionEvent = bsddLastSelectionEvent;
        }

        public override void Execute(UIApplication uiapp, string args)
        {
            _bsddSearch = new BsddSearch(_bsddBridgeData, _bsddLastSelectionEvent);

            HwndSource hwndSource = HwndSource.FromHwnd(uiapp.MainWindowHandle);
            wnd = hwndSource.RootVisual as Window;
            if (wnd != null)
            {
                _bsddSearch.Owner = wnd;
                //bsddSearch.ShowInTaskbar = false;
                _bsddSearch.Show();

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
