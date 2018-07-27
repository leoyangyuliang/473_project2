import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
  handleClick() {
    alert("clicked");
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fathers of Love</h1>
        </header>


        <div>
        <input type="text" name="name"/><br/>
        <input type="password" hintText="Enter your Password"
        floatingLabelText="Password"
        onChange = {(event,newValue) => this.setState({password:newValue})}
        /><br/>
        <button onClick={(e) => this.handleClick(e)}>
          Activate Lasers
        </button>
       </div>

      </div>
    );
  }

}

export default App;
