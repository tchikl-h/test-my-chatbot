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
import { getTestFilteredList } from "../selectors/testsSelectors";
import { getChatbotFilteredById } from "../selectors/chatbotsSelectors";
import { getChatbotsByUser } from "../actions/chatbotsActions";
import { getTestsByChatbot, deleteTests } from "../actions/testsActions"
import Popup from "../components/dashboard/Popup";

class TestListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      id: 0
    };
  }
  
  componentDidMount() {
    this.props.getChatbotsByUser(localStorage.getItem("companyId"), localStorage.getItem("userId"));
    this.props.getTestsByChatbot(this.props.params.id);
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });
    if (isConfirmed && this.state.id) {
      this.props.deleteTests(this.state.id)
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
      }
    };

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
          <div className="row">
          {
            this.props.testList.map(test => (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
                    <TestBox
                      color={grey200}
                      test={test}
                      chatbotId={this.props.routeParams.id}
                      onDelete={(id) => this.onDelete(id)}
                    />
                </div>
          ))}
          </div>
          <Popup
            dialogText={`Do you want to delete this test ?`}
            handleClose={(isConfirmed) => this.handleClose(isConfirmed)}
            open={this.state.open}
          />
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    testList: getTestFilteredList(state),
    chatbot: getChatbotFilteredById(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, { getTestsByChatbot, deleteTests, getChatbotsByUser })(TestListPage);
