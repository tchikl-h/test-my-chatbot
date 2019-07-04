import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  INVALIDATE_LOGIN,
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  INVALIDATE_TOKEN,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./actionTypes";
import axios from "axios";
import * as queryString from 'query-string';

// Login actions

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
  };
}

function receiveLogin(token) {
  return {
    type: RECEIVE_LOGIN,
    isFetching: false,
    isAuthenticated: true,
    token: token
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
    return axios.get(`http://localhost:8080/v1/encrypt/${encodeURIComponent(JSON.stringify(user))}`)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        dispatch(loginUserWithToken(res.data));
        // dispatch(receiveLogin(res.data));
      }
      else
        dispatch(invalidateLogin());
    })
  }
}

export function loginUserWithToken(token) {
  return dispatch => {
    dispatch(requestToken());
    return axios.get(`http://localhost:8080/v1/decrypt/${encodeURIComponent(token)}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveToken(res.data));
      }
      else
        dispatch(invalidateToken());
    })
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
