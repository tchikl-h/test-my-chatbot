import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { Link } from "react-router";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {
  grey800,
  grey500,
  green400,
  grey200,
  white,
} from "material-ui/styles/colors";
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionDelete from "material-ui/svg-icons/action/delete";
import { typography } from "material-ui/styles";
import CircularProgress from "material-ui/CircularProgress";

class TestBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, test, chatbotId } = this.props;
    const fontWeightMediumHeight = 18;
    const fontWeightMediumWidth = fontWeightMediumHeight / 2.2;

    const fontWeightLightHeight = 16;
    const fontWeightLightWidth = fontWeightLightHeight / 2.3;

    const contentWidth = 800;
    const contentHeight = (test.name.length / fontWeightMediumWidth) > (test.description.length / fontWeightLightWidth) ? test.name.length / 30 * fontWeightMediumHeight : test.description.length / 40 * fontWeightLightHeight
    
    // TODO: to fix ! when name & description size are long it displays weirdly
    const styles = {
      paperSize: {
        height: contentHeight + 50,
        width: contentWidth
      },
      content: {
        display: "flex",
        alignItems: "center",
        width: contentWidth + 61
      },
      name: {
        display: "inline-block",
        verticalAlign: "top",
        marginLeft: 15,
        width: 30 * fontWeightMediumWidth,
        fontWeight: typography.fontWeightMedium,
        fontSize: `${fontWeightMediumHeight}px`,
        color: grey800
      },
      description: {
        display: "inline-block",
        verticalAlign: "top",
        width: 40 * fontWeightLightWidth,
        marginLeft: 10,
        fontWeight: typography.fontWeightLight,
        fontSize: `${fontWeightLightHeight}px`,
        color: grey800
      },
      icon: {
        height: 30,
        width: 30,
        maxWidth: "100%"
      },
      editButton: {
        marginLeft: 60,
        paddingRight: 25,
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500,
      },
      resultIcon: {
        paddingLeft: 25,
        width: 50
      },
    };

    return (
      <Paper style={styles.paperSize}>
        <div style={styles.content}>
          <Link to={`test/${test.id}`}>
            <span style={styles.name}>{test.name}</span>
            <span style={styles.description}>{test.description}</span>
          </Link>
          <Link to={`test/${test.id}/edit`}>
            <FloatingActionButton
              zDepth={0}
              mini={true}
              style={styles.editButton}
              backgroundColor={green400}
              iconStyle={styles.editButtonIcon}
            >
              <ContentCreate />
            </FloatingActionButton>
          </Link>
          <FloatingActionButton
            zDepth={0}
            mini={true}
            backgroundColor={grey200}
            iconStyle={styles.deleteButton}
            onTouchTap={() => this.props.onDelete(test.id)}
          >
            <ActionDelete />
          </FloatingActionButton>
          {
            this.props.testLaunched ?
              test.completed ?
                test.result === 0 ?
                  <img style={styles.resultIcon} src={require(`../../assets/img/success.png`)} />
                  : <img style={styles.resultIcon} src={require(`../../assets/img/fail.png`)} />
              : <CircularProgress style={styles.resultIcon} />
            : console.log("NOTHING")
          }
        </div>
      </Paper>
    );
  }
}

TestBox.propTypes = {
  color: PropTypes.string,
  test: PropTypes.object,
  chatbotId: PropTypes.integer,
  onDelete: PropTypes.func,
  testLaunched: PropTypes.boolean
};

export default TestBox;
