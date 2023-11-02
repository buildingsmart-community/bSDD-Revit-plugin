import { useEffect, Children } from 'react'
import { Accordion } from 'react-bootstrap'
import { ClassificationContractV4, ClassificationPropertyContractV3 } from './BsddApi'
import Property from './Property'

interface Props {
  classifications: ClassificationContractV4[]
  propertySets: { [id: string]: IfcPropertySet }
  setPropertySets: (value: { [id: string]: IfcPropertySet }) => void
  recursiveMode: boolean
}

function PropertySets(props: Props) {
  const classifications: ClassificationContractV4[] = props.classifications
  const propertySets: { [id: string]: IfcPropertySet } = props.propertySets
  const setPropertySets: (value: { [id: string]: IfcPropertySet }) => void = props.setPropertySets
  const recursiveMode: boolean = props.recursiveMode

  function GetIfcPropertyValue(dataType: string | undefined | null, predefinedValue: any): IfcValue {
    switch (dataType) {
      case 'Boolean': {
        const value: IfcValue = {
          type: 'IfcBoolean',
        }
        switch (predefinedValue) {
          case true:
          case 'TRUE': {
            value.value = true
            return value
          }
          case false:
          case 'FALSE': {
            value.value = false
            return value
          }
          default: {
            value.value = undefined
            return value
          }
        }
      }
      case 'Character': {
        const value: IfcValue = {
          type: 'default',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
      case 'Integer': {
        const value: IfcValue = {
          type: 'IfcInteger',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
      case 'Real': {
        const value: IfcValue = {
          type: 'IfcReal',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
      case 'String': {
        const value: IfcValue = {
          type: 'default',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
      case 'Time': {
        const value: IfcValue = {
          type: 'IfcDate',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
      default: {
        const value: IfcValue = {
          type: 'default',
        }
        if (predefinedValue) {
          value.value = predefinedValue
        }
        return value
      }
    }
  }

  function GetIfcProperty(
    classificationProperty: ClassificationPropertyContractV3,
  ): IfcProperty | IfcPropertySingleValue | IfcPropertyEnumeratedValue {
    if (classificationProperty.possibleValues) {
      const ifcProperty: IfcPropertyEnumeratedValue = {
        type: 'IfcPropertyEnumeratedValue',
        name: classificationProperty.name,
        enumerationReference: {
          type: 'IfcPropertyEnumeration',
          name: classificationProperty.name,
          enumerationValues: classificationProperty.possibleValues.map((possibleValue) => possibleValue.value),
        },
      }
      if (classificationProperty.propertyNamespaceUri) {
        ifcProperty.specification = classificationProperty.propertyNamespaceUri
      }
      return ifcProperty
    } else {
      const ifcProperty: IfcPropertySingleValue = {
        type: 'IfcPropertySingleValue',
        name: classificationProperty.name,
      }
      if (classificationProperty.propertyNamespaceUri) {
        ifcProperty.specification = classificationProperty.propertyNamespaceUri
      }
      ifcProperty.nominalValue = GetIfcPropertyValue(
        classificationProperty.dataType,
        classificationProperty.predefinedValue,
      )
      return ifcProperty
    }
  }

  useEffect(() => {
    const propertySets: { [id: string]: IfcPropertySet } = {}
    const propertyClassifications = recursiveMode ? classifications : classifications.slice(0, 1)
    propertyClassifications.forEach((classification) => {
      if (classification.classificationProperties) {
        classification.classificationProperties.map((classificationProperty) => {
          const propertySetName = classificationProperty.propertySet || classification.name
          if (!(propertySetName in propertySets)) {
            propertySets[propertySetName] = {
              type: 'IfcPropertySet',
              name: propertySetName,
              hasProperties: [],
            }
          }
          propertySets[propertySetName].hasProperties.push(GetIfcProperty(classificationProperty))
        })
      }
    })
    // // return PropertySets Array ordered alphabetically
    // return Object.keys(propertySets)
    //   .sort()
    //   .map((propertySetName) => {
    //     return propertySets[propertySetName]
    //   })
    setPropertySets(propertySets)
  }, [classifications, setPropertySets, recursiveMode])

  return (
    <div>
      {Children.toArray(
        Object.values(propertySets).map((propertySet, propertySetIndex) => (
          <Accordion flush>
            <Accordion.Item eventKey='0' key={propertySetIndex}>
              <Accordion.Header>{propertySet.name}</Accordion.Header>
              <Accordion.Body>
                {Children.toArray(
                  propertySet.hasProperties.map((property, propertyIndex) => (
                    <Property
                      propertySet={propertySet}
                      property={property}
                      propertyIndex={propertyIndex}
                      propertySets={propertySets}
                      setPropertySets={setPropertySets}
                    />
                  )),
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )),
      )}
    </div>
  )
}
export default PropertySets
