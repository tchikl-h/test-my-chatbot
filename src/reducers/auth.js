import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  INVALIDATE_LOGIN,
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  INVALIDATE_TOKEN,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function auth(
  state = {
    isFetching: false,
    didInvalidate: false,
    isAuthenticated: false,
    token: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : {},
    user: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
      });
    case INVALIDATE_LOGIN:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TOKEN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case RECEIVE_TOKEN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        user: action.user
      });
    case INVALIDATE_TOKEN:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
}
