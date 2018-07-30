import React, { Component } from 'react';
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import StartApp from './components/StartApp';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Signup from './components/Signup';
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div>
          </div>
          <div class="navigationbar">
          <ul class="btn-group">
            <Link class="btn btn-secondary" to="/">Home</Link>
            <Link class="btn btn-secondary" to="/StartApp">Start App</Link>
            <Link class="btn btn-secondary" to="/AboutUs">About Us</Link>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/StartApp" component={StartApp}/>
            <Route path="/AboutUs" component={AboutUs}/>
            <Route path="/Signup" component={Signup}/>
          </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 

export default Main;
