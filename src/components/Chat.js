import React, { Component } from "react";
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import Post from './Post';

class Chat extends Component {
 render() {
   return (
     <div class="chat-container">
        <div class="left-container">
            <div class="leftchat-head">
              <div class="navigationbar">
                <ul class="btn-group" style={{margin: 10}}>
                  <Link class="btn btn-secondary" to="/StartApp">Message</Link>
                    <Link class="btn btn-secondary" to="/StartApp"> Contact</Link>
                      <Link class="btn btn-secondary" to="/post"> Post</Link>
                </ul>
                <div className="content">
                  <Route exact path="/post" component={Post}/>
                </div>
            </div>
           </div>
           <div class="chatbox" id="msg_contact">hello
           </div>
        </div>

        <div class="right-container">
            <div class="rightchat-head">Chat</div>
            <div class="chat-body">
              <div class="left-message">incoming message</div>
              <div class="right-message">outgoing message</div>
        </div>
            <div class="chat-footer">Send Message Here:
              <textarea>type your message here</textarea>
              <button type="button">Send</button>
            </div>
        </div>

     </div>
   );
 }
}

export default Chat;
