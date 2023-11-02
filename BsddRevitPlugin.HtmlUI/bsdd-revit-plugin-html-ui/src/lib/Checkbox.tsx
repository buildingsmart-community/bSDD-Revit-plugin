import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  value: true | false | undefined;
  setValue: (value: true | false | undefined) => void;
  disabled: boolean;
}

function Checkbox(props: Props) {
  const { value, setValue, disabled } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.indeterminate = false;
    setValue(e.target.checked);
  };

  useEffect(() => {
    if (checkboxRef.current) {
      if (value === true) {
        checkboxRef.current.checked = true;
      } else if (value === undefined) {
        checkboxRef.current.indeterminate = true;
      }
    }
  });

  return (
    <Form.Check
      ref={checkboxRef}
      type="checkbox"
      onChange={(e) => handleOnChange(e)}
      disabled={disabled}
    />
  );
}

export default Checkbox;
