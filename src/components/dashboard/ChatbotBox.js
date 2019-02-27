import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { white, grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
import ReactSVG from 'react-svg';
import { Link } from "react-router";

class ChatbotBox extends React.Component {
  render() {
    const { color, title, value, Icon } = this.props;

    const styles = {
      paperSize: {
        height: 120,
        width: 500
      },
      content: {
        padding: "35px 50px",
        marginLeft: 120,
        height: 80,
      },
      number: {
        padding: "10px 0px",
        display: "block",
        fontWeight: typography.fontWeightLight,
        fontSize: 15,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightMedium,
        color: grey800
      },
      iconSpan: {
        float: "left",
        height: 120,
        width: 120,
        textAlign: "center",
        backgroundColor: color
      },
      editSpan: {
        float: "right",
        textAlign: "center",
        padding: "5px 5px 0px 0px",
      },
      icon: {
        height: 70,
        width: 70,
        marginTop: 20,
        maxWidth: "100%"
      }
    };

    return (
      <Paper style={styles.paperSize}>
        <span style={styles.iconSpan}>
          <Icon color={white} style={styles.icon} />
        </span>

        <span style={styles.editSpan}>
          <Link to={`${window.location.href}/edit`}>
            <ReactSVG src="../assets/img/edit-icon.svg" svgStyle={{ width: 15, height: 15 }} />
          </Link>
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}

ChatbotBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default ChatbotBox;
