import { Card, Col, Row, Table, Input, Space, Button, Modal, Form, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react'
import { inventory_add_readystock } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function POS() {
    const [form] = Form.useForm();
    const [stocks, setStocks] = useState([]);
    const [allStocks, setAllStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editStock, setEditStock] = useState();

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
                    onClick={() => { setEditStock(row); setIsModalVisible(true) }} />
                <DeleteOutlined onClick={() => deleteStock(row)} style={{ color: 'red', cursor: 'pointer' }} />
            </span>,
        },
    ];

    const deleteStock = (item) => {
        let someArray = selectedStocks.filter(st => st.Id !== item.Id);
        setSelectedStocks([...someArray]);
    }

    const onSearch = (value) => {
        let val = value.toLowerCase();

        let items = allStocks.filter(item => val.length === 0 || item?.p_name.toLowerCase().includes(val));
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
        console.log('Success:', values);
    };

    useEffect(() => {
        getReadyStock()
    }, [])

    return (
        <div className='page-content'>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Card>
                        <Table dataSource={selectedStocks} columns={columns} pagination={false} />
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Input addonBefore="Barcode" />
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
                onCancel={() => {setIsModalVisible(false); form.resetFields()}}>
                <Form
                    layout={'vertical'}
                    name="basic"
                    form={form} 
                    // initialValues={{
                    //     qty: editStock?.qty || 0,
                    //     sell_ppu: editStock?.sell_ppu || undefined,
                    // }}
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
                            },{
                                // initialValues: editStock?.qty || undefined
                            }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} defaultValue={editStock?.qty || undefined} />
                    </Form.Item>

                    <Form.Item
                        label="Rate"
                        name="sell_ppu"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rate!',
                            },
                            {
                                initialValues: editStock?.sell_ppu || undefined
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
                            onClick={() => {setIsModalVisible(false); setEditStock(null); form.resetFields()}}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
