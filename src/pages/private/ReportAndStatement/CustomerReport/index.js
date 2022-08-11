import React, { useEffect, useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData } from '../../../../scripts/api-service';
import { customer_list } from '../../../../scripts/api';

export default function CustomerReport() {
  const [customer, setCustomer] = useState();

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'serial_no',
      key: 'serial_no',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Customer Address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Due',
      dataIndex: 'due',
      key: 'due',
    },
    {
      title: 'Time',
      dataIndex: 'timedate',
      key: 'timedate',
    },
  ];

  const getCustomers = async () => {
    let res = await getData(customer_list);

    if (res) {
      setCustomer(res?.data);
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <Row gutter={16} className="mb-4">
        <Col className="gutter-row" span={8}>

        </Col>
        <Col className="gutter-row" span={16}>
          <Table dataSource={customer} columns={columns} pagination={false} />
        </Col>
      </Row>
    </div>
  )
}
