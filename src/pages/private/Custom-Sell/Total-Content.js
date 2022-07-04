import React, { useState } from 'react'
import { Card, Button, Form, Input, Row, Col, Modal, Checkbox } from 'antd'
import { postData } from '../../../scripts/api-service';
import { SOLD_ROOT_TABLE } from '../../../scripts/api';

export default function TotalContent(props) {
  const { serialNum, temData } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    values.serial_no = serialNum;
    values.with_tax = 95;
    values.total_amount = 95;
    values.total_products = 2;
    values.Id = Math.floor(Math.random() * 1000);
    
    let res = await postData(SOLD_ROOT_TABLE, values);

    if (res) {
      console.log("rteeetre5ry", res);
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    if (temData?.length) {
      temData.forEach(tem => {
        total = total + (tem.taka || 0)
      })
    }

    return total;
  }

  return (
    <>
      <Card className='text-center'>
        Serial Number: {serialNum} <br />
        Total Products: {temData?.length || 0} <br />
        Total Amount: {calculateTotalAmount()} <br />
        Tax(2% )    : 1.8   Taka <br />

        <hr />
        With Tax: 91.8   Taka
        <br />
        <Button type="primary" onClick={showModal}>
          Sell
        </Button>
      </Card>

      <Modal title="Sell" visible={isModalVisible}
        footer={false}
        onCancel={() => { setIsModalVisible(false) }}>
        <Form
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
                <Input />
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
                <Input />
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
                <Checkbox>Same As Customer Name</Checkbox>
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
              Total Amount: 91.8
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
