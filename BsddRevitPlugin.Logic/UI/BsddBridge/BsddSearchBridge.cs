using Autodesk.Revit.DB.Events;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using Newtonsoft.Json;
using System.Windows;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{

    public class BsddSearchBridge
    {

        // Declaration of events and external events
        EventHandlerBsddSearch eventHandlerBsddSearch;
        UpdateElementtypeWithIfcData updateElementtypeWithIfcData;
        ExternalEvent ExEventBsddSearch;
        ExternalEvent ExEventUpdateElement;


        private static BsddSearch _bsddSearch;
        private static Window _bsddSearchParent;

        public BsddSearchBridge()
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
        /// <summary>
        /// Saves the data returned from the bSDD API.
        /// </summary>
        /// <param name="ifcJsonData">The form data to save.</param>
        /// <returns>The response from the bSDD API.</returns>
        public string save(string ifcJsonData)
        {

            //OpenBsddSearchUiCommand a = new OpenBsddSearchUiCommand();

            //a.Execute();
            //testExEvent2.Raise();
            // EventHandlerBsddSearch.Execute(Ap);

            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);

            // TODO: Save the IfcData object to your desired location

            //BsddBridgeSave._eventHandlerBsddSearchSave.Close();

            updateElementtypeWithIfcData.SetIfcData(ifcData);
            ExEventUpdateElement.Raise();

            _bsddSearchParent.Dispatcher.Invoke(() => _bsddSearchParent.Close());


            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);

        }
    }

}
