import React, { Component } from 'react';
import Dashboard from "../src/layouts/Dashboard/Dashboard";
import Calendar from './views/Calendar/Calendar';
import Login from './views/Login/Login';
import { HashRouter, Route, Switch, Router } from "react-router-dom";

import indexRoutes from "routes/index.jsx";
import loginRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

const App = () => {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return <Route to={prop.path} component={prop.component} key={key} />;
            })}

          </Switch>

        </HashRouter>,
      </div>

    );
  }


export default App;
