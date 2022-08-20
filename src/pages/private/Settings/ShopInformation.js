import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

export default function ShopInformation() {

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
                        <Form.Item
                            label="Shop Name"
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
                            label="Mobile Number"
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
                            label="Email"
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
                            label="Address"
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
        </div>
    )
}
