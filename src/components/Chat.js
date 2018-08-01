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
      atChatRoomID: 'chatroom',
      isAnyMsg: false
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount(){
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
        });
        //update message after change room
        console.log(this.state.atChatRoomID);
        if(this.state.atChatRoomID!==undefined){
          //first argument to be of type string
          var message = db.collection("chatList").doc(this.state.atChatRoomID);
          message.get().then((doc1) => {
            console.log(doc1.data());
            if(doc1.data()!==undefined)
            {
              this.setState({
                messages: doc1.data().msg,
                isAnyMsg: true
              });
            }else{

            }
          })
        }
        //end update message after change room
    });
    //listen for group msg change
    var chatList = db.collection("chatList");
    chatList.onSnapshot({
      // Listen for document metadata changes
      includeMetadataChanges: true
    }, (doc) => {
      if(this.state.atChatRoomID!==undefined){
        var message = db.collection("chatList").doc(this.state.atChatRoomID);
        message.get().then((doc) => {
          console.log(doc.data());
          if(doc.data()!==undefined)
          {
            this.setState({
              messages: doc.data().msg,
              isAnyMsg: true
            });
          }else{

          }
        })
      }
    }, function(error) {
        //...
        console.log("error123123");
    });

  }

  componentDidMount() {


  }

  componentDidMount(){
    // var user = firebase.auth().currentUser;
    // var db = firebase.firestore();
    // var docRef = db.collection("users").doc(user.email);
    // if(this.state.atChatRoomID!=""){
    //     console.log("messages" + this.state.messages);
    //   var chat = db.collection("chatList").doc(this.state.atChatRoomID);
    //   docRef.onSnapshot({
    //       // Listen for document metadata changes
    //       includeMetadataChanges: true
    //   }, (doc) => {
    //       console.log("db changed");
    //       docRef.get().then((doc) => {
    //         this.setState({isAnyMsg: false});
    //         if(doc.exists){
    //           this.setState({
    //             messages: doc.data().msg,
    //             isAnyMsg: true
    //           });
    //         }
    //       }).catch(function(error){
    //
    //       });
    //   });
    //   docRef.get().then((doc) => {
    //     if(doc.exists){
    //       this.setState({isAnyMsg: false});
    //       this.setState({
    //         messages: doc.data().msg,
    //         isAnyMsg: true
    //       });
    //     }
    //   }).catch(function(error){
    //
    //   });
    // }

  }

  updateMessage(event) {
    event.preventDefault();
    this.setState({
      message: event.target.value
    })
  }

  sendMessage(e) {
    this.setState({
      message: document.getElementById("inputMessage").value
    })
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
document.getElementById("inputMessage").value = "";
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
                    if(msg.sender==user.email)
                      msg.sender= "right-message"
                    else {
                      msg.sender= "left-message"
                    }
                  })
                ) &&
                (
                  this.state.messages.map(
                    msg => <div class={msg.sender}>
                    {msg.text} </div>)
                )}

            </div>

            <div class="chat-footer">
                 <input id="inputMessage" type="text"
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
