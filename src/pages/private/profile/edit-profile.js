import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

export default function EditProfile() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return <div className='page-content'>
        <div className='card'>
            <div className='card-body'>
                <Row>
                    <Col span={3}>
                        <img className="wd-100 ht-100 rounded-circle" src="https://via.placeholder.com/100x100" alt />
                    </Col>
                    {/* <Col span={21} className='mt-4'>
                        <h3>Hasibul Hasan</h3>
                        <p className='text-muted'>Email: hasibul@gmail.ocm</p>
                    </Col> */}
                </Row>

                <Form
                    className='mt-5'
                    layout={"vertical"}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="emial"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button className='b-button' type="primary" htmlType="submit" style={{padding: "0 3rem"}}>
                            Save
                        </Button>
                    </Form.Item>
                    </Form>
            </div>
        </div>
    </div>;
}
