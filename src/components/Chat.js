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
    this.updateMessage = this.updateMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {
      message: '',
      messages: []
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    firebase.database().ref('message/').on('value', (snapshot) => {
      const currentMessages = snapshot.val()
      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        })
      }
    })
  }


  updateMessage(event) {
    console.log('updateMessage: ' + event.target.value)
    this.setState({
      message: event.target.value
    })
  }

  sendMessage(event) {
    console.log('sendMessage: ' + this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }
    firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
  }


  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.text}</li>
      )
    })

    return (
      <div>
        <div class="chat-container">
          <div class="left-container">
            <div class="leftchat-head">
              <div class="navigationbar">
                <ul class="btn-group" style={{ margin: 10 }}>
                  <Link class="btn btn-secondary" to="/StartApp">Message</Link>
                  <Link class="btn btn-secondary" to="/StartApp"> Contact</Link>
                  <Link class="btn btn-secondary" to="/post"> Post</Link>
                </ul>
                <div className="content">
                  <Route exact path="/post" component={Post} />
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
                 <input onChange={this.updateMessage} type="text" placehodler="Message" />
              <br />
              <button onClick={this.sendMessage} >Send message</button>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default ChatRoom;
