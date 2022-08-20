import React, { useState } from 'react'
import { Button, Checkbox, Space, Radio, Form, Input, Row, Col } from 'antd';

export default function Currency() {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <Space>
        Select Currency:

        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Dollar($)</Radio>
          <Radio value={2}>AED</Radio>
          <Radio value={2}>Taka(৳)</Radio>
        </Radio.Group>
      </Space>
      <br/>
      <Button type="primary">Apply</Button>

    </div>
  )
}
