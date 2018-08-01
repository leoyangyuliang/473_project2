import React, { Component } from "react";
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

function ResultPage(){
    if(this.state.result!=null)
    return this.state.result;

    return null;
}

class AddFriend extends Component {
  constructor(props){
    super(props);
    this.state={
    email:'1',
    name:'1',
    isResultFound: false,
    result: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(){

  }
  componentWillMount(){
    this.setState({isResultFound:false});
  }

  handleAddFriend(e){
    e.preventDefault();
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(user.email);
    docRef.get().then((doc) => {
        if (doc.exists) {
            if(doc.data().friendList == null)
            {
              //create a new list to firebase
              docRef.update({
                friendList: [this.state.email]
              }).then(() => {
                  //add for another account
                  var docRef1 = db.collection("users").doc(this.state.email);
                  docRef1.get().then((doc1) => {
                      if (doc1.exists) {
                          if(doc1.data().friendList == null)
                          {
                            docRef1.update({
                            friendList: [user.email]
                          }).catch(function(error) {
                              alert("Error writing document: ", error);
                          });
                          }else{
                          const a = doc1.data().friendList;
                          a.push(user.email);
                            docRef1.update({
                              friendList: a
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
                    alert("added");
            }
            else{
              //get the friendlist and add a new one to db
              const a = doc.data().friendList;
              var isFriend = false;
              for(var i = 0; i < a.length; i++){
                if(a[i] == this.state.email)
                    isFriend = true;
              }
              a.push(this.state.email);
              if(!isFriend){
                docRef.update({
                  friendList: a
                }).then(() => {
                  //add for another user
                  var docRef1 = db.collection("users").doc(this.state.email);
                  docRef1.get().then((doc1) => {
                      if (doc.exists) {
                          if(doc1.data().friendList == null)
                          {
                            docRef1.update({
                            friendList: [user.email]
                          }).catch(function(error) {
                              alert("Error writing document: ", error);
                          });
                          }else{
                          const a = doc1.data().friendList;
                          a.push(user.email);
                            docRef1.update({
                              friendList: a
                            }).then(() => {
                            }).catch(function(error) {
                                alert("Error writing document: ", error);
                            });
                          }
                      }
                    }).catch(function(error){
                    });
                    //end of add another account
                  alert("added");
                }).catch(function(error) {
                    alert("Error writing document: ", error);
                });
              }
              else{
                alert("this user is already your friend");
              }
            }
        } else {
            // doc.data() will be undefined in this case
            alert("No such user!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });


  }

  handleSearch(e){
    e.preventDefault();
    if(this.state.email!=null)
    {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(this.state.email);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            this.setState({isResultFound:"true", result: doc.data()});
        } else {
            // doc.data() will be undefined in this case
            alert("No such user!");
            this.setState({isResultFound: false});
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);

    });
    }
  }

  handleChangeEmail(e){
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  render() {
    return (
      <div class="searchFriends">
        <h1>SEACH FOR FRIENDS</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" placeholder="Enter email"
              onChange={(e) => this.handleChangeEmail(e)}/>
          </div>

          <button class="btn btn-primary"
            onClick={(e) => this.handleSearch(e)}>Search</button>

            {this.state.isResultFound &&(
              <div>
                <br />
                <p>User found! Is this who you are looking for?</p>
                Name: {this.state.result.name} <br />
                <button class="btn btn-primary"
                onClick={(e) => this.handleAddFriend(e)}>add</button>
              </div>
            )}
        </form>
      </div>
    );
  }
 }
export default AddFriend;
