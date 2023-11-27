﻿using Autodesk.Revit.DB.Events;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using Newtonsoft.Json;
using System.Windows;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{

    public class BsddSelectionBridge
    {

        // Declaration of events and external events
        EventHandlerBsddSearch eventHandlerBsddSearch;
        UpdateElementtypeWithIfcData updateElementtypeWithIfcData;
        ExternalEvent ExEventBsddSearch;
        ExternalEvent ExEventUpdateElement;


        private static BsddSearch _bsddSearch;
        private static Window _bsddSearchParent;

        public BsddSelectionBridge()
        {
            //SetParentWindow(window);
            // Initialize the events and external events
            //EventHandlerBsddSearch = EventHandlerBsddSearchUI;
            eventHandlerBsddSearch = new EventHandlerBsddSearch();
            ExEventBsddSearch = ExternalEvent.Create(eventHandlerBsddSearch);
            updateElementtypeWithIfcData = new UpdateElementtypeWithIfcData();
            ExEventUpdateElement = ExternalEvent.Create(updateElementtypeWithIfcData);
        }

        public void SetParentWindow(Window bsddSearchParent)
        {
            _bsddSearchParent = bsddSearchParent;
        }
        public void CleanParentWindow()
        {
            _bsddSearchParent = null;
        }
        /// <summary>
        /// Opens the bSDD Search panel with the selected object parameters
        /// </summary>
        /// <param name="ifcJsonData">The IFC data to search.</param>
        /// <returns></returns>
        public string bsddSearch(string ifcJsonData)
        {
            //      uicapp.ControlledApplication
            //.ApplicationInitialized
            //  += ControlledApplication_ApplicationInitialized;

            //uicapp.ControlledApplication.ApplicationInitialized += ControlledApplication_ApplicationInitialized;
            //var command = new OpenBsddSearchUiCommand();
            //command.Execute();

            if (_bsddSearchParent != null)
            {
                _bsddSearchParent.Dispatcher.Invoke(() => _bsddSearchParent.Close());
            }

            eventHandlerBsddSearch.Raise("openSearch");
            //ExEventBsddSearch.Raise();

            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);

            //EventHandlerBsddSearch.Raise(_bsddSearch);
            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);

        }
    }
}
