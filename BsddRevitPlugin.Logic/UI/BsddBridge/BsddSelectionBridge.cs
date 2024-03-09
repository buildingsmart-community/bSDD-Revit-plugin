using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Autodesk.Revit.UI.Events;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.Model;
using BsddRevitPlugin.Logic.UI.Services;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading;
using System.Windows;
using System.Windows.Controls;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{

    /// <summary>
    /// Represents a bridge for interacting with the bSDD selection UI.
    /// This class is exposed to JavaScript in CefSharp.
    /// </summary>
    public class BsddSelectionBridge
    {
        private ExternalEvent _bsddLastSelectionEvent;
        private EventHandlerBsddSearch _eventHandlerBsddSearch;
        private SelectElementsWithIfcData selectElementsWithIfcData;
        private UpdateUIonSave _updateUIEvent;


        /// <summary>
        /// Initializes a new instance of the <see cref="BsddSelectionBridge"/> class.
        /// </summary>
        public BsddSelectionBridge(ExternalEvent bsddLastSelectionExEvent, UpdateUIonSave updateUIEvent)
        {
            _bsddLastSelectionEvent = bsddLastSelectionExEvent;
            _eventHandlerBsddSearch = new EventHandlerBsddSearch(_bsddLastSelectionEvent);


            selectElementsWithIfcData = new SelectElementsWithIfcData();

            _updateUIEvent = updateUIEvent; 
        }

        /// <summary>
        /// This method is exposed to JavaScript in CefSharp. 
        /// It opens the bSDD Search panel with the selected object parameters.
        /// </summary>
        /// <param name="ifcJsonData">The IFC data to search, in JSON format.</param>
        /// <returns>The serialized IFC data, in JSON format.</returns>
        public string bsddSearch(string ifcJsonData)
        {

            var converter = new IfcJsonConverter();
            var ifcEntity = JsonConvert.DeserializeObject<IfcEntity>(ifcJsonData, converter);
            var bsddBridgeData = new BsddBridgeData
            {
                Settings = GlobalBsddSettings.bsddsettings,
                IfcData = new List<IfcEntity> { ifcEntity }
            };
            _eventHandlerBsddSearch.setBsddBridgeData(bsddBridgeData);
            _eventHandlerBsddSearch.Raise("openSearch");

            return JsonConvert.SerializeObject(ifcEntity);
        }

        /// <summary>
        /// This method is exposed to JavaScript in CefSharp. 
        /// It opens the bSDD Search panel with the selected object parameters.
        /// </summary>
        /// <param name="ifcJsonData">The IFC data to search, in JSON format.</param>
        /// <returns>The serialized IFC data, in JSON format.</returns>
        public void bsddSelect(string ifcJsonData)
        {

            var converter = new IfcJsonConverter();
            var ifcEntity = JsonConvert.DeserializeObject<IfcEntity>(ifcJsonData, converter);
            

            selectElementsWithIfcData.SetIfcData(ifcEntity);
            selectElementsWithIfcData.Raise("SelectElementsInModel");

        }

        /// <summary>
        /// This method is exposed to JavaScript in CefSharp. 
        /// It updates the settings from a JSON string.
        /// </summary>
        /// <param name="settingsJson">The JSON string of the new settings.</param>
        public void saveSettings(string settingsJson)
        {
            var settings = JsonConvert.DeserializeObject<BsddSettings>(settingsJson);

            //set the classificationFieldName for new dictionaries
            settings.MainDictionary.IfcClassification.ClassificationFieldName = ElementsManager.CreateParameterNameFromUri(settings.MainDictionary.IfcClassification.Location);

            foreach (var item in settings.FilterDictionaries)
            {
                item.IfcClassification.ClassificationFieldName = ElementsManager.CreateParameterNameFromUri(item.IfcClassification.Location);

            }
            _updateUIEvent.Raise(settings);
        }
        public string loadSettings()
        {
            return JsonConvert.SerializeObject(GlobalBsddSettings.bsddsettings);
        }
    }
}