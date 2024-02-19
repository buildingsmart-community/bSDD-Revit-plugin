using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;

namespace BsddRevitPlugin.Logic.Resources
{
    internal class IfcDataExample
    {

        public IfcEntity GetIfcDataFromRevit()
        {
            // Read the JSON data from the file
            string ifcJsonData = System.IO.File.ReadAllText(@"BsddRevitPlugin.Logic\Resources\ifcDataFromRevitExample.json");

            // Create an instance of the IfcDataConverter class
            var converter = new IfcJsonConverter();

            // Deserialize the JSON data into an IfcData object using the IfcDataConverter
            var ifcData = JsonConvert.DeserializeObject<IfcEntity>(ifcJsonData, converter);

            // Return the IfcData object
            return ifcData;
        }
    }
}
