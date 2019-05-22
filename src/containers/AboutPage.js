import React from "react";
import { typography } from "material-ui/styles";
import {
  grey600
} from "material-ui/styles/colors";

class AboutPage extends React.Component {

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
        <h3 style={styles.navigation}>About us</h3>
        <div style={styles.desc}>
          <p>We are delighted to welcome you to our beta of Test my chatbot !</p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
