import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { getData, postData, putData } from '../../../scripts/api-service';
import { shop_info_values } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function ShopInformation() {
    const [form] = Form.useForm();
    const [shopInfo, setShopInfo] = useState();

    const onFinish = async (values) => {
        values.Id = shopInfo.Id;
        let res = await putData(shop_info_values + shopInfo.Id, values);

        if (res) {
            alertPop('success', "Update Successfully");
        }
    };

    const getShopInfo = async () => {
        let res = await getData(shop_info_values);

        if (res) {
            let masterData = res?.data?.length ? res.data[0] : '';
            setShopInfo(masterData);

            form.setFieldsValue({
                email: masterData?.email,
                mobile_number: masterData?.mobile_number,
                shop_address: masterData?.shop_address,
                shop_name: masterData?.shop_name
            });
        }
    }

    useEffect(() => {
        getShopInfo()
    }, []);


    return (
        <div>
            <Form
                form={form}
                layout={"vertical"}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Shop Name"
                            name="shop_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Shop Name!',
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
                                    message: 'Please input mobile number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Address"
                            name="shop_address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>



                <Form.Item className='text-right'
                >
                    <Button type="primary" htmlType="submit" >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
