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
import { getChatbotFilteredByUserList } from "../selectors/chatbotsSelectors";
import { getChatbotsByUser } from "../actions/chatbotsActions"
import { getUsersByCompany } from "../actions/usersActions";
import CircularProgress from "material-ui/CircularProgress";
import { getUserFilteredById } from "../selectors/usersSelectors";
import { getCompanies } from "../actions/companiesActions";
import { getCompanyById } from "../selectors/companiesSelectors";

class ChatbotListPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.getChatbotsByUser(this.props.serializedUser.companyId, this.props.serializedUser.id);
    this.props.getUsersByCompany(this.props.serializedUser.companyId);
    this.props.getCompanies();
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
    if (!this.props.user || !this.props.chatbotList || !this.props.company)
      return <CircularProgress />;
    else {
      return (
        <div>
          <h3 style={styles.navigation}>Chatbots</h3>
          {
            this.props.user.companyOwner === true ?
              <Link to={this.props.company.premium === false && this.props.chatbotList.length > 0 ? "/subscribe" : "/chatbot"}>
                <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
            : console.log("")
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
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    serializedUser: user,
    user: getUserFilteredById(state, user.id) || {},
    company: getCompanyById(state, user.companyId),
    chatbotList: getChatbotFilteredByUserList(state).sort(function(a, b){
      if(a.firstName < b.firstName) { return -1; }
      if(a.firstName > b.firstName) { return 1; }
      return 0;
    }),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getUsersByCompany, getChatbotsByUser, getCompanies })(ChatbotListPage);
