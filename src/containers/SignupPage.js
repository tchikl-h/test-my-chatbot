import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { grey500, white } from "material-ui/styles/colors";
// import Card, { CardHeader, CardMedia, CardContent, CardActions } from "material-ui/Card";
import { Link } from "react-router";
import autoBind from "react-autobind";
import ThemeDefault from "../theme-default";
import { FormsyText } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
import { connect } from "react-redux";
import { getUsers } from "../actions/usersActions";
import { loginUserWithToken } from "../actions/auth";
import { getUserList, getUserIsFetching } from "../selectors/usersSelectors";
import { postCompanies } from "../actions/companiesActions";
import { postUsers } from "../actions/usersActions";

class SignupPage extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this);

    this.state = {
      canSubmit: false,
      company: {
          companyName: "",
          companyDescription: ""
      },
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        chatbotIds: [],
        companyOwner: true,
        companyId: -1
      },
      repassword: "",
      formError: "",
      errorMessage: props.errorMessage,
      styles: {
        paperStyle: {
          width: 300,
          margin: "auto",
          padding: 20
        },
        switchStyle: {
          marginBottom: 16
        },
        submitStyle: {
          marginTop: 32
        }
      }
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.handleChangeUser = this.handleChangeUser.bind(this);
    // this.handleChangeCompany = this.handleChangeCompany.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleClick(event) {
    event.preventDefault();
    this.props.postCompanies(this.state.company.companyName, this.state.company.companyDescription)
    .then((company) => {
        let user = Object.assign({}, this.state.user);
        user.companyId = company.id;
        this.props.postUsers(user)
        .then((user) => {
          this.props.onLoginClick(user);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  handleChangeUser(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const user = Object.assign({}, this.state.user);
      user[field] = event.target.value;
      this.setState({ user: user });
    }
  }

  handleChangeCompany(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const company = Object.assign({}, this.state.company);
      company[field] = event.target.value;
      this.setState({ company: company });
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

  render() {
    const styles = {
      loginContainer: {
        marginTop: "10%",
        marginLeft: "30%"
        // minWidth: 320,
        // maxWidth: 400,
        // height: "auto",
        // position: "absolute",
        // top: "20%",
        // left: 0,
        // right: 0,
        // margin: "auto"
      },
      formHeader: {
        color: "blue",
        fontColor: "navy",
        fontSize: 20,
        maxWidth: 500
      },
      subHeader: {
        color: "navy",
        fontColor: "navy",
        fontSize: 16,
        maxWidth: 500
      },
      paper: {
        padding: 20,
        height: "100%",
        width: "750px",
        overflow: "auto"
      },
      buttonsDiv: {
        textAlign: "center",
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: "left",
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      btn: {
        background: "#4f81e9",
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: "#4f81e9"
      },
      btnGoogle: {
        background: "#e14441"
      },
      btnSpan: {
        marginLeft: 5
      },
      container: {
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

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <p style={styles.formHeader}>Test my chatbot</p>
              <p style={styles.subHeader}>Sign up</p>
              <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.handleClick}
                onInvalidSubmit={this.notifyFormError}
              >
                <div style={styles.container}>
                  <div style={styles.leftBlock}>
                    <FormsyText
                      hintText="First Name"
                      floatingLabelText="First Name"
                      name="firstName"
                      onChange={this.handleChangeUser}
                      fullWidth={true}
                      value={this.state.user.firstName ? this.state.user.firstName : ""}
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
                      hintText="Last Name"
                      floatingLabelText="Last Name"
                      fullWidth={true}
                      name="lastName"
                      onChange={this.handleChangeUser}
                      validations={{
                        isWords: true
                      }}
                      validationErrors={{
                        isWords: "Please provide valid first name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      value={this.state.user.lastName ? this.state.user.lastName : ""}
                      required
                    />
                     {/* TODO: verify if username not already taken */}
                    <FormsyText
                        hintText="Username"
                        floatingLabelText="Username"
                        fullWidth={true}
                        name="userName"
                        onChange={this.handleChangeUser}
                        validationErrors={{
                        isDefaultRequiredValue: "This is a required field"
                        }}
                        value={this.state.user.userName ? this.state.user.userName : ""}
                        required
                    />
                  </div>
                  <div style={styles.rightBlock}>
                    <FormsyText
                      hintText="Password"
                      ref="password"
                      name="password"
                      onChange={this.handleChangeUser}
                      value={this.state.user.password ? this.state.user.password : ""}
                      floatingLabelText="Password"
                      fullWidth={true}
                      type="password"
                      validations={{
                        minLength: 3
                      }}
                      validationErrors={{
                        minLength: "Please provide a valid password",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      required
                    />
                    <FormsyText
                      hintText="Password"
                      ref="repassword"
                      name="repassword"
                      value={this.state.repassword ? this.state.repassword : ""}
                      floatingLabelText="Confirm password"
                      fullWidth={true}
                      type="password"
                      validationError='Passwords do not match'
                      validations={{
                        minLength: 3,
                        equalsField: 'password'
                      }}
                      validationErrors={{
                        minLength: "Please provide a valid password",
                        equalsField: "Passwords do not match",
                        isDefaultRequiredValue: "This is a required field",
                      }}
                      required
                    />
                    <FormsyText
                      ref="companyName"
                      name="companyName"
                      onChange={this.handleChangeCompany}
                      value={this.state.company.name ? this.state.company.name : ""}
                      floatingLabelText="Company name"
                      fullWidth={true}
                      validationErrors={{
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Link to="/dashboard">
                    <RaisedButton
                        label="Validate"
                        primary={true}
                        type="button"
                        onClick={() => this.handleClick(event)}
                        style={styles.loginBtn}
                        disabled={!this.state.canSubmit}
                    />
                  </Link>
                  <Link to="/">
                    <RaisedButton
                        label="Cancel"
                        primary={true}
                        type="button"
                        style={styles.loginBtn}
                    />
                  </Link>
                </div>
                <div>
                  {this.state.errorMessage && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                  )}
                </div>
              </Formsy.Form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignupPage.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    userList: getUserList(state),
    isFetching: getUserIsFetching(state),
  };
}

export default connect(mapStateToProps, { getUsers, loginUserWithToken, postCompanies, postUsers })(SignupPage);
