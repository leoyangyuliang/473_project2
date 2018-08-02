import React, { Component } from "react";
import PropTypes from 'prop-types';

class PopUpWindow extends React.Component {
  updateGroupName(e){
    window.groupName=e.target.value;
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <input type="text" id="chatRoomName" class="form-control" placeholder="Enter Chat Room Name"
          onChange={(e) => this.updateGroupName(e)}  />
        <button class="pop-create-btn" onClick={this.props.callback}>Create Chat</button>
        <button class="pop-close-btn" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }

  // render() {
  //     return (
  //       <div>
  //         <div>
  //           <h1 class="PopUpWindow-header">{this.props.text}</h1>
  //         <input type="text" id="chatRoomName" class="form-control" placeholder="Enter Chat Room Name"
  //         onChange={(e) => this.updateGroupName(e)}  />
  //         <button onClick={this.props.onClose}>Create Chat</button>
  //         </div>
  //       </div>
  //     );
  //   }
}

export default PopUpWindow;
