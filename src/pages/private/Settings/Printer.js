import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Radio, Form, Input, Row, Col } from 'antd';
import { getData, putData } from '../../../scripts/api-service';
import { PERMANENT_VALUES } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function Printer() {
  const [value, setValue] = useState(1);
  const [permanentValue, setPermanentValue] = useState()
  const [logoFile, setLogoFile] = useState();
  const [headerFile, setHeaderFile] = useState();
  const [footerFile, setFooterFile] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeC = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const saveData = async () => {
    var formData = new FormData();

    formData.append('logo', logoFile);
    formData.append('header', headerFile);
    formData.append('footer', footerFile);
    formData.append('Id', permanentValue.Id);
    formData.append('INSTALLED_DATE', permanentValue.INSTALLED_DATE);
    formData.append('CURRENCY', permanentValue.CURRENCY);
    formData.append('HEADER', permanentValue.HEADER);
    formData.append('FOOTER', permanentValue.FOOTER);
    formData.append('TAX', permanentValue.TAX);
    formData.append('THEME_NAME', permanentValue.THEME_NAME);
    formData.append('AUTO_SYNC', permanentValue.AUTO_SYNC);
    formData.append('SERVER_URL', permanentValue.SERVER_URL);
    formData.append('PRINTER_TYPE', permanentValue.PRINTER_TYPE);

    let res = await putData(PERMANENT_VALUES + permanentValue.Id, formData);

    if (res) {
      alertPop('success', 'Update successfully');
    }
  }

  const getPermanentValue = async () => {
    let res = await getData(PERMANENT_VALUES);

    if (res) {
      setPermanentValue(res.data[0]);
    }
  } 

  useEffect(() => {
    getPermanentValue()
  }, [])

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Ink Printer</Radio>
            <Radio value={2}>Thermal Printer</Radio>
          </Radio.Group>

          <Checkbox onChange={onChangeC}>Auto print (Only for Themal Printing)</Checkbox>

          {
            value === 2 ? <>
              <Row gutter={16} className="mt-5">
                <Col className="gutter-row mb-4" span={12}>
                  <label className='mb-3'>Logo</label>
                  <input
                    className="form-control h-auto"
                    type="file"
                    accept='image/*'
                    title='Select File'
                    onChange={e => { setLogoFile(e.target.files[0]) }}
                    id="formFileLogo" />
                </Col>
                <Col className="gutter-row  mb-4" span={12}>
                  <label className='mb-3'>Header</label>
                  <input
                    className="form-control h-auto"
                    type="file"
                    accept='image/*'
                    title='Select File'
                    onChange={e => { setHeaderFile(e.target.files[0]) }}
                    id="formFileHeader" />
                </Col>
                <Col className="gutter-row  mb-4" span={12}>
                  <label className='mb-3'>Footer</label>
                  <input
                    className="form-control h-auto"
                    type="file"
                    accept='image/*'
                    title='Select File'
                    onChange={e => { setFooterFile(e.target.files[0]) }}
                    id="formFileFooter" />
                </Col>
              </Row>
            </> : ''
          }

          <Button type="primary" onClick={() => { saveData() }}>Save</Button>
        </Col>
      </Row>
    </div>
  )
}
