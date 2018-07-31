import React, { Component } from "react";
import * as firebase from 'firebase';


class friendList extends Component {

  constructor(props){
    super(props);
    this.state={
      friendList: [],
      isAnyFriend: false,
      chatRoomId: ''
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
              chatRoomID: ''
            });
          }
        } else {

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });
  }

  createChatRoom(email){
    //create chatroom with self-generating ID
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    const object = {
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
                  docRef.update({
                    chatList: [this.state.chatRoomID]
                  }).then(() => {
                      //add for another account
                      var docRef1 = db.collection("users").doc(email);
                      docRef1.get().then((doc1) => {
                          if (doc1.exists) {
                              if(doc1.data().chatList == null)
                              {
                                docRef1.update({
                                chatList: [this.state.chatRoomID]
                              }).catch(function(error) {
                                  alert("Error writing document: ", error);
                              });
                              }else{
                              const a = doc1.data().chatList;
                              a.push(this.state.chatRoomID);
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
                  a.push(this.state.chatRoomID);
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
                                docRef1.update({
                                chatList: [this.state.chatRoomID]
                              }).catch(function(error) {
                                  alert("Error writing document: ", error);
                              });
                              }else{
                              const a = doc1.data().chatList;
                              a.push(this.state.chatRoomID);
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

  render() {
    return (
      <div class="friendList-button-group">
        {this.state.isAnyFriend &&
          (
            this.state.friendList.map(
              friend => <div><button onClick={() => this.createChatRoom(friend)}>
              {friend} </button></div>)
          )}
      </div>
    );
  }
 }
export default friendList;
