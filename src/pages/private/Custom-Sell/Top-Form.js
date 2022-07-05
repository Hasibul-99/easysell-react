import React, { useState } from 'react';
import { Card, Button, Form, Input, Row, Col, InputNumber } from 'antd'
import { postData } from '../../../scripts/api-service';
import { TEMP_SALE } from '../../../scripts/api';

export default function TopForm(props) {
    const [form] = Form.useForm();
    const { serialNum, getTempSale } = props;
    const [amount, setAmount] = useState(0);

    const onFinish = async (values) => {
        values.id = Math.floor(Math.random() * 1000);
        values.serial_key = serialNum;
        values.n_inStock = values.qty;
        values.taka = values.qty * values.p_rate;

        let res = postData(TEMP_SALE, values);

        if (res) {
            getTempSale();
            form.resetFields();
            setAmount(0);
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



    return (
        <div>
            <Card>
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
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
