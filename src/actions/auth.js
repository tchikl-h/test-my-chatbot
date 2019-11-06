import {
  REQUEST_LOGIN,
  INVALIDATE_LOGIN,
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  INVALIDATE_TOKEN,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

// Login actions

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
  };
}

function invalidateLogin() {
  return {
    type: INVALIDATE_LOGIN,
  };
}

function requestToken() {
  return {
    type: REQUEST_TOKEN,
    isFetching: true,
    isAuthenticated: false,
  };
}

function receiveToken(user) {
  return {
    type: RECEIVE_TOKEN,
    isFetching: false,
    isAuthenticated: true,
    user: user
  };
}

function invalidateToken() {
  return {
    type: INVALIDATE_TOKEN,
  };
}

export function loginUser(user) {
  return dispatch => {
    dispatch(requestLogin());
    return axios.get(`${process.env.API_HOST}/v1/encrypt/${encodeURIComponent(JSON.stringify(user))}`)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        dispatch(loginUserWithToken(res.data));
        // dispatch(receiveLogin(res.data));
      }
      else
        dispatch(invalidateLogin());
    })
    .catch(err => console.log(err));
  }
}

export function loginUserWithToken(token) {
  return dispatch => {
    dispatch(requestToken());
    return axios.get(`${process.env.API_HOST}/v1/decrypt/${encodeURIComponent(token)}`)
    .then((res) => {
      if (res.status === 200) {
        let userToken = res.data
        axios.get(`${process.env.API_HOST}/v1/companies/${userToken.companyId}/users/${userToken.id}`)
        .then((res) => {
          if (res.status === 200 && JSON.stringify(userToken) === JSON.stringify(res.data)) {
            dispatch(receiveToken(userToken));
          }
        })
        .catch(err => console.log(err));
      }
      else
        dispatch(invalidateToken());
    })
    .catch(err => console.log(err));
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
    localStorage.removeItem("token")
    dispatch(receiveLogout());
  };
}