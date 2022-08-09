import React, { useEffect, useState } from 'react'
import { Table, Button, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData, postData, putData } from '../../../scripts/api-service';
import { return_products } from '../../../scripts/api';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function ReturnedProducts() {
    const [form] = Form.useForm();
    const [expenses, setExpenses] = useState([]);
    const [allExpenses, setAllExpemses] = useState([]);
    const [actionLInk, setActionLink] = useState();
    const [isModalBanned, setIsModalBanned] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState();

    const getExpensess = async () => {
        let res = await getData(return_products);

        if (res) {
            setExpenses(res?.data || []);
            setAllExpemses(res?.data || []);
        }
    }

    const onFinish = async (values) => {
        if (!selectedExpense) values.Id = Math.floor(Math.random() * 10000);
        else values.Id = selectedExpense.Id;
        values.date = moment().format('MM/DD/YYYY hh:mm:ss a') // "7/4/2022 10:15:14 PM";
        values.status = values?.due == 0 ? 'Paid' : 'Due';
        values.e_no = Math.floor(Math.random() * 100000);

        if (!selectedExpense) values.reason = "Salary";
        else values.reason = selectedExpense.reason;

        if (selectedExpense) {
            let res = await putData(return_products + selectedExpense.Id, values);

            if (res) {
                getExpensess();
                form.resetFields();
                setIsModalBanned(false);
                setSelectedExpense(null);
            }
        } else {
            let res = await postData(return_products, values);

            if (res) {
                getExpensess();
                form.resetFields();
                setIsModalBanned(false);
                setSelectedExpense(null);
            }
        }
    };

    const onFinishSearch = (values) => {
        if (values.user_id) {
            let filter = allExpenses.filter(e => e.s_name == values.user_id);
            setExpenses(filter);
        } else {
            setExpenses(allExpenses);
        }
    }

    const columns = [
        {
            title: 'Serial Number',
            dataIndex: 'serial_no',
            key: 'serial_no',
        },
        {
            title: 'Product Name',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Product Rate',
            key: 'p_rate',
            dataIndex: 'p_rate'
        },
        {
            title: 'Barcode',
            key: 'p_barcode',
            dataIndex: 'p_barcode'
        },
        {
            title: 'Id',
            dataIndex: 'Id',
            key: 'id',
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
                                onClick={() => { updateExpenses(item) }}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-slash"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg> */}
                                <span className="ml-2">Save To Inventory</span>
                            </a>
                            {/* <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                            onClick={() => {setIsModalExtend(true); setActionLink({...row, idx: index})}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                            <span className="ml-2">Extend</span></a> */}
                            {/* <a className="dropdown-item d-flex align-items-center" onClick={() => showDeleteConfirm({...row, idx: index})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash icon-sm me-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg> 
                            <span className>Delete</span>
                          </a> */}
                        </div>
                    </div>
                </>
            )
        },
    ];

    const updateExpenses = (item) => {
        form.setFieldsValue({
            amount: item.amount,
            due: item.due,
            e_no: item.e_no,
            paid: item.paid,
            e_reason: item.e_reason,
            s_name: item.s_name,
            status: item.status
        });

        setSelectedExpense(item);
        setIsModalBanned(true);
    }

    useEffect(() => {
        getExpensess()
    }, [])

    return (
        <div className='page-content'>
            <Row className='mb-5'>
                <Col span={12}>
                    <h3>Stuff</h3>
                </Col>
                <Col span={12} className='text-right' style={{ textAlign: "end" }}>
                    <Button type="primary" onClick={() => setIsModalBanned(true)}>Add Stuff</Button>
                </Col>
            </Row>

            <Card>
                <Row className='mb-5'>
                    <Col span={12}>
                        <Form name="horizontal_login" layout="inline" onFinish={onFinishSearch}>
                            <Form.Item
                                name="user_id"
                                rules={[{ required: false, message: 'Please input your user ID' }]}
                            >
                                <Input placeholder="Search by Name" />
                            </Form.Item>

                            {/* <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input placeholder="Password" />
                </Form.Item> */}

                            <Form.Item shouldUpdate>
                                {() => (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        <SearchOutlined />
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={expenses} scroll={{ x: 900 }} />
            </Card>

            <Modal
                title={ selectedExpense ? 'Update Stuff' : "Stuff Add" }
                visible={isModalBanned}
                footer={false}
                onCancel={() => { setIsModalBanned(false); setSelectedExpense(null) }}>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >

                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Staff Name"
                                name="s_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input s_name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Salary"
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input amount!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Paid"
                                name="paid"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input paid!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Due"
                                name="due"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input due!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
