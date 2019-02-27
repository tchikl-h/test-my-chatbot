import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { white, grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";

class ChatbotActionBox extends React.Component {
  render() {
    const { color, title, value, Icon } = this.props;

    const styles = {
      paperSize: {
        height: 60,
        width: 240
      },
      content: {
        padding: "5px 30px",
        marginLeft: 15,
        height: 60,
        width: 200
      },
      number: {
        display: "block",
        padding: "12px",
        marginLeft: 15,
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      iconSpan: {
        float: "left",
        height: 60,
        width: 60,
        textAlign: "center",
        marginTop: "10px",
        backgroundColor: color
      },
      icon: {
        height: 30,
        width: 30,
        marginTop: 20,
        maxWidth: "100%"
      }
    };

    return (
      <Paper style={styles.paperSize}>
        <span style={styles.iconSpan}>
          <img width={35} src={Icon} />
        </span>

        <div style={styles.content}>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}

ChatbotActionBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default ChatbotActionBox;
