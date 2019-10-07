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
import CircularProgress from "material-ui/CircularProgress";
import PageBase from "../components/PageBase";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { getUsersByCompany, deleteUsers } from "../actions/usersActions";
import { getUserFilteredList, getUserIsFetching } from "../selectors/usersSelectors";
import { getChatbotsByCompany } from "../actions/chatbotsActions";
import { getChatbotFilteredByCompanyList } from "../selectors/chatbotsSelectors";
import Popup from "../components/dashboard/Popup";
import { getUserFilteredById } from "../selectors/usersSelectors";
import { getCompanies } from "../actions/companiesActions";
import { getCompanyById } from "../selectors/companiesSelectors";

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
    this.props.getUsersByCompany(this.props.currentUser.companyId);
    this.props.getChatbotsByCompany(this.props.currentUser.companyId)
    this.props.getCompanies();
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

  handleClose(data) {
    this.setState({ open: false });

    if (data.isConfirmed && this.state.userId) {
      this.props.deleteUsers(this.state.userId)
      .then(() => {
        this.props.getUsersByCompany(this.props.user.companyId);
      })
      .catch(err => console.log(err));
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
    if (this.props.isFetching || !this.props.company) {
      return <CircularProgress />;
    }
    else
      return (
        <PageBase
          title={"Members (" + this.props.userList.length + ")"}
          navigation="Team"
        >
          <div>
            <div>
              {
                this.props.user.companyOwner === true ?
                  <Link to={this.props.company.premium === false && this.props.userList.length > 2 ? "/subscribe" : "/user"}>
                    <FloatingActionButton
                      backgroundColor="lightblue"
                      secondary={true}
                      style={styles.fab}
                      backgroundColor={pink500}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                  </Link>
                : console.log("")
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
                      <img width={40} src={`https://avatars.dicebear.com/v2/identicon/${user.firstName}-${user.lastName}.svg`} title={user.userName} />
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
                          return (<img style={styles.avatar} width={40} src={`https://avatars.dicebear.com/v2/bottts/${chatbot.project_name}.svg`} title={chatbot.project_name} />)
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
              handleClose={(data) => this.handleClose(data)}
              open={this.state.open}
              display={false}
            />
          </div>
        </PageBase>
      );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;
  return {
    user: getUserFilteredById(state, user.id) || {},
    currentUser: user,
    company: getCompanyById(state, user.companyId),
    userList: getUserFilteredList(state).sort(function(a, b){
      if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
      if(a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
      return 0;
    }).sort(function(a, b){
      if(a.companyOwner === true && b.companyOwner === false) { return -1; }
      if(a.companyOwner === false && b.companyOwner === true) { return 1; }
      if(a.companyOwner === false && b.companyOwner === false) { return 0; }
      return 0;
    }).sort(function(a, b){
      if(a.id === user.id && b.id !== user.id) { return -1; }
      if(a.id !== user.id && b.id === user.id) { return 1; }
      if(a.id !== user.id && b.id !== user.id) { return 0; }
      return 0;
    }),
    chatbotList: getChatbotFilteredByCompanyList(state),
    isFetching: getUserIsFetching(state),
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps, { getUsersByCompany, deleteUsers, getChatbotsByCompany, getCompanies })(UserListPage);