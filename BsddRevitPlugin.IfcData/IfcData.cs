using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BsddRevitPlugin.IfcData
{
    /// <summary>
    /// Represents a reference to an IFC classification.
    /// </summary>
    public class IfcClassificationReference
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("identification")]
        public string Identification { get; set; }

        [JsonProperty("referencedSource")]
        public IfcClassification ReferencedSource { get; set; }
    }

    /// <summary>
    /// Represents an IFC classification.
    /// </summary>
    public class IfcClassification
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }

    /// <summary>
    /// Represents an IFC property set.
    /// </summary>
    public class IfcPropertySet
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("hasProperties")]
        public List<IfcPropertySingleValue> HasProperties { get; set; }
    }

    /// <summary>
    /// Represents an IFC property with a single value.
    /// </summary>
    public class IfcPropertySingleValue
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("specification")]
        public string Specification { get; set; }

        [JsonProperty("nominalValue")]
        public NominalValue NominalValue { get; set; }
    }

    /// <summary>
    /// Represents the nominal value of an IFC property.
    /// </summary>
    public class NominalValue
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }
    }

    /// <summary>
    /// Represents the bSDD data as an IFC object.
    /// </summary>
    public class IfcData
    {
        [JsonProperty("hasAssociations")]
        public List<IfcClassificationReference> HasAssociations { get; set; }

        [JsonProperty("isDefinedBy")]
        public List<IfcPropertySet> IsDefinedBy { get; set; }
    }
}
