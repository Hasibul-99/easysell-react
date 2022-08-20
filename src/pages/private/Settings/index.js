import React from 'react'
import { Card, Tabs } from 'antd';
import ShopInformation from './ShopInformation';
import DataBackup from './DataBackup';
import Theme from './Theme';
import Printer from './Printer';
import Currency from './Currency';
import Tax from './Tax';

const { TabPane } = Tabs;

export default function Settings() {
    return (
        <div className='page-content'>
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Shop Information" key="1">
                        <ShopInformation></ShopInformation>
                    </TabPane>
                    <TabPane tab="Data Backup" key="2">
                        <DataBackup></DataBackup>
                    </TabPane>
                    <TabPane tab="Theme" key="3">
                        <Theme></Theme>
                    </TabPane>
                    <TabPane tab="Printer" key="4">
                        <Printer></Printer>
                    </TabPane>
                    <TabPane tab="Currency" key="5">
                        <Currency></Currency>
                    </TabPane>
                    <TabPane tab="Tax" key="6">
                        <Tax></Tax>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}
