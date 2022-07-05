import React, { useEffect, useState, useContext } from 'react'
import TopForm from "./Top-Form";
import TotalContent from "./Total-Content";
import CustomerForm from "./CustomerForm";
import { Card, Table, Modal, Form, Input, Row, Col, InputNumber, Button } from 'antd'
import { getData, deleteData, putData } from '../../../scripts/api-service';
import { TEMP_SALE } from '../../../scripts/api';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";
const { confirm } = Modal;

const serialNum = Math.floor(Math.random() * 1000);

export default function CustomSell() {
  const [form] = Form.useForm();
  const { permanetValues } = useContext(authContext);
  const [temData, setTempData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState();

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
        <EditOutlined className='mr-3' onClick={() => {setIsModalVisible(true); contentEdit(row)}} />
        <DeleteOutlined style={{ color: 'red' }} onClick={() => { showConfirm(row.id) }} />
      </div>,
    },
  ];

  const contentEdit = (row) => {
    setSelected(row);

    form.setFieldsValue({ 
      p_name: row.p_name,
      p_barcode: row.p_barcode,
      p_code: row.p_code,
      p_rate: row.p_rate,
      qty: row.qty,
    });

    setAmount(row.p_rate * row.qty);
  }

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

  const onFinish = async (values) => {
    values.id = selected.id;
    values.serial_key = serialNum;
    values.n_inStock = values.qty;
    values.taka = values.qty * values.p_rate;

    let res = putData(TEMP_SALE + selected.id, values);

    if (res) {
      form.resetFields();
      setAmount(0);
      setIsModalVisible(false);

      setTimeout(() => {
        getTempSale();
      }, 1000)
    }
  };


  const rateChange = (e) => {
    let values = form.getFieldValue();
    let { qty = 0, p_rate = 0 } = values;

    setAmount(qty * p_rate)
  }

  const qtyChange = (e) => {
    let values = form.getFieldValue();
    let { qty = 0, p_rate = 0 } = values;
    setAmount(qty * p_rate)
  }


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
              pagination={false} serialNum={serialNum} />
          </Card>
        </div>
      </div>


      <Modal title="Sell" visible={isModalVisible}
        footer={false}
        onCancel={() => { setIsModalVisible(false) }}>
        <Form
          name="basic"
          form={form}
          layout={"vertical"}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Product Name"
                name="p_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Product Namee!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Bar Code"
                name="p_barcode"
                rules={[
                  {
                    required: true,
                    message: 'Please input Bar Code!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Product Code"
                name="p_code"
                rules={[
                  {
                    required: true,
                    message: 'Please input Product Code!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Rate"
                name="p_rate"
                rules={[
                  {
                    required: true,
                    message: 'Please input Rate!',
                  },
                ]}
              >
                <InputNumber onChange={e => rateChange(e)} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Quantity"
                name="qty"
                rules={[
                  {
                    required: true,
                    message: 'Please input Quantity!',
                  },
                ]}
              >
                <InputNumber onChange={e => qtyChange(e)} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col className="gutter-row pt-5" span={12}>
              Amount: {amount} Taka
            </Col>
          </Row>

          <Form.Item className="text-right">
            <Button type="primary" size='large' htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
