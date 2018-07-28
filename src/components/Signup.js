import React, { Component } from 'react';
import {Route,Link,Redirect} from "react-router-dom";
import * as firebase from 'firebase';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
    email:'',
    password:'',
    name:'',
    age:'',
    gender:"M",
    redirect: false
    }
  }
  handleSignUp(e){
    // e.preventDefault();
    // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    // .then(function(firebaseUser) {
    //   this.setState({redirect:true});
    // })
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorMessage = error.message;
    //   alert(errorMessage);
    // });
    console.log(this.state);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/StartApp' />
    }
   }
  handleChangeEmail(e){
    e.preventDefault();
    this.setState({email: e.target.value});
  }
  handleChangePassword(e){
    e.preventDefault();
    this.setState({password: e.target.value});
  }
  handleChangeUsername(e){
    e.preventDefault();
    this.setState({name: e.target.value});
  }
  handleChangeAge(e){
    e.preventDefault();
    this.setState({age: e.target.value});
  }
  handleChangeGender(e){
    e.preventDefault();
    this.setState({gender:e.target.value});
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
            onChange={(e) => this.handleChangeEmail(e)} />

            <br/>Password<br/>

            <input id="password" type="password" placeholder="Enter password"
            value={this.state.password}
            onChange={(e) => this.handleChangePassword(e)} />

            <br/>Username<br/>

            <input type="email" placeholder="Enter Name" value={this.state.username}
            onChange={(e) => this.handleChangeUsername(e)} />

            <br/>Gender<br/>

            <select class="form-control form-control-sm"
            onChange={(e) => this.handleChangeGender(e)} >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            Age<br/>

            <input type="number" placeholder="Enter Age"
            onChange={(e) => this.handleChangeAge(e)} />
            <br/><br/>
            <button class="btn btn-secondary"
            onClick={(e) => this.handleSignUp(e)}>Sign Up</button>
          </label>
          <br/>
          {this.renderRedirect()}
        </form>
      </div>
    );
  }
}
 

export default Signup;
