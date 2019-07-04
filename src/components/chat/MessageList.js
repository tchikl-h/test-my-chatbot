import React from 'react';
import MessageBoxUser from './MessageBoxUser';
import MessageBoxBot from './MessageBoxBot';
import StatusBox from './StatusBox';
import './Chat.scss'

export default class MessageList extends React.Component {

	render() {

    const listItems = this.props.messagelist.map((message, i) => 
          {
            if(message.type == 'message' && message.user == 0) return (
              <MessageBoxUser key={i} text={message.text} time={message.time} currentuser={message.currentuser} user={message.user} />
            );
            else if (message.type == 'message' && message.user == 5) return (
              <MessageBoxBot key={i} text={message.text} time={message.time} currentuser={message.currentuser} user={message.user} />
            );
            else if (!message.type) return (
              <StatusBox key={i} text={message.text} />
            );
          }
      );

		return (

			<div className="messageList">
				{listItems}
			</div>

		);
	}
}