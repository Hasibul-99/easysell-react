import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { deleteData, getData, postData, putData } from '../../../scripts/api-service';
import { USERAC, easy_permission_products } from '../../../scripts/api';
import { Link } from 'react-router-dom';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ExportTable from '../../../components/ExportTable/table';

const { confirm } = Modal;

export default function StuffSection() {
    const generalRef = useRef(null);
    const [form] = Form.useForm();
    const [expenses, setExpenses] = useState([]);
    const [allExpenses, setAllExpemses] = useState([]);
    const [actionLInk, setActionLink] = useState();
    const [isModalBanned, setIsModalBanned] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState();
    const [permissions, setPermissions] = useState([]);

    const getExpensess = async () => {
        let res = await getData(USERAC);

        if (res) {
            setExpenses(res?.data || []);
            setAllExpemses(res?.data || []);
        }
    }

    // Email: "017@gmail.com"
    // Id: 1
    // Name: "017"
    // Number: "017"
    // Password: "017"
    // isStaff: 0
    // time: "7/30/2021 11:00:22 PM"
    const onFinish = async (values) => {
        if (!selectedExpense) values.Id = Math.floor(Math.random() * 1000);
        else values.Id = selectedExpense.Id;
        values.time = moment().format('MM/DD/YYYY hh:mm:ss a') // "7/4/2022 10:15:14 PM";
        values.isStaff = 1;

        if (selectedExpense) {
            let res = await putData(USERAC + selectedExpense.Number, values);

            if (res) {
                assignPermissions(values.Number, values, 'update')
                getExpensess();
                form.resetFields();
                setIsModalBanned(false);
                setSelectedExpense(null);
            }
        } else {
            let res = await postData(USERAC, values);

            if (res) {
                assignPermissions(values.Number, values, 'create')
                getExpensess();
                form.resetFields();
                setIsModalBanned(false);
                setSelectedExpense(null);
            }
        }
    };

    const assignPermissions = async (number, values, context) => {
        let data = {
            number: number
        };

        Object.keys(permissions).forEach(function (key) {
            data[key] = values[key] ? 1 : 0;
        });

        if (context === 'update') {
            await putData(easy_permission_products + number, data);
        } else {
            await postData(easy_permission_products, data);
        }

    }

    const onFinishSearch = (values) => {
        console.log('Success:', values);
        if (values.user_id) {
            let filter = allExpenses.filter(e => e.Name === values.user_id);
            setExpenses(filter);
        } else {
            setExpenses(allExpenses);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Number',
            dataIndex: 'Number',
            key: 'Number'
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
                                <span className="ml-2">Edit</span>
                            </a>
                            {/* <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                            onClick={() => {setIsModalExtend(true); setActionLink({...row, idx: index})}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                            <span className="ml-2">Extend</span></a> */}
                            <a className="dropdown-item d-flex align-items-center" 
                            onClick={() => deleteExpenses(item)}
                            >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash icon-sm me-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>  */}
                            <span className="ml-2">Delete</span>
                          </a>
                        </div>
                    </div>
                </>
            )
        },
    ];

    const deleteExpenses = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteData(USERAC + item.Id).then(res => {
                    if (res) {
                        getExpensess();
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const exportColums = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Number',
            dataIndex: 'Number',
            key: 'Number'
        }
    ];
    
    const updateExpenses = (item) => {
        form.setFieldsValue({
            Email: item.Email,
            Name: item.Name,
            Number: item.Number,
            Password: item.Password
        });

        getSelectedUserPermissions(item.Number)

        setSelectedExpense(item);
        setIsModalBanned(true);
    }

    const getSelectedUserPermissions = async (number) => {
        let res = await getData(easy_permission_products + number);

        if (res) {
            let masterData = res?.data || {},
                fiels = {};

            Object.keys(masterData).forEach(function (key) {
                fiels[key] = !!masterData[key]
            });

            setTimeout(() => {
                form.setFieldsValue(fiels);
            })
        }
    }

    const getPermissions = async () => {
        let res = await getData(easy_permission_products);

        if (res) {
            let master = res?.data || [];
            let data = master?.length ? {...master[0]} : {};

            delete data.number;
            setPermissions(data);
        }
    }

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    const generateReport = () => {
        generalRef.current.generateReport();
    }

    const prientReport = () => {
        generalRef.current.prientReport();
    }

    useEffect(() => {
        getPermissions()
        getExpensess()
    }, [])

    return (
        <div className='page-content'>
            <Row className='mb-5'>
                <Col span={12}>
                    <h3>Staff</h3>
                </Col>
                <Col span={12} className='text-right' style={{ textAlign: "end" }}>
                    <Button type="primary" onClick={() => setIsModalBanned(true)}>Add Stuff</Button>
                </Col>
            </Row>

            <Card>
                <Row className='mb-5'>
                    <Col span={8}>
                        <Form name="horizontal_login" layout="inline" onFinish={onFinishSearch}>
                            <Form.Item
                                name="user_id"
                                rules={[{ required: false, message: 'Please input your user ID' }]}
                            >
                                <Input placeholder="Search by Name" />
                            </Form.Item>

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
                    <Col span={8} offset={8}>
                        <Button type="primary" onClick={() => generateReport()}>Generate Report</Button>

                        <Button type="primary" className='ml-4' onClick={() => prientReport()}>Prient</Button>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={expenses} scroll={{ x: 900 }} />
            </Card>

            <Modal
                title={selectedExpense ? 'Update Stuff' : "Stuff Add"}
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
                                label="Name"
                                name="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Ph Number"
                                name="Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Password"
                                name="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {
                            Object.keys(permissions).map(function (key) {
                                return <Col className="gutter-row" span={12} key={key}>
                                    <Form.Item name={key} valuePropName="checked">
                                        <Checkbox>{key}</Checkbox>
                                    </Form.Item>
                                </Col>
                            })
                        }
                    </Row>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <ExportTable exportColums={exportColums} ref={generalRef}
                dataSource={expenses}></ExportTable>
        </div>
    )
}