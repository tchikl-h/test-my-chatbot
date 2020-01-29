import React from "react";
import { Link } from "react-router";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  pink500,
  grey600,
  grey200,
} from "material-ui/styles/colors";
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import TestBox from "../components/dashboard/TestBox";
import ErrorBox from "../components/dashboard/ErrorBox";
import { getTestFilteredList } from "../selectors/testsSelectors";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import { getChatbotsByUser, launchChatbot, startChatbot } from "../actions/chatbotsActions";
import { getUsersByCompany } from "../actions/usersActions";
import { getTestsByChatbot, deleteTests } from "../actions/testsActions"
import { postLogs } from "../actions/logsActions"
import Popup from "../components/dashboard/Popup";
import CircularProgress from "material-ui/CircularProgress";
import { getUserFilteredById } from "../selectors/usersSelectors";
import RaisedButton from "material-ui/RaisedButton";
import { getCompanies } from "../actions/companiesActions";
import { getCompanyById } from "../selectors/companiesSelectors";
import { getAssertionsByTest } from "../actions/assertionsActions";
const io = require("socket.io-client");
let socket;

class TestListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      id: 0,
      testList: [],
      testError: null,
      launchTestsButtonDisabled: false,
      testLaunchedAtLeastOnce: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({testLaunchedAtLeastOnce: false});
    this.setState({ testList: nextProps.testList });
  }
  
  componentWillMount() {
    this.props.getCompanies();
    this.props.startChatbot(this.props.user.companyId, this.props.user.id, this.props.chatbot.id);
    socket = io.connect(process.env.HOST);
    socket.emit('room', `${process.env.ADMIN_TOKEN}-${this.props.user.companyId}-${this.props.chatbot.id}-${this.props.user.id}`);
    // socket.on('logs', (test) => this.updateTestList(test));
  }

  componentDidMount() {
    this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
    this.props.getUsersByCompany(this.props.currentUser.companyId);
    this.props.getTestsByChatbot(this.props.params.id);
  }

  resetTestList() {
    let testList = this.props.testList;
    for(let i = 0; i < testList.length; i++) {
      const newTest = Object.assign({}, testList[i]);
      newTest['completed'] = false;
      newTest['result'] = -1; // {-1: init, 0: success, 1: error}
      newTest['logs'] = "";
      testList[i] = newTest;
    }
    this.setState({ testList: testList });
    this.setState({testError: null});
  }

  updateTestList(data) {
    // TODO: tests need to be in the same order as on jasmine
    for(let i = 0; i < this.state.testList.length; i++) {
      if (this.state.testList[i].completed === false) { // next test to be completed
        let testList = this.state.testList;
        testList[i].completed = true;
        testList[i].result = data.test.result;
        testList[i].logs = data.test.logs;
        if (i === this.state.testList.length - 1) {
          this.setState({launchTestsButtonDisabled: false});
        }
        if (testList[i].completed === true && testList[i].result === 1) {
          this.setState({testError: testList[i]});
          // this.props.postLogs(data.test.logs, "0/0", this.props.chatbot.id);
        }
        this.setState({ testList: testList });
        return;
      }
    }
  }

  handleClose(data) {
    this.setState({ open: false });
    if (data.isConfirmed && this.state.id && this.props.currentUser) {
      this.props.deleteTests(this.props.currentUser.id, this.state.id)
      .then(() => {
        this.props.getTestsByChatbot(this.props.params.id);
      })
      .catch(err => console.log(err));
      this.setState({ id: null });
    }
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleOpen(id) {
    this.setState({ open: true });
    this.setState({ id: id });
  }

  findErrorThroughAssertions(test, chatbotId) {
    this.props.getAssertionsByTest(test.id)
    .then((assertions) => {
      for (const assertion of assertions) {
        if (assertion.error !== null) {
          test.error = assertion.error;
          this.setState({testError: test});
          // this.props.postLogs(test.error, "0/0", chatbotId);
        }
      }
    })
    .catch(err => console.log(err));
  }

  handleClick(event) {
    event.preventDefault();
    if (this.props.user && this.props.chatbot) {
      this.setState({launchTestsButtonDisabled: true});
      this.setState({testLaunchedAtLeastOnce: true});
        this.props.launchChatbot(this.props.user.companyId, this.props.user.id, this.props.chatbot.id, 1)
        .then((tests) => {
          tests.forEach((test) => {
            if (test.error !== false) {
              this.findErrorThroughAssertions(test, this.props.chatbot.id);
            }
            else if (this.state.testError) {
              this.state.testError = null;
            }
          })
          this.setState({testList: tests});
          this.setState({launchTestsButtonDisabled: false});
        })
        .catch(err => console.log(err));
    }
  }

  render() {  

    const styles = {
      fab: {
        // margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20
      },
      back: {
        // margin: 0,
        top: "auto",
        bottom: 20,
        right: "auto",
        position: "fixed",
        marginLeft: 20
      },
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: "block"
      },
      container: {
        width: "80%",
        height: "200px",
        margin: "auto",
        padding: "10px",
      },
      leftBlock: {
        float: "left",
        width: "800px",
        height: "400px",
      },
      rightBlock: {
        width: "300px",
        height: "400px",
        marginLeft: "830px"
      }
    };
    if (!this.props.routeParams || !this.props.chatbot || !this.props.testList || !this.props.user || !this.props.user.chatbotIds || !this.props.company)
      return <CircularProgress />;
    else if (!this.props.user.chatbotIds.includes(parseInt(this.props.routeParams.id))) {
      return (
        <div>
          <h3 style={styles.navigation}>Chatbots / {this.props.chatbot.project_name} / Tests</h3>
          <p>You don't have the permission for this chatbot</p>
        </div>
      )
    }
    else
      return (
          <div>
            <h3 style={styles.navigation}>Chatbots / {this.props.chatbot.project_name} / Tests</h3>
            {
              <div>
                {/* <FloatingActionButton style={styles.back} backgroundColor={grey400} onClick={() => this.props.router.goBack()}>
                  <Back />
                </FloatingActionButton> */}

                <Link to={this.props.company.premium === false && this.props.testList.length > 9 ? "/subscribe" : `/chatbot/${this.props.routeParams.id}/test`}>
                  <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
                    <ContentAdd />
                  </FloatingActionButton>
                </Link>
              </div>
            }
            <section class="container">
              <div style={styles.leftBlock}>
                <div className="row">
                {
                  this.state.testList.map(test => (
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
                          <TestBox
                            color={grey200}
                            test={test}
                            chatbotId={this.props.routeParams.id}
                            onDelete={(id) => this.onDelete(id)}
                            testLaunchedOnce={this.state.testLaunchedAtLeastOnce}
                            testLaunched={this.state.launchTestsButtonDisabled}
                          />
                      </div>
                ))}
                </div>
                <RaisedButton
                    label="Launch tests"
                    type="button"
                    onClick={() => this.handleClick(event)}
                    primary={true}
                    disabled={this.state.launchTestsButtonDisabled}
                  />
              </div>
              <div style={styles.rightBlock}>
                {
                  this.state.testError && 
                  <ErrorBox
                    className={styles.errorMessage}
                    color={grey200}
                    chatbotId={this.props.routeParams.id}
                    testName={this.state.testError.name}
                    errorMessage={this.state.testError.error}
                  />
                }
              </div>
            </section>
            <Popup
              dialogText={`Do you want to delete this test ?`}
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
    company: getCompanyById(state, user.companyId),
    testList: getTestFilteredList(state),
    chatbot: getChatbotFilteredById(state, ownProps.params.id),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { startChatbot, getTestsByChatbot, deleteTests, getChatbotsByUser, launchChatbot, getUsersByCompany, getCompanies, postLogs, getAssertionsByTest })(TestListPage);
