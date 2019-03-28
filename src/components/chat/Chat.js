import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './Chat.scss'

let socket = require('socket.io-client')('https://mobilier-restaurant-bretagne.com');

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages : [], userid : 0, users : 0};

    this.userAccept = this.userAccept.bind(this);
    this.userJoin = this.userJoin.bind(this);
    this.userLeft = this.userLeft.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
    this.messageReceivedByBot = this.messageReceivedByBot.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  componentDidMount() {
    socket.emit('user:request');
    socket.on('user:accept', this.userAccept);
    socket.on('user:join', this.userJoin);
    socket.on('user:left', this.userLeft);
    // 3) receive user
    socket.on('send:message', this.messageReceive);
    // 3) receive bot
    socket.on('send:message:bot', this.messageReceivedByBot);
  }

  componentWillUnmount() {
    socket.emit('user:left');
  }

  userAccept(msg) {
    this.setState({ userid : msg.id });
    this.setState({ users : msg.users });

    let newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'you joined', 'count' : msg.users} );
    this.setState( {messages : newMessages} );
  }

  userJoin() {
    this.setState((prevState) => ({ users: prevState.users + 1 }));

    let newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'someone joined', 'count' : this.state.users} );
    this.setState( {messages : newMessages} );
  }

  userLeft() {
    this.setState((prevState) => ({ users: prevState.users - 1 }));

    let newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'someone left', 'count' : this.state.users} );
    this.setState( {messages : newMessages} );
  }

  messageReceive(msg) {
    let newMessages = this.state.messages;
    newMessages.push(msg);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageReceivedByBot(msg) {
    let newMessages = this.state.messages;
    newMessages.push(msg);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageSend(message) {
    message.user = this.state.userid;
    // 0) send user
    socket.emit('send:message', message);
  }

  render() {
    return (

      <div>
        <div className="heading">React-Chat</div>
        <hr />
        <MessageList messagelist={this.state.messages} />
        <MessageForm onMessageSubmit={this.messageSend} />
      </div>

    );
  }
}
