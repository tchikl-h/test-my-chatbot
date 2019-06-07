import React, { PropTypes } from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dialogText } = this.props;

    const styles = {
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.props.handleClose(false)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.props.handleClose(true)}
      />
    ];

    return (
        <div>
          <Dialog
              title="Confirm Dialog"
              actions={actions}
              modal={true}
              contentStyle={styles.dialog}
              open={this.props.open}
            >
            {dialogText}
          </Dialog>
        </div>
    );
  }
}

Popup.propTypes = {
    dialogText: PropTypes.string,
    handleClose: PropTypes.func,
    open: PropTypes.bool
  };
  
  export default Popup;
  