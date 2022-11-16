import React, { useEffect, useState } from 'react'
import {
    Card, Row, Col, Button, Space, Input, Table, Modal, InputNumber,
    Form, Radio, Divider, Checkbox
} from 'antd';
import { inventory_add_readystock } from "../../../scripts/api";
import { postData, putData } from "../../../scripts/api-service";
import moment from 'moment';



export default function ProductAddReadyStock({ setVisible, selectedProduct, getReadyStock }) {
    const [form] = Form.useForm();
    const [receitNumber, setReceitNumber] = useState();
    const [receitCheck, setReceitCheck] = useState(false);

    const onFinish = async (values) => {

        values.date = moment().format("MM/DD/YYYY");
        if (selectedProduct) {
            values.Id = selectedProduct?.Id;
            let res = await putData(inventory_add_readystock + selectedProduct.Id, values);

            if (res) {
                setVisible(false);

                setTimeout(() => {
                    getReadyStock();
                }, 200)
            }
        } else {
            values.Id = Math.floor(Math.random() * 100000);
            let res = await postData(inventory_add_readystock, values);

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

    const generatePcode = () => {
        let value = Math.floor(Math.random() * 1000);
        form.setFieldsValue({ p_code: value });
    }

    const updateProduct = () => {
        let value = form.getFieldsValue();

        form.setFieldsValue({
            in_stock: (selectedProduct?.in_stock || 0) + (value?.allow_change_on_edit || 0)
        })
    }

    useEffect(() => {
        if (selectedProduct) {
            console.log("selectedProduct", selectedProduct);
            form.setFieldsValue(selectedProduct);
            setReceitNumber(selectedProduct.mobile_number + "_" + selectedProduct.date + "_1")
        }
    }, [selectedProduct])

    useEffect(() => {
        setReceitNumber(`000_${moment().format('DD-MM-YYYY')}_1`)
    }, [])

    return (
        <>
            <Form
                layout={"vertical"}
                form={form}
                initialValues={{
                    net_amount: 1,
                    net_amount_type: "pc",
                    in_stock: 0, 
                    allow_change_on_edit: 0,
                    low_alert: 0,
                    supply_ppu: 0,
                    discount: 0,
                    sell_ppu: 0,
                    tax: 0,
                    supplier: "default",
                    mobile_number: "000"
                }}
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
                            <Input disabled={selectedProduct?.Id} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Button disabled={selectedProduct?.Id} type="primary" style={{ marginTop: '2rem' }}
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
                        <Row gutter={16}>
                            <Col className="gutter-row" span={18}>
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
                                    <InputNumber disabled={selectedProduct?.Id} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Button disabled={selectedProduct?.Id} type="primary" style={{ marginTop: '2rem' }}
                                    onClick={generatePcode}>generate</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Category!',
                                },
                            ]}
                        >
                            <Input disabled={selectedProduct?.Id} />
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
                                        <InputNumber disabled style={{ width: "100%" }} />
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
                                        <InputNumber onChange={updateProduct} style={{ width: "100%" }} />
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
                                        <Input disabled={selectedProduct?.Id} />
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
                                        <Input disabled={selectedProduct?.Id} />
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" span={12}>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox onChange={(e) => { setReceitCheck(e.target.checked)}}>Create Receipt</Checkbox>
                                    </Form.Item>
                                </Col> 
                           
                                <span className={receitCheck ? '' : 'sado-color'} >Receipt no: {receitNumber}</span>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                
                <Form.Item >
                <Button type="primary">
                        Selecet Receipt 
                </Button>

                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                        Submit
                    </Button>
                    <Button type="primary" disabled={selectedProduct?.Id} onClick={() => setVisible(false)}
                        danger ghost style={{ float: 'right', marginRight: '1rem' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
