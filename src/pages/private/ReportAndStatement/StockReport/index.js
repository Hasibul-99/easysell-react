import React, { useState } from 'react'
import { Table, Button, Tabs, Card, Checkbox, Row, Col, Select, Input, Form, Modal } from 'antd';
import AvailabelStock from './availabelStock';
import LowReport from './LowReport';
import FinishedReport from './FinishedReport';

const { Option } = Select;
export default function StockReport() {
    const [selected, setSelected] = useState('1');

    return (
        <div>
            <div className='mb-3'>
                <Select
                    defaultValue={selected}
                    size="large"
                    style={{
                        width: 350,
                    }}
                    onChange={(val) => {setSelected(val)}}
                >
                    <Option value="1">Available Stock Report</Option>
                    <Option value="2">Low on Stock Report</Option>
                    <Option value="3">Finished Stock Report</Option>
                </Select>
            </div>

            <hr/>

            <div>
                {selected === '1' ? <AvailabelStock></AvailabelStock> : ''}
                {selected === '2' ? <LowReport></LowReport> : ''}
                {selected === '3' ? <FinishedReport></FinishedReport> : ''}
            </div>
        </div>
    )
}
