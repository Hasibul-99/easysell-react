import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Space, Radio, Form, Input, Row, Col } from 'antd';
import { getData, putData } from '../../../scripts/api-service';
import { PERMANENT_VALUES } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function Currency() {
  const [value, setValue] = useState('AED');
  const [permanentValues, setPermanentValues] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const getPermanentValues = async() => {
    let res = await getData(PERMANENT_VALUES);

    if (res) {
      let masterData = res?.data?.length ? res.data[0] : '';
      setPermanentValues(masterData);

      setValue(masterData?.CURRENCY);
    }
  }

  const updateCurrency = async () => {
    permanentValues.CURRENCY = value;
    
    let res = await putData(PERMANENT_VALUES + permanentValues.Id, permanentValues);

    if (res) {
      alertPop('success', 'Update successfully');
    }
  }

  useEffect(() => {
    getPermanentValues()
  }, [])

  return (
    <div>
      <Space>
        Select Currency:

        <Radio.Group onChange={onChange} value={value}>
          <Radio value={'Dollar'}>Dollar($)</Radio>
          <Radio value={"AED"}>AED</Radio>
          <Radio value={'BD'}>Taka(৳)</Radio>
        </Radio.Group>
      </Space>
      <br/>
      <Button type="primary" onClick={() => updateCurrency()}>Apply</Button>

    </div>
  )
}
