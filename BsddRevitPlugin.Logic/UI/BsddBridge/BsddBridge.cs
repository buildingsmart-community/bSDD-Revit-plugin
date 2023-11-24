using Autodesk.Revit.DB.Events;
using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using BsddRevitPlugin.Logic.UI.View;
using BsddRevitPlugin.Logic.UI.Wrappers;
using CefSharp;
using Newtonsoft.Json;
using System.IO;
using System.Reflection;
using System.Windows;
using BSDDconnect = BsddRevitPlugin.Logic.UI.Wrappers;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{
    /// <summary>
    /// Provides functionality to interact with the bSDD components.
    /// </summary>
    public class BsddBridge
    {

        // Declaration of events and external events
        EventHandlerBsddSearch EventHandlerBsddSearch;
        ExternalEvent ExEventBsddSearch;

        public BsddBridge()
        {
            // Initialize the events and external events
            //EventHandlerBsddSearch = EventHandlerBsddSearchUI;
            EventHandlerBsddSearch = new EventHandlerBsddSearch();
            ExEventBsddSearch = ExternalEvent.Create(EventHandlerBsddSearch);

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

            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);

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

            ExEventBsddSearch.Raise();

            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);


            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);

        }
        private void ControlledApplication_ApplicationInitialized(
            object sender,
            ApplicationInitializedEventArgs e)
        {
            var command = new OpenBsddSearchUiCommand();

            //I never remember if the sender is Application or UIApplication

            if (sender is UIApplication)
                command.Execute(sender as UIApplication);
            else
                command.Execute(new UIApplication(sender as Autodesk.Revit.ApplicationServices.Application));
        }

        public string Button_Click(string data)
        {

            // MessageBox.Show("Button was clicked.");
            return data;

        }
    }
}
