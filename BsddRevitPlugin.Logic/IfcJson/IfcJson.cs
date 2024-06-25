using Newtonsoft.Json;
using Revit.IFC.Import.Data;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;

namespace BsddRevitPlugin.Logic.IfcJson
{
    /// <summary>
    /// Represents the bSDD data as an IFC object.
    /// based on IfcTypeProduct:
    /// https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTypeProduct.htm
    /// </summary>
    public class IfcEntity
    {
        /// <summary>
        /// IfcJson parameter for the IFC entity type.
        /// </summary>
        [JsonProperty("instance")]
        public bool Instance { get; set; }

        /// <summary>
        /// IfcJson parameter for the IFC entity type.
        /// </summary>
        [JsonProperty("type")]
        public string Type { get; set; }

        /// <summary>
        /// Optional name for use by the participating software systems or users. For some subtypes of IfcRoot
        /// the insertion of the Name attribute may be required. This would be enforced by a where rule.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Optional name for use by the participating software systems or users. For some subtypes of IfcRoot
        /// the insertion of the Name attribute may be required. This would be enforced by a where rule.
        /// </summary>
        [JsonProperty("material")]
        public string Material { get; set; }

        /// <summary>
        /// Optional description, provided for exchanging informative comments.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// The tag (or label) identifier at the particular instance of a product, e.g. the serial number,
        /// or the position number. It is the identifier at the occurrence level.
        /// </summary>
        [JsonProperty("tag")]
        public string Tag { get; set; }

        /// <summary>
        /// Identifies the predefined types of an element from which the type required may be set.
        /// Not part of IfcTypeProduct, but used in many supertypes
        /// </summary>
        [JsonProperty("predefinedType")]
        public string PredefinedType { get; set; }

        /// <summary>
        /// Reference to the relationship objects, that associates external references or other resource
        /// definitions to the object. Examples are the association to library, documentation or classification.
        /// I our case mainly IfcClassificationReference and IfcMaterial
        /// </summary>
        [JsonProperty("hasAssociations")]
        public List<Association> HasAssociations { get; set; }

        /// <summary>
        /// TODO: for types this should be HasPropertySets, IsDefinedBy is for instances
        /// Set of relationships to property set definitions attached to this object. Those statically or
        /// dynamically defined properties contain alphanumeric information content that further defines the object.
        /// </summary>
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

    public class IfcClassificationReference : Association
    {
        [JsonProperty("location")]
        public Uri Location { get; set; }

        [JsonProperty("identification")]
        public string Identification { get; set; }

        [JsonProperty("referencedSource")]
        public IfcClassification ReferencedSource { get; set; }
    }
    
    public class IfcMaterial : Association
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("HasRepresentation")]
        public IfcMaterialDefinitionRepresentation HasRepresentation { get; set; }

        [JsonProperty("isRelatedWith")]
        public IfcMaterialRelationship IsRelatedWith { get; set; }

        [JsonProperty("relatesTo")]
        public IfcMaterialRelationship RelatesTo { get; set; }
    }

    public class IfcMaterialDefinitionRepresentation
    {
        [JsonProperty("representedMaterial")]
        public IfcMaterial RepresentedMaterial { get; set; }
    }

    public class IfcMaterialRelationship
    {
        [JsonProperty("relatingMaterial")]
        public IfcMaterial RelatingMaterial { get; set; }
        
        [JsonProperty("relatedMaterials")]
        public IfcMaterial RelatedMaterials { get; set; }
        
        [JsonProperty("expression")]
        public string Expression { get; set; }
    }

    public class IfcMaterialLayerSet : Association
    {
        [JsonProperty("ifcMaterialLayer")]
        public List<IfcMaterialLayer> IfcMaterialLayer { get; set; }

        [JsonProperty("layerSetName")]
        public string LayerSetName { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("totalThickness")]
        public double TotalThickness { get; set; }
    }

    public class IfcMaterialLayer
    {
        [JsonProperty("material")]
        public IfcMaterial Material { get; set; }

        [JsonProperty("layerThickness")]
        public double LayerThickness { get; set; }

        [JsonProperty("isVentilated")]
        public bool IsVentilated { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("priority")]
        public int Priority { get; set; }

        [JsonProperty("toMaterialLayerSet")]
        public IfcMaterialLayerSet ToMaterialLayerSet { get; set; }
    }

    public class IfcMaterialProfileSet : Association
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("materialProfiles")]
        public List<IfcMaterialProfile> MaterialProfiles { get; set; }

        [JsonProperty("compositeProfile")]
        public IfcCompositeProfileDef CompositeProfile { get; set; }
    }
    public class IfcMaterialProfile : Association
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("material")]
        public IfcMaterial Material { get; set; }

        [JsonProperty("Profile")]
        public IfcProfileDef Profile { get; set; }

        [JsonProperty("priority")]
        public int Priority { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("ToMaterialProfileSet")]
        public IfcMaterialProfileSet ToMaterialProfileSet { get; set; }
    }

    public class IfcCompositeProfileDef
    {
        //Profiles
        //Label
    }
    public class IfcProfileDef
    {
        //ProfileType
        //ProfileName
        //HasExternalReference
        //HasProperties
    }

    /// <summary>
    /// Represents an IFC classification.
    /// </summary>
    public class IfcClassification
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

        [JsonProperty("edition")]
        public string Edition { get; set; }

        [JsonProperty("editionDate")]
        public DateTime EditionDate { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("location")]
        public Uri Location { get; set; } // Renamed to Specification in IFC4

        //[JsonProperty("referenceTokens")]
        //public List<string> ReferenceTokens { get; set; }
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
        public List<IfcProperty> HasProperties { get; set; }
    }

    /// <summary>
    /// IfcProperty is an abstract generalization for all types of properties that can be associated with IFC objects through the property set mechanism.
    /// </summary>
    public class IfcProperty
    {
        [JsonProperty("type")]
        public virtual string Type { get; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("specification")]
        public string Specification { get; set; }

        public IfcProperty()
        {
            Type = "IfcProperty";
        }
    }

    /// <summary>
    /// The property with a single value IfcPropertySingleValue defines a property object which has a single (numeric or descriptive) value assigned.
    /// </summary>
    public class IfcPropertySingleValue : IfcProperty
    {
        [JsonProperty("type")]
        public override string Type { get; }

        [JsonProperty("nominalValue")]
        public IfcValue NominalValue { get; set; }

        public IfcPropertySingleValue() : base()
        {
            Type = "IfcPropertySingleValue";
        }
    }

    /// <summary>
    /// A property with an enumerated value, IfcPropertyEnumeratedValue, defines a property object which has a value assigned that is chosen from an enumeration.
    /// </summary>
    public class IfcPropertyEnumeratedValue : IfcProperty
    {
        [JsonProperty("type")]
        public override string Type { get; }

        [JsonProperty("enumerationValues")]
        public List<IfcValue> EnumerationValues { get; set; }

        [JsonProperty("enumerationReference")]
        public IfcPropertyEnumeration EnumerationReference { get; set; }

        public IfcPropertyEnumeratedValue() : base()
        {
            Type = "IfcPropertyEnumeratedValue";
        }
    }

    /// <summary>
    /// Represents the nominal value of an IFC property.
    /// </summary>
    public class IfcValue
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("value")]
        //public object Value { get; set; }
        public object Value { get; set; }
    }

    public class IfcPropertyEnumeration
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("enumerationValues")]
        public HashSet<IfcValue> EnumerationValues { get; set; }

        public IfcPropertyEnumeration()
        {
            Type = "IfcPropertyEnumeration";
        }
    }

}