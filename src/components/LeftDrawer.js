import React from "react";
import Drawer from "material-ui/Drawer";
// import { spacing, typography } from "material-ui/styles";
import { white, orange } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import { Link } from "react-router";
import Avatar from "material-ui/Avatar";
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from "material-ui/svg-icons/content/filter-list";
// import FontIcon from 'material-ui/FontIcon';
import SettingsPower from "material-ui/svg-icons/action/settings-power";
import VpnKey from "material-ui/svg-icons/communication/vpn-key";
import { connect } from "react-redux";
import { getUsersByCompany } from "../actions/usersActions";
import { getUserFilteredById } from "../selectors/usersSelectors";

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsersByCompany(localStorage.getItem("companyId"));
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onLogoutClick();
  }

  render() {
    const styles = {
      menuItem: {
        color: white,
        fontSize: 14
      },
      avatar: {
        div: {
          padding: "15px 0 20px 15px",
          backgroundImage:
            "url(" + require("../assets/img/material_bg.png") + ")",
          backgroundColor: "rgba(227, 231, 232, 0.83)",
          height: 45,
          // backgroundColor: "silver"
        },
        icon: {
          float: "left",
          display: "block",
          marginRight: 15,
          boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)",
        },
        span: {
          paddingTop: 0,
          display: "block",
          color: "purple",
          fontWeight: 400,
          fontSize: 19,
          textShadow: "1px 1px #444"
        }
      },
      drawer: {
        color: "darkgrey",
        backgroundColor: "rgba(227, 231, 232, 0.63)",
        overflow: "auto"
      }
    };

    return (
      <Drawer docked={true} open={this.props.navDrawerOpen} style={styles.drawer}>
        {/*<div style={styles.logo}>Material Admin<div>*/}
        <div style={styles.avatar.div}>
          <Avatar
            src={`https://avatars.dicebear.com/v2/identicon/${this.props.user.lastName}.svg`}
            size={50}
            style={styles.avatar.icon}
            title={this.props.user.lastName}
          />
          <span style={styles.avatar.span}>
            {this.props.username}

            <IconMenu
              color={white}
              iconButtonElement={
                <IconButton>
                  <ContentFilter color={orange} />
                </IconButton>
              }
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem
                primaryText="Sign out"
                leftIcon={<SettingsPower />}
                onClick={event => this.handleClick(event)}
              />
              <MenuItem primaryText="Change password" leftIcon={<VpnKey />} />
            </IconMenu>
          </span>
        </div>
        <div>
          {this.props.menus.map((menu, index) => (
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link} />}
            />
          ))}
        </div>
      </Drawer>
    );
  };
}

function mapStateToProps(state) {
  return {
    user: getUserFilteredById(state, localStorage.getItem("userId")) || {},
  };
}

export default connect(mapStateToProps, { getUsersByCompany })(LeftDrawer);
