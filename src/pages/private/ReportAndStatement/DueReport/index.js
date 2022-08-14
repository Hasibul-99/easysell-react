import React, { useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import UseInExpense from './UseInExpense';
import UseInSells from './UseInSells';


const { Option } = Select;
export default function DueReport() {
  const [selected, setSelected] = useState('1');

  return (
    <div>
      <div className='mb-3'>
        <Select
          defaultValue={selected}
          size="large"
          style={{
            width: 350,
          }}
          onChange={(val) => { setSelected(val) }}
        >
          <Option value="1">Due in Expense</Option>
          <Option value="2">Due in Sells</Option>
        </Select>
      </div>

      <hr />

      <div>
        {selected === '1' ? <UseInExpense></UseInExpense> : ''}
        {selected === '2' ? <UseInSells></UseInSells> : ''}
      </div>
    </div>
  )
}
