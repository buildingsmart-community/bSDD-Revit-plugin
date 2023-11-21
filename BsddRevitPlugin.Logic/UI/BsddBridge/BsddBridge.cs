using Autodesk.Revit.UI;
using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;
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
        BSDDconnect.EventTest2 testEvent2;
        ExternalEvent testExEvent2;
        BSDDconnect.EventTest3 testEvent3;
        ExternalEvent testExEvent3;
        public BsddBridge()
        {
            // Initialize the events and external events
            testEvent2 = new BSDDconnect.EventTest2();
            testExEvent2 = ExternalEvent.Create(testEvent2);

            testEvent3 = new BSDDconnect.EventTest3();
            testExEvent3 = ExternalEvent.Create(testEvent3);
        }

        /// <summary>
        /// Saves the data returned from the bSDD API.
        /// </summary>
        /// <param name="ifcJsonData">The form data to save.</param>
        /// <returns>The response from the bSDD API.</returns>
        public string Save(string ifcJsonData)
        {


            testExEvent2.Raise();
            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<MainData>(ifcJsonData, converter);

            // TODO: Save the IfcData object to your desired location

            testEvent3.SetData(ifcData);
            testExEvent3.Raise();

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

            testExEvent2.Raise();
            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);




            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);

        }

        public string Button_Click(string data)
        {

            // MessageBox.Show("Button was clicked.");
            return data;

        }
    }
}
