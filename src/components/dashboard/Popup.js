import React, { PropTypes } from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
      };
  }

  changeName(e) {
    this.setState({ name : e.target.value });
  }

  changeDescription(e) {
    this.setState({ description : e.target.value });
  }

  resetState() {
    this.setState({name: ""});
    this.setState({description: ""});
  }

  render() {
    const { dialogText } = this.props;

    const styles = {
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      input: {
        boxSizing: "border-box",
        border: "20%",
        width: "100%",
        fontSize: "1.3em",
        outline: "none",
        backgroundColor: "#eeeeee",
        marginTop: "10px"
      }
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.props.handleClose({isConfirmed: false, name: this.state.name, description: this.state.description})}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.props.handleClose({isConfirmed: true, name: this.state.name, description: this.state.description}, this.resetState())}
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
            {
              this.props.display && (
                <div>
                  <input style={styles.input} autoFocus onChange={(e) => this.changeName(e)} value={this.state.name} placeholder="Type a name here"/>
                  <input style={styles.input} onChange={(e) => this.changeDescription(e)} value={this.state.description} placeholder="Type a description here"/>
                </div>
              )
            }
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
  