import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { getData, putData } from '../../../scripts/api-service';
import { PERMANENT_VALUES } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function DataBackup() {
  const [form] = Form.useForm();
  const [permanentValues, setPermanentValues] = useState();


  const onFinish = async (values) => {
    permanentValues.AUTO_SYNC = values.AUTO_SYNC ? 1 : 0;

    let res = await putData(PERMANENT_VALUES + permanentValues.Id, permanentValues);

    if (res) {
      alertPop('success', 'Update successfully');
    }
  };

  const getPermanentValues = async() => {
    let res = await getData(PERMANENT_VALUES);

    if (res) {
      let masterData = res?.data?.length ? res.data[0] : '';
      setPermanentValues(masterData);
      
      form.setFieldsValue({
        AUTO_SYNC: !!masterData.AUTO_SYNC
      });
    }
  }

  useEffect(() => {
    getPermanentValues()
  }, [])

  return (
    <div>
      <Form
        form={form}
        layout={"vertical"}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="AUTO_SYNC" valuePropName="checked">
              <Checkbox>Auto sync</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item >
          <Button type="primary" htmlType="submit" >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
