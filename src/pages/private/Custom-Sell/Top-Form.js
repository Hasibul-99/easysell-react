import React from 'react';
import { Card, Button, Form, Input, Row, Col } from 'antd'
import { postData } from '../../../scripts/api-service';
import { TEMP_SALE } from '../../../scripts/api';

export default function TopForm(props) {
    const { serialNum, getTempSale } = props;

    const onFinish = async (values) => {
        values.id = Math.floor(Math.random() * 1000);
        values.serial_key = serialNum;
        values.n_inStock = values.qty;
        values.taka = values.qty * values.p_rate;

        let res = postData(TEMP_SALE, values);

        if (res) {
            getTempSale();
        }
    };



    return (
        <div>
            <Card>
                <Form
                    name="basic"
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
                                <Input />
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
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row pt-5" span={12}>
                            Amount: 0.00 Taka
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
