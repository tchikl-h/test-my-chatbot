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
import Popup from "../components/dashboard/Popup";
import CircularProgress from "material-ui/CircularProgress";
import { getUserFilteredById } from "../selectors/usersSelectors";
import RaisedButton from "material-ui/RaisedButton";
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
      launchTestsButtonDisabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let testList = nextProps.testList;
    for(let i = 0; i < testList.length; i++) {
      const newTest = Object.assign({}, testList[i]);
      newTest['completed'] = false;
      newTest['result'] = -1; // {-1: init, 0: success, 1: error}
      newTest['logs'] = "";
      testList[i] = newTest;
    }
    this.setState({ testList: testList });
  }
  
  componentWillMount() {
    this.props.startChatbot(this.props.user.companyId, this.props.user.id, this.props.chatbot.id);
    socket = io.connect("http://localhost:3000");
    socket.emit('room', `${this.props.user.companyId}-${this.props.chatbot.id}-${this.props.user.id}`);
    console.log(`Entered room ${this.props.user.companyId}-${this.props.chatbot.id}-${this.props.user.id}`);
    socket.on('logs', (test) => this.updateTestList(test));
  }

  componentDidMount() {
    this.props.getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id);
    this.props.getUsersByCompany(this.props.currentUser.companyId);
    this.props.getTestsByChatbot(this.props.params.id);
  }

  updateTestList(data) {
    console.log(data);
    // TODO: tests need to be in the same order as on jasmine
    for(let i = 0; i < this.state.testList.length; i++) {
      if (this.state.testList[i].completed === false) { // next test to be completed
        let testList = this.state.testList;
        testList[i].completed = true;
        testList[i].result = data.test.result;
        testList[i].logs = data.test.logs;
        if (i === this.state.testList.length - 1 && testList[i].result === 0) {
          this.setState({launchTestsButtonDisabled: false});
        }
        else if (testList[i].completed === true && testList[i].result === 1) {
          console.log(testList[i]);
          this.setState({testError: testList[i]});
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

  handleClick(event) {
    event.preventDefault();
    if (this.props.user && this.props.chatbot) {
      this.props.launchChatbot(this.props.user.companyId, this.props.user.id, this.props.chatbot.id)
      .then(() => {
        this.setState({launchTestsButtonDisabled: true});
      });
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
    if (!this.props.routeParams || !this.props.chatbot || !this.props.testList || !this.props.user || !this.props.user.chatbotIds)
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
              <Link to={`/chatbot/${this.props.routeParams.id}/test`}>
                <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
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
                    errorMessage={this.state.testError.logs}
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
    testList: getTestFilteredList(state).sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    }),
    chatbot: getChatbotFilteredById(state, ownProps.params.id),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { startChatbot, getTestsByChatbot, deleteTests, getChatbotsByUser, launchChatbot, getUsersByCompany })(TestListPage);
