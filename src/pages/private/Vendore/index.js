import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Select, Input, Space, Button, Modal, Form, InputNumber } from 'antd';
import { vendor_list, vendor_list_payment_readyProduct, vendor_list_readyProduct, vendor_list_rowProduct } from '../../../scripts/api';
import { getData, postData, putData } from '../../../scripts/api-service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

export default function Vendore() {
    const [form] = Form.useForm();
    const [type, setType] = useState("1");
    const [product, setProduct] = useState();
    const [vendor, setVendor] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [showHistory, setShowHistory] = useState(false);
    const [historyProduct, setHistoryProduct] = useState()

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
            dataIndex: 'amount',
            key: 'amount',
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

    const secondColumns = [
        {
            title: 'Receipt',
            dataIndex: 'parent_id',
            key: 'parent_id',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Buy Rate',
            dataIndex: 'buy_rate',
            key: 'buy_rate',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
    ]

    const historyProductColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
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

    ]

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

    const updateStock = (data) => {
        if (data) {
            setSelectedProduct(data);

            form.setFieldsValue({
                parent_id: data?.parent_id,
                vendor_name: data?.vendor_name,
                mobile_number: data.mobile_number,
                amount: data.amount,
                previous_paid: data.paid,
                total_paid: data.paid,
                paid: data.due,
                due: 0
            })
        }
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

    const onFinish = async (data) => {
        let allData = { ...data };
        allData.previous_paid = allData.previous_paid + allData.paid;
        allData.due = allData.amount - allData.previous_paid;
        let info = { ...selectedProduct, ...allData };

        if (type === "1") {
            // let res = await putData(vendor_list_readyProduct, info);

            let res2 = await postData(vendor_list_payment_readyProduct, {
                Id: selectedProduct.Id,
                payment_parent: selectedProduct.parent_id,
                amount: selectedProduct.amount,
                paid: allData.paid,
                due: allData.due,
                date: moment().format("DD/MM/YYYY hh:mm:ss")
            });

            if (res2) {
                form.resetFields();
                getProductData();
            }
        }
    }

    const handelPaid = () => {
        let values = form.getFieldsValue();

        let total = (values.previous_paid || 0) + (values.paid || 0);
        let due = (values.amount || 0) - (total || 0);

        form.setFieldsValue({
            due: due,
            total_paid: total
        })
    }

    const getHistory = async () => {
        let res = await getData(vendor_list_payment_readyProduct + selectedProduct.Id);

        if (res) {
            let masterData =  res.data;
            setHistoryProduct([masterData]);
            console.log("masterData", masterData);
        }
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
                                        name="parent_id"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Supplier Name"
                                        name="vendor_name"
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
                                        name="mobile_number"
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
                                        name="amount"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} disabled />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Previous Paid"
                                        name="previous_paid"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} disabled />
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="New Paid"
                                        name="paid"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} onChange={handelPaid} />
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Total Paid"
                                        name="total_paid"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} disabled />
                                    </Form.Item>
                                </Col>


                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Due"
                                        name="due"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Product Barcode!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                                    Save
                                </Button>

                                <Button type="primary" className='mr-5' onClick={() => { setShowHistory(true); getHistory() }}>
                                    History
                                </Button>

                                <Button type="primary" onClick={() => { form.resetFields() }}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>

                        <Table dataSource={product} columns={secondColumns} scroll={{
                            y: 300,
                            x: '80vw',
                        }} pagination={false} />
                    </Card>
                </Col>
            </Row>

            <Modal
                title="History"
                open={showHistory}
                onCancel={() => setShowHistory(false)}
                footer={false}>

                <Table dataSource={historyProduct} columns={historyProductColumns}  pagination={false} />
            </Modal>
        </div>
    )
}
