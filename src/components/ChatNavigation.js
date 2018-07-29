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

class ChatNavigation extends Component {
  render() {
    return (
      <HashRouter>
      <div class="chat-container">
          <div class="left-container">
            <div class="navigationbar-chat">
              <ul class="btn-group" style={{margin: 10}}>
                <Link class="btn btn-secondary" to="/StartApp/Chat">Chat</Link>
                <Link class="btn btn-secondary" to="/StartApp/Contact">Contact</Link>
                <Link class="btn btn-secondary" to="/StartApp/Post">Posts</Link>
              </ul>
            </div>
            <div class="chatbox" id="msg_contact">Something will goes here</div>
          </div>
          <div className="right-container">
            <Route exact path="/StartApp/Chat" component={Chat}/>
            <Route path="/StartApp/Contact" component={Contact}/>
            <Route path="/StartApp/Post" component={Post}/>
          </div>
      </div>
      </HashRouter>
    );
  }
}

export default ChatNavigation;
