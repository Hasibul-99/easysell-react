import React from 'react';
import { Tabs } from 'antd';
import MultipleLink from "./MultipleLink";
import Deatils from "./Deatils";

const { TabPane } = Tabs;

export default function ChangeDetails() {
    return <div className='page-content'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Details" key="1">
                       <Deatils/> 
                    </TabPane>
                    <TabPane tab="Multiple Links" key="2">
                        <MultipleLink/>
                    </TabPane>
                </Tabs>
    </div>;
}
