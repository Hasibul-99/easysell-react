import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routers/private-router";
import Cookies from "js-cookie";
import $ from "jquery";
import Leftsidebar from "../components/layout/Leftsidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

class Private extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
      if (!Cookies.get("AOSToken")) {
        window.location = "/auth/login";
      };
    }

    getRoutes = routes => {
      return routes.map((prop, key) => {  
        if (prop.layout === "/") {
          return(<Route
              exact
              path={prop.layout + prop.path}
              component = {prop.component} 
              key={key}
            />)
        } else {
          return null;
        }
      });
    };

    processNavbar = () => {
      $('#left-sidebar-cici-4565').removeClass('yay-overlay');
      $('#left-sidebar-cici-4565').css("opacity", 0);
      $('#left-sidebar-cici-4565').css("z-index", 1);
    }

    render() {
        return (
            <div className="main-wrapper" id="main-wrapper">           
              <Leftsidebar/>
              <div className="page-wrapper">
                <Navbar/>
                <Switch>
                  {this.getRoutes(routes)}
                </Switch>
                <Footer/>
              </div>
            </div>
        )
    }
}

export default Private;