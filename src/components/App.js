import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Redirect} from "react-router-dom";

function GetUserName(){
  var user = firebase.auth().currentUser;
  if(user){
  return user.email;
  }
  return null;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
    redirect: false
    }
  }

  renderRedirect = () => {
     if (this.state.redirect) {
       return <Redirect to='/' />
     }
   }
  signout(e){
    firebase.auth().signOut().then(() => {
      this.setState({
        redirect: true
      })
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    return (
        <div>

          <GetUserName />
          <button onClick={(e) =>
            this.signout(e)}>Sign Out</button>
          <div>
              {this.renderRedirect()}
          </div>
        </div>
    );
  }
}
 

export default App;
