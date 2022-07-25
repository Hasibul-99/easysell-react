import React, {useContext} from 'react';
import logo from "../../assets/images/logo.png";
import {
  server, streams, downArrow, streamsAccount, Channels, Lines, video,
  series, bouquets, packages
} from "../common/icons/icon";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { ShopOutlined, ShoppingOutlined, MoneyCollectOutlined, BoxPlotOutlined,
  HeatMapOutlined, DatabaseOutlined } from '@ant-design/icons';
  import { authContext } from "../../context/AuthContext";

export default function Leftsidebar() {
  const {user, setUserInfo, permissions} = useContext(authContext);
  
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
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {server}
                  <span className="link-title ml-3">Dasboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pos" className="nav-link">
                  <ShopOutlined />
                  <span className="link-title ml-3">POS</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/custom-sell" className="nav-link">
                <ShoppingOutlined />
                  <span className="link-title ml-3">Custom Sell</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/payments" className="nav-link">
                <MoneyCollectOutlined />
                  <span className="link-title ml-3">Payments</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/expense" className="nav-link">
                  <BoxPlotOutlined />
                  <span className="link-title ml-3">Expense</span>
                </Link>
              </li>
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
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {server}
                  <span className="link-title ml-3">Raw Product</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/suplier_stuff" className="nav-link">
                  {server}
                  <span className="link-title ml-3">Supplier Staff</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {server}
                  <span className="link-title ml-3">More</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stuff_section" className="nav-link">
                  {server}
                  <span className="link-title ml-3">Staff Section</span>
                </Link>
              </li>
              {/* <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#emails" role="button" aria-expanded="false" aria-controls="emails">
            <i className="link-icon" data-feather="mail" />
            <span className="link-title">Email</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="emails">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/email/inbox.html" className="nav-link">Inbox</a>
              </li>
              <li className="nav-item">
                <a href="pages/email/read.html" className="nav-link">Read</a>
              </li>
              <li className="nav-item">
                <a href="pages/email/compose.html" className="nav-link">Compose</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a href="pages/apps/chat.html" className="nav-link">
            <i className="link-icon" data-feather="message-square" />
            <span className="link-title">Chat</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="pages/apps/calendar.html" className="nav-link">
            <i className="link-icon" data-feather="calendar" />
            <span className="link-title">Calendar</span>
          </a>
        </li> */}
            </ul>
          </PerfectScrollbar>

        </div>
      </nav>
    </>
  );
}
