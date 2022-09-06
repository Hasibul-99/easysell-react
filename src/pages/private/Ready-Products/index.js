import {
    Card, Row, Col, Button, Space, Input, Table, Modal,
    Form, Radio, Divider, Checkbox
} from 'antd'
import React, { useEffect, useState, useRef, } from 'react';
import ProductAddReadyStock from "./productAddReadyStock";
import { inventory_add_readystock } from "../../../scripts/api";
import { deleteData, getData } from "../../../scripts/api-service";
import ExportTable from '../../../components/ExportTable/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { alertPop } from '../../../scripts/helper';

const { Search } = Input;
const { confirm } = Modal;

const exportColums = [
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
        title: 'Categori',
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
        title: 'Buy Price Per Unit',
        dataIndex: 'supply_ppu',
        key: 'supply_ppu',
    },
    {
        title: 'Sell Price Per Unit',
        dataIndex: 'sell_ppu',
        key: 'sell_ppu',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
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
        title: 'Allow Change on ',
        dataIndex: 'allow_change_on_edit',
        key: 'allow_change_on_edit',
    }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    }
];

export default function ReadyProducts() {
    const generalRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState();
    const [stocks, setStocks] = useState([]);

    const onSearch = (value) => console.log(value);

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
            title: 'Categori',
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
            title: 'Buy Price Per Unit',
            dataIndex: 'supply_ppu',
            key: 'supply_ppu',
        },
        {
            title: 'Sell Price Per Unit',
            dataIndex: 'sell_ppu',
            key: 'sell_ppu',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
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
            title: 'Allow Change on ',
            dataIndex: 'allow_change_on_edit',
            key: 'allow_change_on_edit',
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ACTION',
            key: 'address',
            render: (item, row, index) => (
                <>
                    <div className="dropdown">
                        <button className="btn p-0" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal icon-lg text-muted pb-3px"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                                onClick={() => { updateProduct(item) }}>
                                <span className="ml-2">Edit</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                                onClick={() => { deleteProduct(item) }}>
                                <span className="ml-2">Delete</span>
                            </a>
                        </div>
                    </div>
                </>
            )
        },
    ];

    const updateProduct = (item) => {
        setSelected(item);
        setVisible(true);
    };

    const deleteProduct = async (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'After delete this items, You are unable to get this product back',
            onOk() {
              deleteData(inventory_add_readystock + item.Id).then(res => {
                alertPop('success', "Product Deleted Successfully");
                getReadyStock();
              }) 
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    } 

    const getReadyStock = async () => {
        let res = await getData(inventory_add_readystock);

        console.log("res ====", res);

        if (res) {
            setStocks(res?.data || []);
        }
    };

    const generateReport = () => {
        generalRef.current.generateReport();
    }

    const prientReport = () => {
        generalRef.current.prientReport();
    }

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
                            {/* <Button type="primary">Update/Add Product</Button> */}
                            {/* <Button type="primary">Add From Production</Button> */}
                        </Space>
                        <div className='mt-3'>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: "70%" }} />
                        </div>
                        <div className='mt-3'>
                            <Button type="primary" onClick={() => generateReport()}>Generate Report</Button>

                            <Button type="primary" className='ml-4' onClick={() => prientReport()}>Prient</Button>
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
                onCancel={() => { setVisible(false); setSelected(null) }}
            >
                <ProductAddReadyStock
                    setVisible={setVisible}
                    getReadyStock={getReadyStock} selected={selected} />
            </Modal>

            <ExportTable exportColums={exportColums} ref={generalRef}
                dataSource={stocks}></ExportTable>
        </div>
    )
}
