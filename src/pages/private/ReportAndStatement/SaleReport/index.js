import React, { useState } from 'react';
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import CustomerSellReport from "./CustomerSellReport";
import POSSellReport from "./PosSellReport";

const { Option } = Select;
export default function SaleReport() {
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
          <Option value="1">POS Sell Report</Option>
          <Option value="2">Customer Sell Report</Option>
        </Select>
      </div>

      <hr/>

      <div>
        {selected === "1" ? <POSSellReport></POSSellReport> : ''}
        {selected === "2" ? <CustomerSellReport></CustomerSellReport> : ''}
      </div>
    </div>
  )
}
