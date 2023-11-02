interface IfcJsonEntity {
  type?: string;
}

interface IfcEntity extends IfcJsonEntity {
  name?: string; // IfcLabel
  description?: string; // IfcText
  isDefinedBy?: IfcPropertySet[]; // (!) IfcRelDefines: RelatedObjects	 : 	SET [1:?] OF IfcObject;
  hasAssociations?: IfcClassificationReference[];
}

interface IfcClassification extends IfcJsonEntity {
  type: 'IfcClassification';
  source?: string; // IfcLabel
  edition?: string; // IfcLabel
  editionDate?: string; // IfcDate
  name: string; // IfcLabel
  description?: string; // IfcText
  specification?: string; // IfcURIReference
  referenceTokens?: string[]; // IfcIdentifier

  // inverse
  classificationForObjects?: any; // SET [0:?] OF IfcRelAssociatesClassification FOR RelatingClassification
  hasReferences?: any; // SET [0:?] OF IfcClassificationReference FOR ReferencedSource
}

interface IfcExternalReference extends IfcJsonEntity {
  type: 'IfcExternalReference';
  location?: string; // IfcURIReference
  identification?: string; // IfcIdentifier
  name: string; // IfcLabel

  // inverse
  externalReferenceForResources?: any; // SET [0:?] OF IfcExternalReferenceRelationship FOR RelatingReference
}
interface IfcClassificationReference extends IfcExternalReference {
  type: 'IfcClassificationReference';
  referencedSource?: IfcClassification; // IfcClassificationReferenceSelect
  description?: string; // IfcText
  sort?: string; // IfcIdentifier

  // inverse
  classificationRefForObjects?: any; // SET [0:?] OF IfcRelAssociatesClassification FOR RelatingClassification
  hasReferences?: any; // SET [0:?] OF IfcClassificationReference FOR ReferencedSource
}

interface IfcRoot extends IfcJsonEntity {
  type: 'IfcRoot';
  globalId?: string;
  ownerHistory?: any;
  name?: string; // IfcLabel
  description?: string; // IfcText
}
interface IfcPropertyAbstraction extends IfcJsonEntity {
  type: 'IfcPropertyAbstraction';

  // inverse
  HasExternalReferences: any; // SET [0:?] OF IfcExternalReferenceRelationship FOR RelatedResourceObjects
}

interface IfcProperty extends IfcRoot {
  type: 'IfcProperty';
  name: string; // 	IfcIdentifier
  specification?: string; // IfcText

  // inverse
  partOfPset?: any; // SET [0:?] OF IfcPropertySet FOR HasProperties
  propertyForDependance?: any; // SET [0:?] OF IfcPropertyDependencyRelationship FOR DependingProperty
  propertyDependsOn?: any; // SET [0:?] OF IfcPropertyDependencyRelationship FOR DependantProperty
  partOfComplex?: any; // SET [0:?] OF IfcComplexProperty FOR HasProperties
  hasConstraints?: any; // SET [0:?] OF IfcResourceConstraintRelationship FOR RelatedResourceObjects
  hasApprovals?: any; // SET [0:?] OF IfcResourceApprovalRelationship FOR RelatedResourceObjects
}

interface IfcPropertyDefinition extends IfcRoot {
  type: 'IfcPropertyDefinition';

  // inverse
  hasAssociations?: any; // SET OF IfcRelAssociates FOR RelatedObjects;
}

interface IfcPropertySetDefinition extends IfcPropertyDefinition {
  type: 'IfcPropertySetDefinition';

  // inverse
  PropertyDefinitionOf?: any; // SET [0:1] OF IfcRelDefinesByProperties FOR RelatingPropertyDefinition;
  DefinesType?: any; // SET [0:1] OF IfcTypeObject FOR HasPropertySets;
}

interface IfcPropertySet extends IfcPropertySetDefinition {
  type: 'IfcPropertySet';

  // inverse
  hasProperties: (
    | IfcProperty
    | IfcPropertySingleValue
    | IfcPropertyEnumeratedValue
  )[]; // SET [1:?] OF IfcProperty;
}

interface IfcSimpleProperty extends IfcProperty {
  type: 'IfcSimpleProperty';
}

interface IfcPropertySingleValue extends IfcSimpleProperty {
  type: 'IfcPropertySingleValue';
  nominalValue?: any; // IfcValue
  unit?: any; // IfcUnit
}

interface IfcPropertyEnumeratedValue extends IfcSimpleProperty {
  type: 'IfcPropertyEnumeratedValue';
  enumerationValues?: any; // LIST [1:?] OF IfcValue
  enumerationReference?: any; // IfcPropertyEnumeration
}

interface IfcPropertyEnumeration extends IfcPropertyAbstraction {
  type: 'IfcPropertyEnumeration';
  name: string; // IfcLabel
  enumerationValues: any[]; // LIST [1:?] OF UNIQUE IfcValue
  Unit?: any; // IfcUnit
}

interface IfcValue extends IfcJsonEntity {
  type: string;
  value?: any;
}

interface Option {
  label: string;
  value: string;
}
interface PropertyCollection {
  name: string;
  bsddProperty: ClassificationPropertyContractV3;
  value?: any;
}
// interface PropertySetCollection {
//   name: string;
//   properties: PropertyCollection[];
// }
