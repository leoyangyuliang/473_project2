import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Route,Link,Redirect} from "react-router-dom";
import AboutUs from './AboutUs';

var config ={
  apiKey: "AIzaSyAyPkcJPUBGDOSfwt4nSJPTZ3p2wyKbx7c",
  authDomain: "project2-810b9.firebaseapp.com",
  databaseURL: "https://project2-810b9.firebaseio.com",
  projectId: "project2-810b9",
  storageBucket: "project2-810b9.appspot.com",
  messagingSenderId: "457491973802"
}

firebase.initializeApp(config);


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:'',
    redirect: false,
    signup: false
    }
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleSignUp(e){

    this.setState({signup:true});
  }
  handleLogIn(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    .then(() => {
      this.setState({
        redirect: true
      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });

  }
  handleChangeUsername(e){
    e.preventDefault();
    this.setState({username: e.target.value});
  }
  handleChangePassword(e){
    e.preventDefault();
    this.setState({password: e.target.value});
  }
  renderRedirect = () => {
     if (this.state.redirect) {
       return <Redirect to='/StartApp' />
     }
   }
   redirectToSignUp = () => {

       return <Redirect to='/Signup' />

   }

  render() {
    const divStyle = {
      textAlign: 'center',
    };
    return (
        <div style={divStyle}>
          <form class="form-group">
            <label>
              Email<br/>
              <input type="email" placeholder="Enter email" value={this.state.username}
              onChange={(e) => this.handleChangeUsername(e)} />
              <br/>
              Password<br/>
              <input id="password" type="password" placeholder="Enter password" value={this.state.password}
              onChange={(e) => this.handleChangePassword(e)} />
            </label>
            <br/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <Link id="loginbtn" class="btn btn-secondary" to="/StartApp"
              onClick={(e) => this.handleLogIn(e)} >Log In</Link>
              <div>
                      {this.renderRedirect()}
                      {this.state.signup && this.redirectToSignUp()}
              </div>
              <Link to="/StartApp" class="btn btn-secondary"
              onClick={(e) => this.handleSignUp(e)}>Sign Up</Link>
            </div>
          </form>
       </div>

    );
  }

}

export default Login;
