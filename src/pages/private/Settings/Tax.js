import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd';
import { getData, putData } from '../../../scripts/api-service';
import { PERMANENT_VALUES } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function Tax() {
  const [permanentValues, setPermanentValues] = useState();
  const [value, setValue] = useState();

  const getPermanentValues = async() => {
    let res = await getData(PERMANENT_VALUES);

    if (res) {
      let masterData = res?.data?.length ? res.data[0] : '';
      setPermanentValues(masterData);

      setValue(masterData?.TAX);
    }
  }

  const updateTax = async () => {
    permanentValues.TAX = value;
    
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
      <Input addonBefore="Tax:" addonAfter="%" style={{width: '250px'}} value={value}
        onChange={e => setValue(e.target.value)}/>
      <Button type="primary" className='ml-3' onClick={updateTax}>Save</Button>
    </div>
  )
}
