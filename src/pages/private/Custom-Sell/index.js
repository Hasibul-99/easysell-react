import React from 'react'
import TopForm from "./Top-Form";
import TotalContent from "./Total-Content";
import CustomerForm from "./CustomerForm";
import { Card, Table } from 'antd'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'SL NO',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'QTY',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Rate',
    dataIndex: 'age',
    key: 'age',
  },
];

export default function CustomSell() {
  return (
    <div className='page-content'>
      <div className='row'>
        <div className='col-6'>
          <TopForm></TopForm>
          <TotalContent></TotalContent>
        </div>
        <div className='col-6'>
          <Card>
            <Table dataSource={dataSource} columns={columns}
              pagination={false} />
          </Card>
        </div>
      </div>
    </div>
  )
}
