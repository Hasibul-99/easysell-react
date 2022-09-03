import React from 'react'
import {
    Card, Row, Col, Button, Space, Input, Table, Modal, InputNumber,
    Form, Radio, Divider, Checkbox
} from 'antd';
import { inventory_add_rowstock } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import moment from 'moment';


export default function ProductAddRawStock({ setVisible, getReadyStock }) {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        values.Id = Math.floor(Math.random() * 100000);
        values.date = moment().format("MM/DD/YYYY");

        let res = await postData(inventory_add_rowstock, values);

        if (res) {
            setVisible(false);

            setTimeout(() => {
                getReadyStock();
            }, 200)
        }
    };

    const generateBarcode = () => {
        let value = Math.floor(Math.random() * 10000000000);
        form.setFieldsValue({ p_barcode: value });
    }

    return (
        <>
            <Form
                layout={"vertical"}
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Product Barcode"
                            name="p_barcode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Product Barcode!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Button type="primary" style={{ marginTop: '2rem' }}
                            onClick={generateBarcode}>generate</Button>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Product Name"
                            name="p_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Product Name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="In Stock"
                            name="in_stock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input In Stock!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Supply Price Per Unite"
                            name="supply_ppu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input In Stock!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
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
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="New"
                            name="discount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input New!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Sell Price Per Unit"
                            name="sell_ppu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Sell Rate!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Net Quantity"
                            name="net_amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Net Quantity!',
                                },
                            ]}
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Unit"
                            name="net_amount_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Unit!',
                                },
                            ]}
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>


                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Total"
                            name="allow_change_on_edit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Total!',
                                },
                            ]}
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Supplier"
                            name="supplier"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Supplier!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Cataegory"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Cataegory!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Low Alert at"
                            name="low_alert"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Low Alert at!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Mobile Number"
                            name="mobile_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Mobile Number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>

                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="TAX%"
                            name="tax"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input TAX!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                        Submit
                    </Button>
                    <Button type="primary" onClick={() => setVisible(false)}
                        danger ghost style={{ float: 'right', marginRight: '1rem' }}>
                        Danger
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
