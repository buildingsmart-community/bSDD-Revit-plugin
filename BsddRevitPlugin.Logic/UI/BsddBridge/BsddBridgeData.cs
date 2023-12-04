using BsddRevitPlugin.Logic.IfcJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BsddRevitPlugin.Logic.UI.BsddBridge
{
    /// <summary>
    /// Represents the data structure for communication between the application and bSDD UI.
    /// </summary>
    public class BsddBridgeData
    {
        /// Gets or sets the name of the bridge.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the main dictionary URI.
        /// </summary>
        [JsonProperty("mainDictionaryUri")]
        public Uri MainDictionaryUri { get; set; }

        /// <summary>
        /// Gets or sets the filter dictionary URIs.
        /// </summary>
        [JsonProperty("filterDictionaryUris")]
        public List<Uri> FilterDictionaryUris { get; set; } = new List<Uri>();

        /// <summary>
        /// Gets or sets the IFC data.
        /// Input can be a list of multiple IfcData objects,
        /// UI always returns a list containing a single IfcData object.
        /// </summary>
        [JsonProperty("ifcData")]
        public List<IfcData> IfcData { get; set; } = new List<IfcData>();

        /// <summary>
        /// Sets the main dictionary URI.
        /// </summary>
        /// <param name="domain">The domain of the main dictionary.</param>
        public void setDomain(string domain)
        {
            MainDictionaryUri = new Uri(domain);
        }

        /// <summary>
        /// Adds a filter dictionary URI.
        /// </summary>
        /// <param name="domain">The domain of the filter dictionary.</param>
        public void addFilterDomain(string domain)
        {
            FilterDictionaryUris.Add(new Uri(domain));
        }

        /// <summary>
        /// Sets the filter dictionary URIs.
        /// </summary>
        /// <param name="domains">The domains of the filter dictionaries.</param>
        public void setFilterDomains(List<string> domains)
        {
            foreach (string domain in domains)
            {
                FilterDictionaryUris.Add(new Uri(domain));
            }
        }
    }
}
