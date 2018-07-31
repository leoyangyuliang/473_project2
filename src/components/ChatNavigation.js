import React, { Component } from 'react';
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import StartApp from './StartApp';
import Chat from './Chat';
import Contact from './Contact';
import Post from './Post';
import FriendList from './FriendList';
import ChatList from './ChatList';
import AddFriend from './AddFriend';

class ChatNavigation extends Component {
  render() {
    return (
      <HashRouter>
      <div class="chat-container">
          <div class="left-container">
            <div class="navigationbar-chat">
              <ul class="btn-group" >
                <Link class="btn-sm btn-secondary" to="/StartApp/Chat">Chat</Link>
                <Link class="btn-sm btn-secondary" to="/StartApp/Contact">Contact</Link>
                <Link class="btn-sm btn-secondary" to="/StartApp/Post">Posts</Link>
                <Link class="btn-sm btn-secondary" to="/StartApp/AddFriend">Add Friends</Link>
              </ul>
            </div>
          <div class="chatbox">
            <Route exact path="/StartApp/Chat" component={ChatList}/>
            <Route path="/StartApp/Contact" component={FriendList}/>
            <Route exact path="/StartApp/Post" component={FriendList}/>
            <Route path="/StartApp/AddFriend" component={FriendList}/>
          </div>
          </div>
          <div className="right-container">
            <Route exact path="/StartApp/Chat" component={Chat}/>
            <Route path="/StartApp/Contact" component={Contact}/>
            <Route path="/StartApp/Post" component={Post}/>
            <Route exact path="/StartApp/AddFriend" component={AddFriend}/>
          </div>
      </div>
      </HashRouter>
    );
  }
}

export default ChatNavigation;
