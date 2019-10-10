import {
  INVALIDATE_GET_USERS, REQUEST_GET_USERS, RECEIVE_GET_USERS,
  INVALIDATE_GET_USERS_BY_COMPANY, REQUEST_GET_USERS_BY_COMPANY, RECEIVE_GET_USERS_BY_COMPANY,
  INVALIDATE_POST_USERS, REQUEST_POST_USERS, RECEIVE_POST_USERS,
  INVALIDATE_PATCH_USERS, REQUEST_PATCH_USERS, RECEIVE_PATCH_USERS,
  INVALIDATE_DELETE_USERS, REQUEST_DELETE_USERS, RECEIVE_DELETE_USERS,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetUsers() {
  return {
    type: REQUEST_GET_USERS,
  }
}

export function receiveGetUsers(users) {
  return {
    type: RECEIVE_GET_USERS,
    users: users,
    receivedAt: Date.now()
  }
}

export function invalidateGetUsers() {
  return {
    type: INVALIDATE_GET_USERS,
  }
}

export function requestGetUsersByCompany() {
  return {
    type: REQUEST_GET_USERS_BY_COMPANY,
  }
}

export function receiveGetUsersByCompany(users) {
  return {
    type: RECEIVE_GET_USERS_BY_COMPANY,
    usersFiltered: users,
    receivedAt: Date.now()
  }
}

export function invalidateGetUsersByCompany() {
  return {
    type: INVALIDATE_GET_USERS_BY_COMPANY,
  }
}

export function requestPostUsers() {
  return {
    type: REQUEST_POST_USERS,
  }
}

export function receivePostUsers() {
  return {
    type: RECEIVE_POST_USERS,
  }
}

export function invalidatePostUsers() {
  return {
    type: INVALIDATE_POST_USERS,
  }
}

export function requestPatchUsers() {
  return {
    type: REQUEST_PATCH_USERS,
  }
}

export function receivePatchUsers() {
  return {
    type: RECEIVE_PATCH_USERS,
  }
}

export function invalidatePatchUsers() {
  return {
    type: INVALIDATE_PATCH_USERS,
  }
}

export function requestDeleteUsers() {
  return {
    type: REQUEST_DELETE_USERS,
  }
}

export function receiveDeleteUsers() {
  return {
    type: RECEIVE_DELETE_USERS,
  }
}

export function invalidateDeleteUsers() {
  return {
    type: INVALIDATE_DELETE_USERS,
  }
}

export function getUsers() {
  return function(dispatch) {
    dispatch(requestGetUsers());
    return fetch(`${process.env.API_HOST}/v1/users`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveGetUsers(res));
      }
      else
        dispatch(invalidateGetUsers());
    })
    .catch(err => console.log(err));
  }
}

export function getUsersByCompany(id) {
  return function(dispatch) {
    dispatch(requestGetUsersByCompany());
    return fetch(`${process.env.API_HOST}/v1/companies/${id}/users`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveGetUsersByCompany(res));
      }
      else
        dispatch(invalidateGetUsersByCompany());
    })
    .catch(err => console.log(err));
  }
}

export const postUsers = user => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostUsers());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/users`,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: user.password,
        mail: user.mail,
        chatbotIds: user.chatbotIds,
        companyOwner: user.companyOwner,
        companyId: user.companyId,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostUsers());
        resolve(res.data);
      }
      else
        dispatch(invalidatePostUsers());
        reject();
    })
    .catch(err => console.log(err));
  });

export const patchUsers = user => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchUsers());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/users/${user.id}`,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        chatbotIds: user.chatbotIds,
        mail: user.mail,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchUsers());
        resolve();
      }
      else
        dispatch(invalidatePatchUsers());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteUsers = id => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteUsers());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/users/${id}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteUsers());
        resolve();
      }
      else
        dispatch(invalidateDeleteUsers());
        reject();
    })
    .catch(err => console.log(err));
  });