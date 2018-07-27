import React, { Component } from 'react';
import * as firebase from 'firebase';

var config ={
  apiKey: "AIzaSyAyPkcJPUBGDOSfwt4nSJPTZ3p2wyKbx7c",
  authDomain: "project2-810b9.firebaseapp.com",
  databaseURL: "https://project2-810b9.firebaseio.com",
  projectId: "project2-810b9",
  storageBucket: "project2-810b9.appspot.com",
  messagingSenderId: "457491973802"
}

firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
  }
  handleSignUp(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
  handleLogIn(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
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

  render() {
    const divStyle = {
      textAlign: 'center',
    };
    return (
        <div style={divStyle}>
          <form class="form-group">
            <label>
              Username: <br/>
              <input type="email" placeholder="Enter email" value={this.state.username}
              onChange={(e) => this.handleChangeUsername(e)} />
              <br/>
              Password:<br/>
              <input type="password" placeholder="Enter password" value={this.state.password}
              onChange={(e) => this.handleChangePassword(e)} />
            </label>
            <br/>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-secondary" onClick={(e) => this.handleLogIn(e)}>Log In</button>
              <button class="btn btn-secondary" onClick={(e) => this.handleSignUp(e)}>Sign Up</button>
            </div>
          </form>
       </div>

    );
  }

}

export default App;
