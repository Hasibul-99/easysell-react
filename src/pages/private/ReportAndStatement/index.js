import React from 'react';
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import StockReport from './StockReport';
import BalanceSheet from './BalanceSheet';
import SaleReport from './SaleReport';
import PusrchaseReport from './PurchaseReport';
import CustomerReport from './CustomerReport';
import DueReport from './DueReport';

const { TabPane } = Tabs;

export default function ReportStatement() {
    return (
        <div className='page-content'>
            <Card>
                <Row className='mb-2'>
                    <Col span={24}>
                        <h3>Report And Statements</h3>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Tabs defaultActiveKey="6">
                    <TabPane tab="Balance Sheet" key="1">
                        <BalanceSheet></BalanceSheet>
                    </TabPane>
                    <TabPane tab="Stock Report" key="2">
                        <StockReport></StockReport>
                    </TabPane>
                    <TabPane tab="Sale Report" key="3">
                        <SaleReport></SaleReport>
                    </TabPane>
                    <TabPane tab="Purchase Report" key="4">
                        <PusrchaseReport></PusrchaseReport>
                    </TabPane>
                    <TabPane tab="Customer Report" key="5">
                        <CustomerReport></CustomerReport>
                    </TabPane>
                    <TabPane tab="Due Report" key="6">
                        <DueReport></DueReport>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}
