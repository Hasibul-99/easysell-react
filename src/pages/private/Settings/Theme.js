import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Select, Form, Input, Space, Row, Col } from 'antd';
import { getData, putData } from '../../../scripts/api-service';
import { theme_color, PERMANENT_VALUES } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

const { Option } = Select;

export default function Theme() {
  const [form] = Form.useForm();
  const [themes, setThemes] = useState();
  const [selectTheme, setSelectedTheme] = useState()
  const [permanentValues, setPermanentValues] = useState();

  const handleChange = (value) => {
    setSelectedTheme(value)
  };

  const onFinish = async (values) => {
    let find = themes.find(item => item.theme_name === selectTheme);

    find.dv_bg_color = values?.dv_bg_color;
    find.dv_topbar_bg_color = values?.dv_topbar_bg_color;
    find.dv_topbar_fg_color = values?.dv_topbar_fg_color;
    find.theme_name = values?.theme_name;

    let res = await putData(theme_color+ find?.Id, find);

    if (res) {
      getThemeList();
      alertPop('success', 'Update successfully');
    }
  };

  const getThemeList = async () => {
    let res = await getData(theme_color);

    if (res) {
      setThemes(res.data);
    }
  }

  const getPermanentValues = async () => {
    let res = await getData(PERMANENT_VALUES);

    if (res) {
      let masterData = res?.data?.length ? res.data[0] : '';
      setPermanentValues(masterData);
      setSelectedTheme(masterData?.THEME_NAME);
    }
  }

  const applyTheme = async () => {
    permanentValues.THEME_NAME = selectTheme;
    
    let res = await putData(PERMANENT_VALUES + permanentValues.Id, permanentValues);

    if (res) {
      alertPop('success', 'Update successfully');
    }
  }

  useEffect(() => {
    if (themes?.length && selectTheme) {
      let find = themes.find(item => item.theme_name === selectTheme);

      if (find) {
        form.setFieldsValue({
          dv_bg_color: find?.dv_bg_color,
          dv_topbar_bg_color: find?.dv_topbar_bg_color,
          dv_topbar_fg_color: find?.dv_topbar_fg_color,
          theme_name: find?.theme_name,
        });
      }
    }
  }, [selectTheme, themes]);

  useEffect(() => {
    getThemeList();
    getPermanentValues()
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Space>
            Select Theme

            {
              themes?.length ? <Select
                value={selectTheme}
                style={{
                  width: 250,
                }}
                onChange={handleChange}
              >
                {
                  themes.map(theme => <Option value={theme.theme_name}>{theme.theme_name}</Option>)
                }
              </Select> : ''
            }

            <Button type="primary" onClick={() => applyTheme()}>Apply</Button>
          </Space>

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
                  label="Theme Name"
                  name="theme_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Theme Name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Topbar Background"
                  name="dv_topbar_bg_color"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Topbar Background!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Topbar Foreground"
                  name="dv_topbar_fg_color"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Topbar Foreground!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Background"
                  name="dv_bg_color"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Background!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className='text-right'>
              <Button type="primary" htmlType="submit" >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className="gutter-row" span={12}></Col>
      </Row>
    </div>
  )
}
