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
const { RangePicker } = DatePicker;

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

export default function Channels() {
  const { user, setUserInfo } = useContext(authContext);

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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Customer Name',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Customer Phone Number',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Customer Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Amount',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Paid',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Due',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  useEffect(() => {

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
        <LineChart></LineChart>
      </Col>

      <Col className="gutter-row" span={10}>
        <PieChart></PieChart>
      </Col>
    </Row>

    <Card>
      <Row gutter={16} className="mb-4">
        <Col className="gutter-row" span={12}>
          <h4 className='mb-3'>Last 7 days Sells</h4>
        </Col>
        <Col className="gutter-row" span={12}>
          <RangePicker className='mv-4' ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }} />
        </Col>
      </Row>

      <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </Card>

    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <BarChart></BarChart>
      </Col>
    </Row>
  </div>;
}
