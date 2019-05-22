import React from "react";
import {
  grey600,
} from "material-ui/styles/colors";
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import { getChatbotsByUser } from "../actions/chatbotsActions";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import Chat from '../components/chat/Chat';


class OrderRegisterTestPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getChatbotsByUser(localStorage.getItem("companyId"), localStorage.getItem("userId"));
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

    return (
        <div>
          <h3 style={styles.navigation}>Chatbots / {this.props.chatbot.project_name} / register test</h3>
          <Chat/>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    chatbot: getChatbotFilteredById(state, ownProps.params.id)
  };
}

export default connect(mapStateToProps, { getChatbotsByUser })(OrderRegisterTestPage);
