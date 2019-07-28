import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";

import { FormsyText } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
import CircularProgress from "material-ui/CircularProgress";
import autoBind from "react-autobind";
import { getChatbotsByUser, postChatbots, patchChatbots } from "../actions/chatbotsActions";
import { getChatbotFilteredById, getChatbotIsFetching } from "../selectors/chatbotsSelectors";
import { getCompanies } from "../actions/companiesActions";
import { getCompanyById } from "../selectors/companiesSelectors";
import { getChatbotFilteredByUserList } from "../selectors/chatbotsSelectors";

class ChatbotFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false, // fetching :id of the chatbot if exists
      chatbot: {
        companyId: this.props.currentUser.companyId
      }
    };
  }

  componentDidMount() {
    this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
    this.props.getCompanies();
  }

  componentWillReceiveProps(nextProps) {
    // detect if fetching of not
    if (nextProps.chatbot && nextProps.chatbot.id) {
      this.setState({ isFetching: false });
      this.setState({ chatbot: Object.assign({}, nextProps.chatbot) });
    }
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.chatbot.id) {
      this.props.patchChatbots(this.state.chatbot)
      .then(() => {
        this.props.router.push("/chatbots");
      });
    }
    else {
      this.props.postChatbots(this.state.chatbot)
      .then(() => {
        this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
        this.props.router.push("/chatbots");
      })
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  handleChange(event, date) {
    const field = event ? event.target.name : null;
    const { chatbot } = this.state;

    if (chatbot) {
      if (typeof date === "object") {
        let chatbot = Object.assign({}, chatbot);
        this.setState({ chatbot: chatbot });
        this.enableButton();
      } else if (event && event.target && field) {
        let _chatbot = Object.assign({}, chatbot);
        _chatbot[field] = event.target.value;
        this.setState({ chatbot: _chatbot });
        this.enableButton();
      }
    }
  }

  render() {
    const {
      errorMessage,
    } = this.props;

    const { isFetching, chatbot } = this.state;

    const styles = {
      buttons: {
        marginTop: 30,
        float: "right"
      },
      saveButton: {
        marginLeft: 5
      }
    };
    if (isFetching || !this.props.company) {
      return <CircularProgress />;
    } else if (this.props.currentUser.companyOwner !== true || !this.props.routeParams.id && this.props.company.premium === false && this.props.chatbotList.length > 0) {
      return (
        <PageBase title="Chatbot" navigation="Chatbots / creation">
        <p>You don't have the permission to edit this chatbot or to create a new one</p>
        </PageBase>
      )
    } else {
      return (
        <PageBase title="Chatbot" navigation="Chatbots / creation" height={"100%"} width={"60%"}>
          <Formsy.Form
            onValid={this.enableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cols={1} cellHeight={70}>
              <GridTile>
                <FormsyText
                  hintText="My awesome chatbot"
                  floatingLabelText="Name"
                  name="project_name"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.project_name
                      ? chatbot.project_name
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="A great description"
                  floatingLabelText="Description"
                  name="description"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.description
                      ? chatbot.description
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile>

              {/* <GridTile>
                <FormsyText
                  hintText="Dialogflow, watson, fbDirect..."
                  floatingLabelText="Container mode"
                  name="container_mode"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.container_mode
                      ? chatbot.container_mode
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid container mode",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile> */}

              <GridTile>
                <FormsyText
                  hintText="567898765"
                  floatingLabelText="Dialogflow project ID"
                  name="dialogflow_project_id"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.dialogflow_project_id
                      ? chatbot.dialogflow_project_id
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="john@doe.com"
                  floatingLabelText="Dialogflow client email"
                  name="dialogflow_client_email"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.dialogflow_client_email
                      ? chatbot.dialogflow_client_email
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile>

              <GridTile>
                <FormsyText
                  hintText="5tuG2IUAG5sAlkay8tjG7"
                  floatingLabelText="Dialogflow private key"
                  name="dialogflow_private_key"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={
                    chatbot.dialogflow_private_key
                      ? chatbot.dialogflow_private_key
                      : ""
                  }
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />
              </GridTile>
            </GridList>

            <div style={styles.buttons}>
              <Link to={this.state.chatbot.id ? `/chatbot/${this.state.chatbot.id}` : "/chatbots"}>
                <RaisedButton label="Cancel" />
              </Link>

              <RaisedButton
                label="Save"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

ChatbotFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  chatbot: PropTypes.array,
  patchChatbots: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    currentUser: user || {},
    chatbot: getChatbotFilteredById(state, ownProps.params.id) || {},
    company: getCompanyById(state, user.companyId),
    chatbotList: getChatbotFilteredByUserList(state).sort(function(a, b){
      if(a.firstName < b.firstName) { return -1; }
      if(a.firstName > b.firstName) { return 1; }
      return 0;
    }),
    isFetching: getChatbotIsFetching(state),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getChatbotsByUser, postChatbots, patchChatbots, getCompanies })(ChatbotFormPage);
