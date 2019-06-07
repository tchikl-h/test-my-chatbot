import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./actionTypes";
// import bcrypt from 'bcryptjs';

// Login actions

function requestLogin(id) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    UserId: id
  };
}

function receiveLogin(id) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    userId: id
  };
}

export function loginUser(id, companyId) {
  return dispatch => {
    dispatch(requestLogin(id));
    // localStorage.setItem("token", bcrypt.hashSync(`${JSON.stringify(companyId)}-${JSON.stringify(id)}`, bcrypt.genSaltSync(10)));
    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("companyId", JSON.stringify(companyId));
    dispatch(receiveLogin(id));
  }
}

// Logout actions

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("userId")
    localStorage.removeItem("companyId")
    dispatch(receiveLogout());
  };
}
