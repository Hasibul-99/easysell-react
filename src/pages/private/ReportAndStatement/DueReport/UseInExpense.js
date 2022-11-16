import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData } from '../../../../scripts/api-service';
import { inventory_add_readystock } from '../../../../scripts/api';
import ExportTable from '../../../../components/ExportTable/table';

export default function UseInExpense() {
    const generalRef = useRef(null);
    const [stockData, setStockData] = useState();
    const [totalStockPrice, setTotalStockPrice] = useState(0);

    const exportColums = [
        {
            title: 'SL NO',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Status',
            dataIndex: 'p_barcode',
            key: 'p_barcode',
        },
        {
            title: 'Due',
            dataIndex: 'in_stock',
            key: 'in_stock',
        },
        {
            title: 'Date',
            dataIndex: 'net_amount',
            key: 'net_amount',
        }
    ];

    const columns = [
        {
            title: 'SL NO',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Status',
            dataIndex: 'p_barcode',
            key: 'p_barcode',
        },
        {
            title: 'Due',
            dataIndex: 'in_stock',
            key: 'in_stock',
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


    const generateReport = () => {
        generalRef.current.generateReport();
    }

    const prientReport = () => {
        generalRef.current.prientReport();
    }
    useEffect(() => {
        getStockData()
    }, [])
    return (
        <div>
            <Row className='mb-5'>
                <Col span={8}>

                </Col>

                <Col span={8} offset={8}>
                    <Button type="primary" onClick={() => generateReport()}>Generate Report</Button>

                    <Button type="primary" className='ml-4' onClick={() => prientReport()}>Prient</Button>
                </Col>
            </Row>

            <Table dataSource={stockData} columns={columns} pagination={false} />;


            <ExportTable exportColums={exportColums} ref={generalRef}
                dataSource={stockData}></ExportTable>
        </div>
    )
}
