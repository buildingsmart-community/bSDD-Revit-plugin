using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;

namespace BsddRevitPlugin.Logic
{
    /// <summary>
    /// Provides functionality to interact with the bSDD components.
    /// </summary>
    public class BsddBridge
    {

        public BsddBridge()
        {
        }

        /// <summary>
        /// Saves the data returned from the bSDD API.
        /// </summary>
        /// <param name="ifcJsonData">The form data to save.</param>
        /// <returns>The response from the bSDD API.</returns>
        public string Save(string ifcJsonData)
        {
            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcData>(ifcJsonData, converter);

            // TODO: Save the IfcData object to your desired location

            // Return the serialized JSON data for the IfcData object
            return JsonConvert.SerializeObject(ifcData);
        }
    }
}
