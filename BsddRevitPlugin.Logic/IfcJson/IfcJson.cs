using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BsddRevitPlugin.Logic.IfcJson
{
    /// <summary>
    /// Message data including the main domain and filter domains
    /// </summary>
    public class MainData
    {
        [JsonProperty("domain")]
        public Uri Domain { get; set; }
    
        [JsonProperty("filters")]
        public List<Uri> Filters { get; set; }


        [JsonProperty("ifcData")]
        public List<IfcData> IfcData { get; set; }
    }

    /// <summary>
    /// Represents the bSDD data as an IFC object.
    /// </summary>
    public class IfcData
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("predefinedType")]
        public string PredefinedType { get; set; }

        [JsonProperty("hasAssociations")]
        public List<Association> HasAssociations { get; set; }

        [JsonProperty("isDefinedBy")]
        public List<IfcPropertySet> IsDefinedBy { get; set; }
    }
    /// <summary>
    /// Represents a reference to an IFC classification.
    /// </summary>
    public class Association
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public class IfcClassificationReference: Association
    {

        [JsonProperty("location")]
        public Uri Location { get; set; }

        [JsonProperty("identification")]
        public string Identification { get; set; }

        [JsonProperty("referencedSource")]
        public IfcClassification ReferencedSource { get; set; }
    }
    public class IfcMaterial: Association
    {
        [JsonProperty("description")]
        public string Description { get; set; }
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

        [JsonProperty("location")]
        public Uri Location { get; set; }
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


}
