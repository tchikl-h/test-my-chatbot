import React, { PropTypes } from "react";
import { Link } from "react-router";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ShoppingCart from "material-ui/svg-icons/action/shopping-cart";
import {
  pink500,
  pink600,
  grey500,
  grey600,
  white
} from "material-ui/styles/colors";
// import Data from '../data';
import { connect } from "react-redux";
import { loadOrders, deleteOrder } from "../actions/order";
import FlatButton from "material-ui/FlatButton";
import { typography } from "material-ui/styles";
import InfoBox from "../components/dashboard/InfoBox";

class OrderListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchOpen: false,
      snackbarOpen: false,
      autoHideDuration: 1500,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      orderId: null,
      dialogText: "Are you sure to do this?",
      search: {
        product: ""
      }
    };

    this.onDelete = this.onDelete.bind(this);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);

    if (this.props.orderList || this.props.orderList.length < 1)
      props.getAllOrders(this.state.search);
  }

  componentWillMount() { }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({ snackbarOpen: true });
    }

    if (
      !this.props.deleteSuccess &&
      nextProps.deleteSuccess &&
      !nextProps.errorMessage &&
      !nextProps.isFetching
    ) {
      this.props.getAllOrders();
    }
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllOrders(this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ orderId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.orderId) {
      this.props.deleteOrder(this.state.orderId);
      this.setState({ orderId: null });
    }
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllOrders(this.state.search);
  }

  handleSearchFilter(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search[field] = event.target.value;

      this.setState({ search: search });
    }
  }

  handleErrorMessage() {
    this.setState({
      snackbarOpen: true
    });
  }

  handleSnackBarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render() {
    const { errorMessage, orderList } = this.props;

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
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: "block"
      },
      fabSearch: {
        // margin: 0,
        top: "auto",
        right: 100,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20,
        backgroundColor: "lightblue"
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
        id: {
          width: "10%"
        },
        name: {
          width: "20%"
        },
        price: {
          width: "20%",
          textAlign: "right"
        },
        category: {
          width: "20%"
        },
        edit: {
          width: "20%"
        }
      },
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      drawer: {
        backgroundColor: "lightgrey"
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
        <div>
          <h3 style={styles.navigation}>Chatbots</h3>
          <Link to="/order">
            <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <div className="row">
          {
            this.props.orderList.map(item => (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 ">
                
                  <Link to={`/order/${item.id}`}>
                    <InfoBox
                      Icon={ShoppingCart}
                      color={pink600}
                      title={item.reference}
                      value={item.price}
                    />
                  </Link>
                </div>
          ))}
          </div>
        </div>
    );
  }
}

OrderListPage.propTypes = {
  orderList: PropTypes.array,
  getAllOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { orderReducer } = state;
  const {
    orderList,
    deleteSuccess,
    isFetching,
    isAuthenticated,
    errorMessage,
    user
  } = orderReducer;

  return {
    orderList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: filters => dispatch(loadOrders(filters)),
    deleteOrder: id => dispatch(deleteOrder(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListPage);
