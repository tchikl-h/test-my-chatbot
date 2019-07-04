import React from "react";
import { Link } from "react-router";
import {
  grey200,
  grey600,
} from "material-ui/styles/colors";
// import Data from '../data';
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import ChatbotBox from "../components/dashboard/ChatbotBox";
import ChatbotActionBox from "../components/dashboard/ChatbotActionBox";
import { getChatbotsByUser, deleteChatbots } from "../actions/chatbotsActions";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import { getUsersByCompany } from "../actions/usersActions";
import { getUserFilteredList, getUserFilteredById } from "../selectors/usersSelectors";
import Popup from "../components/dashboard/Popup";
import CircularProgress from "material-ui/CircularProgress";

class ChatbotDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
    this.props.getUsersByCompany(this.props.currentUser.companyId);
  }

  handleClose(data) {
    this.setState({ open: false });
    if (data.isConfirmed && this.props.chatbot.id) {
      this.props.deleteChatbots(this.props.chatbot.id)
      .then(() => {
        this.props.router.push("/chatbots");
      })
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  render() {

    const styles = {
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: "block"
      }
    };
    if (!this.props.user || !this.props.chatbot || !this.props.userList)
      return <CircularProgress />;
    else
      return (
          <div>
            <h3 style={styles.navigation}>Chatbots / {this.props.chatbot.project_name}</h3>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 ">
                <ChatbotBox
                  color={grey200}
                  title={this.props.chatbot.project_name}
                  value={this.props.chatbot.description}
                  userList={this.props.userList}
                  chatbot={this.props.chatbot}
                  user={this.props.user}
                  openDeleteDialog={() => this.handleOpen()}
                />
              </div>
            </div>

            <div className="row" style={{width: 518}}>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <Link to={`${window.location.href}/tests`}>
                  <ChatbotActionBox
                    Icon={require("../assets/img/list-icon.png")}
                    title={this.props.chatbot.project_name}
                    value="Tests list"
                  />
                </Link>
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <Link to={`${window.location.href}/test`}>
                  <ChatbotActionBox
                    Icon={require("../assets/img/chat-icon.png")}
                    title={this.props.chatbot.project_name}
                    value="Register test"
                  />
                </Link>
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <ChatbotActionBox
                  Icon={require("../assets/img/log-icon.png")}
                  title={this.props.chatbot.project_name}
                  value="Logs"
                />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <ChatbotActionBox
                  Icon={require("../assets/img/git-icon.png")}
                  title={this.props.chatbot.project_name}
                  value="Versioning"
                />
              </div>
            </div>
            
            <Popup
              dialogText={`Do you want to delete the chatbot ${this.props.chatbot.project_name} ?`}
              handleClose={(data) => this.handleClose(data)}
              open={this.state.open}
              display={false}
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
    userList: getUserFilteredList(state),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getChatbotsByUser, deleteChatbots, getUsersByCompany })(ChatbotDetailPage);
