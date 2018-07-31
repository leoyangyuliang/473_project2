import React, { Component } from "react";
import * as firebase from 'firebase';
import {Redirect} from "react-router-dom";
import Chat from './Chat';


class ChatList extends Component {
  constructor(props){
    super(props);
    this.state={
      chatList: [],
      isAnyChat: false,
      atChatRoomID: ''
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
          if(doc.data().chatList != null)
          {
            this.setState({
              chatList: doc.data().chatList,
              isAnyChat: true
            });
            console.log(this.state.chatList);
          }
        } else {

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });
  }

  createChatRoom(chatRoomID){
    window.atChatRoomID = chatRoomID;
    var database = firebase.firestore();
    var user = firebase.auth().currentUser;
    var docref = database.collection("users").doc(user.email);
    docref.update({
        atChatRoomID: chatRoomID
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

  }

  render() {
    return (
      <div>
      {this.state.isAnyChat &&
        (
          this.state.chatList.map(
            chat => <div class="chatList-button-group">
            <button onClick={() => this.createChatRoom(chat)} >
            {chat} </button></div>)
        )}


      </div>
    );
  }
 }
export default ChatList;
