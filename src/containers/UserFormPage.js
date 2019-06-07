import React from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";

import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
import { Card } from "material-ui/Card";
import CircularProgress from "material-ui/CircularProgress";
import { postUsers, patchUsers, getUsersByCompany } from "../actions/usersActions";
import { getUserIsFetching, getUserFilteredById } from "../selectors/usersSelectors";
import { FormsyText, FormsyCheckbox } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
import autoBind from "react-autobind";
import { getChatbotsByCompany } from "../actions/chatbotsActions";
import { getChatbotFilteredList } from "../selectors/chatbotsSelectors";

class UserFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        chatbotIds: [],
        companyOwner: false,
        companyId: localStorage.getItem("companyId")
      }
    };
  }

  componentDidMount() {
    this.props.getUsersByCompany(localStorage.getItem("companyId"));
    this.props.getChatbotsByCompany(localStorage.getItem("companyId"))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.id) {
      this.setState({ isFetching: false });
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }

  handleChange(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const user = Object.assign({}, this.state.user);
      user[field] = event.target.value;
      this.setState({ user: user });
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.user.id) {
      this.props.patchUsers(this.state.user)
      .then(() => {
        this.props.router.push("/users");
      })
    }
    else {
      console.log(this.state.user);
      this.props.postUsers(this.state.user)
      .then(() => {
        this.props.router.push("/users");
      })
    }
  }

  onChangeChatbot(chatbotId) {
    let user = Object.assign({}, this.state.user);
    if (this.state.user && this.state.user.chatbotIds) {
      if (this.state.user.chatbotIds.length > 0 && this.state.user.chatbotIds.includes(chatbotId))
        user.chatbotIds = this.state.user.chatbotIds.filter(id => {return id != parseInt(chatbotId)});
      else {
        user.chatbotIds = this.state.user.chatbotIds;
        user.chatbotIds.push(chatbotId);
      }
    }
    console.log("onChangeChatbot, dealing with: "+chatbotId);
    console.log(user);
    this.setState({user: user})
  }

  render() {
    const { isFetching, user } = this.state;

    const styles = {
      buttons: {
        marginTop: 30,
        float: "right"
      },
      saveButton: {
        marginLeft: 5
      },
      card: {
        width: 120
      }
    };
    if (isFetching) {
      return <CircularProgress />;
    } else {
      return (
        <PageBase title="User" navigation={`Team / ${user.firstName} ${user.lastName}`}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={this.props.user.id ? 300 : 450}>
              <GridTile>
                <FormsyText
                  hintText="First Name"
                  floatingLabelText="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={user.firstName ? user.firstName : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid first name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                />

                <FormsyText
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                  fullWidth={true}
                  name="lastName"
                  onChange={this.handleChange}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid first name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  value={user.lastName ? user.lastName : ""}
                />
                {
                  !this.props.user.id && (
                  <div>
                    <FormsyText
                      hintText="Username"
                      floatingLabelText="username"
                      fullWidth={true}
                      name="userName"
                      onChange={this.handleChange}
                      validationErrors={{
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      value={user.userName ? user.userName : ""}
                    />

                    <FormsyText
                      hintText="Password"
                      floatingLabelText="Password"
                      fullWidth={true}
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      validationErrors={{
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      value={user.password ? user.password : ""}
                    />
                  </div>
                  )
                }
                {
                  this.props.chatbotList.map(chatbot => (
                    <FormsyCheckbox
                    label={chatbot.project_name}
                    onChange={() => this.onChangeChatbot(chatbot.id)}
                    name="chatbotIds" // TODO: to change
                    defaultChecked={user.id ? user.chatbotIds.includes(chatbot.id) : false}
                    validationErrors={{
                      isDefaultRequiredValue: "This is a required field"
                    }}
                  />
                  ))
                }
              </GridTile>

              <GridTile>
                {user &&
                  user.avatar && (
                    <Card style={styles.card}>
                      <img width={100} src={user.avatar} />
                    </Card>
                  )}
              </GridTile>
            </GridList>
            <Divider />

            <div style={styles.buttons}>
              <Link to="/users">
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
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUserFilteredById(state, ownProps.params.id) || {},
    isFetching: getUserIsFetching(state),
    chatbotList: getChatbotFilteredList(state),
  };
}

export default connect(mapStateToProps, { getUsersByCompany, postUsers, patchUsers, getChatbotsByCompany})(UserFormPage);
