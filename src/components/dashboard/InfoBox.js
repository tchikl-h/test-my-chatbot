import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";

class InfoBox extends React.Component {
  render() {
    const { color, title, value } = this.props;

    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 90,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: typography.fontWeightLight,
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightMedium,
        color: grey800
      },
      iconSpan: {
        float: "left",
        height: 90,
        width: 90,
        textAlign: "center",
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%"
      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}>
        <img style={styles.icon} src={`https://avatars.dicebear.com/v2/bottts/${title}.svg`} />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          {
            value && <span style={styles.number}>{value}</span>
          }
        </div>
      </Paper>
    );
  }
}

InfoBox.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default InfoBox;
