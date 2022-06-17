import React, { useEffect, useState, useContext } from 'react';
import moment from "moment"
import { Table, Button, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getData, deleteData, postData } from '../../../scripts/api-service';
// import { RESELLER_LIST_LINE, RESELLER_DELETE_LINK, RESELLER_BANNED_LINK, RESELLER_EXTEND_LINE, RESELLER_SEARCH_LINK } from '../../../scripts/api';
import { SearchOutlined, ExclamationCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;


const exMonths = [
  {label: '1 month', value: 1},
  {label: '2 months', value: 2},
  {label: '3 months', value: 3},
  {label: '4 months', value: 4},
  {label: '5 months', value: 5},
  {label: '6 months', value: 6},
  {label: '7 months', value: 7},
  {label: '8 months', value: 8},
  {label: '9 months', value: 9},
  {label: '10 months', value: 10},
  {label: '11 months', value: 11},
  {label: '12 months', value: 12},
  {label: '2 years', value: 24},
];

export default function Channels() {
  const { user, setUserInfo } = useContext(authContext);
  const [form] = Form.useForm();
  const [links, setLinks] = useState([]);
  const [isModalBanned, setIsModalBanned] = useState(false);
  const [actionLInk, setActionLink] = useState();
  const [isModalExtend, setIsModalExtend] = useState();
  
    const columns = [
      {
        title: 'USER ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: 'PASSWORD',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: 'IS RESTREAM',
        dataIndex: 'isRestream',
        key: 'isRestream',
        render: isRestream => (
          <>
            <Checkbox checked={isRestream}></Checkbox>
          </>
        )
      },
      {
          title: 'EXPIREDATE',
          key: 'expireDate',
          render: (text, record) => (
            moment(record.expireDate).format('YYYY-MM-DD')
          ),
      },
      {
        title: 'IS TRAIL',
        dataIndex: 'isTrail',
        key: 'isTrail',
        render: isTrail => (
          <>
            <Checkbox checked={isTrail}></Checkbox>
          </>
        )
      },
      {
          title: 'NOTE',
          key: 'note',
          dataIndex: 'note',
      },
      {
        title: 'STATUS',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: 'CREATED BY',
        key: 'action',
        dataIndex: 'createdBy'
      },
      {
        title: 'CREATED DATE',
        key: 'action',
        render: (text, record) => (
          moment(record.createdDate).format('YYYY-MM-DD')
        ),
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
                      <a className="dropdown-item d-flex align-items-center" href="javascript:;" onClick={() => { setActionLink({...row, idx: index}); setIsModalBanned(true)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-slash"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                         <span className="ml-2">Banned</span>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                        onClick={() => {setIsModalExtend(true); setActionLink({...row, idx: index})}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                        <span className="ml-2">Extend</span></a>
                      <a className="dropdown-item d-flex align-items-center" onClick={() => showDeleteConfirm({...row, idx: index})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash icon-sm me-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg> 
                        <span className>Delete</span>
                      </a>
                  </div>
              </div>
            </>
          )
      },
    ];

    
  const showDeleteConfirm = (row) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        // let res = await deleteData(RESELLER_DELETE_LINK + row.user_id + '/' + row.password);

        // if (res) {
        //   links.splice(row.idx, 1);
        //   setLinks([...links]);
        // }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

    function onChange(value) {
        console.log(`selected ${value}`);
    };

    const getLinks = async () => {
      // let res = await getData(RESELLER_LIST_LINE);

      // if (res) {
      //   let masterData = res?.data;
      //   setLinks(masterData || [])
      // }
    }

    const bandLinkHandeler = async () => {
      // let res = await getData(RESELLER_BANNED_LINK + actionLInk.user_id + '/' + actionLInk.password);

      // if (res) {
      //   links[actionLInk.idx] = res.data;

      //   setIsModalBanned(false);
      //   setActionLink(null);
      //   success();
      //   setLinks([...links]);
      // }
    }

    const success = () => {
      Modal.success({
        content: 'The link has been banned successfully!',
      });
    };

    const handelExtend = async (values) => {
      // let extendData = values;
      // extendData.user_id = actionLInk.user_id;
      // extendData.password = actionLInk.password;

      // let res = await postData(RESELLER_EXTEND_LINE, extendData);

      // if (res) {
      //   links[actionLInk.idx] = res.data;

      //   setActionLink(null); 
      //   setIsModalExtend(false);
      //   setLinks([...links]);
      // }
    } 
    
    const onFinish = async (values) => {
      // let res = await postData(RESELLER_SEARCH_LINK, values);
      // if (res) {
      //   let masterData = res?.data;
      //   setLinks(masterData)
      // }
    };

    const refressCredit = () => {
      setUserInfo();
    };

    useEffect(() => {
      getLinks()
    }, [])

    return <div className='page-content'>
        <Row className='mb-5'>
            <Col span={12}>
                <h3>Available Credit: {user?.credit || 0}  
                <Button type='primary' className='ml-3' onClick={refressCredit}><RedoOutlined /></Button></h3>
                
            </Col>
            <Col span={12} className='text-right' style={{textAlign: "end"}}>
              <Link to="/add-link"><Button type="primary">Add Line</Button></Link>
            </Col>
        </Row>
 
        <Card>
            <Row className='mb-5'>
                <Col span={12}>
                  <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item
                      name="user_id"
                      rules={[{ required: true, message: 'Please input your user ID' }]}
                    >
                      <Input placeholder="user ID" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input placeholder="Password" />
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


                <Col span={12} className='text-right' style={{textAlign: "end"}}>
                    <Row justify="end">
                      {/* <Col span={}></Col> */}
                      <Col span={8}>
                        {/* <Search placeholder="input search text" onSearch={onSearch} style={{width: '200px'}} enterButton /> */}
                      </Col>
                      <Col span={8}>
                        {/* Show: <Select
                              showSearch
                              optionFilterProp="children"
                              onChange={onChange}
                              filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              defaultValue="10"
                          >
                              <Option value="10">10</Option>
                              <Option value="25">25</Option>
                              <Option value="50">50</Option>
                          </Select> */}
                      </Col>
                    </Row>
                </Col>
            </Row>
            
            <Table columns={columns} dataSource={ links } scroll={{ x: 900 }} />
        </Card>

        <Modal 
          title="Banned Link" 
          visible={isModalBanned} 
          footer={false}
          onCancel={() => {setIsModalBanned(false); setActionLink(null)}}>
            <div className='text-center'>
              <h2>Banned</h2>
              <p>Want to Banned User</p>

              <div style={{marginTop: '1rem'}}>
                <Button type="primary" style={{marginRight: '1rem'}} onClick={bandLinkHandeler}>Yes</Button>
                <Button onClick={() => {setIsModalBanned(false)}}>No</Button>
              </div>
            </div>
        </Modal>

      <Modal title="Extend" 
        visible={isModalExtend} 
        footer={false}
        onCancel={() => {setActionLink(null); setIsModalExtend(false)}}>
          <Form
              layout="vertical"
              name="basic"
              onFinish={handelExtend}
              autoComplete="off"
            >
              <Form.Item
                label="Expire Date"
                name="totalMonth"
                rules={[
                {
                    required: true,
                    message: 'Please input your expire date!',
                },
                ]}
            >
                <Select>
                    {
                        exMonths.map(month => <Option value={month.value} key={month.label}>{month.label}</Option>)
                    }
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
      </Modal>
  </div>;
}
