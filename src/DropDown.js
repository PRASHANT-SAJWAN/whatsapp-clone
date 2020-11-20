import React, { Component } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import down_arrow_image from './assets/down-arrow.png';
import './DropDown.css';
import db from './firebase';

class DropDown extends Component {
  // operation on clicking list item
  handleClick = (e, data) => {
    console.log(data.user + ' ' + data.message.name);
    if (data.item === 'Delete' && data.user == data.message.name) {
      const message = data.message;
      const msg = message.message;
      const msg_id = message.message_ID;
      const roomId = data.roomId;
      alert(`${msg} || ${msg_id} || ${roomId}`);

      // remove message from firebase
      var jobskill_query = db.collection('rooms').doc(roomId).collection('messages').where('message_ID','==',msg_id);
      jobskill_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.ref);
          doc.ref.delete();
        });
      });

    }
  };

  render () {
    return (
      <div>
        <ContextMenuTrigger id={this.props.msg.message_ID} >
          <img className="down__arrow" src={down_arrow_image} alt=""/>
        </ContextMenuTrigger>

        <ContextMenu className="dropbtn" id={this.props.msg.message_ID}>
          <MenuItem 
            onClick={this.handleClick} 
            data={{item: "Delete", message: this.props.msg, user: this.props.user ,roomId: this.props.roomId}} 
            className="menuItem">
              Delete
          </MenuItem>
          <MenuItem 
            onClick={this.handleClick} 
            data={{item: "Second Item", message: this.props.msg, user: this.props.user ,roomId: this.props.roomId}} 
            className="menuItem">
              Info
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

export default DropDown;