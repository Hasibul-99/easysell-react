import React, { useEffect, useState } from 'react'
import { Table, Button, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { deleteData, getData, postData, putData } from '../../../scripts/api-service';
import { SUPLIER_STUFF, USERAC } from '../../../scripts/api';
import { Link } from 'react-router-dom';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { confirm } = Modal;

const { Option } = Select;
export default function SuplierStuff() {
    const [form] = Form.useForm();
    const [expenses, setExpenses] = useState([]);
    const [allExpenses, setAllExpemses] = useState([]);
    const [actionLInk, setActionLink] = useState();
    const [isModalBanned, setIsModalBanned] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState();
    const [staffs, setStaffs] = useState();

    const getExpensess = async () => {
        let res = await getData(SUPLIER_STUFF);

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
            let res = await putData(SUPLIER_STUFF + selectedExpense.Id, values);

            if (res) {
                getExpensess();
                form.resetFields();
                setIsModalBanned(false);
                setSelectedExpense(null);
            }
        } else {
            let res = await postData(SUPLIER_STUFF, values);

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
            title: 'Expense no',
            dataIndex: 'e_no',
            key: 'e_no',
        },
        {
            title: 'Staff name',
            dataIndex: 's_name',
            key: 's_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount'
        },
        {
            title: 'Reason',
            key: 'amount',
            dataIndex: 'amount'
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            key: 'paid',
        },
        {
            title: 'Due',
            key: 'due',
            dataIndex: 'due',
        },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
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
                                <span className="ml-2">Edit</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                                onClick={() => { DeleteExpenses(item) }}>
                                <span className="ml-2">Delete</span>
                            </a>
                            {/* <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                            onClick={() => {setIsModalExtend(true); setActionLink({...row, idx: index})}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                            <span className="ml-2">Extend</span></a> */}
                            {/* <a className="dropdown-item d-flex align-items-center" onClick={() => showDeleteConfirm({...row, idx: index})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash icon-sm me-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg> 
                            <span className>Delete</span>
                          </a>*/}
                        </div>
                    </div>
                </>
            )
        },
    ];

    const getStaffList = async () => {
        let res = await getData(USERAC);

        if (res) {
            let masterData = res?.data;
            setStaffs(masterData)
        }
    }

    const updateExpenses = (item) => {
        form.setFieldsValue({
            amount: item.amount,
            due: item.due,
            e_no: item.e_no,
            paid: item.paid,
            reason: item.reason,
            s_name: item.s_name,
            status: item.status
        });

        setSelectedExpense(item);
        setIsModalBanned(true);
    }

    const DeleteExpenses = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteData(SUPLIER_STUFF + item.e_no).then(res => {
                    if (res) {
                        getStaffList();
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        getExpensess();
        getStaffList()
    }, [])

    return (
        <div className='page-content'>
            <Row className='mb-5'>
                <Col span={12}>
                    <h3>Staff</h3>
                </Col>
                <Col span={12} className='text-right' style={{ textAlign: "end" }}>
                    <Button type="primary" onClick={() => setIsModalBanned(true)}>New Staff Expence</Button>
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
                title={selectedExpense ? 'Update Staff' : "Staff Add"}
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
                                <Select className='w-100'
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        staffs?.length && staffs.map(item => <Option value={item.Name}>
                                            {item.Name}
                                        </Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Reason"
                                name="reason"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input reason!',
                                    },
                                ]}
                            >
                                <Select className='w-100'
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Salary">Salary</Option>
                                    <Option value="Loan">Loan</Option>
                                    <Option value="Allowence">Allowence</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Amount"
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Amount!',
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
