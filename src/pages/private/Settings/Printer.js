import React, { useState } from 'react'
import { Button, Checkbox,  Radio, Form, Input, Row, Col } from 'antd';

export default function Printer() {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const onChangeC = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  
  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Ink Printer</Radio>
            <Radio value={2}>Thermal Printer</Radio>
          </Radio.Group>

          <Checkbox onChange={onChangeC}>Auto print (Only for Themal Printing)</Checkbox>

          <Button type="primary">Save</Button>
        </Col>
      </Row>
    </div>
  )
}
