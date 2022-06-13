import React from 'react';
import { Row, Col, Input, Button, Form, DatePicker } from 'antd';


export default function CodeCreate() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div className='page-content'>
            <div className='card'>
                <div className='card-body'>
                    <Row>
                        <Col span={18} >
                            <Row className="mb-3">
                                <Col span={16}>
                                    <label className="ant-form-item-required mb-2" title="code">Code</label>
                                    <Input placeholder="Code" size='large'/>
                                </Col>
                                <Col span={8} className="pt-4">
                                    <Button type="primary" className='float-right b-button'>Generate Code</Button>
                                </Col>
                            </Row>

                            <Form
                                name="basic"
                                layout={"vertical"}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Expire Date"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <DatePicker size='large' style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item
                                    label="EPG"
                                    name="epg"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>

                                <Form.Item>
                                    <Button className='b-button' type="primary" htmlType="submit">
                                        Create
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
