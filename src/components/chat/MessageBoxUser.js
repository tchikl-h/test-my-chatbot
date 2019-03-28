import React from 'react';
import './Chat.scss'

export default class MessageBoxUser extends React.Component {

    render() {
  
      return (
  
        <div className="userMessage">
          <div className="userText"> {this.props.text} </div>
        </div>
  
      );
    }
  }