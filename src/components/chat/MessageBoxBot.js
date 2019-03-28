import React from 'react';
import './Chat.scss'

export default class MessageBoxBot extends React.Component {

    render() {
  
      return (
  
        <div>
          <div className="messageText"> {this.props.text} </div>
        </div>
  
      );
    }
  }