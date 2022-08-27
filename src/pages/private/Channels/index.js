import React, { useEffect, useState, useContext } from 'react';
import moment from "moment"
import { Table, Button, Card, Checkbox, DatePicker, Row, Col, Select, Input, Form, Modal } from 'antd';
import { getData, deleteData, postData } from '../../../scripts/api-service';
// import { RESELLER_LIST_LINE, RESELLER_DELETE_LINK, RESELLER_BANNED_LINK, RESELLER_EXTEND_LINE, RESELLER_SEARCH_LINK } from '../../../scripts/api';
import { AreaChartOutlined, DotChartOutlined, NodeCollapseOutlined, CopyOutlined, RiseOutlined, RadarChartOutlined, WarningOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { inventory_add_readystock, payments, sold_root_table_pos } from '../../../scripts/api';
const { RangePicker } = DatePicker;

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

export default function Channels() {
  const { user, setUserInfo } = useContext(authContext);
  const [sell, setSell] = useState();
  const [tableData, setTableData] = useState();
  const [strckData, setStockData] = useState();
  const [payment, setPayment] = useState()


  const columns = [
    {
      title: 'SL NO',
      dataIndex: 'serial_no',
      key: 'serial_no',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Customer Phone Number',
      dataIndex: 'customer_number',
      key: 'customer_number',
    },
    {
      title: 'Customer Address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const getPossellReport = async () => {
    let res = await getData(sold_root_table_pos);

    if (res) {
      let masterData = res?.data;
      setSell(masterData);
      let items = [];

      masterData.forEach(item => {
        let startData = moment().subtract(7, 'd').format('YYYY-MM-DD'),
            today = moment().format('YYYY-MM-DD'),
            data = moment(item.date, 'MM/DD/YYYY hh:mm:ss A').format('YYYY-MM-DD');

        let issameorafter = moment(data).isSameOrAfter(startData),
            isBefore = moment(data).isBefore(today);

        if (issameorafter && isBefore) {
          items.push(item);
        }
      });

      setTableData(items);
    }
  }

  const getReadyStock = async () => {
    let res = await getData(inventory_add_readystock);

    if (res) {
      setStockData(res?.data);
    }
  }

  const getPaymentReport = async () => {
    let res = await getData(payments);

    if (res) {
      setPayment(res?.data);
    }
  }

  useEffect(() => {
    getPossellReport();
    getReadyStock();
    getPaymentReport()
  }, [])

  return <div className='page-content'>
    <div class="row">
      <div class="col-12 col-xl-12 stretch-card">
        <div class="row flex-grow-1">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Total Products</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">20</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <AreaChartOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Available Products</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">16</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <DotChartOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Total Sell</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">37</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <NodeCollapseOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Last 7 Days Sells</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">0</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <RadarChartOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Total Due in Sell</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">16</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <WarningOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Expense in This Month </h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">16</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <RiseOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="card-title mb-0">Products Low on Stock</h6>
                </div>
                <div class="row">
                  <div class="col-6 col-md-12 col-xl-5">
                    <h3 class="mb-2">16</h3>
                  </div>
                  <div class="col-6 col-md-12 col-xl-7 text-right">
                    <CopyOutlined style={{ fontSize: '3rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Row gutter={16}>
      <Col className="gutter-row" span={14}>
        <LineChart payment={payment}></LineChart>
      </Col>

      <Col className="gutter-row" span={10}>
        <PieChart payment={payment}></PieChart>
      </Col>
    </Row>

    <Card>
      <Row gutter={16} className="mb-4">
        <Col className="gutter-row" span={12}>
          <h4 className='mb-3'>Last 7 days Sells</h4>
        </Col>
      </Row>

      <Table dataSource={tableData} columns={columns} pagination={false} />;
    </Card>

    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <BarChart strckData={strckData}></BarChart>
      </Col>
    </Row>
  </div>;
}
