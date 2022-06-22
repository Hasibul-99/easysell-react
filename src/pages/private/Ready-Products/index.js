import {
    Card, Row, Col, Button, Space, Input, Table, Modal,
    Form, Radio, Divider, Checkbox
} from 'antd'
import React, { useState } from 'react'

const { Search } = Input;

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Product Code',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Product Barcode',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Net Amount',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Net Amount Type',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Categori',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Stock',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Low Stock Alert',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Buy Price Per Unit',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: 'Discount',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Supplie',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tax',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Allow Change on ',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: 'Date',
        dataIndex: 'age',
        key: 'age',
    }
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function ReadyProducts() {
    const [visible, setVisible] = useState(false);
    const onSearch = (value) => console.log(value);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className='page-content'>
            <Card>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <p>In Stock: <strong>1049</strong></p>
                        <p>Available: <strong>13</strong></p>
                    </Col>
                    <Col className="gutter-row text-right" span={16}>
                        <Space style={{ textAlign: 'right' }}>
                            <Button type="primary"
                                onClick={() => setVisible(true)}>Add Custome Sell Product</Button>
                            <Button type="primary">Update/Add Product</Button>
                            <Button type="primary">Add From Production</Button>
                        </Space>
                        <div className='mt-3'>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: "70%" }} />
                        </div>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Table columns={columns} dataSource={data} scroll={{
                    x: 1300,
                }} />
            </Card>

            <Modal
                title="Product Information"
                centered
                visible={visible}
                footer={false}
                width={1000}
                onCancel={() => { setVisible(false) }}
            >

                <Form
                    layout={"vertical"}
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Product Barcode"
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
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Button type="primary" style={{ marginTop: '2rem' }}>generate</Button>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Product Name"
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
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item
                                label="Net Amount"
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
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item
                                label="Unit"
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
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Product Code"
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
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Ctaegory"
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
                        </Col>
                    </Row>
                    <hr />

                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <div className='text-center'>
                                <h4>Product Pricing</h4>
                            </div>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Buy Rate"
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
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Discount"
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
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Sell Rate"
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
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="TAX%"
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
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className='text-center'>
                                <h4>Product Quantity</h4>
                            </div>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="In Stock"
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
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="New"
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
                                </Col>

                                <Row gutter={16}>
                                    <Col className="gutter-row" span={12}>
                                        <Form.Item
                                            label="Low Alert at"
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
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        <Form.Item
                                            label="Total"
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
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>

                    <div className='text-center'>
                            <h4>Product Supplier</h4>
                        </div>
                    <Row gutter={16}>
                        
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Supplier"
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
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Mobile Number"
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
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}
