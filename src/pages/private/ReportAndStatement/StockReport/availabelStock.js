import React from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';

export default function AvailabelStock() {

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
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Barcode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'In Stock',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Purchase Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Selling Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Supplier Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Supplier name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Mobile',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <div>
            <Row gutter={16} className="mb-4">
                <Col className="gutter-row" span={12}>
                    <h5>Available Stock Report</h5>
                    <p>Available Product: 16</p>
                </Col>
                <Col className="gutter-row" span={12}>
                    Current Storck Price: 222400
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} pagination={false}/>;
        </div>
    )
}
