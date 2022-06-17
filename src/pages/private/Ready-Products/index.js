import { Card, Row, Col, Button, Space, Input, Table } from 'antd'
import React from 'react'

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

    const onSearch = (value) => console.log(value);

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
                            <Button type="primary">Add Custome Sell Product</Button>
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
        </div>
    )
}
