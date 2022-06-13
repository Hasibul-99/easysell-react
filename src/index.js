import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";


import 'jquery/dist/jquery.min.js';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

import "./assets/js/template.js";
// import "./assets/js/wizard.js";

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import "./assets/vendors/core/core.css";
import "./assets/css/demo1/style.css";
import "./assets/scss/main.scss"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
