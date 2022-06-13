import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { postData } from '../../scripts/api-service';
import { LOGIN } from '../../scripts/api';
import Cookies from "js-cookie";
import image from "../../assets/images/OPTV ash 1.png"
import loginImage from "../../assets/images/Forgot password-rafiki 1.png"
import { Link } from 'react-router-dom';

export default function SignIn() {
  const onFinish = async (values) => {
    let res = await postData(LOGIN, values, 'no_token');
    if (res) {
      Cookies.set("AOSToken", res.data.token, { expires: 1 });
      window.location = "/";
    }
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center p-0">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-6 pe-md-0 login-image">
              <div className="auth-side-wrapper">
              </div>
              <img src={loginImage} alt="login-img" />
            </div>
            <div className="col-md-6 ps-md-0 card">
              <div className='card-body'>
                <div className="auth-form-wrapper px-4 py-4">
                  <img src={image} alt="logo" height="81" className="mb-4" />
                  {/* <a href="#" className="noble-ui-logo d-block mb-2">Noble<span>UI</span></a> */}
                  <h5 className="text-muted fw-normal">Welcome back</h5>
                  <h3 className="fw-normal mb-4">Log In</h3>

                  <Form
                    name="basic"
                    layout={'vertical'}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Username"
                      name="userId"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>

                    <div className='row'>
                      <div className='col-6'>
                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                        >
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </div>
                      <div className='col-6' style={{textAlign: "right", paddingTop: "6px"}}>
                        <Link to="">Forgot Password</Link>
                      </div>
                    </div>

                    <Form.Item>
                      <Button className='b-button' type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>

                  <div className='text-center'>
                    Don't have an account? <Link to="">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
