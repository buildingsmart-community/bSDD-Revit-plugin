import { useState, useEffect, Children } from 'react';
import { Form } from 'react-bootstrap';
import Checkbox from './Checkbox';

interface Props {
  propertySet: IfcPropertySet;
  property: IfcProperty | IfcPropertyEnumeratedValue | IfcPropertySingleValue;
  propertyIndex: number;
  propertySets: { [id: string]: IfcPropertySet };
  setPropertySets: (value: { [id: string]: IfcPropertySet }) => void;
}

function Property(props: Props) {
  const [input, setInput] = useState<any>();
  const ifcProperty:
    | IfcProperty
    | IfcPropertyEnumeratedValue
    | IfcPropertySingleValue = props.property;
  const ifcPropertySet: IfcPropertySet = props.propertySet;
  const ifcPropertySets: { [id: string]: IfcPropertySet } = props.propertySets;
  const setIfcPropertySets: (value: { [id: string]: IfcPropertySet }) => void =
    props.setPropertySets;

  useEffect(() => {
    switch (ifcProperty.type) {
      case 'IfcPropertySingleValue': {
        if (ifcProperty.nominalValue.type === 'IfcBoolean') {
          setInput(
            <Checkbox
              disabled={false}
              value={ifcProperty.nominalValue.value}
              setValue={(value: true | false | undefined) => {
                const propertySets = { ...ifcPropertySets };
                const propertySet = { ...ifcPropertySet };
                if (propertySet.name) {
                  const p:
                    | IfcProperty
                    | IfcPropertyEnumeratedValue
                    | IfcPropertySingleValue = { ...ifcProperty };
                  p.nominalValue.value = value;
                  const i: number = propertySet.hasProperties.findIndex(
                    (element) => element.name === ifcProperty.name,
                  );
                  if (i != -1) {
                    propertySet.hasProperties[i] = p;
                    propertySets[propertySet.name] = propertySet;
                    setIfcPropertySets(propertySets);
                  }
                }
              }}
            />,
          );
        } else {
          setInput(
            <Form.Control
              placeholder={ifcProperty.nominalValue.value}
              value={ifcProperty.nominalValue.value}
              onChange={(e) => {
                const propertySets = { ...ifcPropertySets };
                const propertySet = { ...ifcPropertySet };
                if (propertySet.name) {
                  const p:
                    | IfcProperty
                    | IfcPropertyEnumeratedValue
                    | IfcPropertySingleValue = { ...ifcProperty };
                  p.nominalValue.value = e.target.value;
                  const i: number = propertySet.hasProperties.findIndex(
                    (element) => element.name === ifcProperty.name,
                  );
                  if (i != -1) {
                    propertySet.hasProperties[i] = p;
                    propertySets[propertySet.name] = propertySet;
                    setIfcPropertySets(propertySets);
                  }
                }
              }}
            />,
          );
        }
        break;
      }
      case 'IfcPropertyEnumeratedValue': {
        setInput(
          <Form.Select
            placeholder={ifcProperty.name}
            value={ifcProperty.enumerationValues}
            onChange={(e) => {
              const propertySets = { ...ifcPropertySets };
              const propertySet = { ...ifcPropertySet };
              if (propertySet.name) {
                const p:
                  | IfcProperty
                  | IfcPropertyEnumeratedValue
                  | IfcPropertySingleValue = { ...ifcProperty };
                p.enumerationValues = [e.target.value];
                const i: number = propertySet.hasProperties.findIndex(
                  (element) => element.name === ifcProperty.name,
                );
                if (i != -1) {
                  propertySet.hasProperties[i] = p;
                  propertySets[propertySet.name] = propertySet;
                  setIfcPropertySets(propertySets);
                }
              }
            }}
          >
            {Children.toArray(
              ifcProperty.enumerationReference.enumerationValues.map(
                (value: any, index: any) => (
                  <option key={index}>{value}</option>
                ),
              ),
            )}
          </Form.Select>,
        );
        break;
      }
      default: {
        setInput(
          <Form.Control
            placeholder={ifcProperty.name}
            value="{ifcProperty.nominalValue}"
          />,
        );
        break;
      }
    }
  }, [
    ifcProperty,
    ifcPropertySet,
    setInput,
    ifcPropertySets,
    setIfcPropertySets,
  ]);

  return (
    <Form.Group className="mb-3 row" key={props.propertyIndex}>
      <Form.Label className="col-sm-5 col-form-label">
        {ifcProperty.name}
      </Form.Label>
      <div className="col-sm-7">{input}</div>
    </Form.Group>
  );
}
export default Property;
