import React from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  pink500,
  grey200,
  grey500,
  green400,
  white
} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { getUsersByCompany, deleteUsers } from "../actions/usersActions";
import { getUserFilteredList, getUserIsFetching, getUserFilteredById } from "../selectors/usersSelectors";
import { getChatbotsByCompany } from "../actions/chatbotsActions";
import { getChatbotFilteredList } from "../selectors/chatbotsSelectors";
import Popup from "../components/dashboard/Popup";

class UserListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      pageOfItems: [],
      userId: null,
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.getUsersByCompany(localStorage.getItem("companyId"));
    this.props.getChatbotsByCompany(localStorage.getItem("companyId"))
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.userList !== prevProps.userList) {
      this.onChangePage(this.props.userList.slice(0, 10));
    }
  }

  onChangePage(pageOfItems) {
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.userList
    )
      this.setState({ pageOfItems: pageOfItems });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleOpen(id) {
    this.setState({ open: true });
    this.setState({ userId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.userId) {
      this.props.deleteUsers(this.state.userId)
      .then(() => {
        this.props.getUsersByCompany(localStorage.getItem("companyId"));
      })
      this.setState({ userId: null });
    }
  }

  render() {
    const styles = {
      fab: {
        // margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20
      },
      editButton: {
        paddingRight: 25
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500
      },
      columns: {
        star: {
          width: "1%"
        },
        logo: {
          width: "19%"
        },
        firstName: {
          width: "20%"
        },
        lastName: {
          width: "20%"
        },
        chatbots: {
          width: "40%"
        },
        edit: {
          width: "20%"
        }
      },
      chatbotAvatar: {
        marginLeft: "3px",
        marginRight: "3px",
      }
    };

    return (
      <PageBase
        title={"Members (" + this.props.userList.length + ")"}
        navigation="Team"
      >
        <div>
          <div>
            {
              this.props.user.companyOwner === true &&
              <Link to="/user">
                <FloatingActionButton
                  backgroundColor="lightblue"
                  secondary={true}
                  style={styles.fab}
                  backgroundColor={pink500}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
            }
          </div>

          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={styles.columns.star} />
                <TableHeaderColumn style={styles.columns.logo} />
                <TableHeaderColumn style={styles.columns.firstName}>
                  First Name
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.lastName}>
                  Last Name
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.chatbots}>
                  Chatbots
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>
                Edit
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={true}
              showRowHover={false}
              stripedRows={false}
            >
              {this.state.pageOfItems.map(user => (
                <TableRow key={user.id}>
                  <TableRowColumn style={styles.columns.star}>
                    {
                      user.companyOwner && user.companyOwner === true && (
                          <img width={30} src={require("../assets/img/star-badge.png")} title={"Company's owner"} />
                      )
                    }
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.logo}>
                    <img width={40} src={`https://avatars.dicebear.com/v2/identicon/${user.lastName}.svg`} title={user.userName} />
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.firstName}>
                    {user.firstName}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.lastName}>
                    {user.lastName}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.chatbots}>
                  {
                    this.props.chatbotList && this.props.chatbotList.map(chatbot => {
                      if (user.chatbotIds.includes(chatbot.id)) {
                        console.log(chatbot.project_name);
                        return (<img style={styles.avatar} width={40} src={`https://avatars.dicebear.com/v2/gridy/${chatbot.project_name}.svg`} title={chatbot.project_name} />)
                      }
                    })
                  }
                  </TableRowColumn>
                      <TableRowColumn style={styles.columns.edit}>
                      {
                        (this.props.user.id === user.id || this.props.user.companyOwner === true) && (
                            <Link to={"/user/" + user.id}>
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
                        )
                      }
                      {
                        this.props.user.companyOwner === true && (

                          <FloatingActionButton
                            zDepth={0}
                            mini={true}
                            backgroundColor={grey200}
                            iconStyle={styles.deleteButton}
                            onTouchTap={() => this.onDelete(user.id)}
                          >
                            <ActionDelete />
                          </FloatingActionButton>
                        )
                      }
                      </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={"row center-xs"}>
            <div className={"col-xs-6"}>
              <div className={"box"}>
                <Pagination
                  items={this.props.userList}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>

          <Popup
            dialogText={`Do you want to delete this user ?`}
            handleClose={(isConfirmed) => this.handleClose(isConfirmed)}
            open={this.state.open}
          />
        </div>
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: getUserFilteredById(state, localStorage.getItem("userId")) || {},
    userList: getUserFilteredList(state),
    chatbotList: getChatbotFilteredList(state),
    isFetching: getUserIsFetching(state),
  };
}

export default connect(mapStateToProps, { getUsersByCompany, deleteUsers, getChatbotsByCompany })(UserListPage);