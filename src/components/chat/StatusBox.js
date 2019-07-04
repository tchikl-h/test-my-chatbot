import React from 'react';
import './Chat.scss'

export default class StatusBox extends React.Component {

    render() {
  
      return (
  
        <div className="statusBox">
          {this.props.text}
        </div>
  
      );
    }
}