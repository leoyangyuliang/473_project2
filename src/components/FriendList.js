import React, { Component } from "react";
import * as firebase from 'firebase';
import PopUpWindow from './PopUpWindow';
import Popup from 'react-popup';


class friendList extends Component {

  constructor(props){
    super(props);
    this.state={
      friendList: [],
      isAnyFriend: false,
      chatRoomId: '',
      email: '',
      chatRoomName: ''
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
              isAnyFriend: true,
              chatRoomID: '',
              isOpen: false,
              email: ''
            });
          }
        } else {

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });
  }

  createChatRoom(groupName){
    const email = this.state.email;
    //create chatroom with self-generating ID
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    console.log(this.state.chatRoomName);
    const object = {
        chatRoomName: groupName,
        msg:[],
        users:[email,user.email]
    };

    db.collection("chatList").add(object)
    .then((docRef) => {
        this.setState({chatRoomID: docRef.id});
        //assign the chat room to both users
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if(doc.data().chatList == null)
                {
                  //create a new list to firebase
                  const o = {
                    chatRoomName: groupName,
                    chatRoomID: this.state.chatRoomID
                  }
                  docRef.update({
                    chatList: [o]
                  }).then(() => {
                      //add for another account
                      var docRef1 = db.collection("users").doc(email);
                      docRef1.get().then((doc1) => {
                          if (doc1.exists) {
                              if(doc1.data().chatList == null)
                              {
                                const o = {
                                  chatRoomName: groupName,
                                  chatRoomID: this.state.chatRoomID
                                }
                                docRef1.update({
                                  chatList: [o]
                              }).catch(function(error) {
                                  alert("Error writing document: ", error);
                              });
                              }else{
                                const o = {
                                  chatRoomName: groupName,
                                  chatRoomID: this.state.chatRoomID
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
                      //end of add another account
                        }).catch(function(error) {
                        alert("Error writing document: ", error);
                        });
                        alert(":) happy chatting");
                }
                else{
                  //get the chatList and add a new one to db
                  const a = doc.data().chatList;
                  var isFriend = false;
                  for(var i = 0; i < a.length; i++){
                    if(a[i] == this.state.chatRoomID)
                        isFriend = true;
                  }
                  const o = {
                    chatRoomName: groupName,
                    chatRoomID: this.state.chatRoomID
                  }
                  a.push(o);
                  if(!isFriend){
                    docRef.update({
                      chatList: a
                    }).then(() => {
                      //add for another user
                      var docRef1 = db.collection("users").doc(email);
                      docRef1.get().then((doc1) => {
                          if (doc.exists) {
                              if(doc1.data().chatList == null)
                              {
                                const o = {
                                  chatRoomName: groupName,
                                  chatRoomID: this.state.chatRoomID
                                }
                                docRef1.update({
                                chatList: [o]
                              }).catch(function(error) {
                                  alert("Error writing document: ", error);
                              });
                              }else{
                              const a = doc1.data().chatList;
                              const o = {
                                chatRoomName: groupName,
                                chatRoomID: this.state.chatRoomID
                              }
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
                        //end of add another account
                      alert(":) happy chatting");
                    }).catch(function(error) {
                        alert("Error writing document: ", error);
                    });
                  }
                  else{
                    alert("You have a chat room with this user :)  happy chatting");
                  }
                }
            } else {
                // doc.data() will be undefined in this case
                alert("No such user!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);

        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

  togglePopUpWindowShow(email){
    this.setState({
      isOpen:true,
      email: email
    })

  }
  myCallback = (dataFromChild) => {
        const groupName = window.groupName;
        this.setState({
          chatRoomName: groupName,
          isOpen: false
        });
        if(groupName!==undefined && groupName!==""){
          this.createChatRoom(groupName);
        }
  }
  togglePopUpWindow = () => {
    this.setState({isOpen:false})
  }
  render() {
    return (
      <div class="friendList-button-group">

        {this.state.isAnyFriend &&
          (
            this.state.friendList.map(
              friend => <div>

                <button onClick={() => this.togglePopUpWindowShow(friend)}>
                Chat Now</button>
                {friend}:

                { this.state.isOpen &&
                <PopUpWindow show={this.state.isOpen}
                  callback={this.myCallback}
                  onClose={this.togglePopUpWindow}
                  text="Enter a Room Name:">
                </PopUpWindow>
                }
              </div>)
          )}
      </div>
    );
  }
 }
export default friendList;
