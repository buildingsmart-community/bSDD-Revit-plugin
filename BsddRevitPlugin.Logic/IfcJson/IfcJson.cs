/**
 * File summary:
 * - File name: IfcJson.cs
 * - Description: Json Definition for the IfcEntity to export to the BSDD tool
 * - Copyright: Open Source
*/

#region ================== References ===================
using Autodesk.Revit.DB;
using Autodesk.Revit.Exceptions;
using Newtonsoft.Json;
using Revit.IFC.Import.Data;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Security.Cryptography;
#endregion

//TODO regions
#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.IfcJson
{
    /// <summary>
    /// Builder of IfcEntity
    /// </summary>
    public class IfcEntityBuilder
    {
        private readonly IfcEntity _entity = new IfcEntity();

        public IfcEntityBuilder AddInstance(bool instance)
        {
            _entity.Instance = instance;
            return this;
        }

        public IfcEntityBuilder AddType(string type)
        {
            _entity.Type = type;
            return this;
        }

        public IfcEntityBuilder AddName(string name)
        {
            _entity.Name = name;
            return this;
        }

        public IfcEntityBuilder AddMaterial(string material)
        {
            _entity.Material = material;
            return this;
        }

        public IfcEntityBuilder AddDescription(string description)
        {
            _entity.Description = description;
            return this;
        }

        public IfcEntityBuilder AddTag(string tag)
        {
            _entity.Tag = tag;
            return this;
        }

        public IfcEntityBuilder AddPredefinedType(string predefinedType)
        {
            _entity.PredefinedType = predefinedType;
            return this;
        }

        public IfcEntityBuilder AddHasAssociations(List<Association> associationList)
        {
            if (associationList.Count < 1)
            {
                associationList = new List<Association>();
            }

            _entity.HasAssociations = associationList;
            return this;
        }

        public IfcEntityBuilder AddIsDefinedBy(List<IfcPropertySet> ifcPropertySetList)
        {
            if (ifcPropertySetList.Count < 1)
            {
                ifcPropertySetList = new List<IfcPropertySet>();
            }

            _entity.IsDefinedBy = ifcPropertySetList;
            return this;
        }

        public IfcEntity Build()
        {
            return _entity;
        }
    }
    
    
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
        /// TODO: - EB - for types this should be HasPropertySets, IsDefinedBy is for instances
        /// Set of relationships to property set definitions attached to this object. Those statically or
        /// dynamically defined properties contain alphanumeric information content that further defines the object.
        /// </summary>
        [JsonProperty("isDefinedBy")]
        public List<IfcPropertySet> IsDefinedBy { get; set; }
    }

    /// <summary>
    /// An IfcClassification is used for the arrangement of objects into a class or category according 
    /// to a common purpose or their possession of common characteristics. A classification in the sense 
    /// of IfcClassification is taxonomy, or taxonomic scheme, arranged in a hierarchical structure. A 
    /// category of objects relates to other categories in a generalization-specialization relationship. 
    /// Therefore the classification items in an classification are organized in a tree structure.
    /// </summary>
    public class IfcClassification
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        /// <summary>
        /// Source (or publisher) for this classification.
        /// </summary>
        [JsonProperty("source")]
        public string Source { get; set; }

        /// <summary>
        /// The edition or version of the classification system from which the classification notation 
        /// is derived.
        /// </summary>
        [JsonProperty("edition")]
        public string Edition { get; set; }

        /// <summary>
        /// The date on which the edition of the classification used became valid.
        /// </summary>
        [JsonProperty("editionDate")]
        public DateTime EditionDate { get; set; }

        /// <summary>
        /// The name or label by which the classification used is normally known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Additional description provided for the classification.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Resource identifier or locator, provided as URI, URN or URL, of the classification.
        /// </summary>
        [JsonProperty("location")]
        public Uri Location { get; set; } // Renamed to Specification in IFC4

        /// <summary>
        /// The delimiter tokens that are used to mark the boundaries of individual facets (substrings) 
        /// in a classification reference.
        /// </summary>
        //[JsonProperty("referenceTokens")]
        //public List<string> ReferenceTokens { get; set; }
    }

    #region ================ Base classes ===============
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
    #endregion

    /// <summary>
    /// An IfcClassificationReference is a reference into a classification system or source (see 
    /// IfcClassification). An optional inherited ItemReference key is also provided to allow more 
    /// specific references to classification items (or tables) by type. The inherited Name attribute 
    /// allows for a human interpretable designation of a classification notation (or code) - see use 
    /// definition of "Lightweight Classification".
    /// </summary>
    public class IfcClassificationReference : Association
    {
        /// <summary>
        /// Optionally holds a direct URI link into the classification system (or source) to hyperlink 
        /// the classification key.
        /// </summary>
        [JsonProperty("location")]
        public Uri Location { get; set; }

        /// <summary>
        /// Holds the key provided for a specific references to classification items (or tables).
        /// </summary>
        [JsonProperty("identification")]
        public string Identification { get; set; }

        /// <summary>
        /// The classification system or source that is referenced.
        /// </summary>
        [JsonProperty("referencedSource")]
        public IfcClassification ReferencedSource { get; set; }
    }

    #region IfcMaterial defenition

    /// <summary>
    /// The IfcMaterialLayerSet is a designation by which materials of an element constructed of a 
    /// number of material layers is known and through which the relative positioning of individual 
    /// layers can be expressed.
    /// </summary>
    public class IfcMaterialLayerSet : Association
    {
        /// <summary>
        /// Identification of the IfcMaterialLayer’s from which the IfcMaterialLayerSet is composed.
        /// </summary>
        [JsonProperty("ifcMaterialLayer")]
        public List<IfcMaterialLayer> IfcMaterialLayer { get; set; }

        /// <summary>
        /// The name by which the IfcMaterialLayerSet is known.
        /// </summary>
        [JsonProperty("layerSetName")]
        public string LayerSetName { get; set; }

        /// <summary>
        /// Definition of the IfcMaterialLayerSet in descriptive terms.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Total thickness of the material layer set is derived from the function IfcMlsTotalThickness.
        /// </summary>
        [JsonProperty("totalThickness")]
        public double TotalThickness { get; set; }
    }

    /// <summary>
    /// IfcMaterialLayer is a single and identifiable part of an element which is constructed of 
    /// a number of layers (one or more). Each IfcMaterialLayer has a constant thickness and is 
    /// located relative to the referencing IfcMaterialLayerSet along the material layer set base (MlsBase).
    /// </summary>
    public class IfcMaterialLayer
    {
        /// <summary>
        /// Optional reference to the material from which the layer is constructed. 
        /// Note that if this value is not given, it does not denote a layer with no material (an air gap), 
        /// it only means that the material is not specified at that point.
        /// </summary>
        [JsonProperty("material")]
        public IfcMaterial Material { get; set; }

        /// <summary>
        /// The thickness of the material layer. The meaning of "thickness" depends on its usage. 
        /// In case of building elements elements utilizing IfcMaterialLayerSetUsage, 
        /// the dimension is measured along the positive LayerSetDirection as specified in IfcMaterialLayerSetUsage.
        /// </summary>
        [JsonProperty("layerThickness")]
        public double LayerThickness { get; set; }

        /// <summary>
        /// Indication of whether the material layer represents an air layer (or cavity).
        /// <para>- set to TRUE if the material layer is an air gap and provides air exchange from the layer to the outside air.</para>
        /// <para>- set to UNKNOWN if the material layer is an air gap and does not provide air exchange(or when this information about air exchange of the air gap is not available).</para>
        /// <para>- set to FALSE if the material layer is a solid material layer(the default).</para>
        /// </summary>
        [JsonProperty("isVentilated")]
        public bool IsVentilated { get; set; }

        /// <summary>
        /// The name by which the material layer is known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material layer in more descriptive terms than given by attributes Name or Category.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Category of the material layer, e.g. the role it has in the layer set it belongs to (such as 'load bearing', 'thermal insulation' etc.). The list of keywords might be extended by model view definitions, however the following keywords shall apply in general:
        /// <para> - 'LoadBearing' — for all material layers having a load bearing function.</para>
        /// <para> - 'Insulation' — for all material layers having an insolating function.</para>
        /// <para> - 'Inner finish' — for the material layer being the inner finish.</para>
        /// <para> - 'Outer finish' — for the material layer being the outer finish.</para>
        /// </summary>
        [JsonProperty("category")]
        public string Category { get; set; }

        /// <summary>
        /// The relative priority of the layer, expressed as normalised integer range [0..100]. Controls how layers intersect in connections and corners of building elements: a layer from one element protrudes into (i.e. displaces) a layer from another element in a joint of these elements if the former element's layer has higher priority than the latter. The priority value for a material layer in an element has to be set and maintained by software applications in relation to the material layers in connected elements.
        /// </summary>
        [JsonProperty("priority")]
        public int Priority { get; set; }

        /// <summary>
        /// Reference to the IfcMaterialLayerSet in which the material layer is included.
        /// </summary>
        [JsonProperty("toMaterialLayerSet")]
        public IfcMaterialLayerSet ToMaterialLayerSet { get; set; }
    }

    /// <summary>
    /// The IfcMaterialProfileSet is a designation by which individual material(s) of a prismatic 
    /// element (for example, beam or column) constructed of a single or multiple material profiles 
    /// is known.
    /// </summary>
    public class IfcMaterialProfileSet : Association
    {
        /// <summary>
        /// The name by which the material profile set is known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material profile set in descriptive terms.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Identification of the profiles from which the material profile set is composed.
        /// </summary>
        [JsonProperty("materialProfiles")]
        public List<IfcMaterialProfile> MaterialProfiles { get; set; }

        /// <summary>
        /// Reference to the composite profile definition for which this material profile set associates material to each of its individual profiles. If only a single material profile is used (the most typical case) then no CompositeProfile is asserted.
        /// </summary>
        [JsonProperty("compositeProfile")]
        public IfcCompositeProfileDef CompositeProfile { get; set; }
    }

    /// <summary>
    /// IfcMaterialProfile is a single and identifiable cross section of an element which is 
    /// constructed of a number of profiles (one or more).
    /// </summary>
    public class IfcMaterialProfile : Association
    {
        /// <summary>
        /// The name by which the material profile is known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material profile in descriptive terms.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Optional reference to the material from which the profile is constructed.
        /// </summary>
        [JsonProperty("material")]
        public IfcMaterial Material { get; set; }

        /// <summary>
        /// Identification of the profile for which this material profile is associating material.
        /// </summary>
        [JsonProperty("profile")]
        public IfcProfileDef Profile { get; set; }

        /// <summary>
        /// The relative priority of the profile, expressed as normalised integer range [0..100]. 
        /// Controls how profiles intersect in connections and corners of building elements: 
        /// A profile from one element protrudes into (i.e. displaces) a profile from another 
        /// element in a joint of these elements if the former element's profile has higher 
        /// priority than the latter. The priority value for a material profile in an element 
        /// has to be set and maintained by software applications in relation to the material 
        /// profiles in connected elements.
        /// </summary>
        [JsonProperty("priority")]
        public int Priority { get; set; }

        /// <summary>
        /// Category of the material profile, e.g. the role it has in the profile set it belongs 
        /// to. The list of keywords might be extended by model view definitions, however the 
        /// following keywords shall apply in general:
        /// <para>- 'LoadBearing' — the material profile having a load bearing function.</para>
        /// <para>- 'Insulation' — the material profile having an insolating function.</para>
        /// <para>- 'Finish' — the material profile being the finish.</para>
        /// </summary>
        [JsonProperty("category")]
        public string Category { get; set; }

        /// <summary>
        /// Material profile set in which this material profile is included.
        /// </summary>
        [JsonProperty("ToMaterialProfileSet")]
        public IfcMaterialProfileSet ToMaterialProfileSet { get; set; }
    }

    /// <summary>
    /// The IfcCompositeProfileDef defines the profile by composition of other profiles. The 
    /// composition is given by a set of at least two other profile definitions. Any profile 
    /// definition (except for another composite profile) can be used to construct the composite.
    /// </summary>
    public class IfcCompositeProfileDef
    {
        /// <summary>
        /// The profiles which are used to define the composite profile.
        /// </summary>
        [JsonProperty("profiles")]
        public IfcProfileDef Profiles { get; set; }

        /// <summary>
        /// The name by which the composition may be referred to. The actual meaning of the name 
        /// has to be defined in the context of applications.
        /// </summary>
        [JsonProperty("label")]
        public string Label { get; set; }
    }
    
    /// <summary>
    /// IfcProfileDef is the supertype of all definitions of standard and arbitrary profiles within 
    /// IFC. It is used to define a standard set of commonly used section profiles by their parameters 
    /// or by their explicit curve geometry.
    /// </summary>
    public class IfcProfileDef
    {
        /// <summary>
        /// Defines the type of geometry into which this profile definition shall be resolved, either 
        /// a curve or a surface area. In case of curve the profile should be referenced by a swept 
        /// surface, in case of area the profile should be referenced by a swept area solid.
        /// </summary>
        //[JsonProperty("profileType")]
        //public IfcProfileTypeEnum ProfileType { get; set; }

        /// <summary>
        /// Human-readable name of the profile, for example according to a standard profile table. As 
        /// noted above, machine-readable standardized profile designations should be provided in 
        /// IfcExternalReference.ItemReference.
        /// </summary>
        [JsonProperty("profileName")]
        public string ProfileName { get; set; }

        /// <summary>
        /// Reference to external information, e.g. library, classification, or document information, 
        /// which is associated with the profile.
        /// </summary>
        //[JsonProperty("hasExternalReference")]
        //public IfcExternalReferenceRelationship HasExternalReference { get; set; }

        /// <summary>
        /// Additional properties of the profile, for example mechanical properties.
        /// </summary>
        //[JsonProperty("hasProperties")]
        //public IfcProfileProperties HasProperties { get; set; }
    }

    /// <summary>
    /// IfcMaterialConstituentSet is a collection of individual material constituents, each assigning 
    /// a material to a part of an element. The parts are only identified by a keyword (as opposed to 
    /// an IfcMaterialLayerSet or IfcMaterialProfileSet where each part has an individual shape parameter 
    /// (layer thickness or layer profile).
    /// </summary>
    public class IfcMaterialConstituentSet : Association
    {
        /// <summary>
        /// The name by which the constituent set is known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material constituent set in descriptive terms.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Identification of the constituents from which the material constituent set is composed.
        /// </summary>
        [JsonProperty("materialConstituents")]
        public List<IfcMaterialConstituent> MaterialConstituents { get; set; }
    }

    /// <summary>
    /// IfcMaterialConstituent is a single and identifiable part of an element which is constructed 
    /// of a number of part (one or more) each having an individual material. The association of 
    /// the material constituent to the part is provided by a keyword as value of the Name attribute. 
    /// In order to identify and distinguish the part of the shape representation to which the 
    /// material constituent applies the IfcProductDefinitionShape of the element has to include 
    /// instances of IfcShapeAspect, using the same keyword for their Name attribute.
    /// </summary>
    public class IfcMaterialConstituent
    {
        /// <summary>
        /// The name by which the material constituent is known.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material constituent in descriptive terms.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Reference to the material from which the constituent is constructed.
        /// </summary>
        [JsonProperty("material")]
        public IfcMaterial Material { get; set; }

        /// <summary>
        /// Optional provision of a fraction of the total amount (volume or weight) that applies 
        /// to the IfcMaterialConstituentSet that is contributed by this IfcMaterialConstituent.
        /// </summary>
        [JsonProperty("fraction")]
        public IfcNormalisedRatioMeasure Fraction { get; set; }

        /// <summary>
        /// Category of the material constituent, e.g. the role it has in the constituent set it 
        /// belongs to.
        /// </summary>
        [JsonProperty("category")]
        public string Category { get; set; }

        /// <summary>
        /// Material constituent set in which this material constituent is included.
        /// </summary>
        [JsonProperty("toMaterialConstituentSet")]
        public IfcMaterialConstituentSet ToMaterialConstituentSet { get; set; }
    }

    /// <summary>
    /// Dimensionless measure to express ratio values ranging from 0.0 to 1.0
    /// </summary>
    public class IfcNormalisedRatioMeasure
    {
        
    }



   


    /// <summary>
    /// Builder of IfcMaterial
    /// </summary>
    public class IfcMaterialBuilder
    {
        private readonly IfcMaterial _entity = new IfcMaterial();

        public IfcMaterialBuilder AddName(string name)
        {
            _entity.Name = name;
            return this;
        }

        public IfcMaterialBuilder AddDescription(string description)
        {
            _entity.Description = description;
            return this;
        }
        
        public IfcMaterialBuilder AddCategory(string category)
        {
            _entity.Category = category;
            return this;
        }

        public IfcMaterialBuilder AddHasRepresentation(IfcMaterialDefinitionRepresentation hasRepresentation)
        {
            _entity.HasRepresentation = hasRepresentation;
            return this;
        }

        public IfcMaterialBuilder AddIsRelatedWith(IfcMaterialRelationship isRelatedWith)
        {
            _entity.IsRelatedWith = isRelatedWith;
            return this;
        }

        public IfcMaterialBuilder AddRelatesTo(IfcMaterialRelationship relatesTo)
        {
            _entity.RelatesTo = relatesTo;
            return this;
        }

        public IfcMaterial Build()
        {
            return _entity;
        }
    }

    /// <summary>
    /// IfcMaterial is a homogeneous or inhomogeneous substance that can be used to form elements (physical products or their components).
    /// </summary>
    public class IfcMaterial : Association
    {
        /// <summary>
        /// Name of the material.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Definition of the material in more descriptive terms than given by attributes Name or Category.
        /// </summary>
        [JsonProperty("description")]
        public string Description { get; set; }

        /// <summary>
        /// Definition of the category (group or type) of material, in more general terms than given by attribute Name.
        /// </summary>
        [JsonProperty("category")]
        public string Category { get; set; }

        /// <summary>
        /// Reference to the IfcMaterialDefinitionRepresentation that provides presentation information to a representation common to this material in style definitions.
        /// </summary>
        [JsonProperty("HasRepresentation")]
        public IfcMaterialDefinitionRepresentation HasRepresentation { get; set; }

        /// <summary>
        /// Reference to a material relationship indicating that this material is a part (or constituent) in a material composite.
        /// </summary>
        [JsonProperty("isRelatedWith")]
        public IfcMaterialRelationship IsRelatedWith { get; set; }

        /// <summary>
        /// Reference to a material relationship indicating that this material composite has parts (or constituents).
        /// </summary>
        [JsonProperty("relatesTo")]
        public IfcMaterialRelationship RelatesTo { get; set; }
    }

    public class IfcRelAssociatesMaterial : Association
    {
    }

    
    /// <summary>
    /// IfcMaterialDefinitionRepresentation defines presentation information relating to IfcMaterial. It allows for multiple presentations of the same material for different geometric representation contexts.
    /// </summary>
    public class IfcMaterialDefinitionRepresentation
    {
        /// <summary>
        /// Reference to the material to which the representation applies.
        /// </summary>
        [JsonProperty("representedMaterial")]
        public IfcMaterial RepresentedMaterial { get; set; }
    }

    /// <summary>
    /// IfcMaterialRelationship defines a relationship between part and whole in material definitions (as in composite materials). The parts, expressed by the set of RelatedMaterials, are material constituents of which a single material aggregate is composed.
    /// </summary>
    public class IfcMaterialRelationship
    {
        /// <summary>
        /// Reference to the relating material (the composite).
        /// </summary>
        [JsonProperty("relatingMaterial")]
        public IfcMaterial RelatingMaterial { get; set; }

        /// <summary>
        /// Reference to related materials (as constituents of composite material).
        /// </summary>
        [JsonProperty("relatedMaterials")]
        public IfcMaterial RelatedMaterials { get; set; }

        /// <summary>
        /// Information about the material relationship refering for example to the amount of related materials in the composite material.
        /// </summary>
        [JsonProperty("expression")]
        public string Expression { get; set; }
    }


    #endregion

    #region IfcProperties defenition

    /// <summary>
    /// The IfcPropertySet defines all dynamically extensible properties. The property set is a 
    /// container class that holds properties within a property tree. These properties are interpreted 
    /// according to their name attribute.
    /// </summary>
    public class IfcPropertySet
    {
        /// <summary>
        /// Type definition "IfcPropertySet"
        /// </summary>
        [JsonProperty("type")]
        public string Type { get; set; }

        /// <summary>
        /// Name of the propertyset defined on BSDD connection
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Contained set of properties. For property sets defined as part of the IFC Object model, the 
        /// property objects within a property set are defined as part of the standard. If a property 
        /// is not contained within the set of predefined properties, its value has not been set at 
        /// this time.
        /// </summary>
        [JsonProperty("hasProperties")]
        public List<IfcProperty> HasProperties { get; set; }
    }

    /// <summary>
    /// IfcProperty is an abstract generalization for all types of properties that can be associated 
    /// with IFC objects through the property set mechanism.
    /// </summary>
    public class IfcProperty
    {
        /// <summary>
        /// Type definition "IfcPropertySingleValue"
        /// </summary>
        [JsonProperty("type")]
        public virtual string Type { get; }

        /// <summary>
        /// Name for this property. This label is the significant name string that defines the semantic meaning for the property.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Specification of the IfcProperty
        /// </summary>
        [JsonProperty("specification")]
        public string Specification { get; set; }

        /// <summary>
        /// Type definition "IfcProperty"
        /// </summary>
        public IfcProperty()
        {
            Type = "IfcProperty";
        }
    }

    /// <summary>
    /// The property with a single value IfcPropertySingleValue defines a property object which has 
    /// a single (numeric or descriptive) value assigned.
    /// </summary>
    public class IfcPropertySingleValue : IfcProperty
    {
        /// <summary>
        /// Type definition "IfcPropertySingleValue"
        /// </summary>
        [JsonProperty("type")]
        public override string Type { get; }

        /// <summary>
        /// Value and measure type of this property.
        /// </summary>
        [JsonProperty("nominalValue")]
        public IfcValue NominalValue { get; set; }

        /// <summary>
        /// Type definition "IfcPropertySingleValue"
        /// </summary>
        public IfcPropertySingleValue() : base()
        {
            Type = "IfcPropertySingleValue";
        }
    }

    /// <summary>
    /// A property with an enumerated value, IfcPropertyEnumeratedValue, defines a property object 
    /// which has a value assigned that is chosen from an enumeration.
    /// </summary>
    public class IfcPropertyEnumeratedValue : IfcProperty
    {
        [JsonProperty("type")]
        public override string Type { get; }

        /// <summary>
        /// Enumeration values, which shall be listed in the referenced IfcPropertyEnumeration, if such 
        /// a reference is provided.
        /// </summary>
        [JsonProperty("enumerationValues")]
        public List<IfcValue> EnumerationValues { get; set; }

        /// <summary>
        /// Enumeration from which a enumeration value has been selected. The referenced enumeration 
        /// also establishes the unit of the enumeration value.
        /// </summary>
        [JsonProperty("enumerationReference")]
        public IfcPropertyEnumeration EnumerationReference { get; set; }

        public IfcPropertyEnumeratedValue() : base()
        {
            Type = "IfcPropertyEnumeratedValue";
        }
    }

    /// <summary>
    /// A select type for selecting between more specialised select types IfcSimpleValue, IfcMeasureValue 
    /// and IfcDerivedMeasureValue.
    /// </summary>
    public class IfcValue
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("value")]
        //public object Value { get; set; }
        public object Value { get; set; }
    }

    /// <summary>
    /// A collection of simple or measure values that define a prescribed set of alternatives from 
    /// which 'enumeration values' are selected. This enables inclusion of enumeration values in property 
    /// sets. IfcPropertyEnumeration provides a name for the enumeration as well as a list of unique 
    /// (numeric or descriptive) values (that may have a measure type assigned). The entity defines the 
    /// list of potential enumerators to be exchanged together (or separately) with properties of type 
    /// IfcPropertyEnumeratedValue that selects their actual property values from this enumeration.
    /// </summary>
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

    #endregion

}
#endregion