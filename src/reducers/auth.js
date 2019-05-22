import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    userId: localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : {}
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        userId: action.userId
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        userId: localStorage.getItem("userId")
          ? JSON.parse(localStorage.getItem("userId"))
          : {}
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
