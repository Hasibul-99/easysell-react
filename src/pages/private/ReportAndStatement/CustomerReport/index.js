import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData } from '../../../../scripts/api-service';
import { customer_list } from '../../../../scripts/api';
import ExportTable from '../../../../components/ExportTable/table';

export default function CustomerReport() {
  const generalRef = useRef(null);
  const [customer, setCustomer] = useState();

  const exportColums = [
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


  const generateReport = () => {
    generalRef.current.generateReport();
  }

  const prientReport = () => {
    generalRef.current.prientReport();
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <Row className='mb-5'>
        <Col span={8}>
          {/* <Search placeholder="input search text mb-4" style={{ width: '400px' }} onSearch={onSearch} enterButton /> */}
        </Col>

        <Col span={8} offset={8}>
          <Button type="primary" onClick={() => generateReport()}>Generate Report</Button>

          <Button type="primary" className='ml-4' onClick={() => prientReport()}>Prient</Button>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4">
        {/* <Col className="gutter-row" span={8}>

        </Col> */}
        <Col className="gutter-row" span={24}>
          <Table dataSource={customer} columns={columns} pagination={false} />
        </Col>
      </Row>


      <ExportTable exportColums={exportColums} ref={generalRef}
                dataSource={customer}></ExportTable>
    </div>
  )
}
