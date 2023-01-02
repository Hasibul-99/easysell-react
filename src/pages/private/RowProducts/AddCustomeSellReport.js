import { Card, Col, Row, Table, Form, Input, Button } from 'antd'
import React, { useState } from 'react'

export default function AddCustomeSellReport({ stocks }) {
    const [form] = Form.useForm();
    const [products, setProducts] = useState();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Available',
            dataIndex: 'in_stock',
            key: 'in_stock',
        },
        {
            title: 'Rate',
            key: 'sell_ppu',
            dataIndex: 'sell_ppu',
        },
    ];

    const generateBarcode = () => {
        let value = Math.floor(Math.random() * 10000000000);
        form.setFieldsValue({ p_barcode: value });
    };

    const onFinish = (values) => {
        console.log(form.getFieldsValue());

        console.log(values);
    }
    return (
        <div className='page-content'>
            <Card>
                <Form
                    layout={"vertical"}
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Product Name"
                                name="p_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={9}>
                            <Form.Item
                                label="Product Barcode"
                                name="p_barcode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Barcode!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={3}>
                            <Button type="primary" style={{ marginTop: '2rem' }}
                                onClick={generateBarcode}>generate</Button>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Product Code"
                                name="p_code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item
                                label="Net Amount"
                                name="net_amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input net amount!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item
                                label="Unit"
                                name="unit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input unit!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <Table columns={columns} dataSource={stocks} pagination={false} />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card>
                            <div className='mb-1'>
                                <label>Row Product:</label>
                            </div>
                            <br />
                            <div className='mb-1'>
                                <lable>Quantity</lable>
                                <Input />
                            </div>
                            <br />
                            <div className='mb-1'>
                                <lable>Left in Stock: </lable>
                            </div>
                            <br />
                            <div className='mb-1'>
                                <lable>Cost: </lable>
                            </div>

                            <Button style={{ float: "right" }} type="primary">Add</Button>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Table columns={columns} dataSource={stocks} pagination={false} />
                    </Col>
                </Row>
            </Card>

            <Card>
                <Form layout='vertical'  onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Row Product Code"
                                name="p_code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Production Cost"
                                name="p_code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Production Code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Total Code"
                                name="t_code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Total Code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Sell Value"
                                name="sell_value"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input sell value!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignContent: "center",
                            flexDirection: "column"
                        }} span={8}>
                            <Button type="primary" htmlType="submit" size='large'>Save</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}
