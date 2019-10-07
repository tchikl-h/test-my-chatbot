import React from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
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
import { getChatbotFilteredByCompanyList } from "../selectors/chatbotsSelectors";

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
        mail: "",
        repassword: "",
        chatbotIds: [],
        companyOwner: false,
        companyId: this.props.currentUser.companyId
      }
    };
  }

  componentDidMount() {
    this.props.getUsersByCompany(this.props.currentUser.companyId);
    this.props.getChatbotsByCompany(this.props.currentUser.companyId)
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
      .catch(err => console.log(err));
    }
    else {
      this.props.postUsers(this.state.user)
      .then(() => {
        this.props.router.push("/users");
      })
      .catch(err => console.log(err));
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
      },
      container: {
        width: "100%",
        margin: "auto",
        padding: 5
      },
      leftBlock: {
        float: "left",
        width: "300px",
      },
      rightBlock: {
        width: "300px",
        marginLeft: "350px"
      } 
    };
    if (isFetching) {
      return <CircularProgress />;
    } else if (this.props.user.companyOwner !== true && this.props.routeParams.id != this.props.user.id) {
      return (
        <PageBase title="User" navigation={`Team / ${user.firstName} ${user.lastName}`}>
        <p>You don't have the permission to edit this user</p>
        </PageBase>
      )
    } else {
      return (
        <PageBase title="User" navigation={`Team / ${user.firstName} ${user.lastName}`} height={"100%"} width={"46%"}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={!this.props.user.id ? 430 : 330}>
              <GridTile style={{width: "1000px"}}>
                <div style={styles.container}>
                  <div style={styles.leftBlock}>
                    <FormsyText
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
                      required
                    />

                    <FormsyText
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
                      required
                    />

                    <FormsyText
                      floatingLabelText="Email"
                      fullWidth={true}
                      name="mail"
                      onChange={this.handleChange}
                      validations={{ matchRegexp: /^.+@.+\..+$/ }}
                      validationErrors={{
                        matchRegexp: "Please provide valid email",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      value={user.mail ? user.mail : ""}
                      required
                    />

                    {
                      // TODO: verify if username not already taken
                    !this.props.user.id && (
                      <div>
                        <FormsyText
                          floatingLabelText="Username"
                          fullWidth={true}
                          name="userName"
                          onChange={this.handleChange}
                          validationErrors={{
                            isDefaultRequiredValue: "This is a required field"
                          }}
                          value={user.userName ? user.userName : ""}
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={styles.rightBlock}>
                      {
                        !this.props.user.id && (
                          <div>
                            <FormsyText
                              floatingLabelText="Password"
                              fullWidth={true}
                              name="password"
                              type="password"
                              onChange={this.handleChange}
                              validations={{
                                minLength: 3
                              }}
                              validationErrors={{
                                minLength: "Please provide a valid password",
                                isDefaultRequiredValue: "This is a required field"
                              }}
                              value={user.password ? user.password : ""}
                              required
                            />

                            <FormsyText
                              floatingLabelText="Confirm password"
                              fullWidth={true}
                              name="repassword"
                              type="password"
                              onChange={this.handleChange}
                              validationError='Passwords do not match'
                              validations={{
                                minLength: 3,
                                equalsField: 'password'
                              }}
                              validationErrors={{
                                minLength: "Please provide a valid password",
                                equalsField: "Passwords do not match",
                                isDefaultRequiredValue: "This is a required field"
                              }}
                              value={user.repassword ? user.repassword : ""}
                              required
                            />
                          </div>
                        )
                      }
                    </div>
                    {
                      this.props.currentUser.companyOwner === true && this.props.chatbotList.map(chatbot => (
                        <div style={styles.rightBlock}>
                          <FormsyCheckbox
                            label={chatbot.project_name}
                            onChange={() => this.onChangeChatbot(chatbot.id)}
                            name="chatbotIds" // TODO: to change
                            defaultChecked={user.id ? user.chatbotIds.includes(chatbot.id) : false}
                            validationErrors={{
                              isDefaultRequiredValue: "This is a required field"
                            }}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
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
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, ownProps.params.id) || {},
    isFetching: getUserIsFetching(state),
    chatbotList: getChatbotFilteredByCompanyList(state),
    isAuthenticated,
    errorMessage,
    currentUser: user
  };
}

export default connect(mapStateToProps, { getUsersByCompany, postUsers, patchUsers, getChatbotsByCompany})(UserFormPage);
