import React, {useState, useContext, useEffect} from 'react';
import {menu, bell, userIcon, logout, editProfile} from "../common/icons/icon";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { Modal, Button, Form, Input } from 'antd';
import {CHANGE_PASSWORD} from "../../scripts/api";
import {postData} from "../../scripts/api-service";
import { authContext } from "../../context/AuthContext";
import avetar from "../../assets/images/avatar-1.png";

export default function Navbar() {
    const {user, setUserInfo, theme, permissions} = useContext(authContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const logoutUser = () => {
        Cookies.remove("AOSToken");
        window.location = "/auth/login";
    }

    const onFinish = async (values) => {
        let res = await postData(CHANGE_PASSWORD, values);

        if (res) {
            setIsModalVisible(false);
            window.location.reload();
        }
    };

    useEffect(() => {
        setUserInfo();
    }, [])

  return (
    <nav className="navbar" style={theme ? { background: theme.dv_topbar_bg_color, color: theme.dv_topbar_fg_color } : {}}>
        <a href="#" className="sidebar-toggler">
            {menu}
        </a>
        <div className="navbar-content">
            
            <ul className="navbar-nav">
            
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="wd-30 ht-30 rounded-circle" src={avetar} alt="profile" />
                </a>
                <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
                <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                    {/* <div className="mb-3">
                        <img className="wd-80 ht-80 rounded-circle" src="https://via.placeholder.com/80x80" alt />
                    </div> */}
                    <div className="text-center">
                    <p className="tx-16 fw-bolder">{user?.name}</p>
                    <p className="tx-12 text-muted">{user?.userId}</p>
                    </div>
                </div>
                <ul className="list-unstyled p-1">
                    {/* <li className="dropdown-item py-2">
                        <a href="pages/general/profile.html" className="text-body ms-0">
                            {userIcon}
                            <span>Profile</span>
                        </a>
                    </li> */}
                    {/* <li className="dropdown-item py-2">
                        <a href="javascript:;" className="text-body ms-0" onClick={() => setIsModalVisible(true)}>
                            {editProfile} <span>Change Password</span>
                        </a>
                    </li> */}
                    <li className="dropdown-item py-2" onClick={logoutUser}>
                        <a href="javascript:;" className="text-body ms-0">
                            {logout}
                            <span>Log Out</span>
                        </a>
                    </li>
                </ul>
                </div>
            </li>
            </ul>
        </div>

        <Modal title="Change Password" 
            visible={isModalVisible} 
            footer={false}
            onCancel={() => {setIsModalVisible(false)}}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    >

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newpassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
        </Modal>
    </nav>
  );
}
