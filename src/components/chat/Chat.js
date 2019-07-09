import React, { PropTypes } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { connect } from "react-redux";
import { getUserFilteredById } from "../../selectors/usersSelectors";
import './Chat.scss'
import { startChatbot } from "../../actions/chatbotsActions";
import { postTests } from "../../actions/testsActions";
import Popup from "../../components/dashboard/Popup";

const io = require("socket.io-client");
let socket;

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messages : []
    };

    this.messageReceive = this.messageReceive.bind(this);
    this.messageReceivedByBot = this.messageReceivedByBot.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  componentWillMount() {
    socket = io.connect(process.env.HOST);
    const {
      chatbot,
    } = this.props;
    this.props.startChatbot(this.props.user.companyId, this.props.user.id, chatbot.id);
    console.log("User : on.connect");
    // Connected, let's sign-up for to receive messages for this room
    console.log("User : emit.room "+this.props.user.companyId+"-"+chatbot.id+"-"+this.props.user.id);
    socket.emit('room', `${this.props.user.companyId}-${chatbot.id}-${this.props.user.id}`);
    // 3) receive user
    socket.on('send:message:user', this.messageReceive);
    // 3) receive bot
    socket.on('send:message:bot', this.messageReceivedByBot);
  }

  componentWillUnmount() {
    console.log("Closing socket !");
    socket.close();
  }

  handleClose(data) {
    const {
      chatbot,
    } = this.props;
    if (data.isConfirmed === false) {
      this.setState({ open: false });
    }
    else if (data.isConfirmed && chatbot.id && data.name && data.name != "" && data.description && data.description != "") {
      this.props.postTests(data.name, data.description, chatbot.id)
      .then(() => {
        this.messageSend({
          type : 'message',
          text : `#SAVE ${data.name}`,
          time : 0, // Set by the server
          user : 1, // Set before sending
          currentuser: true
        });
        this.setState({ open: false });
        // TODO: check the catch
        let newMessages = this.state.messages;
        newMessages.push( { 'text' : `Test \"${data.name}\" has been added successfully`} );
        this.setState( {messages : newMessages} );
      })
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  statusRecord(isRecording) {
    let newMessages = this.state.messages;
    if (isRecording === false)
      newMessages.push( { 'text' : 'The recording has started'} );
    else
      newMessages.push( { 'text' : 'The recording stopped'} );
    this.setState( {messages : newMessages} );
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
        <MessageForm
          onMessageSubmit={this.messageSend} 
          statusRecord={(isRecording) => this.statusRecord(isRecording)}
          openSaveTestDialog={() => this.handleOpen()}
        />
        <Popup
          dialogText={`What is the name of your test ?`}
          handleClose={(data) => this.handleClose(data)}
          open={this.state.open}
          display={true}
        />
      </div>

    );
  }
}

Chat.propTypes = {
  chatbot: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, user.id) || {},
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { startChatbot, postTests })(Chat);