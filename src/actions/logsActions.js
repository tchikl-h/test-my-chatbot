import {
  INVALIDATE_GET_LOGS, REQUEST_GET_LOGS, RECEIVE_GET_LOGS,
  INVALIDATE_GET_LOGS_BY_CHATBOT, REQUEST_GET_LOGS_BY_CHATBOT, RECEIVE_GET_LOGS_BY_CHATBOT,
  INVALIDATE_POST_LOGS, REQUEST_POST_LOGS, RECEIVE_POST_LOGS,
  INVALIDATE_PATCH_LOGS, REQUEST_PATCH_LOGS, RECEIVE_PATCH_LOGS,
  INVALIDATE_DELETE_LOGS, REQUEST_DELETE_LOGS, RECEIVE_DELETE_LOGS,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetLogs() {
  return {
    type: REQUEST_GET_LOGS,
  }
}

export function receiveGetLogs(logs) {
  return {
    type: RECEIVE_GET_LOGS,
    logs: logs,
    receivedAt: Date.now()
  }
}

export function invalidateGetLogs() {
  return {
    type: INVALIDATE_GET_LOGS,
  }
}

export function requestGetLogsByChatbot() {
  return {
    type: REQUEST_GET_LOGS_BY_CHATBOT,
  }
}

export function receiveGetLogsByChatbot(logs) {
  return {
    type: RECEIVE_GET_LOGS_BY_CHATBOT,
    logsFiltered: logs,
    receivedAt: Date.now()
  }
}

export function invalidateGetLogsByChatbot() {
  return {
    type: INVALIDATE_GET_LOGS_BY_CHATBOT,
  }
}

export function requestPostLogs() {
  return {
    type: REQUEST_POST_LOGS,
  }
}

export function receivePostLogs() {
  return {
    type: RECEIVE_POST_LOGS,
  }
}

export function invalidatePostLogs() {
  return {
    type: INVALIDATE_POST_LOGS,
  }
}

export function requestPatchLogs() {
  return {
    type: REQUEST_PATCH_LOGS,
  }
}

export function receivePatchLogs() {
  return {
    type: RECEIVE_PATCH_LOGS,
  }
}

export function invalidatePatchLogs() {
  return {
    type: INVALIDATE_PATCH_LOGS,
  }
}

export function requestDeleteLogs() {
  return {
    type: REQUEST_DELETE_LOGS,
  }
}

export function receiveDeleteLogs() {
  return {
    type: RECEIVE_DELETE_LOGS,
  }
}

export function invalidateDeleteLogs() {
  return {
    type: INVALIDATE_DELETE_LOGS,
  }
}

export function getLogs() {
  return function(dispatch) {
    dispatch(requestGetLogs());
    return axios.get(`${process.env.API_HOST}/v1/logs`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetLogs(res.data));
      else
        dispatch(invalidateGetLogs());
    })
    .catch(err => console.log(err));
  }
}

export function getLogsByChatbot(id) {
  return function(dispatch) {
    dispatch(requestGetLogsByChatbot());
    return axios.get(`${process.env.API_HOST}/v1/chatbots/${id}/logs`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetLogsByChatbot(res.data));
      else
        dispatch(invalidateGetLogsByChatbot());
    })
    .catch(err => console.log(err));
  }
}

export const postLogs = (logs, coverage, chatbotId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostLogs());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/logs`,
      data: {
        logs: logs,
        coverage: coverage,
        chatbotId: chatbotId,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostLogs());
        resolve();
      }
      else
        dispatch(invalidatePostLogs());
        reject();
    })
    .catch(err => console.log(err));
  });

export const patchLogs = (id, logs, coverage) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchLogs());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/logs/${id}`,
      data: {
        logs: logs,
        coverage: coverage,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchLogs());
        resolve();
      }
      else
        dispatch(invalidatePatchLogs());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteLogs = (userId, logId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteLogs());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/users/${userId}/logs/${logId}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteLogs());
        resolve();
      }
      else {
        dispatch(invalidateDeleteLogs());
        reject();
      }
    })
    .catch(err => console.log(err));
  });