import React, { PropTypes } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { connect } from "react-redux";
import { getUserFilteredById } from "../../selectors/usersSelectors";
import { getChatbotResponseById, getChatbotLastUpdatedById } from "../../selectors/chatbotsSelectors";
import './Chat.scss'
import { startChatbot, talkChatbot } from "../../actions/chatbotsActions";
import { postTests } from "../../actions/testsActions";
import { postAssertions } from "../../actions/assertionsActions";
import Popup from "../../components/dashboard/Popup";
const io = require("socket.io-client");

let socket;

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messages : [],
      assertion: {
        userInput: "",
        chatbotResponse: "",
        intent: "",
        error: null,
        testId: -1,
      },
      assertions: []
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
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', `${process.env.ADMIN_TOKEN}-${this.props.user.companyId}-${chatbot.id}-${this.props.user.id}`);
    // 3) receive user
    socket.on('send:message:user', this.messageReceive);
    let socketio = io.connect(process.env.API_HOST);
    socketio.on('connect', () => {
      socketio.emit('room', chatbot.id);
    });
    socketio.on('message:talk', this.messageReceivedByBot);
  }

  componentWillUnmount() {
    socket.close();
  }

  handleClose(data, resetState) {
    const {
      chatbot,
    } = this.props;
    
    if (data.isConfirmed === false) {
      this.setState({ open: false });
    }
    else if (data.isConfirmed && chatbot.id && data.name && data.name != "" && data.description && data.description != "") {
      this.props.postTests(data.name, data.description, chatbot.id)
      .then((test) => {
        // TODO: add return value to postTests so we get the id of the test
        this.state.assertions.forEach((assertion, index) => {
          this.props.postAssertions(index, assertion.userInput, assertion.chatbotResponse, assertion.intent, test.id)
        })
        this.setState({ open: false });
        // TODO: check the catch
        let newMessages = this.state.messages;
        newMessages.push( { 'text' : `Test \"${data.name}\" has been added successfully`} );
        this.setState( {messages : newMessages} );
      })
      .catch(err => console.log(err));
    }
    resetState();
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
    let newMessages = this.state.messages;
    let date = new Date;
    this.setState(prevState => ({
      assertion: {
          ...prevState.assertion,
          userInput: data.msg.text
      }
    }));
    this.props.talkChatbot(this.props.user.companyId, this.props.user.id, this.props.chatbot.id, data.msg.text)
    .then(() => {
      if (this.props.chatbotResponse && 
          this.props.chatbotResponse.intent && 
          this.props.chatbotResponse.msg)
      this.messageReceivedByBot(this.props.chatbotResponse);
    });
    newMessages.push(data.msg);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageReceivedByBot(data) {
    let newMessages = this.state.messages;
    this.setState(prevState => ({
      assertion: {
          ...prevState.assertion,
          chatbotResponse: data.msg, // socket this.props.chatbotResponse.msg partie receveuse
          intent: data.intent
      }
    }));
    this.setState(prevState => {
      return prevState.assertions.push(this.state.assertion);
    });
    newMessages.push({
      type : 'message',
      text : data.msg,
      time : 0, // Set by the server
      user : 1, // Set before sending
      currentuser: true
    });
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);
  }

  messageSend(message) {
    // 0) send user
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
          handleClose={(data, resetState) => this.handleClose(data, resetState)}
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

function mapStateToProps(state, ownProps) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, user.id) || {},
    chatbotResponse: getChatbotResponseById(state), // ownProps.chatbot.id
    lastUpdated: getChatbotLastUpdatedById(state), // ownProps.chatbot.id
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { startChatbot, postTests, postAssertions, talkChatbot })(Chat);