import React, { useContext } from 'react';
import logo from "../../assets/images/logo.png";
import {
  server, streams, downArrow, streamsAccount, Channels, Lines, video,
  series, bouquets, packages
} from "../common/icons/icon";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import {
  ShopOutlined, ShoppingOutlined, MoneyCollectOutlined, BoxPlotOutlined,
  HeatMapOutlined, DatabaseOutlined, ContainerOutlined
} from '@ant-design/icons';
import { authContext } from "../../context/AuthContext";

export default function Leftsidebar() {
  const { user, setUserInfo, permissions } = useContext(authContext);

  console.log("permissions", permissions);

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-header">
          <a href="#" className="sidebar-brand">
            {/* Noble<span>UI</span> */}
            <img src={logo} />
          </a>
          <div className="sidebar-toggler not-active">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="sidebar-body">
          <PerfectScrollbar>
            <ul className="nav">
              {(!permissions || permissions?.dashboard === 1) ? <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    {server}
                    <span className="link-title ml-3">Dasboard</span>
                  </Link>
                </li>
              </> : ''}
              {
                (!permissions || permissions?.pos === 1) ? <>
                  <li className="nav-item">
                    <Link to="/pos" className="nav-link">
                      <ShopOutlined />
                      <span className="link-title ml-3">POS</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.customsell === 1) ? <>
                  <li className="nav-item">
                    <Link to="/custom-sell" className="nav-link">
                      <ShoppingOutlined />
                      <span className="link-title ml-3">Custom Sell</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.payments === 1) ? <>
                  <li className="nav-item">
                    <Link to="/payments" className="nav-link">
                      <MoneyCollectOutlined />
                      <span className="link-title ml-3">Payments</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.mis_expense === 1) ? <>
                  <li className="nav-item">
                    <Link to="/expense" className="nav-link">
                      <BoxPlotOutlined />
                      <span className="link-title ml-3">Expense</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.account_statement === 1) ? <>
                  <li className="nav-item">
                    <Link to="/report_and_statement" className="nav-link">
                      <ContainerOutlined />
                      <span className="link-title ml-3">Report And Statements</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.inventory_add_update === 1) ? <>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#inventory"
                      role="button" aria-expanded="false" aria-controls="inventory">
                      <HeatMapOutlined />
                      <span className="link-title">Inventory</span>
                      <i className="link-arrow" data-feather="chevron-down" />
                    </a>
                    <div className="collapse" id="inventory">
                      <ul className="nav sub-menu">
                        <li className="nav-item">
                          <Link to="/ready-product" className="nav-link">
                            <DatabaseOutlined />
                            <span className="link-title ml-3">Ready Products</span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link to="/row-products" className="nav-link">
                            {server}
                            <span className="link-title ml-3">Raw Product</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.setting_shop_info === 1) ? <>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#Employee"
                      role="button" aria-expanded="false" aria-controls="Employee">
                      <HeatMapOutlined />
                      <span className="link-title">Employee Management </span>
                      <i className="link-arrow" data-feather="chevron-down" />
                    </a>
                    <div className="collapse" id="Employee">
                      <ul className="nav sub-menu">
                        <li className="nav-item">
                          <Link to="/suplier_stuff" className="nav-link">
                            {server}
                            <span className="link-title ml-3">Staff / Employee</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/stuff_section" className="nav-link">
                            {server}
                            <span className="link-title ml-3">Staff Section</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </> : ''
              }

              {
                (!permissions || permissions?.setting_shop_info === 1) ? <>
                  <li className="nav-item">
                    <Link to="/returned_products" className="nav-link">
                      {server}
                      <span className="link-title ml-3">Returned Products</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.setting_shop_info === 1) ? <>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      {server}
                      <span className="link-title ml-3">Settings</span>
                    </Link>
                  </li>
                </> : null
              }

              {
                (!permissions || permissions?.vendor_expense === 1) ? <>
                  <li className="nav-item">
                    <Link to="/vendore" className="nav-link">
                      {server}
                      <span className="link-title ml-3">Vendore</span>
                    </Link>
                  </li>
                </> : null
              }
            </ul>
          </PerfectScrollbar>

        </div>
      </nav>
    </>
  );
}
