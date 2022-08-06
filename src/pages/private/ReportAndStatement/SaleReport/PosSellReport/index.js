import React, { useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';

const { Search } = Input;
const { TextArea } = Input;

export default function POSSellReport() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [returnModal, setReturnModal] = useState(false);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'SL NO.',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Customer Phone Number',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Customer Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Status',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Amount',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Date',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => setVisible(true)}>Edit</Button>
            ),
        },
    ];
    const TableVolumns = [
        {
            title: 'SL NO.',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Product Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Qauntity',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Product Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Taka',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Barcode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => setReturnModal(true)}>
                    Return This Item
                </Button>
            ),
        },
    ];
    const onSearch = (value) => console.log(value);

    const onFormLayoutChange = ({ layout }) => {
        // 
    };

    return (
        <div>
            <Search placeholder="input search text mb-4" style={{ width: '400px' }} onSearch={onSearch} enterButton />

            <Table dataSource={dataSource} columns={columns} pagination={false} />;

            <Modal
                title="Report"
                centered
                visible={visible}
                footer={false}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Form
                    layout={"vertical"}
                    form={form}
                    onValuesChange={onFormLayoutChange}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            Serial No: 10000
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Customer Name">
                                <Input placeholder="Customer name" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Mobile Number">
                                <Input placeholder="Customer name" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row text-center" span={8}>
                            <Button type="primary" className='mt-4'>Save</Button>
                        </Col>


                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Company Name">
                                <Input placeholder="Company name" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item name="remember" valuePropName="checked" 
                                wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox className='mt-4'>Same As Customer Name</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row text-center" span={8}>
                            <Button type="primary" className='mt-4'>Receipt</Button>
                        </Col>

                        <Col className="gutter-row" span={24}>
                            <Form.Item label="Customer Address">
                                <TextArea rows={2} placeholder="maxLength is 6" 
                                    maxLength={6} />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Total Amount">
                                <Input placeholder="Total Amount" disabled />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Paid">
                                <Input placeholder="Paid"  />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Due">
                                <Input placeholder="due"  />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="end">
                        <Col className="gutter-row" span={3}>
                            <Button type="primary" className='mt-4'>Cancel</Button>
                        </Col>

                        <Col className="gutter-row" span={3}>
                            <Button type="primary" className='mt-4'>Done</Button>
                        </Col>
                    </Row>
                </Form>

                <Table dataSource={dataSource} columns={TableVolumns} pagination={false} />;

            </Modal>

            <Modal title="Basic Modal" visible={returnModal} footer={false} 
                onCancel={() => {setReturnModal(false)}}>
                <Form
                    layout={"vertical"}
                    form={form}
                    onValuesChange={onFormLayoutChange}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            Product Name: Hello World
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Rate">
                                <Input placeholder="Rate" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Quantity">
                                <Input placeholder="Quantity" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item label="Return">
                                <Input placeholder="Return" />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={24}>
                            <Form.Item label="Return Reason">
                                <TextArea rows={2} placeholder="Return Reason" 
                                    maxLength={6} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="end">
                        <Col className="gutter-row" span={3}>
                            <Button type="primary" className='mt-4'>Cancel</Button>
                        </Col>

                        <Col className="gutter-row" span={3}>
                            <Button type="primary" className='mt-4'>Save</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
