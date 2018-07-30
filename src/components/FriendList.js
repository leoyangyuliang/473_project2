import React, { Component } from "react";
import * as firebase from 'firebase';


class FriendList extends Component {

  constructor(props){
    super(props);
    this.state={
      friendList: [],
      isAnyFriend: false
    }
  }
  componentWillMount(){
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(user.email);
    docRef.get().then((doc) => {
        if (doc.exists) {
          if(doc.data().friendList != null)
          {
            this.setState({
              friendList: doc.data().friendList,
              isAnyFriend: true
            });
          }
        } else {

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });
  }



  render() {
    return (
      <div class="friendList-button-group">
        {this.state.isAnyFriend &&
          (
            this.state.friendList.map(
              station => <div><button> {station} </button></div>)
          )}
      </div>
    );
  }
 }
export default FriendList;
