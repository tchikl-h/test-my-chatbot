import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import ThemeDefault from "../theme-default";
import Data from "../data";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import { loginUser, logoutUser, loginUserWithToken } from "../actions/auth";
import { stopChatbot } from "../actions/chatbotsActions";
import { getUserFilteredById } from "../selectors/usersSelectors";
import { getChatbotsByUser } from "../actions/chatbotsActions";
import SignupPage from "./SignupPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  doSomethingBeforeUnload = () => {
    const {
      dispatch,
      user
    } = this.props;
    for(let i = 0; i < user.chatbotIds.length; i++) {
      dispatch(stopChatbot(user.companyId, user.id, user.chatbotIds[i]));
    }
  }

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
      window.addEventListener("beforeunload", (ev) => {
          ev.preventDefault();
          return this.doSomethingBeforeUnload();
      });
  };

  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    // TODO: currentUser empty
    // console.log(this.props.currentUser)
    dispatch(getChatbotsByUser(this.props.currentUser.companyId, this.props.currentUser.id));
      // Activate the event listener
      this.setupBeforeUnloadListener();
  }

  componentWillMount() {
    const {
      dispatch,
    } = this.props;
    if (localStorage.getItem("token")) {
      dispatch(loginUserWithToken(localStorage.getItem("token")));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    const {
      dispatch,
      isAuthenticated,
      errorMessage,
      user,
      isFetching
    } = this.props;
    const firstName = this.props.user && this.props.user.firstName ? this.props.user.firstName : "";
    const lastName = this.props.user && this.props.user.lastName ? this.props.user.lastName : "";

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 250;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: "80px 20px 20px 15px",
        paddingLeft:
          navDrawerOpen && this.props.width !== SMALL
            ? paddingLeftDrawerOpen
            : 0,

      }
    };
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          {isAuthenticated &&
            !isFetching && (
              <div>
                <Header
                  styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
                    this
                  )}
                />

                <LeftDrawer
                  navDrawerOpen={navDrawerOpen}
                  menus={Data.menus}
                  signOutMenus={Data.signOutMenus}
                  username={`${firstName} ${lastName}`}
                  onLogoutClick={() => dispatch(logoutUser())}
                  user={this.props.user}
                />
z
                <div style={styles.container}>{this.props.children}</div>
              </div>
            )}
          {!isAuthenticated &&
            window.location.href.includes("signup") && (
            <SignupPage
              errorMessage={errorMessage}
              onLoginClick={(user) => dispatch(loginUser(user))}
            />
          )}
          {!isAuthenticated &&
            !window.location.href.includes("signup") && (
            <LoginPage
              errorMessage={errorMessage}
              onLoginClick={(user) => dispatch(loginUser(user))}
            />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
  isFetching: PropTypes.bool
};

/* eslint-disable */
function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user : getUserFilteredById(state, user.id) || {},
    currentUser: user,
    isAuthenticated,
    errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetUpdate: () => dispatch(resetUpdate())
  };
}

export default connect(mapStateToProps)(withWidth()(App));
