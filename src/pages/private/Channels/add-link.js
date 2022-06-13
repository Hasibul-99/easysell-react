import { Card, Form, Input, Button, Select, Checkbox, Row, Col } from 'antd';
import React from 'react';
import { RESELLER_CREATE_LINE } from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const exMonths = [
    {label: '1 month', value: 1},
    {label: '2 months', value: 2},
    {label: '3 months', value: 3},
    {label: '4 months', value: 4},
    {label: '5 months', value: 5},
    {label: '6 months', value: 6},
    {label: '7 months', value: 7},
    {label: '8 months', value: 8},
    {label: '9 months', value: 9},
    {label: '10 months', value: 10},
    {label: '11 months', value: 11},
    {label: '12 months', value: 12},
    {label: '2 years', value: 24},
];

export default function AddLink() {
    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let res = await postData(RESELLER_CREATE_LINE, values);

        if (res) {
            history.push('/');
        }
    };

    return <div className='page-content'>
      <Card>
        <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                maxConnection: 1
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
        <Form.Item
            label="User ID"
            name="user_id"
            rules={[
            {
                required: true,
                message: 'Please input your userID!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="Maximum Connection"
            name="maxConnection"
            rules={[{
                    required: true,
                    message: 'Please input your max connection!',
                }]}
        >
            <Input disabled />
        </Form.Item>

        <Form.Item
            label="Expire Date"
            name="totalMonth"
            rules={[
            {
                required: true,
                message: 'Please input your expire date!',
            },
            ]}
        >
            <Select>
                {
                    exMonths.map(month => <Option value={month.value} key={month.label}>{month.label}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item
            label="Note"
            name="note"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
            <TextArea rows={4} />
        </Form.Item>

        <Row>
            <Col span={4}>
                {/* <Form.Item name="isRestream">
                    <Checkbox>Is Restream</Checkbox>
                </Form.Item> */}
                <Form.Item
                    name="isRestream"
                    valuePropName="checked"
                >
                    <Checkbox>Is Restream</Checkbox>
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item name="isTrail" valuePropName="checked">
                    <Checkbox>Is Trall</Checkbox>
                </Form.Item>
            </Col>
        </Row>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit" size="large" style={{padding: "0 5rem"}}>
                Save
            </Button>
        </Form.Item>
        </Form>
      </Card>
  </div>;
}
