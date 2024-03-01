using Autodesk.Revit.DB.Events;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Windows;
using static BsddRevitPlugin.Logic.UI.View.BsddSearch;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{

    public class BsddSearchBridge
    {

        // Declaration of events and external events
        EventHandlerBsddSearch eventHandlerBsddSearch;
        UpdateElementtypeWithIfcData updateElementtypeWithIfcData;
        ExternalEvent ExEventBsddSearch;
        ExternalEvent ExEventUpdateElement;
        ExternalEvent _bsddLastSelectionEvent;


        private static BsddSearch _bsddSearch;
        private static Window _bsddSearchParent;
        private static BsddBridgeData _bsddBridgeData;


        public BsddSearchBridge(BsddBridgeData bsddBridgeData, ExternalEvent bsddLastSelectionEvent) // Modify this line
        {
            _bsddBridgeData = bsddBridgeData;
            _bsddLastSelectionEvent = bsddLastSelectionEvent;
            //SetParentWindow(window);
            // Initialize the events and external events
            //EventHandlerBsddSearch = EventHandlerBsddSearchUI;
            eventHandlerBsddSearch = new EventHandlerBsddSearch(_bsddLastSelectionEvent);
            ExEventBsddSearch = ExternalEvent.Create(eventHandlerBsddSearch);
            updateElementtypeWithIfcData = new UpdateElementtypeWithIfcData();
            ExEventUpdateElement = ExternalEvent.Create(updateElementtypeWithIfcData);
        }
        public void SetParentWindow(Window bsddSearchParent)
        {
            _bsddSearchParent = bsddSearchParent;
        }
        /// <summary>
        /// Saves the data returned from the bSDD API.
        /// </summary>
        /// <param name="ifcJsonData">The form data to save.</param>
        /// <returns>The response from the bSDD API.</returns>
        public string save(string ifcJsonData)
        {

            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcEntity = JsonConvert.DeserializeObject<IfcEntity>(ifcJsonData, converter);

            // TODO: Save the IfcData object to your desired location

            //BsddBridgeSave._eventHandlerBsddSearchSave.Close();

            updateElementtypeWithIfcData.SetIfcData(ifcEntity);
            ExEventUpdateElement.Raise();

            _bsddSearchParent.Dispatcher.Invoke(() => _bsddSearchParent.Close());

            _bsddLastSelectionEvent.Raise();

            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcEntity);

        }
        public string loadConfig()
        {
            Search defaultSearch = null;
            var bsddApiEnvironment = _bsddBridgeData.Settings.BsddApiEnvironment;
            var mainDictionary = _bsddBridgeData.Settings.MainDictionary;

            var ifcEntity = _bsddBridgeData.IfcData[0];
            var ifcEntityName = ifcEntity.Name;

            var domain = new Domain
            {
                value = mainDictionary.IfcClassification.Location.ToString(),
                label = mainDictionary.IfcClassification.Name,
            };

            // iterate over the ifcEntity hasAssociations, for every one with type == IfcClassificationReference, check if its referencedSource is the same as the domainUri then set the defaultSearch to that classificationReference it's location(value) and name(label)
            ifcEntity.HasAssociations.ForEach(association =>
            {
                if (association.Type == "IfcClassificationReference")
                {
                    var classificationReference = association as IfcClassificationReference;
                    if (classificationReference != null && classificationReference.ReferencedSource != null && classificationReference.ReferencedSource.Location != null)
                    {
                        if (classificationReference.ReferencedSource.Location == mainDictionary.IfcClassification.Location)
                        {
                            defaultSearch = new Search
                            {
                                value = classificationReference.Location?.ToString(),
                                label = classificationReference.Name,
                            };
                        }
                    }
                }
            });

            var bsddSearchConfig = new BsddSearchConfig
            {
                baseUrl = bsddApiEnvironment,
                defaultDomains = new List<Domain>
                    {
                        domain
                    },
                defaultSearch = defaultSearch,
                ifcEntity = ifcEntity
            };

            return JsonConvert.SerializeObject(bsddSearchConfig);
        }
    }

}
