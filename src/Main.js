import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import LogIn from './components/LogIn';
import Home from './components/Home';
import AboutUs from './components/AboutUs';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1 class="title">WeChat</h1>
          <ul class="btn-group">
            <li class="btn btn-secondary"><NavLink to="/">Home</NavLink></li>
            <li class="btn btn-secondary"><NavLink to="/LogIn">Log In</NavLink></li>
            <li class="btn btn-secondary"><NavLink to="/AboutUs">About Us</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/AboutUs" component={AboutUs}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 

export default Main;
