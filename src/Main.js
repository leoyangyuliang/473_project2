import React, { Component } from 'react';
import {
  Route,
  Link,
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
          <div>
          <h1 class="title">WeChat</h1>
          </div>
          <div style={{background: 'black'}}>
          <ul class="btn-group" style={{margin: 10}}>
            <Link class="btn btn-secondary" to="/">Home</Link>
            <Link class="btn btn-secondary" to="/LogIn">Log In</Link>
            <Link class="btn btn-secondary" to="/AboutUs">About Us</Link>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/AboutUs" component={AboutUs}/>
          </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 

export default Main;
