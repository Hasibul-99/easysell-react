import React from 'react'
import { Button, Checkbox, Select, Form, Input, Space, Row, Col } from 'antd';
const { Option } = Select;

export default function Theme() {

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Space>
            Select Theme

            <Select
              defaultValue="lucy"
              style={{
                width: 250,
              }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>

            <Button type="primary">Apply</Button>
          </Space>

          <Form
            layout={"vertical"}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Theme Name"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Shop Name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Topbar Background"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input mobile number!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Topbar Foreground"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Background"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Address!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className='text-right'
            >
              <Button type="primary" htmlType="submit" >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className="gutter-row" span={12}></Col>
      </Row>
    </div>
  )
}
