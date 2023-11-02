import React from 'react'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'

interface Props {
  recursiveMode: boolean
  setRecursiveMode: (value: boolean) => void
}

function RecursiveMode(props: Props) {
  // const [selectOptions, setSelectOptions] = useState<any[]>([])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setRecursiveMode(e.target.checked)
  }

  return (
    <OverlayTrigger overlay={<Tooltip>show nested classifications</Tooltip>} placement='bottom'>
      <Form.Check type='switch' id='custom-switch' checked={props.recursiveMode} onChange={(e) => handleOnChange(e)} />
    </OverlayTrigger>
  )
}
export default RecursiveMode
