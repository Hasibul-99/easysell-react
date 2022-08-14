import React, { useEffect, useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData } from '../../../../scripts/api-service';
import { inventory_add_readystock } from '../../../../scripts/api';

export default function UseInSells() {
    const [stockData, setStockData] = useState();
    const [totalStockPrice, setTotalStockPrice] = useState(0);

    const columns = [
        {
            title: 'SL NO',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Customer Phone Number',
            dataIndex: 'p_barcode',
            key: 'p_barcode',
        },
        {
            title: 'Customer Name',
            dataIndex: 'in_stock',
            key: 'in_stock',
        },
        {
            title: 'Status',
            dataIndex: 'net_amount',
            key: 'net_amount',
        },
        {
            title: 'Due',
            dataIndex: 'net_amount',
            key: 'net_amount',
        },
        {
            title: 'Date',
            dataIndex: 'net_amount',
            key: 'net_amount',
        }
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

            <Table dataSource={stockData} columns={columns} pagination={false} />;
        </div>
    )
}
