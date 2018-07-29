import React, { Component } from "react";
import ReactDOM from 'react-dom';

class Chat extends Component {
  render() {
    return (
      <div class="chat-container">
         <div class="right-container">
             <div class="rightchat-head">PostHere</div>
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
