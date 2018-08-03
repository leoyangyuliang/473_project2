import React, { Component } from "react";
import * as firebase from 'firebase';
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import Post from './Post';
import PopUpWindowAddUser from "./PopUpWindowAddUser";


class ChatRoom extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      message: '',
      time: '',
      messages: [],
      atChatRoomID: 'chatroom',
      isAnyMsg: false,
      newMessages: [],
      chatRoomName: '',
      isOpen: false,
      userToAdd: ''
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
                chatRoomName: doc1.data().chatRoomName,
                messages: doc1.data().msg,
                isAnyMsg: true
              });
              //update the new messages
              this.setState({newMessages:[]});
              this.state.messages.map((msg)=>{
                var obj ={
                  sender: msg.sender,
                  text: msg.text,
                  time: msg.time,
                  class: ''
                }
                if(msg.sender==user.email){
                  obj.class = "right-message"
                }
                else {
                  obj.class= "left-message"
                }
                var a = this.state.newMessages;
                a.push(obj);
                this.setState({newMessages: a})
              })
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
            //update the new messages
            this.setState({newMessages:[]});
            this.state.messages.map((msg)=>{
              var obj ={
                sender: msg.sender,
                text: msg.text,
                time: msg.time,
                class: ''
              }
              if(msg.sender==user.email){
                obj.class = "right-message"
              }
              else {
                obj.class= "left-message"
              }
              var a = this.state.newMessages;
              a.push(obj);
              this.setState({newMessages: a})
            })
          }else{

          }
        })
      }
    }, function(error) {
        //...
        console.log("error123123");
    });

    /*(
      this.state.messages.map(msg=>{
        var user = firebase.auth().currentUser;
        var obj ={
          sender: msg.sender,
          text: msg.text,
          time: msg.time,
          class: ''
        }
        if(msg.sender==user.email){
          obj.class = "right-message"
        }
        else {
          obj.class= "left-message"
        }
        var a = this.state.newMessages;
        a.push(obj);
        this.setState({newMessages: a})
      })
    ) */
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

  togglePopUpWindowShow(){
    this.setState({
      isOpen:true
    })
  }

  togglePopUpWindow = () => {
    this.setState({isOpen:false})
  }

  myCallback = (dataFromChild) => {
        const userToAdd = window.username;
        window.username = "";+
        this.setState({
          userToAdd: userToAdd,
          isOpen: false
        });
        if(userToAdd!==undefined && userToAdd!==""){
          this.addUserToGroupChat(userToAdd);
        }
  }


  addUserToGroupChat(userToAdd){

    var db = firebase.firestore();
    var ref = db.collection("users").doc(userToAdd)
    ref.get().then((doc)=>{
      if(doc.exists)
      {
        var ref1 = db.collection("chatList").doc(this.state.atChatRoomID)
        ref1.get()
        .then((doc1)=>{
          if(doc.exists)
          {
              var users = doc1.data().users;
              users.push(userToAdd);
              ref1.update({
                users: users
              }).then(()=>{
            
                //add groupList to the user need to be added
                var docRef1 = db.collection("users").doc(userToAdd);
                docRef1.get().then((doc1) => {
                    if (doc1.exists) {
                        if(doc1.data().chatList == null)
                        {
                          const o = {
                            chatRoomName: this.state.chatRoomName,
                            chatRoomID: this.state.atChatRoomID
                          }
                          docRef1.update({
                            chatList: [o]
                        }).catch(function(error) {
                            alert("Error writing document: ", error);
                        });
                        }else{
                          const o = {
                            chatRoomName: this.state.chatRoomName,
                            chatRoomID: this.state.atChatRoomID
                          }
                        const a = doc1.data().chatList;
                        a.push(o);
                          docRef1.update({
                            chatList: a
                          }).then(() => {
                          }).catch(function(error) {
                              alert("Error writing document: ", error);
                          });
                        }
                    }
                  }).catch(function(error){
                  });



              })

        }

      }).catch((error)=>{
            alert(error)
        });
    }else{    console.log(userToAdd);}
    }).catch(()=>{
        alert("error to add user to groupchat")
    });


  }



  render() {

    return (
      <div class ="chat-area">
          <div class="right-container">
            <div class="rightchat-head">Chat Room: {this.state.chatRoomName}
              <button class="addPeopleToChat"
              onClick={() => this.togglePopUpWindowShow()}>
              +</button>
              { this.state.isOpen &&
              <PopUpWindowAddUser show={this.state.isOpen}
                callback={this.myCallback}
                onClose={this.togglePopUpWindow}
                text="Email :">
              </PopUpWindowAddUser>
              }
            </div>

            <div class="chat-body">
                {this.state.isAnyMsg &&
                (
                  this.state.newMessages.map(
                    msg => <div class={msg.class}>
                    <div>{msg.time}</div>
                    <div class="sender">{msg.sender}</div>{msg.text} </div>)
                )}

            </div>

            <div class="chat-footer">
                 <input id="inputMessage" type="text"
                 placeholder="Type your message…" autofocus />
              <br />
              <button onClick={(e) => this.sendMessage(e)} >
              Send Message</button>
            </div>
          </div>
      </div>
    )
  }
}

export default ChatRoom;
