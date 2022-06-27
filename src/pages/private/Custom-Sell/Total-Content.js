import React, { useState } from 'react'
import { Card, Button, Form, Input, Row, Col, Modal, Checkbox } from 'antd'

export default function TotalContent() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Card className='text-center'>
        Serial Number: 10039 <br />
        Total Products: 2 <br />
        Total Amount: 90 <br />
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
                label="Customer Name"
                name="p_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Mobile Number"
                name="bar_code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Company Name"
                name="p_code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
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
                name="rate"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
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
                name="rate"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
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
                    message: 'Please input your username!',
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
