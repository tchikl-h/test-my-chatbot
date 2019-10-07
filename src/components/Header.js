import React, { PropTypes } from "react";
import AppBar from "material-ui/AppBar";
import Back from "material-ui/svg-icons/navigation/arrow-back";
// import FlatButton from "material-ui/FlatButton";


class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { styles } = this.props;

    const style = {
      appBar: {
        position: "fixed",
        top: 0,
        overflow: "hidden",
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      },
      iconsLeftContainer: {
        marginLeft: 20,
        marginRight: 10
      }
    };

    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          iconElementLeft={
            <div style={style.iconsLeftContainer}>
              <div onClick={() => this.props.router.goBack()}>
                <Back color="white" style={{height: "30px", width: "30px", marginTop: "8px"}}/>
              </div>
            </div>
          }
          iconElementRight={
            <div >
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
