/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ClassificationContractV3 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** Type of Classification */
  classificationType?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** List of synonyms for the classification */
  synonyms?: string[] | null
  /** List of related IFC entity names (version independent) */
  relatedIfcEntityNames?: string[] | null
  parentClassificationReference?: ClassificationReferenceContractV3
  /** List of the properties of this classification */
  classificationProperties?: ClassificationPropertyContractV3[] | null
  /** List of relations to other classifications, can be reference to classifications of other domains */
  classificationRelations?: ClassificationRelationContractV3[] | null
  /** List of child classifications (only filled if requested) */
  childClassificationReferences?: ClassificationReferenceContractV3[] | null
}

export interface ClassificationContractV4 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** Type of Classification */
  classificationType?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** List of synonyms for the classification */
  synonyms?: string[] | null
  /** List of related IFC entity names (version independent) */
  relatedIfcEntityNames?: string[] | null
  parentClassificationReference?: ClassificationReferenceContractV3
  /** List of the properties of this classification */
  classificationProperties?: ClassificationPropertyContractV3[] | null
  /** List of relations to other classifications, can be reference to classifications of other domains */
  classificationRelations?: ClassificationRelationContractV3[] | null
  /** List of child classifications (only filled if requested) */
  childClassificationReferences?: ClassificationReferenceContractV3[] | null
}

export interface ClassificationListItemContractV2 {
  namespaceUri?: string | null
  code?: string | null
  name?: string | null
  referenceCode?: string | null
  parentClassificationCode?: string | null
  children?: ClassificationListItemContractV2[] | null
}

export interface ClassificationListItemContractV3 {
  namespaceUri?: string | null
  code?: string | null
  name?: string | null
  referenceCode?: string | null
  parentClassificationCode?: string | null
  children?: ClassificationListItemContractV3[] | null
}

export interface ClassificationPropertyContractV3 {
  /**
   * Name of the property
   * @minLength 1
   */
  name: string
  /**
   * Plain language description of the property.
   * If at Property level no description has been given but a "Definition" is available, then "Definition" is returned as description
   */
  description?: string | null
  /** Format for expressing the value of the property */
  dataType?: string | null
  /**
   * Dimension of the physical quantity in format "L M T I Θ N J", for example "-2 1 0 0 0 0 0".
   * With
   *   L   Length
   *   M   Mass
   *   T   Time
   *   I   Electric current
   *   Θ   Thermodynamic Temperature
   *   N   Amount of substance
   *   J   Luminous intensity
   */
  dimension?: string | null
  /**
   * The Length value of the dimension
   * @format int32
   */
  dimensionLength?: number | null
  /**
   * The Mass value of the dimension
   * @format int32
   */
  dimensionMass?: number | null
  /**
   * The Time value of the dimension
   * @format int32
   */
  dimensionTime?: number | null
  /**
   * The Electric current value of the dimension
   * @format int32
   */
  dimensionElectricCurrent?: number | null
  /**
   * The Thermodynamic temperature value of the dimension
   * @format int32
   */
  dimensionThermodynamicTemperature?: number | null
  /**
   * The Amount of substance value of the dimension
   * @format int32
   */
  dimensionAmountOfSubstance?: number | null
  /**
   * The Luminous intensity value of the dimension
   * @format int32
   */
  dimensionLuminousIntensity?: number | null
  /**
   * List of codes of the properties which are parameters of the function for a dynamic property.
   * Only applicable for dynamic properties (IsDynamic)
   */
  dynamicParameterPropertyCodes?: string[] | null
  /** Illustrate possible use or values of the Property */
  example?: string | null
  /** True if the value of this property is dependent on other properties (as provided in DynamicParameterPropertyCodes) */
  isDynamic?: boolean | null
  /** Indicates if this property is required for the classification */
  isRequired?: boolean | null
  /** Indicates if the value of the property can be changed by the user */
  isWritable?: boolean | null
  /**
   * Maximum value of the property, exclusive
   * This value does not need to be the same as the MaxExclusive in the Property contract
   * because this value can be overruled at Classification-Property level to define a more strict value.
   * @format double
   */
  maxExclusive?: number | null
  /**
   * Maximum value of the property, inclusive
   * This value does not need to be the same as the MaxInclusive in the Property contract
   * because this value can be overruled at Classification-Property level to define a more strict value.
   * @format double
   */
  maxInclusive?: number | null
  /**
   * Minimum value of the property, exclusive
   * This value does not need to be the same as the MinExclusive in the Property contract
   * because this value can be overruled at Classification-Property level to define a more strict value.
   * @format double
   */
  minExclusive?: number | null
  /**
   * Minimum value of the property, inclusive
   * This value does not need to be the same as the MinInclusive in the Property contract
   * because this value can be overruled at Classification-Property level to define a more strict value.
   * @format double
   */
  minInclusive?: number | null
  /**
   * An XML Schema Regular expression for the property value.
   * See for explanation: https://www.regular-expressions.info/xml.html.
   * This value does not need to be the same as the Pattern in the Property contract
   * because this value can be overruled at Classification-Property level to define a more strict value.
   */
  pattern?: string | null
  /** The quantity in plain text */
  physicalQuantity?: string | null
  /**
   * List of possible values
   * This list does not need to be the same as the list of PossibleValues in the Property contract
   * because this list can be overruled at Classification-Property level to define a more strict list.
   */
  possibleValues?: ClassificationPropertyValueContractV3[] | null
  /** Predefined value: if the classification can have only one value for this property, this is it */
  predefinedValue?: string | null
  /** Code of the property, only applicable if property is of the same domain as the classification. */
  propertyCode?: string | null
  /** Name of the Domain this property belongs to */
  propertyDomainName?: string | null
  /** Unique identification of the property */
  propertyNamespaceUri?: string | null
  /** Name of the Property Set */
  propertySet?: string | null
  /** Status of the property: Preview, Active or Inactive */
  propertyStatus?: string | null
  /** Indicates kind of value: Single, Range (2 values expected), List (multiple values expected), Complex (use in combination with "ConnectedProperties"), ComplexList */
  propertyValueKind?: string | null
  /** Symbol of the property */
  symbol?: string | null
  /** List of units to select from */
  units?: string[] | null
  /** List of QUDT unit codes to select from */
  qudtCodes?: string[] | null
}

export interface ClassificationPropertyValueContractV3 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value */
  code?: string | null
  /**
   * Possible value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface ClassificationReferenceContractV3 {
  /** @minLength 1 */
  namespaceUri: string
  name?: string | null
  code?: string | null
}

export interface ClassificationRelationContractV3 {
  /**
   * Can be one of: HasReference, IsEqualTo, IsSynonymOf, IsParentOf, IsChildOf, HasPart
   * @minLength 1
   */
  relationType: string
  /**
   * Namespace URI of the related classification
   * @minLength 1
   */
  relatedClassificationUri: string
  /** Name of the related classification */
  relatedClassificationName?: string | null
  /**
   * Optional provision of a fraction of the total amount (e.g. volume or weight) that applies to the classification relations of one relation type
   * @format double
   */
  fraction?: number | null
}

export interface ClassificationSearchResponseClassificationContractV1 {
  /** Unique identification of the domain the classification belongs to */
  domainNamespaceUri?: string | null
  /** Name of the domain the classification belongs to */
  domainName?: string | null
  name?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** Unique identification of the classification */
  namespaceUri?: string | null
  /** Type of the classification. */
  classificationType?: string | null
  description?: string | null
  parentClassificationName?: string | null
  relatedIfcEntityNames?: string[] | null
}

export interface ClassificationSearchResponseContractV1 {
  /** The list of Classifications found */
  classifications?: ClassificationSearchResponseClassificationContractV1[] | null
}

export interface ClassificationSearchResultContractV2 {
  /** Name of the Classification */
  name?: string | null
  /** Unique identification of the Classification */
  namespaceUri?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** Type of the classification. */
  classificationType?: string | null
  definition?: string | null
  synonyms?: string[] | null
}

export interface CountryContractV1 {
  code?: string | null
  name?: string | null
}

export interface DomainContractV2 {
  namespaceUri?: string | null
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  version: string
  /** @minLength 1 */
  organizationNameOwner: string
  /**
   * The default language for this domain
   * @minLength 1
   */
  defaultLanguageCode: string
  /** Name or short description of the license under which you can use this data */
  license?: string | null
  /** URL where you can find more details about the license */
  licenseUrl?: string | null
  /** Name or short description of the quality assurance procedure used while creating and maintaining the domain data */
  qualityAssuranceProcedure?: string | null
  /** URL where you can find more details about the quality assurance procedure */
  qualityAssuranceProcedureUrl?: string | null
  /** For state indication, like "Preview", "Active", "InActive", "Released */
  status?: string | null
  /** Url to site with more info on domain */
  moreInfoUrl?: string | null
  /**
   * Date of the release of this version
   * @format date-time
   */
  releaseDate?: string | null
  /**
   * Date and time the data of the domain has been last updated in bSDD
   * @format date-time
   */
  lastUpdatedUtc?: string
}

export interface DomainContractV3 {
  namespaceUri?: string | null
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  version: string
  /** @minLength 1 */
  organizationNameOwner: string
  /**
   * The default language for this domain
   * @minLength 1
   */
  defaultLanguageCode: string
  /** Name or short description of the license under which you can use this data */
  license?: string | null
  /** URL where you can find more details about the license */
  licenseUrl?: string | null
  /** Name or short description of the quality assurance procedure used while creating and maintaining the domain data */
  qualityAssuranceProcedure?: string | null
  /** URL where you can find more details about the quality assurance procedure */
  qualityAssuranceProcedureUrl?: string | null
  /** For state indication, like "Preview", "Active", "InActive", "Released */
  status?: string | null
  /** Url to site with more info on domain */
  moreInfoUrl?: string | null
  /**
   * Date of the release of this version
   * @format date-time
   */
  releaseDate?: string | null
  /**
   * Date and time the data of the domain has been last updated in bSDD
   * @format date-time
   */
  lastUpdatedUtc?: string
}

export interface DomainSearchResultContractV1 {
  name?: string | null
  namespaceUri?: string | null
  materials?: MaterialSearchResultContractV1[] | null
}

export interface DomainSearchResultContractV2 {
  name?: string | null
  namespaceUri?: string | null
  classifications?: ClassificationSearchResultContractV2[] | null
}

export interface DomainWithClassificationsContractV2 {
  namespaceUri?: string | null
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  version: string
  /** @minLength 1 */
  organizationNameOwner: string
  /**
   * The default language for this domain
   * @minLength 1
   */
  defaultLanguageCode: string
  /** Name or short description of the license under which you can use this data */
  license?: string | null
  /** URL where you can find more details about the license */
  licenseUrl?: string | null
  /** Name or short description of the quality assurance procedure used while creating and maintaining the domain data */
  qualityAssuranceProcedure?: string | null
  /** URL where you can find more details about the quality assurance procedure */
  qualityAssuranceProcedureUrl?: string | null
  /** For state indication, like "Preview", "Active", "InActive", "Released */
  status?: string | null
  /** Url to site with more info on domain */
  moreInfoUrl?: string | null
  /**
   * Date of the release of this version
   * @format date-time
   */
  releaseDate?: string | null
  /**
   * Date and time the data of the domain has been last updated in bSDD
   * @format date-time
   */
  lastUpdatedUtc?: string
  classifications?: ClassificationListItemContractV2[] | null
}

export interface DomainWithClassificationsContractV3 {
  namespaceUri?: string | null
  /** @minLength 1 */
  name: string
  /** @minLength 1 */
  version: string
  /** @minLength 1 */
  organizationNameOwner: string
  /**
   * The default language for this domain
   * @minLength 1
   */
  defaultLanguageCode: string
  /** Name or short description of the license under which you can use this data */
  license?: string | null
  /** URL where you can find more details about the license */
  licenseUrl?: string | null
  /** Name or short description of the quality assurance procedure used while creating and maintaining the domain data */
  qualityAssuranceProcedure?: string | null
  /** URL where you can find more details about the quality assurance procedure */
  qualityAssuranceProcedureUrl?: string | null
  /** For state indication, like "Preview", "Active", "InActive", "Released */
  status?: string | null
  /** Url to site with more info on domain */
  moreInfoUrl?: string | null
  /**
   * Date of the release of this version
   * @format date-time
   */
  releaseDate?: string | null
  /**
   * Date and time the data of the domain has been last updated in bSDD
   * @format date-time
   */
  lastUpdatedUtc?: string
  classifications?: ClassificationListItemContractV3[] | null
  materials?: ClassificationListItemContractV3[] | null
}

export interface LanguageContractV1 {
  /** @minLength 1 */
  isoCode: string
  name?: string | null
}

export interface MaterialClassificationRelationContractV1 {
  name?: string | null
  namespaceUri?: string | null
}

export interface MaterialContractV1 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** List of synonyms for the material */
  synonyms?: string[] | null
  parentMaterialReference?: MaterialReferenceContractV1
  /** List of the properties of this material */
  materialProperties?: MaterialPropertyContractV1[] | null
  /** List of relations to classifications, can be reference to materials of other domains */
  classificationRelations?: MaterialRelationContractV1[] | null
  /** List of child materials (only filled if requested) */
  childMaterialReferences?: MaterialReferenceContractV1[] | null
}

export interface MaterialContractV2 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** List of synonyms for the material */
  synonyms?: string[] | null
  parentMaterialReference?: MaterialReferenceContractV2
  /** List of the properties of this material */
  materialProperties?: MaterialPropertyContractV2[] | null
  /** List of relations to classifications, can be reference to materials of other domains */
  classificationRelations?: MaterialRelationContractV2[] | null
  /** List of child materials (only filled if requested) */
  childMaterialReferences?: MaterialReferenceContractV2[] | null
}

export interface MaterialPropertyContractV1 {
  /**
   * Name of the property
   * @minLength 1
   */
  name: string
  /**
   * Plain language description of the property.
   * If at Property level no description has been given but a "Definition" is available, then "Definition" is returned as description
   */
  description?: string | null
  /** Format for expressing the value of the property */
  dataType?: string | null
  /**
   * Dimension of the physical quantity in format "L M T I Θ N J", for example "-2 1 0 0 0 0 0".
   * With
   *   L   Length
   *   M   Mass
   *   T   Time
   *   I   Electric current
   *   Θ   Thermodynamic Temperature
   *   N   Amount of substance
   *   J   Luminous intensity
   */
  dimension?: string | null
  /**
   * The Length value of the dimension
   * @format int32
   */
  dimensionLength?: number | null
  /**
   * The Mass value of the dimension
   * @format int32
   */
  dimensionMass?: number | null
  /**
   * The Time value of the dimension
   * @format int32
   */
  dimensionTime?: number | null
  /**
   * The Electric current value of the dimension
   * @format int32
   */
  dimensionElectricCurrent?: number | null
  /**
   * The Thermodynamic temperature value of the dimension
   * @format int32
   */
  dimensionThermodynamicTemperature?: number | null
  /**
   * The Amount of substance value of the dimension
   * @format int32
   */
  dimensionAmountOfSubstance?: number | null
  /**
   * The Luminous intensity value of the dimension
   * @format int32
   */
  dimensionLuminousIntensity?: number | null
  /**
   * List of codes of the properties which are parameters of the function for a dynamic property.
   * Only applicable for dynamic properties (IsDynamic)
   */
  dynamicParameterPropertyCodes?: string[] | null
  /** Illustrate possible use or values of the Property */
  example?: string | null
  /** True if the value of this property is dependent on other properties (as provided in DynamicParameterPropertyCodes) */
  isDynamic?: boolean | null
  /** Indicates if this property is required for the material */
  isRequired?: boolean | null
  /** Indicates if the value of the property can be changed by the user */
  isWritable?: boolean | null
  /**
   * Maximum value of the property, exclusive
   * This value does not need to be the same as the MaxExclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  maxExclusive?: number | null
  /**
   * Maximum value of the property, inclusive
   * This value does not need to be the same as the MaxInclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  maxInclusive?: number | null
  /**
   * Minimum value of the property, exclusive
   * This value does not need to be the same as the MinExclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  minExclusive?: number | null
  /**
   * Minimum value of the property, inclusive
   * This value does not need to be the same as the MinInclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  minInclusive?: number | null
  /**
   * An XML Schema Regular expression for the property value.
   * See for explanation: https://www.regular-expressions.info/xml.html.
   * This value does not need to be the same as the Pattern in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   */
  pattern?: string | null
  /** The quantity in plain text */
  physicalQuantity?: string | null
  /**
   * List of possible values
   * This list does not need to be the same as the list of PossibleValues in the Property contract
   * because this list can be overruled at Material-Property level to define a more strict list.
   */
  possibleValues?: MaterialPropertyValueContractV1[] | null
  /** Predefined value: if the material can have only one value for this property, this is it */
  predefinedValue?: string | null
  /** Code of the property, only applicable if property is of the same domain as the material. */
  propertyCode?: string | null
  /** Name of the Domain this property belongs to */
  propertyDomainName?: string | null
  /** Unique identification of the property */
  propertyNamespaceUri?: string | null
  /** Name of the Property Set */
  propertySet?: string | null
  /** Status of the property: Preview, Active or Inactive */
  propertyStatus?: string | null
  /** Indicates kind of value: Single, Range (2 values expected), List (multiple values expected), Complex (use in combination with "ConnectedProperties"), ComplexList */
  propertyValueKind?: string | null
  /** Symbol of the property */
  symbol?: string | null
  /** List of units to select from */
  units?: string[] | null
}

export interface MaterialPropertyContractV2 {
  /**
   * Name of the property
   * @minLength 1
   */
  name: string
  /**
   * Plain language description of the property.
   * If at Property level no description has been given but a "Definition" is available, then "Definition" is returned as description
   */
  description?: string | null
  /** Format for expressing the value of the property */
  dataType?: string | null
  /**
   * Dimension of the physical quantity in format "L M T I Θ N J", for example "-2 1 0 0 0 0 0".
   * With
   *   L   Length
   *   M   Mass
   *   T   Time
   *   I   Electric current
   *   Θ   Thermodynamic Temperature
   *   N   Amount of substance
   *   J   Luminous intensity
   */
  dimension?: string | null
  /**
   * The Length value of the dimension
   * @format int32
   */
  dimensionLength?: number | null
  /**
   * The Mass value of the dimension
   * @format int32
   */
  dimensionMass?: number | null
  /**
   * The Time value of the dimension
   * @format int32
   */
  dimensionTime?: number | null
  /**
   * The Electric current value of the dimension
   * @format int32
   */
  dimensionElectricCurrent?: number | null
  /**
   * The Thermodynamic temperature value of the dimension
   * @format int32
   */
  dimensionThermodynamicTemperature?: number | null
  /**
   * The Amount of substance value of the dimension
   * @format int32
   */
  dimensionAmountOfSubstance?: number | null
  /**
   * The Luminous intensity value of the dimension
   * @format int32
   */
  dimensionLuminousIntensity?: number | null
  /**
   * List of codes of the properties which are parameters of the function for a dynamic property.
   * Only applicable for dynamic properties (IsDynamic)
   */
  dynamicParameterPropertyCodes?: string[] | null
  /** Illustrate possible use or values of the Property */
  example?: string | null
  /** True if the value of this property is dependent on other properties (as provided in DynamicParameterPropertyCodes) */
  isDynamic?: boolean | null
  /** Indicates if this property is required for the material */
  isRequired?: boolean | null
  /** Indicates if the value of the property can be changed by the user */
  isWritable?: boolean | null
  /**
   * Maximum value of the property, exclusive
   * This value does not need to be the same as the MaxExclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  maxExclusive?: number | null
  /**
   * Maximum value of the property, inclusive
   * This value does not need to be the same as the MaxInclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  maxInclusive?: number | null
  /**
   * Minimum value of the property, exclusive
   * This value does not need to be the same as the MinExclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  minExclusive?: number | null
  /**
   * Minimum value of the property, inclusive
   * This value does not need to be the same as the MinInclusive in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   * @format double
   */
  minInclusive?: number | null
  /**
   * An XML Schema Regular expression for the property value.
   * See for explanation: https://www.regular-expressions.info/xml.html.
   * This value does not need to be the same as the Pattern in the Property contract
   * because this value can be overruled at Material-Property level to define a more strict value.
   */
  pattern?: string | null
  /** The quantity in plain text */
  physicalQuantity?: string | null
  /**
   * List of allowed values
   * This list does not need to be the same as the list of AllowedValues in the Property contract
   * because this list can be overruled at Material-Property level to define a more strict list.
   */
  allowedValues?: MaterialPropertyValueContractV2[] | null
  /** Predefined value: if the material can have only one value for this property, this is it */
  predefinedValue?: string | null
  /** Code of the property, only applicable if property is of the same domain as the material. */
  propertyCode?: string | null
  /** Name of the Domain this property belongs to */
  propertyDomainName?: string | null
  /** Unique identification of the property */
  propertyNamespaceUri?: string | null
  /** Name of the Property Set */
  propertySet?: string | null
  /** Status of the property: Preview, Active or Inactive */
  propertyStatus?: string | null
  /** Indicates kind of value: Single, Range (2 values expected), List (multiple values expected), Complex (use in combination with "ConnectedProperties"), ComplexList */
  propertyValueKind?: string | null
  /** Symbol of the property */
  symbol?: string | null
  /** List of units to select from */
  units?: string[] | null
  /** List of QUDT unit codes to select from */
  qudtCodes?: string[] | null
}

export interface MaterialPropertyValueContractV1 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value */
  code?: string | null
  /**
   * Possible value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface MaterialPropertyValueContractV2 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value */
  code?: string | null
  /**
   * Allowed value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface MaterialReferenceContractV1 {
  /** @minLength 1 */
  namespaceUri: string
  name?: string | null
  code?: string | null
}

export interface MaterialReferenceContractV2 {
  /** @minLength 1 */
  namespaceUri: string
  name?: string | null
  code?: string | null
}

export interface MaterialRelationContractV1 {
  /**
   * Can be one of: HasReference, IsEqualTo, IsSynonymOf, IsParentOf, IsChildOf, HasPart
   * @minLength 1
   */
  relationType: string
  /**
   * Namespace URI of the related classification
   * @minLength 1
   */
  relatedClassificationUri: string
  /** Name of the related classification */
  relatedClassificationName?: string | null
}

export interface MaterialRelationContractV2 {
  /**
   * Can be one of: HasReference, IsEqualTo, IsSynonymOf, IsParentOf, IsChildOf, HasPart
   * @minLength 1
   */
  relationType: string
  /**
   * Namespace URI of the related classification
   * @minLength 1
   */
  relatedClassificationUri: string
  /** Name of the related classification */
  relatedClassificationName?: string | null
}

export interface MaterialSearchResultContractV1 {
  name?: string | null
  namespaceUri?: string | null
  definition?: string | null
  synonyms?: string[] | null
  relatedClassifications?: MaterialClassificationRelationContractV1[] | null
}

export interface ProblemDetails {
  type?: string | null
  title?: string | null
  /** @format int32 */
  status?: number | null
  detail?: string | null
  instance?: string | null
  [key: string]: any
}

export interface PropertyContractV2 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** Plain language description of the property. */
  description?: string | null
  /** List of connected property codes */
  connectedPropertyCodes?: string[] | null
  /** Format for expressing the value of the property: Boolean, Character, Date, Enumeration, Integer, Real, String, Time */
  dataType?: string | null
  /**
   * Dimension of the physical quantity in format "L M T I Θ N J", for example "-2 1 0 0 0 0 0".
   * With
   *   L   Length
   *   M   Mass
   *   T   Time
   *   I   Electric current
   *   Θ   Thermodynamic Temperature
   *   N   Amount of substance
   *   J   Luminous intensity
   */
  dimension?: string | null
  /**
   * The Length value of the dimension
   * @format int32
   */
  dimensionLength?: number | null
  /**
   * The Mass value of the dimension
   * @format int32
   */
  dimensionMass?: number | null
  /**
   * The Time value of the dimension
   * @format int32
   */
  dimensionTime?: number | null
  /**
   * The Electric current value of the dimension
   * @format int32
   */
  dimensionElectricCurrent?: number | null
  /**
   * The Thermodynamic temperature value of the dimension
   * @format int32
   */
  dimensionThermodynamicTemperature?: number | null
  /**
   * The Amount of substance value of the dimension
   * @format int32
   */
  dimensionAmountOfSubstance?: number | null
  /**
   * The Luminous intensity value of the dimension
   * @format int32
   */
  dimensionLuminousIntensity?: number | null
  /**
   * List of codes of the properties which are parameters of the function for a dynamic property.
   * Only applicable for dynamic properties (IsDynamic)
   */
  dynamicParameterPropertyCodes?: string[] | null
  /** Illustrate possible use or values of the Property */
  example?: string | null
  /** True if the value of this property is dependent on other properties (as provided in DynamicParameterPropertyCodes) */
  isDynamic?: boolean | null
  /**
   * Maximum value of the property, exclusive
   * @format double
   */
  maxExclusive?: number | null
  /**
   * Maximum value of the property, inclusive
   * @format double
   */
  maxInclusive?: number | null
  /** Description of the method of measurement */
  methodOfMeasurement?: string | null
  /**
   * Minimum value of the property, exclusive
   * @format double
   */
  minExclusive?: number | null
  /**
   * Minimum value of the property, inclusive
   * @format double
   */
  minInclusive?: number | null
  /**
   * An XML Schema Regular expression for the property value.
   * See for explanation: https://www.regular-expressions.info/xml.html.
   */
  pattern?: string | null
  /** The quantity in plain text */
  physicalQuantity?: string | null
  /** List of possible values */
  possibleValues?: PropertyValueContractV2[] | null
  /** Indicates kind of value: Single, Range (2 values expected), List (multiple values expected), Complex (use in combination with "ConnectedProperties"), ComplexList */
  propertyValueKind?: string | null
  /** List of relations with other properties */
  propertyRelations?: PropertyRelationContractV2[] | null
  /** The text type, e.g. UTF-8 */
  textFormat?: string | null
  /** Multiple references to Unit */
  units?: string[] | null
  /** List of QUDT unit codes (if QUDT code available) */
  qudtCodes?: string[] | null
}

export interface PropertyContractV3 {
  /** Namespace URI of the domain */
  domainNamespaceUri?: string | null
  /**
   * Date of activation
   * @format date-time
   */
  activationDateUtc: string
  /**
   * Code used originally by the domain
   * @minLength 1
   */
  code: string
  /** Language code of the creator */
  creatorLanguageCode?: string | null
  /** List of countries where used */
  countriesOfUse?: string[] | null
  /** Country of origin */
  countryOfOrigin?: string | null
  /**
   * Date of deactivation
   * @format date-time
   */
  deActivationDateUtc?: string | null
  /** Definition */
  definition?: string | null
  /** Explanation of the deprecation */
  deprecationExplanation?: string | null
  /** Reference to a(n official) document */
  documentReference?: string | null
  /**
   * Name
   * @minLength 1
   */
  name: string
  /**
   * Unique identification
   * @minLength 1
   */
  namespaceUri: string
  /** List of codes of the replaced items */
  replacedObjectCodes?: string[] | null
  /** List of codes of the replacing items */
  replacingObjectCodes?: string[] | null
  /**
   * Date of the revision
   * @format date-time
   */
  revisionDateUtc?: string | null
  /**
   * Revision number
   * @format int32
   */
  revisionNumber?: number | null
  /**
   * Status, can be: Preview, Active or Inactive
   * @minLength 1
   */
  status: string
  /** List of subdivisions (e.g. states) where used */
  subdivisionsOfUse?: string[] | null
  /** Alternative unique global identification */
  uid?: string | null
  /**
   * Date of the version
   * @format date-time
   */
  versionDateUtc: string
  /**
   * Version number
   * @format int32
   */
  versionNumber?: number | null
  /** URI of a visual representation */
  visualRepresentationUri?: string | null
  /** Plain language description of the property. */
  description?: string | null
  /** List of connected property codes */
  connectedPropertyCodes?: string[] | null
  /** Format for expressing the value of the property: Boolean, Character, Date, Enumeration, Integer, Real, String, Time */
  dataType?: string | null
  /**
   * Dimension of the physical quantity in format "L M T I Θ N J", for example "-2 1 0 0 0 0 0".
   * With
   *   L   Length
   *   M   Mass
   *   T   Time
   *   I   Electric current
   *   Θ   Thermodynamic Temperature
   *   N   Amount of substance
   *   J   Luminous intensity
   */
  dimension?: string | null
  /**
   * The Length value of the dimension
   * @format int32
   */
  dimensionLength?: number | null
  /**
   * The Mass value of the dimension
   * @format int32
   */
  dimensionMass?: number | null
  /**
   * The Time value of the dimension
   * @format int32
   */
  dimensionTime?: number | null
  /**
   * The Electric current value of the dimension
   * @format int32
   */
  dimensionElectricCurrent?: number | null
  /**
   * The Thermodynamic temperature value of the dimension
   * @format int32
   */
  dimensionThermodynamicTemperature?: number | null
  /**
   * The Amount of substance value of the dimension
   * @format int32
   */
  dimensionAmountOfSubstance?: number | null
  /**
   * The Luminous intensity value of the dimension
   * @format int32
   */
  dimensionLuminousIntensity?: number | null
  /**
   * List of codes of the properties which are parameters of the function for a dynamic property.
   * Only applicable for dynamic properties (IsDynamic)
   */
  dynamicParameterPropertyCodes?: string[] | null
  /** Illustrate possible use or values of the Property */
  example?: string | null
  /** True if the value of this property is dependent on other properties (as provided in DynamicParameterPropertyCodes) */
  isDynamic?: boolean | null
  /**
   * Maximum value of the property, exclusive
   * @format double
   */
  maxExclusive?: number | null
  /**
   * Maximum value of the property, inclusive
   * @format double
   */
  maxInclusive?: number | null
  /** Description of the method of measurement */
  methodOfMeasurement?: string | null
  /**
   * Minimum value of the property, exclusive
   * @format double
   */
  minExclusive?: number | null
  /**
   * Minimum value of the property, inclusive
   * @format double
   */
  minInclusive?: number | null
  /**
   * An XML Schema Regular expression for the property value.
   * See for explanation: https://www.regular-expressions.info/xml.html.
   */
  pattern?: string | null
  /** The quantity in plain text */
  physicalQuantity?: string | null
  /** List of allowed values */
  allowedValues?: PropertyValueContractV3[] | null
  /** Indicates kind of value: Single, Range (2 values expected), List (multiple values expected), Complex (use in combination with "ConnectedProperties"), ComplexList */
  propertyValueKind?: string | null
  /** List of relations with other properties */
  propertyRelations?: PropertyRelationContractV3[] | null
  /** The text type, e.g. UTF-8 */
  textFormat?: string | null
  /** Multiple references to Unit */
  units?: string[] | null
  /** List of QUDT unit codes (if QUDT code available) */
  qudtCodes?: string[] | null
}

export interface PropertyRelationContractV2 {
  /** The relation with the other property: e.g. HasReference, IsEqualTo */
  relationType?: string | null
  /** Namespace URI of the related property */
  relatedPropertyUri?: string | null
  /** Name of the related property */
  relatedPropertyName?: string | null
}

export interface PropertyRelationContractV3 {
  /** The relation with the other property: e.g. HasReference, IsEqualTo */
  relationType?: string | null
  /** Namespace URI of the related property */
  relatedPropertyUri?: string | null
  /** Name of the related property */
  relatedPropertyName?: string | null
}

export interface PropertyValueContractV1 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value (unique within the property) */
  code?: string | null
  /**
   * Allowed value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * (Optional) Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface PropertyValueContractV2 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value (unique within the property) */
  code?: string | null
  /**
   * Possible value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * (Optional) Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface PropertyValueContractV3 {
  /** Globally unique identification of the value (if present) */
  namespaceUri?: string | null
  /** Identification of the value (unique within the property) */
  code?: string | null
  /**
   * Allowed value of the property
   * @minLength 1
   */
  value: string
  /** Description of the value */
  description?: string | null
  /**
   * (Optional) Sort number of value within the list of values for the Property
   * @format int32
   */
  sortNumber?: number | null
}

export interface ReferenceDocumentContractV1 {
  title?: string | null
  name?: string | null
  /** @format date-time */
  date?: string
}

export interface SearchResultContractV1 {
  /**
   * The total number of Materials matching the search criteria
   * @format int32
   */
  numberOfMaterialsFound?: number
  /** The list of Domains with found Materials and Material Properties */
  domains?: DomainSearchResultContractV1[] | null
}

export interface SearchResultContractV2 {
  /**
   * The total number of Classifications matching the search criteria
   * @format int32
   */
  numberOfClassificationsFound?: number
  /** The list of Domains with found Classification and ClassificationProperties */
  domains?: DomainSearchResultContractV2[] | null
}

export interface TextSearchResponseClassificationContractV5 {
  /** Unique identification of the domain the classification belongs to */
  domainNamespaceUri?: string | null
  /** Name of the domain the classification belongs to */
  domainName?: string | null
  name?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** Unique identification of the classification */
  namespaceUri?: string | null
  /** Type of the classification. */
  classificationType?: string | null
  description?: string | null
  parentClassificationName?: string | null
  relatedIfcEntityNames?: string[] | null
}

export interface TextSearchResponseClassificationContractV6 {
  /** Unique identification of the domain the classification belongs to */
  domainNamespaceUri?: string | null
  /** Name of the domain the classification belongs to */
  domainName?: string | null
  name?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** Unique identification of the classification */
  namespaceUri?: string | null
  /** Type of the classification. */
  classificationType?: string | null
  description?: string | null
  parentClassificationName?: string | null
  relatedIfcEntityNames?: string[] | null
}

export interface TextSearchResponseContractV5 {
  /** The list of Classifications found */
  classifications?: TextSearchResponseClassificationContractV5[] | null
  domains?: TextSearchResponseDomainContractV5[] | null
  properties?: TextSearchResponsePropertyContractV5[] | null
}

export interface TextSearchResponseContractV6 {
  /** The list of Classifications found */
  classifications?: TextSearchResponseClassificationContractV6[] | null
  /** The list of Domains with found results */
  domains?: TextSearchResponseDomainContractV6[] | null
  /** The list of Materials found */
  materials?: TextSearchResponseMaterialContractV6[] | null
  /** List of Properties found */
  properties?: TextSearchResponsePropertyContractV6[] | null
}

export interface TextSearchResponseDomainContractV5 {
  namespaceUri?: string | null
  name?: string | null
}

export interface TextSearchResponseDomainContractV6 {
  namespaceUri?: string | null
  name?: string | null
}

export interface TextSearchResponseMaterialContractV6 {
  /** Unique identification of the domain the material belongs to */
  domainNamespaceUri?: string | null
  /** Name of the domain the material belongs to */
  domainName?: string | null
  name?: string | null
  /** Code that can be used for domain specific purposes */
  referenceCode?: string | null
  /** Unique identification of the material */
  namespaceUri?: string | null
  description?: string | null
  parentMaterialName?: string | null
}

export interface TextSearchResponsePropertyContractV5 {
  domainNamespaceUri?: string | null
  domainName?: string | null
  namespaceUri?: string | null
  name?: string | null
  description?: string | null
}

export interface TextSearchResponsePropertyContractV6 {
  domainNamespaceUri?: string | null
  domainName?: string | null
  namespaceUri?: string | null
  name?: string | null
  description?: string | null
}

export interface UnitContractV1 {
  code?: string | null
  name?: string | null
  symbol?: string | null
  qudtUri?: string | null
}

export interface UploadImportFileResultV1 {
  /**
   * Indicates if the file will be imported.
   * Warnings are allowed, import will continue but may lead to undesired values in the database.
   */
  isOk?: boolean
  /**
   * The list of errors found.
   * It may happen that if you fix one error new errors will be discovered.
   */
  errors?: UploadImportFileResultItemV1[] | null
  /**
   * List of warnings.
   * It is best to have no warnings at all to avoid inconsistent or incorrect values in the database
   */
  warnings?: UploadImportFileResultItemV1[] | null
  /** Informational messages */
  informationalMessages?: UploadImportFileResultItemV1[] | null
}

export interface UploadImportFileResultItemV1 {
  /** The attribute the message applies to */
  attribute?: string | null
  /** The message */
  message?: string | null
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title bSDD API test
 * @version v1
 * @license MIT license (https://bsddprototype2020.blob.core.windows.net/public/Copyright_2020_buildingSMART_International.txt)
 * @contact Support <bsdd_support@buildingsmart.org> (https://github.com/buildingSMART/bSDD)
 *
 * API to access the buildingSMART Data Dictionary. For manually uploading import files, please go to https://manage.bsdd.buildingsmart.org. Version history can be found at https://github.com/buildingSMART/bSDD/blob/master/API%20version%20history.md
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Classification
     * @name ClassificationV4List
     * @summary Get Classification details
     * @request GET:/api/Classification/v4
     */
    classificationV4List: (
      query: {
        /** Namespace URI of the classification, e.g. https://identifier.buildingsmart.org/uri/buildingsmart/ifc-4.3/class/ifcwall */
        namespaceUri: string
        /** Use this option to include references to child classifications */
        includeChildClassificationReferences?: boolean
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<ClassificationContractV4, any>({
        path: `/api/Classification/v4`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classification
     * @name ClassificationV3List
     * @summary Get Classification details
     * @request GET:/api/Classification/v3
     */
    classificationV3List: (
      query: {
        /** Namespace URI of the classification, e.g. https://identifier.buildingsmart.org/uri/buildingsmart/ifc-4.3/class/ifcwall */
        namespaceUri: string
        /** Use this option to include references to child classifications */
        includeChildClassificationReferences?: boolean
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<ClassificationContractV3, any>({
        path: `/api/Classification/v3`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ClassificationSearch
     * @name ClassificationSearchOpenV1List
     * @summary Search the bSDD database using free text, get list of Classifications matching the text and optional additional filters
     * @request GET:/api/ClassificationSearchOpen/v1
     */
    classificationSearchOpenV1List: (
      query: {
        /** The text to search for, minimum 3 characters (case and accent insensitive) */
        SearchText: string
        /**
         * List of domains to filter on.
         * For a classification to be found it must be part of one of the given domains
         */
        DomainNamespaceUris?: string[]
        /**
         * List of related IFC entities to filter on.
         * For a classification to be found it must have at least one of the given Related Ifc Entities
         */
        RelatedIfcEntities?: string[]
      },
      params: RequestParams = {},
    ) =>
      this.request<ClassificationSearchResponseContractV1, any>({
        path: `/api/ClassificationSearchOpen/v1`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Country
     * @name CountryV1List
     * @summary Get list of all Countrys
     * @request GET:/api/Country/v1
     */
    countryV1List: (params: RequestParams = {}) =>
      this.request<CountryContractV1[], any>({
        path: `/api/Country/v1`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainV3List
     * @summary Get list of available Domains
     * @request GET:/api/Domain/v3
     */
    domainV3List: (
      query?: {
        /**
         * Optional parameter to filter by first part of namespace URI. Use this one to get details of just one domain version
         *             or, if you leave out the version number at the end, get all the versions of a domain.
         */
        namespaceUri?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<DomainContractV3[], any>({
        path: `/api/Domain/v3`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainV3ClassificationsList
     * @summary Get Domain with the classification and/or material tree
     * @request GET:/api/Domain/v3/Classifications
     */
    domainV3ClassificationsList: (
      query: {
        /** Required parameter to select the domain. */
        namespaceUri: string
        /** Set to true if you want a tree of classifications, set to false to get a flat list of classifications */
        useNestedClassifications?: boolean
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<DomainWithClassificationsContractV3, any>({
        path: `/api/Domain/v3/Classifications`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainV2List
     * @summary Get list of available Domains
     * @request GET:/api/Domain/v2
     */
    domainV2List: (
      query?: {
        /**
         * Optional parameter to filter by first part of namespace URI. Use this one to get details of just one domain version
         *             or, if you leave out the version number at the end, get all the versions of a domain.
         */
        namespaceUri?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<DomainContractV2[], any>({
        path: `/api/Domain/v2`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainV2ClassificationsList
     * @summary Get Domain with the classification tree
     * @request GET:/api/Domain/v2/Classifications
     */
    domainV2ClassificationsList: (
      query: {
        /** Required parameter to select the domain. */
        namespaceUri: string
        /** Set to true if you want a tree of classifications, set to false to get a flat list of classifications */
        useNestedClassifications?: boolean
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<DomainWithClassificationsContractV2, any>({
        path: `/api/Domain/v2/Classifications`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Language
     * @name LanguageV1List
     * @summary Get list of available Languages
     * @request GET:/api/Language/v1
     */
    languageV1List: (params: RequestParams = {}) =>
      this.request<LanguageContractV1[], any>({
        path: `/api/Language/v1`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialV2List
     * @summary Get Material details
     * @request GET:/api/Material/v2
     */
    materialV2List: (
      query: {
        /** Namespace URI of the material */
        namespaceUri: string
        /** Language Code the result will be returned in. For items the translation is not available, the default language of the domain will be returned */
        languageCode?: string
        /** Use this option to include references to child materials */
        includeChildMaterialReferences?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<MaterialContractV2, any>({
        path: `/api/Material/v2`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialV1List
     * @summary Get Material details
     * @request GET:/api/Material/v1
     */
    materialV1List: (
      query: {
        /** Namespace URI of the material */
        namespaceUri: string
        /** Language Code the result will be returned in. For items the translation is not available, the default language of the domain will be returned */
        languageCode?: string
        /** Use this option to include references to child materials */
        includeChildMaterialReferences?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<MaterialContractV1, any>({
        path: `/api/Material/v1`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description This is a preview version! Contracts may change. The details can be requested per Material via the Material API
     *
     * @tags MaterialSearch
     * @name MaterialSearchOpenPreviewList
     * @summary Search the bSDD database, get list of Materials without details.
     * @request GET:/api/Material/SearchOpen/preview
     */
    materialSearchOpenPreviewList: (
      query: {
        /** The namespace uri of the Domain to filter on (required) */
        DomainNamespaceUri: string
        /** The text to search for materials (case and accent insensitive) */
        SearchText?: string
        /**
         * The ISO language code to search in and to return the text in (case sensitive)
         * If no language code specified or the text is not available in the requested language, the text will be returned in the default language of the Domain.
         * If a language code has been given, the search takes place in texts of that language, otherwise searches will be done in the default language of the Domain.
         * If an invalid or not supported language code is given, a Bad Request will be returned.
         */
        LanguageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchResultContractV1, any>({
        path: `/api/Material/SearchOpen/preview`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyV3List
     * @summary Get Property details
     * @request GET:/api/Property/v3
     */
    propertyV3List: (
      query: {
        /** Namespace URI of the property, e.g. http://identifier.buildingsmart.org/uri/buildingsmart/ifc-4.3/prop/AirConditioning */
        namespaceUri: string
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyContractV3, any>({
        path: `/api/Property/v3`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyV2List
     * @summary Get Property details
     * @request GET:/api/Property/v2
     */
    propertyV2List: (
      query: {
        /** Namespace URI of the property, e.g. https://identifier.buildingsmart.org/uri/buildingsmart/ifc-4.3/prop/AirConditioning */
        namespaceUri: string
        /** Specify language (case sensitive). For those items the text is not available in the requested language, the text will be returned in the default language of the domain */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyContractV2, any>({
        path: `/api/Property/v2`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PropertyValue
     * @name PropertyValueV1List
     * @summary Get Property Value details
     * @request GET:/api/PropertyValue/v1
     */
    propertyValueV1List: (
      query: {
        /** Namespace URI of the property value */
        namespaceUri: string
        /** Language Code */
        languageCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyValueContractV1, any>({
        path: `/api/PropertyValue/v1`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ReferenceDocument
     * @name ReferenceDocumentV1List
     * @summary Get list of all ReferenceDocuments
     * @request GET:/api/ReferenceDocument/v1
     */
    referenceDocumentV1List: (params: RequestParams = {}) =>
      this.request<ReferenceDocumentContractV1[], any>({
        path: `/api/ReferenceDocument/v1`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags RequestExportFile
 * @name RequestExportFilePreviewCreate
 * @summary PREVIEW
Request a file with an export of a domain.
Only format "Sketchup" is supported. You get an export in xsd format with limited content.
 * @request POST:/api/RequestExportFile/preview
 * @secure
 */
    requestExportFilePreviewCreate: (
      query: {
        /** The namespace uri of the domain to be downloaded */
        DomainNamespaceUri: string
        /**
         * Select the Export Format you want the result in.
         * Only support format is Sketchup
         * Field can be left empty
         */
        ExportFormat?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<File, ProblemDetails | void>({
        path: `/api/RequestExportFile/preview`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
 * @description The details can be requested per Classification via the Classification API
 *
 * @tags SearchList
 * @name SearchListV2List
 * @summary Secured version of the "Search List API".
Search the bSDD database, get list of Classifications without details.
 * @request GET:/api/SearchList/v2
 * @secure
 */
    searchListV2List: (
      query: {
        /** The namespace uri of the Domain to filter on (required) */
        DomainNamespaceUri: string
        /** The text to search for (case and accent insensitive) */
        SearchText?: string
        /**
         * The ISO language code to search in and to return the text in (case sensitive)
         * If no language code specified or the text is not available in the requested language, the text will be returned in the default language of the Domain.
         * If a language code has been given, the search takes place in texts of that language, otherwise searches will be done in the default language of the Domain.
         * If an invalid or not supported language code is given, a Bad Request will be returned.
         */
        LanguageCode?: string
        /** The official IFC entity name to filter on (case sensitive) */
        RelatedIfcEntity?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchResultContractV2, any>({
        path: `/api/SearchList/v2`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description The details can be requested per Classification via the Classification API
     *
     * @tags SearchList
     * @name SearchListOpenV2List
     * @summary Search the bSDD database, get list of Classifications without details.
     * @request GET:/api/SearchListOpen/v2
     */
    searchListOpenV2List: (
      query: {
        /** The namespace uri of the Domain to filter on (required) */
        DomainNamespaceUri: string
        /** The text to search for (case and accent insensitive) */
        SearchText?: string
        /**
         * The ISO language code to search in and to return the text in (case sensitive)
         * If no language code specified or the text is not available in the requested language, the text will be returned in the default language of the Domain.
         * If a language code has been given, the search takes place in texts of that language, otherwise searches will be done in the default language of the Domain.
         * If an invalid or not supported language code is given, a Bad Request will be returned.
         */
        LanguageCode?: string
        /** The official IFC entity name to filter on (case sensitive) */
        RelatedIfcEntity?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchResultContractV2, any>({
        path: `/api/SearchListOpen/v2`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description The details can be requested per Classification via the Classification API
     *
     * @tags TextSearchList
     * @name TextSearchListOpenV6List
     * @summary Search the bSDD database using free text, get list of Classifications and/or Properties matching the text.
     * @request GET:/api/TextSearchListOpen/v6
     */
    textSearchListOpenV6List: (
      query: {
        /** The text to search for, minimum 3 characters (case and accent insensitive) */
        SearchText: string
        /** Type filter: must be "All", "Classifications", "Materials" or "Properties" */
        TypeFilter?: string
        /** List of domain to filter on */
        DomainNamespaceUris?: string[]
      },
      params: RequestParams = {},
    ) =>
      this.request<TextSearchResponseContractV6, any>({
        path: `/api/TextSearchListOpen/v6`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description The details can be requested per Classification via the Classification API
     *
     * @tags TextSearchList
     * @name TextSearchListOpenV5List
     * @summary Search the bSDD database using free text, get list of Classifications and/or Properties matching the text.
     * @request GET:/api/TextSearchListOpen/v5
     */
    textSearchListOpenV5List: (
      query: {
        /** The text to search for, minimum 3 characters (case and accent insensitive) */
        SearchText: string
        /** Type filter: must be "All", "Classifications" or "Properties" */
        TypeFilter?: string
        /** List of domain to filter on */
        DomainNamespaceUris?: string[]
      },
      params: RequestParams = {},
    ) =>
      this.request<TextSearchResponseContractV5, any>({
        path: `/api/TextSearchListOpen/v5`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name UnitV1List
     * @summary Get list of all units
     * @request GET:/api/Unit/v1
     */
    unitV1List: (params: RequestParams = {}) =>
      this.request<UnitContractV1[], any>({
        path: `/api/Unit/v1`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UploadImportFile
     * @name UploadImportFileV1Create
     * @summary Upload a bSDD import model json file, see https://github.com/buildingSMART/bSDD/tree/master/Model/Import%20Model for more information
     * @request POST:/api/UploadImportFile/v1
     * @secure
     */
    uploadImportFileV1Create: (
      data: {
        /**
         * Code of the organization owning the domain.
         * If you do not know the code, contact us (see e-mail address on top of this page)
         */
        OrganizationCode: string
        /**
         * The bsdd import file in json format
         * @format binary
         */
        FormFile: File
        /**
         * Set to true if you only want to validate the file. Even when there are no validation errors the file wil not be imported.
         * The validation result will not be send via e-mail.
         */
        ValidateOnly?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<UploadImportFileResultV1, any>({
        path: `/api/UploadImportFile/v1`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  }
}
