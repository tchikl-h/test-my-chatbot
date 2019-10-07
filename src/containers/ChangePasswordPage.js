import React from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";

import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
import CircularProgress from "material-ui/CircularProgress";
import { postUsers, patchUsers, getUsersByCompany } from "../actions/usersActions";
import { getUserIsFetching, getUserFilteredById } from "../selectors/usersSelectors";
import { FormsyText } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
import autoBind from "react-autobind";
import { getChatbotsByCompany } from "../actions/chatbotsActions";
import { getChatbotFilteredByCompanyList } from "../selectors/chatbotsSelectors";

class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      user: {
        id: this.props.currentUser.id,
        password: "",
        repassword: "",
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
    } else {
      return (
        <PageBase title="Password" navigation={`Change password / ${user.firstName} ${user.lastName}`} height={"100%"} width={"46%"}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={230}>
              <GridTile style={{width: "1000px"}}>
                <div style={styles.container}>
                  <div style={styles.leftBlock}>
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
                </div>
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

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, user.id) || {},
    isFetching: getUserIsFetching(state),
    chatbotList: getChatbotFilteredByCompanyList(state),
    isAuthenticated,
    errorMessage,
    currentUser: user
  };
}

export default connect(mapStateToProps, { getUsersByCompany, postUsers, patchUsers, getChatbotsByCompany})(ChangePasswordPage);
