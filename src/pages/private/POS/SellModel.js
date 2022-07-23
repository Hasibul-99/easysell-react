import React from 'react'
import { Card, Col, Row, Table, Input, Checkbox, Button, Modal, Form, InputNumber } from 'antd';

import { getData, postData } from '../../../scripts/api-service';
import { CUSTOMER_LIST, SOLD_ROOT_TABLE } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function SellModel(props) {
    const [form] = Form.useForm();
    const { serialNum, selectedStocks, setSellModel, permanetValues } = props;

    const onFinish = async (values) => {
        values.serial_no = serialNum;
        values.with_tax = (showAmount() + showTaxAmount()) || 0;
        values.total_amount = showAmount();
        values.total_products = selectedStocks.length || 0;
        values.Id = Math.floor(Math.random() * 1000000);

        let res = await postData(SOLD_ROOT_TABLE, values);

        if (res) {
            customerAdd(values)
            console.log("rteeetre5ry", res);
            setSellModel(false);
            form.resetFields();
        }
    };

    const customerAdd  = async (values) => {
        let res = await postData(CUSTOMER_LIST, values);
    
        if (res) {
          alertPop('success', 'Customer add successfully');
        }
    }

    const showAmount = () => {
        let total = 0;

        if (selectedStocks?.length) {
            selectedStocks.forEach(ss => {
                total = total + ss.qty * ss.sell_ppu;
            });
        }

        return total;
    }

    const showTaxAmount = () => {
        let total = showAmount(),
            tax = permanetValues?.TAX || 0;

        return ((total * tax) / 100) || 0;
    }

    const MobileNumber = async (e) => {
        let value = e.target.value;

        if (value?.length > 2) {
            let res = await getData(CUSTOMER_LIST + value);

            if (res) {
                let masterData = res.data;

                if (masterData.customer_name) {
                    form.setFieldsValue({ customer_name: masterData.customer_name });
                }
            }
        }
    }

    const sameAsCustomerName = (e) => {
        if (e.target.checked) {
            let values = form.getFieldValue();
            let { customer_name } = values;
            form.setFieldsValue({ company_name: customer_name });
        }
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                layout={"vertical"}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Mobile Number"
                            name="customer_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Mobile Number',
                                },
                            ]}
                        >
                            <Input onChange={(e) => MobileNumber(e)} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Customer Name"
                            name="customer_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Customer Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Company Name"
                            name="company_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Company Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="rate">
                            <Checkbox onChange={(e) => sameAsCustomerName(e)}>Same As Customer Name</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            label="Customer Address"
                            name="customer_address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Customer Address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row pt-5" span={8}>
                        Total Amount: {(showAmount() + showTaxAmount()) || 0}
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Paid"
                            name="paid"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input paid!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Due"
                            name="due"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input due!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="text-right">
                    <Button type="primary" size='large' htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
