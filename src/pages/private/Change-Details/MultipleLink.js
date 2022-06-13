import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox , Select, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;


export default function MultipleLink() {
  const [form] = Form.useForm();
  const plainOptions = ['Apple', 'Pear', 'Orange'];

  form.setFieldsValue({
    variants:
      [
        {
          first: '',
          last: ""
        },
      ]
  });

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return <div className='multiple-link'>
    <Card>
      <Form form={form} name="dynamic_form_nest_item" layout={"vertical"} 
        onFinish={onFinish} autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}>
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, fieldKey, name, ...restField }) => (
                <Card>
                  <DeleteOutlined onClick={() => remove(name)} style={{fontSize:"20px", float: "right"}} />
                  <Form.Item
                    name="Link"
                    label="Link"
                    rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>

                  <Form.Item
                    label="Account Name"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Select
                      showSearch
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                    >
                      <Option value="1">Not Identified</Option>
                      <Option value="2">Closed</Option>
                      <Option value="3">Communicated</Option>
                      <Option value="4">Identified</Option>
                      <Option value="5">Resolved</Option>
                      <Option value="6">Cancelled</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                      label="Matching Name"
                      {...restField}
                      name={[name, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                      fieldKey={[name, 'first']}
                    >
                      <Input placeholder="First Name" />
                  </Form.Item>

                  <Form.Item
                      label="Priority"
                      {...restField}
                      name={[name, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                      fieldKey={[name, 'first']}
                    >
                      <Input placeholder="First Name" />
                  </Form.Item>

                  <Form.Item
                      label="ID"
                      {...restField}
                      name={[name, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                      fieldKey={[name, 'first']}
                    >
                      <Input placeholder="First Name" disabled/>
                  </Form.Item>

                  <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                      fieldKey={[name, 'first']}
                    >
                      <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
      
                  </Form.Item>
                </Card>
              ))}
              <Form.Item>
                <Button type="dashed" className='mt-4' onClick={() => add()} block 
                  icon={<PlusOutlined />} style={{width: '50px'}}>
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className='text-center'>
          <Button  type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </Form.Item>

      </Form>
    </Card>
  </div>;
}
