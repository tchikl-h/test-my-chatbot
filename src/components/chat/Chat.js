import React, { PropTypes } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './Chat.scss'

const io = require("socket.io-client");
let socket;

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages : []};

    this.messageReceive = this.messageReceive.bind(this);
    this.messageReceivedByBot = this.messageReceivedByBot.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  componentWillMount() {
    socket = io.connect("http://localhost:3000");
    const {
      chatbot,
    } = this.props;
    console.log("User : on.connect");
    // Connected, let's sign-up for to receive messages for this room
    console.log("User : emit.room "+localStorage.getItem("companyId")+"-"+chatbot.id+"-"+localStorage.getItem("userId"));
    socket.emit('room', `${localStorage.getItem("companyId")}-${chatbot.id}-${localStorage.getItem("userId")}`);
    // 3) receive user
    socket.on('send:message:user', this.messageReceive);
    // 3) receive bot
    socket.on('send:message:bot', this.messageReceivedByBot);
  }

  componentWillUnmount() {
    console.log("Closing socket !");
    socket.close();
  }

  messageReceive(data) {
    console.log("User : on.send:message:user");
    console.log(data.msg);
    let newMessages = this.state.messages;
    newMessages.push(data.msg);
    // newMessages.push(data);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageReceivedByBot(data) {
    console.log("User : on.send:message:bot");
    console.log(data.msg);
    let newMessages = this.state.messages;
    newMessages.push(data.msg);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageSend(message) {
    // 0) send user
    console.log("User : emit.send:message:user")
    socket.emit('send:message:user', {
      msg: message
    });
  }

  render() {
    const {
      chatbot,
    } = this.props;
    // this.establishCommunication();
    return (

      <div>
        <div className="heading">{chatbot.project_name}</div>
        <hr />
        <MessageList messagelist={this.state.messages} />
        <MessageForm onMessageSubmit={this.messageSend} />
      </div>

    );
  }
}

Chat.propTypes = {
  chatbot: PropTypes.object,
};