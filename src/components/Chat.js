import React, { Component } from "react";
import * as firebase from 'firebase';
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import Post from './Post';



class ChatRoom extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      message: '',
      time: '',
      messages: [],
      atChatRoomID: '',
      isAnyMsg: false
    }

    this.updateMessage = this.updateMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }



  componentWillMount() {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(user.email);
    docRef.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, (doc) => {
        console.log("update room");
        docRef.get().then((doc) => {
          if(doc.exists){
            this.setState({
              atChatRoomID: doc.data().atChatRoomID,
              isAnyMsg:false
            });
          }
        })
        console.log(this.state.atChatRoomID);
        if(this.state.atChatRoomID!=""){
          var msg = db.collection("chatList").doc(this.state.atChatRoomID);
          msg.get().then((doc) => {
            if(doc.data().msg!=null)
            {
              this.setState({
                messages: doc.data().msg,
                isAnyMsg: true
              });
            }
          })
        }
    });


    var chatList = db.collection("chatList");
    chatList.onSnapshot({
      // Listen for document metadata changes
      includeMetadataChanges: true
    }, (doc) => {
      if(this.state.atChatRoomID!=""){
        var msg = db.collection("chatList").doc(this.state.atChatRoomID);
        msg.get().then((doc) => {
          if(doc.data().msg!=null)
          {
            this.setState({
              messages: doc.data().msg,
              isAnyMsg: true
            });
          }
        })
      }
    }, function(error) {
        //...
        console.log("error123123");
    });

  }

  componentDidMount(){
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(user.email);
    if(this.state.atChatRoomID!=""){
        console.log("messages" + this.state.messages);
      var chat = db.collection("chatList").doc(this.state.atChatRoomID);
      docRef.onSnapshot({
          // Listen for document metadata changes
          includeMetadataChanges: true
      }, (doc) => {
          console.log("db changed");
          docRef.get().then((doc) => {
            this.setState({isAnyMsg: false});
            if(doc.exists){
              this.setState({
                messages: doc.data().msg,
                isAnyMsg: true
              });
            }
          }).catch(function(error){

          });
      });
      docRef.get().then((doc) => {
        if(doc.exists){
          this.setState({isAnyMsg: false});
          this.setState({
            messages: doc.data().msg,
            isAnyMsg: true
          });
        }
      }).catch(function(error){

      });
    }

  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  sendMessage(e) {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var docRef = db.collection("chatList").doc(this.state.atChatRoomID);
    docRef.get().then((doc)=>{
      if(doc.exists){
          const message={
            time: Date.now(),
            text: this.state.message,
            sender: user.email
          }
        if(doc.data().msg==null)
          {
            docRef.update({
              msg: [message]
            }).then(() => {

            }).catch(function(error){

            });
          }
          else if(doc.data().msg!=null)
            {
              const message={
                time: Date.now(),
                text: this.state.message,
                sender: user.email
              }
              var a = doc.data().msg;
              a.push(message);
              docRef.update({
                msg: a
              }).then(() => {

              }).catch(function(error){

              });
            }
      }
    });

  }


  render() {

    return (
      <div>
          <div class="right-container">
            <div class="rightchat-head">Chat Room: {this.state.atChatRoomID}</div>

            <div class="chat-body">
                {this.state.isAnyMsg && (
                  this.state.messages.map(msg=>{
                    var user = firebase.auth().currentUser;
                    if(msg.name==user.emal)
                      msg.name= "right-message"
                    else {
                      msg.name= "left-message"
                    }
                  })
                ) &&
                (
                  this.state.messages.map(
                    msg => <div class={msg.name}>
                    {msg.text} </div>)
                )}
                <div class="left-message">{this.state.message}</div>
            </div>

            <div class="chat-footer">
                 <input onChange={this.updateMessage} type="text"
                 placeholder="Type your message…" autofocus />
              <br />
              <button onClick={(e) => this.sendMessage(e)} >
              Send message</button>
            </div>
          </div>
      </div>
    )
  }
}

export default ChatRoom;
