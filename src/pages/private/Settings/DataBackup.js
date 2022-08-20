import React from 'react'
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

export default function DataBackup() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Form
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
