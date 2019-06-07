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

class TestBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, test, chatbotId } = this.props;

    const styles = {
      paperSize: {
        height: 60,
        width: 500
      },
      content: {
        padding: "5px 30px",
        marginLeft: 0,
        height: 60,
        width: 500
      },
      name: {
        display: "inline-block",
        padding: "12px",
        marginLeft: 15,
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      description: {
        marginLeft: "10px",
        display: "inline-block",
        fontWeight: typography.fontWeightLight,
        fontSize: 16,
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
      },
      editButton: {
        marginLeft: 165,
        paddingRight: 25,
        display: "inline-block",
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500,
        display: "inline-block",
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
};

export default TestBox;
