import React, { useEffect, useState } from 'react'
import TopForm from "./Top-Form";
import TotalContent from "./Total-Content";
import CustomerForm from "./CustomerForm";
import { Card, Table } from 'antd'
import { getData } from '../../../scripts/api-service';
import { TEMP_SALE } from '../../../scripts/api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


export default function CustomSell() {
  const [temData, setTempData] = useState([]);
  const serialNum = 352; //Math.floor(Math.random() * 1000);

  const columns = [
    {
      title: 'SL NO',
      key: 'key',
      render: (row, content, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'p_name',
      key: 'p_name',
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Rate',
      dataIndex: 'p_rate',
      key: 'p_rate',
    },
    {
      title: 'Action',
      key: 'key',
      render: (row, content, index) => <div>
        <EditOutlined className='mr-3'/>
        <DeleteOutlined />
      </div>,
    },
  ];

  const getTempSale = async () => {
    let res = await getData(TEMP_SALE);

    if (res) {
      let masterData = res?.data || [];

      let row = masterData.filter(m => m.serial_key === serialNum);
      setTempData(row);
    }
  };


  useEffect(() => {
    getTempSale();
  }, [])

  return (
    <div className='page-content'>
      <div className='row'>
        <div className='col-6'>
          <TopForm serialNum={serialNum} getTempSale={getTempSale}></TopForm>
          <TotalContent serialNum={serialNum} temData={temData}></TotalContent>
        </div>
        <div className='col-6'>
          <Card>
            <Table dataSource={temData} columns={columns}
              pagination={false} serialNum={serialNum}/>
          </Card>
        </div>
      </div>
    </div>
  )
}
