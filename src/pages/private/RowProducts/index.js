import {
    Card, Row, Col, Button, Space, Input, Table, Modal,
    Form, Radio, Divider, Checkbox
} from 'antd'
import React, { useEffect, useState } from 'react';
import ProductAddRawStock from "./ProductAddRawStock";
import {inventory_add_rowstock} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";

const { Search } = Input;

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'p_name',
        key: 'p_name',
    },
    {
        title: 'Product Code',
        dataIndex: 'p_code',
        key: 'p_code',
    },
    {
        title: 'Product Barcode',
        dataIndex: 'p_barcode',
        key: 'p_barcode',
    },
    {
        title: 'Net Amount',
        dataIndex: 'net_amount',
        key: 'net_amount',
    },
    {
        title: 'Net Amount Type',
        dataIndex: 'net_amount_type',
        key: 'net_amount_type',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Stock',
        dataIndex: 'in_stock',
        key: 'in_stock',
    },
    {
        title: 'Low Stock Alert',
        dataIndex: 'low_alert',
        key: 'low_alert',
    },
    {
        title: 'Supply Price Per Unit',
        dataIndex: 'supply_ppu',
        key: 'supply_ppu',
    }, 
    {
        title: 'Sell Price Per Unit',
        dataIndex: 'sell_ppu',
        key: 'sell_ppu',
    },
    {
        title: 'Supplie',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    {
        title: 'Tax',
        dataIndex: 'tax',
        key: 'tax',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    }
];

export default function RowProducts() {
    const [visible, setVisible] = useState(false);
    const onSearch = (value) => console.log(value);
    const [stocks, setStocks] = useState([]);


    const getReadyStock = async () => {
        let res = await getData(inventory_add_rowstock);

        console.log("res ====", res);

        if (res) {
            setStocks(res?.data || []);
        }
    };

    useEffect(() => {
        getReadyStock();
    }, []);

    return (
        <div className='page-content'>
            <Card>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        {/* <p>In Stock: <strong>1049</strong></p>
                        <p>Available: <strong>13</strong></p> */}
                    </Col>
                    <Col className="gutter-row text-right" span={16}>
                        <Space style={{ textAlign: 'right' }}>
                            <Button type="primary"
                                onClick={() => setVisible(true)}>Add Custome Sell Product</Button>
                            <Button type="primary">Update/Add Product</Button>
                            {/* <Button type="primary">Add From Production</Button> */}
                        </Space>
                        <div className='mt-3'>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: "70%" }} />
                        </div>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Table columns={columns} dataSource={stocks} scroll={{
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
                <ProductAddRawStock 
                    setVisible={setVisible}
                    getReadyStock={getReadyStock}/>
            </Modal>
        </div>
    )
}

