import React, { Component } from "react";

class Chat extends Component {
 render() {
   return (
     <div class="chat-container">
       <div class="chat-head">Chat</div>
       <div class="chat-body">
         <div class="left-message">incoming message</div>
         <div class="right-message">outgoing message</div>
     </div>
     <div class="chat-footer">Message footer>
         <textarea>type your message here</textarea>
         <button type="button">Send</button>
     </div>
     </div>
   );
 }
}

export default Chat;
