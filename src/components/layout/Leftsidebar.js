import React from 'react';
import logo from "../../assets/images/AOS_Stream.png";
import { server, streams, downArrow, streamsAccount, Channels, Lines, video,
  series, bouquets, packages } from "../common/icons/icon";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

export default function Leftsidebar() {
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
        <li className="nav-item nav-category">STREAMING</li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {server}
            <span className="link-title ml-3">Lines</span>
          </Link>
        </li>
      </ul>
      </PerfectScrollbar>
      
    </div>
  </nav>
  </>
  );
}
