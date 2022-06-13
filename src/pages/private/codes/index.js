import React from 'react'
import { Table, Dropdown, Menu, Button, Select, Input, Form, Modal } from 'antd';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { editPen, deleteIcon } from "../../../components/common/icons/icon";

const { Option } = Select;

const menu = (
  <Menu>
    <Menu.Item>
      <span>{editPen} &nbsp; Edit</span>
    </Menu.Item>
    <Menu.Item>
      <span>{deleteIcon} &nbsp; Delete</span>
    </Menu.Item>
  </Menu>
);

const columns = [
  {
    title: 'CODE',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'EXPIRE DATE',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'M3U',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'ACTION',
    key: 'action',
    render: (text, record) => (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      </>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const onFinish = () => {

}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default function Cards() {
  return (
    <div className='page-content'>
      <div className='card'>
        <div className='card-body'>
          <div className='row mb-4'>
            <div className='col-md-6'>
              <Form name="horizontal_login" layout="inline" onFinish={onFinish}>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input placeholder="Search" />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      className='b-button'
                      type="primary"
                      htmlType="submit"
                    >
                      <SearchOutlined />
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
            <div className='col-md-6 text-right'>
              Show:
              <Select className='ml-4' defaultValue="jack" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">10</Option>
                <Option value="lucy">25</Option>
                <Option value="disabled">50</Option>
                <Option value="Yiminghe">100</Option>
              </Select>
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  )
}
