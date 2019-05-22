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
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { getUsersByCompany, deleteUsers } from "../actions/usersActions";
import { getUserFilteredList, getUserIsFetching, getUserFilteredById } from "../selectors/usersSelectors";
import { getChatbotsByCompany } from "../actions/chatbotsActions";
import { getChatbotFilteredList } from "../selectors/chatbotsSelectors";

class CustomerListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      pageOfItems: [],
      customerId: null,
      dialogText: "Are you sure to do this?",
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
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ customerId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.customerId) {
      this.props.deleteUsers(this.state.customerId)
      .then(() => {
        this.props.getUsersByCompany(localStorage.getItem("companyId"));
      })
      this.setState({ customerId: null });
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
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      chatbotAvatar: {
        marginLeft: "3px",
        marginRight: "3px",
      }
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.handleClose(false)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.handleClose(true)}
      />
    ];

    return (
      <PageBase
        title={"Members (" + this.props.userList.length + ")"}
        navigation="Team"
      >
        <div>
          <div>
            {
              this.props.user.companyOwner === true &&
              <Link to="/customer">
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
                <TableHeaderColumn style={styles.columns.firstName} />
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
                  <TableRowColumn style={styles.columns.firstName}>
                    <img width={40} src={`https://avatars.dicebear.com/v2/identicon/${user.lastName}.svg`} title={user.lastName} />
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
                            <Link to={"/customer/" + user.id}>
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

          <Dialog
            title="Confirm Dialog "
            actions={actions}
            modal={true}
            contentStyle={styles.dialog}
            open={this.state.open}
          >
            {this.state.dialogText}
          </Dialog>
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

export default connect(mapStateToProps, { getUsersByCompany, deleteUsers, getChatbotsByCompany })(CustomerListPage);