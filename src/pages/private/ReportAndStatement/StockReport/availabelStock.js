import React, { useEffect, useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData } from '../../../../scripts/api-service';
import { inventory_add_readystock } from '../../../../scripts/api';

export default function AvailabelStock() {
    const [stockData, setStockData] = useState();
    const [totalStockPrice, setTotalStockPrice] = useState(0);

    const columns = [
        {
            title: 'Product',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Barcode',
            dataIndex: 'p_barcode',
            key: 'p_barcode',
        },
        {
            title: 'In Stock',
            dataIndex: 'in_stock',
            key: 'in_stock',
        },
        {
            title: 'Purchase Price',
            dataIndex: 'net_amount',
            key: 'net_amount',
        },
        {
            title: 'Selling Price',
            dataIndex: 'sell_ppu',
            key: 'sell_ppu',
        },
        {
            title: 'Supplier Price',
            dataIndex: 'supply_ppu',
            key: 'supply_ppu',
        },
        {
            title: 'Supplier name',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile_number',
            key: 'mobile_number',
        },
    ];

    const getStockData = async () => {
        let res = await getData(inventory_add_readystock);

        if (res) {
            let master = res?.data;

            let filter = master.filter(item => item.in_stock !== 0);

            let total = 0;
            filter.forEach(n => {
                total += n.sell_ppu
            });
            
            setTotalStockPrice(total);
            setStockData(filter)
        }
    }

    useEffect(() => {
        getStockData()
    }, [])

    return (
        <div>
            <Row gutter={16} className="mb-4">
                <Col className="gutter-row" span={12}>
                    <h5>Available Stock Report</h5>
                    <p>Available Product: {stockData?.length || 0}</p>
                </Col>
                <Col className="gutter-row" span={12}>
                    Current Storck Price: {totalStockPrice}
                </Col>
            </Row>

            <Table dataSource={stockData} columns={columns} pagination={false}/>;
        </div>
    )
}
