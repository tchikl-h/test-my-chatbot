import React from "react";
import { connect } from "react-redux";
import { typography } from "material-ui/styles";
import {
  grey600
} from "material-ui/styles/colors";

class HistoryListPage extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div>
        <h3 style={styles.navigation}>History</h3>
        <div style={styles.desc}>
          <p>Coming soon !</p>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(HistoryListPage);
