import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { Link } from "react-router";
import {
  grey800,
} from "material-ui/styles/colors";
import { typography } from "material-ui/styles";

class ErrorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    // TODO: to fix ! when name & description size are long it displays weirdly
    const styles = {
      paperSize: {
        height: 350,
        width: 300,
      },
      paperLogSize: {
        marginTop: 10,
        height: 50,
        width: 300,
      },
      name: {
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      description: {
        marginLeft: 15,
        fontWeight: typography.fontWeightLight,
        fontSize: `16px`, // fontWeightLightHeight
        color: grey800
      },
      content: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: 300
      },
      contentLogs: {
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 50,
      }
    };
    // TODO: add the logs Links
    return (
      <div>
        <Paper style={styles.paperSize}>
          <div style={styles.content}>
            <span style={styles.name}><b>"{this.props.testName}"</b> failed !</span>
            <span style={styles.description}>{this.props.errorMessage}</span>
            <span style={styles.description}>See the logs below for more informations</span>
          </div>
        </Paper>
        <Link to={`logs/0`}>
          <Paper style={styles.paperLogSize}>
            <div style={styles.contentLogs}>
              <span style={styles.content}><b>Logs</b></span>
            </div>
          </Paper>
        </Link>
      </div>
    );
  }
}

ErrorBox.propTypes = {
  color: PropTypes.string,
  chatbotId: PropTypes.integer,
  testName: PropTypes.string,
  errorMessage: PropTypes.object,
  onDelete: PropTypes.func,
};

export default ErrorBox;
