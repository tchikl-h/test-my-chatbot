import React from "react";
import {
  grey600,
} from "material-ui/styles/colors";
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import { getChatbotsByUser } from "../actions/chatbotsActions";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import Chat from '../components/chat/Chat';
import CircularProgress from "material-ui/CircularProgress";
import { getUserFilteredById } from "../selectors/usersSelectors";

class ChatbotRegisterTestPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
  }

  render() {
    const styles = {
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: "block"
      },
    };
    if (!this.props.chatbot)
      return <CircularProgress />;
    else
      return (
          <div>
            <h3 style={styles.navigation}>Chatbots / {this.props.chatbot.project_name} / register test</h3>
            <Chat
            chatbot={this.props.chatbot}
            />
          </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, user.id) || {},
    currentUser: user,
    chatbot: getChatbotFilteredById(state, ownProps.params.id),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getChatbotsByUser })(ChatbotRegisterTestPage);
