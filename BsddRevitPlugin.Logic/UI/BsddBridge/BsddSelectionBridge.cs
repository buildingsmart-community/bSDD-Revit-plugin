using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.Wrappers;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Windows;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{

    /// <summary>
    /// Represents a bridge for interacting with the bSDD selection UI.
    /// This class is exposed to JavaScript in CefSharp.
    /// </summary>
    public class BsddSelectionBridge
    {
        private EventHandlerBsddSearch _eventHandlerBsddSearch;
        private UpdateElementtypeWithIfcData _updateElementtypeWithIfcData;
        private UpdateSettings _updateSettings;
        private ExternalEvent _exEventUpdateElement;
        private ExternalEvent _exEventUpdateSettings;
        private static Window _bsddSearchParent;

        /// <summary>
        /// Initializes a new instance of the <see cref="BsddSelectionBridge"/> class.
        /// </summary>
        public BsddSelectionBridge()
        {
            _eventHandlerBsddSearch = new EventHandlerBsddSearch();
            _updateSettings = new UpdateSettings();
            _updateElementtypeWithIfcData = new UpdateElementtypeWithIfcData();
            _exEventUpdateElement = ExternalEvent.Create(_updateElementtypeWithIfcData);
            _exEventUpdateSettings = ExternalEvent.Create(_updateSettings);
        }

        /// <summary>
        /// Sets the parent window for the BsddSelectionBridge.
        /// </summary>
        /// <param name="bsddSearchParent">The parent window to set.</param>
        public void SetParentWindow(Window bsddSearchParent)
        {
            _bsddSearchParent = bsddSearchParent;
        }

        /// <summary>
        /// Cleans the parent window reference.
        /// </summary>
        public void CleanParentWindow()
        {
            _bsddSearchParent = null;
        }

        /// <summary>
        /// This method is exposed to JavaScript in CefSharp. 
        /// It opens the bSDD Search panel with the selected object parameters.
        /// </summary>
        /// <param name="ifcJsonData">The IFC data to search, in JSON format.</param>
        /// <returns>The serialized IFC data, in JSON format.</returns>
        public string bsddSearch(string ifcJsonData)
        {
            _bsddSearchParent?.Dispatcher.Invoke(() => _bsddSearchParent.Close());

            var converter = new IfcJsonConverter();
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);
            var bsddBridgeData = new BsddBridgeData
            {
                IfcData = new List<IfcData> { ifcData }
            };
            _eventHandlerBsddSearch.setBsddBridgeData(bsddBridgeData);
            _eventHandlerBsddSearch.Raise("openSearch");
            return JsonConvert.SerializeObject(ifcData);
        }

        /// <summary>
        /// This method is exposed to JavaScript in CefSharp. 
        /// It updates the settings from a JSON string.
        /// </summary>
        /// <param name="settingsJson">The JSON string of the new settings.</param>
        public void saveSettings(string settingsJson)
        {
            var settings = JsonConvert.DeserializeObject<BsddSettings>(settingsJson);
            _updateSettings.SetSettings(settings);
            _exEventUpdateSettings.Raise();
        }
    }
}