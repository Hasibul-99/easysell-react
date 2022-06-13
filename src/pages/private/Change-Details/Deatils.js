import React from 'react';
import { Form, Input, Button, Select, Card, Radio } from 'antd';

const { Option } = Select;

export default function Deatils() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div>
            <Card>
                <Form
                    name="basic"
                    layout={"vertical"}
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
                        label="Channel Name"
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
                        label="Group Name"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option value="1">Not Identified</Option>
                            <Option value="2">Closed</Option>
                            <Option value="3">Communicated</Option>
                            <Option value="4">Identified</Option>
                            <Option value="5">Resolved</Option>
                            <Option value="6">Cancelled</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Stream ID"
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
                        label="Logo"
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
                        label="Epg Channel ID"
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
                        label="Stream Type"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option value="1">Not Identified</Option>
                            <Option value="2">Closed</Option>
                            <Option value="3">Communicated</Option>
                            <Option value="4">Identified</Option>
                            <Option value="5">Resolved</Option>
                            <Option value="6">Cancelled</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Is Disable</Radio>
                            <Radio value={2}>Is Adult</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
    </div>;
}
