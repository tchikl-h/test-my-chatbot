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
import InfoBox from "../components/dashboard/InfoBox";
import { getChatbotFilteredList } from "../selectors/chatbotsSelectors";
import { getChatbotsByUser } from "../actions/chatbotsActions"
import { getUsersByCompany } from "../actions/usersActions";
import { getUserFilteredById } from "../selectors/usersSelectors";

class ChatbotListPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.getChatbotsByUser(localStorage.getItem("companyId"), localStorage.getItem("userId"));
    this.props.getUsersByCompany(localStorage.getItem("companyId"));
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
          <h3 style={styles.navigation}>Chatbots</h3>
          {
            this.props.user.companyOwner === true &&
            <Link to="/chatbot">
              <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          }
          <div className="row">
          {
            this.props.chatbotList.map(item => (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 ">
                
                  <Link to={`/chatbot/${item.id}`}>
                    <InfoBox
                      color={grey200}
                      title={item.project_name}
                      value={item.description}
                    />
                  </Link>
                </div>
          ))}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUserFilteredById(state, localStorage.getItem("userId")) || {},
    chatbotList: getChatbotFilteredList(state)
  };
}

export default connect(mapStateToProps, { getUsersByCompany, getChatbotsByUser })(ChatbotListPage);
