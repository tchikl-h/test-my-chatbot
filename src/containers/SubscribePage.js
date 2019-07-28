import React from "react";
import { typography } from "material-ui/styles";
import {
  grey600
} from "material-ui/styles/colors";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import { getCompanies } from "../actions/companiesActions";
import { getCompanyById } from "../selectors/companiesSelectors";

class SubscribePage extends React.Component {

  componentDidMount() {
    this.props.getCompanies();
  }

  render() {
    const styles = {
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: "block"
      },
      desc: {
        fontSize: "20px"
      }
    };
    if (!this.props.company) {
      return <CircularProgress />;
    } else if (this.props.company.premium === true) {
      this.props.router.push("/");
    }
    else
      return (
        <div>
          <h3 style={styles.navigation}>Subscribe</h3>
          <div style={styles.desc}>
            <p>
              Oups, looks like you are on a free trial. You can only create :<br/>
              <b>
                - 1 chatbot<br/>
                - 3 users<br/>
                - 10 tests
              </b>
              <br/><br/>
              To become a premium user, please contact our support team at herve.tchikladze@epitech.eu
            </p>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    currentUser: user || {},
    company: getCompanyById(state, user.companyId),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getCompanies })(SubscribePage);
