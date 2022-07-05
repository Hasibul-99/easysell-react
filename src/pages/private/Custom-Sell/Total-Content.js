import React, { useState } from 'react'
import { Card, Button, Form, Input, Row, Col, Modal, Checkbox } from 'antd'
import { getData, postData } from '../../../scripts/api-service';
import { CUSTOMER_LIST, SOLD_ROOT_TABLE } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function TotalContent(props) {
  const [form] = Form.useForm();
  const { serialNum, temData, permanetValues } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

//   {
//     "id": 17,
//     "customer_name": "",
//     "mobile_number": "0",
//     "company_name": "",
//     "customer_address": "",
//     "serial_no": 10033,
//     "table_name": "sold_root_table_pos",
//     "status": "Paid",
//     "timedate": "5:16 PM 11/2/2021",
//     "amount": 7278,
//     "paid": 7278,
//     "due": 0
// }

  const onFinish = async (values) => {
    values.serial_no = serialNum;
    values.with_tax = (calculateTotalAmount() + showTaxAmount()) || 0;
    values.total_amount = calculateTotalAmount();
    values.total_products = temData.length || 0;
    values.Id = Math.floor(Math.random() * 1000000);

    let res = await postData(SOLD_ROOT_TABLE, values);

    if (res) {
      customerAdd(values)
      console.log("rteeetre5ry", res);
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const customerAdd  = async (values) => {
    let res = await postData(CUSTOMER_LIST, values);

    if (res) {
      alertPop('success', 'Customer add successfully');
    }
  }

  const calculateTotalAmount = () => {
    let total = 0;
    if (temData?.length) {
      temData.forEach(tem => {
        total = total + (tem.taka || 0)
      })
    }

    return total;
  }

  const showTaxAmount = () => {
    let total = calculateTotalAmount(),
        tax = permanetValues?.TAX || 0;

    return ((total * tax) / 100 ) || 0;
  }

  const MobileNumber = async (e) => {
    let value = e.target.value;

    if (value?.length > 2) {
      let res = await getData(CUSTOMER_LIST + value);

      if (res) {
        let masterData = res.data;

        if (masterData.customer_name) {
          form.setFieldsValue({ customer_name: masterData.customer_name });
        }
      }
    } 
  }

  const sameAsCustomerName = (e) => {
    if (e.target.checked) {
      let values = form.getFieldValue();
      let {customer_name} = values;
      form.setFieldsValue({ company_name: customer_name });
    }
  }

  return (
    <>
      <Card className='text-center'>
        Serial Number: {serialNum} <br />
        Total Products: {temData?.length || 0} <br />
        Total Amount: {calculateTotalAmount()} <br />
        Tax({permanetValues?.TAX || 0}% )    :  {showTaxAmount()}  Taka <br />

        <hr />
        With Tax: {calculateTotalAmount() + showTaxAmount()}   Taka
        <br />
        <Button type="primary" onClick={showModal}>
          Sell
        </Button>
      </Card>

      <Modal title="Sell" visible={isModalVisible}
        footer={false}
        onCancel={() => { setIsModalVisible(false) }}>
        <Form
          form={form}
          name="basic"
          layout={"vertical"}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Mobile Number"
                name="customer_number"
                rules={[
                  {
                    required: true,
                    message: 'Please input Mobile Number',
                  },
                ]}
              >
                <Input onChange={(e) => MobileNumber(e)} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Customer Name"
                name="customer_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Customer Name!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Company Name"
                name="company_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Company Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="rate">
                <Checkbox onChange={(e) => sameAsCustomerName(e)}>Same As Customer Name</Checkbox>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Customer Address"
                name="customer_address"
                rules={[
                  {
                    required: true,
                    message: 'Please input Customer Address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row pt-5" span={8}>
              Total Amount: {(calculateTotalAmount() + showTaxAmount()) || 0}
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Paid"
                name="paid"
                rules={[
                  {
                    required: true,
                    message: 'Please input paid!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Due"
                name="due"
                rules={[
                  {
                    required: true,
                    message: 'Please input due!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-right">
            <Button type="primary" size='large' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
