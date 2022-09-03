import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Select, Input, Space, Button, Modal, Form, InputNumber } from 'antd';
import { vendor_list, vendor_list_readyProduct, vendor_list_rowProduct } from '../../../scripts/api';
import { getData } from '../../../scripts/api-service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Vendore() {
    const [form] = Form.useForm();
    const [type, setType] = useState("1");
    const [product, setProduct] = useState();
    const [vendor, setVendor] = useState();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'vendor_name',
            key: 'vendor_name',
        },
        {
            title: 'Number',
            dataIndex: 'mobile_number',
            key: 'mobile_number',
        },
        {
            title: 'Receipt',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Amount',
            dataIndex: 'sell_rate',
            key: 'sell_rate',
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            key: 'paid',
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const VendorColumns = [
        {
            title: 'Name',
            dataIndex: 'vendor_name',
            key: 'vendor_name',
        },
        {
            title: 'Number',
            dataIndex: 'mobile_number',
            key: 'mobile_number',
        },
        {
            title: 'Action',
            key: 'age',
            render: (row, content, index) => <span>
                <EditOutlined style={{ marginRight: '10px', cursor: 'pointer' }}
                    onClick={() => { updateStock(row) }} />
            </span>,
        },
    ];

    const updateStock = () => {

    }

    const getProductData = async () => {
        let url = type === "1" ? vendor_list_readyProduct : vendor_list_rowProduct;

        let res = await getData(url);

        if (res) {
            setProduct(res?.data);
        }
    }

    const getVendorList = async () => {
        let res = await getData(vendor_list);

        if (res) {
            setVendor(res?.data);
        }
    }

    const onFinish = async () => {

    }

    useEffect(() => {
        getVendorList()
    }, [])

    useEffect(() => {
        getProductData()
    }, [type])

    return (
        <div className='page-content'>
            <Row gutter={16}>
                <Col className="gutter-row" span={10}>
                    <Card>
                        <Select className='w-100'
                            defaultValue={type}
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={(val) => setType(val)}
                        >
                            <Option value="1">Ready Product</Option>
                            <Option value="2">Row Product</Option>
                        </Select>

                        <Table dataSource={product} columns={VendorColumns}
                            pagination={false} />
                    </Card>
                </Col>

                <Col className="gutter-row" span={14}>
                    <Card>
                        <Form
                            layout={"vertical"}
                            form={form}
                            onFinish={onFinish}
                        >
                            <Row gutter={16}>
                                <Col className="gutter-row" span={24}>
                                    <Form.Item
                                        label="Receipt No"
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
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Supplier Name"
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

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Supplier Number"
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

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Amount"
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

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Paid"
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

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Due"
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
                            </Row>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>

                        <Table dataSource={product} columns={columns} scroll={{
                            y: 300,
                            x: '100vw',
                        }} pagination={false} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
