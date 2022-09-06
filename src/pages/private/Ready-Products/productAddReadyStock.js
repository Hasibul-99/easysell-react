import React, { useEffect } from 'react'
import {
    Card, Row, Col, Button, Space, Input, Table, Modal, InputNumber,
    Form, Radio, Divider, Checkbox
} from 'antd';
import { inventory_add_readystock } from "../../../scripts/api";
import { postData, putData } from "../../../scripts/api-service";



export default function ProductAddReadyStock({ setVisible, getReadyStock, selected }) {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        values.Id = selected?.Id ? selected?.Id : Math.floor(Math.random() * 100000);
        let url = selected?.Id ? inventory_add_readystock + selected?.Id : inventory_add_readystock;

        if (selected?.Id) {
            let res = await putData(url, values);

            if (res) {
                setVisible(false);

                setTimeout(() => {
                    getReadyStock();
                }, 200)
            }
        } else {
            let res = await postData(url, values);

            if (res) {
                setVisible(false);

                setTimeout(() => {
                    getReadyStock();
                }, 200)
            }
        }

    };

    const generateBarcode = () => {
        let value = Math.floor(Math.random() * 10000000000);

        form.setFieldsValue({ p_barcode: value });
    }

    useEffect(() => {
        if (selected) {
            console.log("selected", selected);
            form.setFieldsValue(selected);
        }
    }, [selected])

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
                    <Col className="gutter-row" span={12}>
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
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            label="Net Amount"
                            name="net_amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Net Amount!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
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
                </Row>

                <Row gutter={16}>
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
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
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
                </Row>
                <hr />

                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Card>
                            <div className='text-center'>
                                <h4>Product Pricing</h4>
                            </div>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Buy Rate"
                                        name="supply_ppu"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Buy Rate!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Discount"
                                        name="discount"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Discount!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Sell Rate"
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
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Card>
                            <div className='text-center'>
                                <h4>Product Quantity</h4>
                            </div>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
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
                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="New"
                                        name="allow_change_on_edit"
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
                                <Col className="gutter-row" span={12}>
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
                                {/* <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        label="Total"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            }
                                        ]}
                                    >
                                        <Input  disabled />
                                    </Form.Item>
                                </Col> */}
                            </Row>
                        </Card>

                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Card>
                            <div className='text-center'>
                                <h4>Product Supplier</h4>
                            </div>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
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
                                <Col className="gutter-row" span={12}>
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
                                {/* <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Col> 
                            */}
                            </Row>
                        </Card>
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
