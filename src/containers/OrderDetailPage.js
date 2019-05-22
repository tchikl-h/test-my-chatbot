import React, { PropTypes } from "react";
import { Link } from "react-router";
import {
  pink600,
  grey200,
  grey600,
  white
} from "material-ui/styles/colors";
// import Data from '../data';
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import ChatbotBox from "../components/dashboard/ChatbotBox";
import ChatbotActionBox from "../components/dashboard/ChatbotActionBox";
import { getChatbotsByUser, deleteChatbots } from "../actions/chatbotsActions";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import { getUsersByCompany } from "../actions/usersActions";
import { getUserFilteredList } from "../selectors/usersSelectors";

class OrderDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    this.props.getChatbotsByUser(localStorage.getItem("companyId"), localStorage.getItem("userId"));
    this.props.getUsersByCompany(localStorage.getItem("companyId"));
  }

  openDeleteDialog() {
    this.setState({open: true});
  }

  closeDeleteDialog() {
    this.setState({open: false});
  }

  deleteChatbot() {
    this.props.deleteChatbots(this.props.chatbot.id)
    .then(() => {
      this.props.router.push("/orders");
    })
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
      dialog: {
        width: "20%",
        maxWidth: "none",
        minWidth: 300
      }
    };

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
                openDeleteDialog={() => this.openDeleteDialog()}
              />
            </div>
          </div>

          <div className="row" style={{width: 518}}>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
              <ChatbotActionBox
                Icon={require("../assets/img/list-icon.png")}
                title={this.props.chatbot.project_name}
                value="Tests list"
              />
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <Link to={`${window.location.href}/register-test`}>
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
          <Dialog
              title={`Do you want to delete ${this.props.chatbot.project_name}`}
              open={this.state.open}
              contentStyle={styles.dialog}
              ignoreBackdropClick
              ignoreEscapeKeyUp
              maxWidth="xs"
            >
              <div>
                <span>
                  <RaisedButton onClick={() => this.closeDeleteDialog()} color="primary">
                    Cancel
                  </RaisedButton>
                  <RaisedButton onClick={() => this.deleteChatbot()} color="primary">
                    Delete
                  </RaisedButton>
                </span>
              </div>
            </Dialog>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    chatbot: getChatbotFilteredById(state, ownProps.params.id),
    userList: getUserFilteredList(state)
  };
}

export default connect(mapStateToProps, { getChatbotsByUser, deleteChatbots, getUsersByCompany })(OrderDetailPage);
