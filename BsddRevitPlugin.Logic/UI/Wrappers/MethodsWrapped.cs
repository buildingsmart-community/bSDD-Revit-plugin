//TODO comments

#region ================== References ===================
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.IFC;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.BsddBridge;
using BsddRevitPlugin.Logic.UI.DockablePanel;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Interop;
using static BsddRevitPlugin.Logic.Model.ElementsManager;
using Document = Autodesk.Revit.DB.Document;
#endregion

#region ============ Namespace Declaration ============
/// <summary>
/// Represents an abstract base class for handling Revit selection events.
/// </summary>
namespace BsddRevitPlugin.Logic.UI.Wrappers
{
    public class UpdateUIonSave : RevitEventWrapper<BsddSettings>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        private IBrowserService browser;

        public override void Execute(UIApplication uiapp, BsddSettings bsddSettings)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            //UpdateSettings(bsddSettings);
            SettingsManager.SaveSettingsToGlobalParametersAndDataStorage(doc,bsddSettings);
            UpdateBsddLastSelection();


        }

        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddLastSelection()
        {
            ElementSet lastSelection = new ElementSet();
            List<Element> ListlastSelection = new List<Element>();
            try
            {
                ListlastSelection = GlobalSelection.LastSelectedElementsWithDocs[GlobalDocument.currentDocument.PathName];
                foreach(Element element in ListlastSelection)
                {
                    lastSelection.Insert(element);
                }
            }
            catch (Exception)
            {

            }
            var jsonString = JsonConvert.SerializeObject(ElementsManager.SelectionToIfcJson(GlobalDocument.currentDocument, lastSelection));
            var jsFunctionCall = $"updateSelection({jsonString});";

            if (browser.IsBrowserInitialized)
            {
                browser.ExecuteScriptAsync(jsFunctionCall);
            }
        }

    }
    public abstract class EventRevitSelection : RevitEventWrapper<string>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        protected Select Selectorlist = new Select();
        private IBrowserService browser;

        public override void Execute(UIApplication uiapp, string args)
        {
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Document doc = uidoc.Document;

            if (!(this is EventUseLastSelection))
            {
                var elemList = GetSelection(uiapp);
                                
                if (GlobalSelection.LastSelectedElementsWithDocs.ContainsKey(doc.PathName))
                {
                    //if contains, always make sure the value is the updated list
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName] = new List<Element>();
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName].Clear();
                    GlobalSelection.LastSelectedElementsWithDocs[doc.PathName].AddRange(elemList);
                }
                else
                {
                    //if first time, add to dictionary
                    //List<Element> elemtypes = new List<Element>();
                    //elemtypes.AddRange(elemList);
                    GlobalSelection.LastSelectedElementsWithDocs.Add(doc.PathName, elemList);

                }
            }

            // Pack data into json format
            ElementSet elemSet = new ElementSet();
            foreach(Element elem in GlobalSelection.LastSelectedElementsWithDocs[doc.PathName])
            {
                elemSet.Insert(elem);
            }
            List<IfcEntity> selectionData = SelectionToIfcJson(doc, elemSet);
            
            // Send MainData to BsddSelection html
            UpdateBsddSelection(selectionData);
        }

        protected abstract List<Element> GetSelection(UIApplication uiapp);

        public void SetBrowser(IBrowserService browserObject)
        {
            browser = browserObject;
        }

        public void UpdateBsddSelection(List<IfcEntity> ifcData)
        {
            
            var jsonString = JsonConvert.SerializeObject(ifcData);
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
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.SelectElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in Revit.
    /// </summary>
    public class EventSelectAll : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElements(uiapp);
        }
    }

    /// <summary>
    /// Selection event for selecting all elements in the current Revit view.
    /// </summary>
    public class EventSelectView : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            return Selectorlist.AllElementsView(uiapp);
        }
    }

    public class EventUseLastSelection : EventRevitSelection
    {
        protected override List<Element> GetSelection(UIApplication uiapp)
        {
            // Use the last selected elements
            return GlobalSelection.LastSelectedElementsWithDocs[GlobalDocument.currentDocument.PathName];
        }
    }


    /// <summary>
    /// Represents a class that triggers the writing of IFC data into a Revit type object.
    /// </summary>
    public class UpdateElementtypeWithIfcData : RevitEventWrapper<IfcEntity>
    {
        Logger logger = LogManager.GetCurrentClassLogger();

        IfcEntity ifcData;

        public override void Execute(UIApplication uiapp, IfcEntity ifcDataObject)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;

            SetIfcDataToRevitElement(doc, ifcDataObject);
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

            SelectElementsWithIfcData(uidoc, ifcData);
        }
        public void SetIfcData(IfcEntity ifcDataObject)
        {
            ifcData = ifcDataObject;
        }

    }

    /// <summary>
    /// Represents a class that triggers the writing of settings into the BsddSettings object and the DataStorage.
    /// </summary>
    public class UpdateSettings : RevitEventWrapper<BsddSettings>
    {
        Logger logger = LogManager.GetCurrentClassLogger();


        public override void Execute(UIApplication uiapp, BsddSettings settingsObject)
        {
            var uidoc = uiapp.ActiveUIDocument;
            var doc = uidoc.Document;
            SettingsManager.SaveSettingsToGlobalVariable(settingsObject);
            SettingsManager.SaveSettingsToDataStorage(doc, settingsObject);
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
#endregion