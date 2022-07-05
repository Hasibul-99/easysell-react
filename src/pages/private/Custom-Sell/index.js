import React, { useEffect, useState, useContext } from 'react'
import TopForm from "./Top-Form";
import TotalContent from "./Total-Content";
import CustomerForm from "./CustomerForm";
import { Card, Table, Modal } from 'antd'
import { getData, deleteData } from '../../../scripts/api-service';
import { TEMP_SALE } from '../../../scripts/api';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";
const { confirm } = Modal;

const serialNum = Math.floor(Math.random() * 1000);

export default function CustomSell() {
  const {permanetValues} = useContext(authContext);
  const [temData, setTempData] = useState([]);

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
        <DeleteOutlined style={{color: 'red'}} onClick={() => {showConfirm(row.id)}}/>
      </div>,
    },
  ];

  const showConfirm = (tempID) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        deleteData(TEMP_SALE + tempID).then(result => {
          console.log('resilt', result);
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const getTempSale = async () => {
    let res = await getData(TEMP_SALE);

    if (res) {
      let masterData = res?.data || [];

      console.log("serialNum===", serialNum);

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
          <TotalContent serialNum={serialNum} temData={temData} permanetValues={permanetValues}></TotalContent>
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
