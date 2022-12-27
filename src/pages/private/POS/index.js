import { Card, Col, Row, Table, Input, Space, Button, Modal, Form, InputNumber } from 'antd';
import React, { useEffect, useState, useContext } from 'react'
import { inventory_add_readystock } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";
import SellModel from './SellModel';

const { Search } = Input;
const serialNum = Math.floor(Math.random() * 1000);

export default function POS() {
    const { permanetValues } = useContext(authContext);
    const [form] = Form.useForm();
    const [stocks, setStocks] = useState([]);
    const [allStocks, setAllStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editStock, setEditStock] = useState();
    const [sellModal, setSellModel] = useState(false);

    const columns = [
        {
            title: 'SL NO',
            dataIndex: 'name',
            render: (row, content, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'QTY',
            render: (row) => <span>{row.qty}</span>,
        },
        {
            title: 'Rate',
            dataIndex: 'sell_ppu',
        },
        {
            title: 'Amount',
            render: (row, content, index) => <span>{row.qty * row.sell_ppu}</span>,
        },
        {
            title: 'Action',
            key: 'age',
            render: (row, content, index) => <span>
                <EditOutlined style={{ marginRight: '10px', cursor: 'pointer' }}
                    onClick={() => { updateStock(row) }} />
                <DeleteOutlined onClick={() => deleteStock(row)} style={{ color: 'red', cursor: 'pointer' }} />
            </span>,
        },
    ];

    const updateStock = (item) => {
        form.setFieldsValue({
            qty: item.qty,
            sell_ppu: item.supply_ppu,
        });

        setEditStock(item);
        setIsModalVisible(true)
    }

    const deleteStock = (item) => {
        let someArray = selectedStocks.filter(st => st.Id !== item.Id);
        setSelectedStocks([...someArray]);
    }

    const onSearch = (value) => {
        let val = value.toLowerCase();

        let items = allStocks.filter(item => val.length === 0 || item?.p_name.toLowerCase().includes(val));
        setStocks(items);
    }

    const onSearchBarcode = (value) => {
        let val = value.toLowerCase();

        let items = allStocks.filter(item => val.length === 0 || item?.p_barcode.toLowerCase().includes(val));
        setStocks(items);
    }

    const getReadyStock = async () => {
        let res = await getData(inventory_add_readystock);
        if (res) {
            setStocks(res?.data || []);
            setAllStocks(res?.data || []);
        }
    };

    const selectStock = (item) => {
        let findIdx = selectedStocks.findIndex(st => st.Id === item.Id),
            contents = selectedStocks || [];

        if (findIdx === -1) {
            item.qty = 1;
            contents.push(item);
        } else {
            contents[findIdx].qty = contents[findIdx].qty + 1;
        }

        setSelectedStocks([...contents]);
    }

    const onFinish = (values) => {
        let findIdx = selectedStocks.findIndex(st => st.Id === editStock.Id);

        selectedStocks[findIdx].qty = values.qty;
        selectedStocks[findIdx].sell_ppu = values.sell_ppu;

        setSelectedStocks([...selectedStocks]);

        setIsModalVisible(false);
    };

    const showAmount = () => {
        let total = 0;

        if (selectedStocks?.length) {
            selectedStocks.forEach(ss => {
                total = total + ss.qty * ss.sell_ppu;
            });
        }

        return total;
    }

    const showTaxAmount = () => {
        let total = showAmount(),
            tax = permanetValues?.TAX || 0;

        return ((total * tax) / 100) || 0;
    }

    useEffect(() => {
        getReadyStock()
    }, [])

    return (
        <div className='page-content'>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Card className='mb-4'>
                        <Table dataSource={selectedStocks} columns={columns} pagination={false} />
                    </Card>

                    <Card>
                        Serial No: {serialNum}

                        <Row className='mt-5'>
                            <Col span={12} offset={6}>
                                <Row>
                                    <Col span={12}>Total Products:</Col>
                                    <Col span={12}>{selectedStocks.length}</Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Amount: </Col>
                                    <Col span={12}>{showAmount()}</Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Tax({permanetValues?.TAX || 0}%):  </Col>
                                    <Col span={12}>{showTaxAmount()}</Col>
                                </Row>

                                <hr />

                                <Row>
                                    <Col span={12}>Total Amount:</Col>
                                    <Col span={12}>{showAmount() + showTaxAmount()}</Col>
                                </Row>
                            </Col>
                        </Row>

                        <Button type="primary" size="large" className='mt-4' style={{float: "right"}} 
                            onClick={() => setSellModel(true)}>Sell</Button>
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            </Col>
                            <Col className="gutter-row" span={12}>
                                {/* <Input addonBefore="Barcode" /> */}
                                <Search
                                    addonBefore="Barcode"
                                    placeholder="Search barcode"
                                    allowClear
                                    onSearch={onSearchBarcode}
                                    style={{ width: 304 }}
                                />
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-4">
                            {
                                stocks.map((stock) => <Col className="gutter-row mb-3" span={6} key={stock.Id}>
                                    <Card className={stock.in_stock <= stock.low_alert ? 'low-alert' : ''}
                                        onClick={() => selectStock(stock)}>
                                        <h2>{stock.sell_ppu}৳</h2>
                                        <p>{stock.p_name}</p>
                                        <p>Net: {stock.net_amount} {stock.net_amount_type}</p>
                                        <p>QTY: {stock.in_stock}</p>
                                    </Card>
                                </Col>)
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal title="Update" visible={isModalVisible} footer={false}
                onCancel={() => { setIsModalVisible(false); form.resetFields() }}>
                <Form
                    layout={'vertical'}
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Product Quentity"
                        name="qty"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Product Quentity!',
                            }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Rate"
                        name="sell_ppu"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rate!',
                            }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >

                        <Button type="primary" danger className='mr-3'
                            onClick={() => { setIsModalVisible(false); setEditStock(null); form.resetFields() }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Sell" visible={sellModal}
                footer={false}
                onCancel={() => { setSellModel(false) }}>
                <SellModel selectedStocks={selectedStocks} serialNum={serialNum}
                    setSellModel={setSellModel} permanetValues={permanetValues}></SellModel>
            </Modal>
        </div>
    )
}
