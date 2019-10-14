import {
  INVALIDATE_GET_TESTS, REQUEST_GET_TESTS, RECEIVE_GET_TESTS,
  INVALIDATE_GET_TESTS_BY_CHATBOT, REQUEST_GET_TESTS_BY_CHATBOT, RECEIVE_GET_TESTS_BY_CHATBOT,
  INVALIDATE_POST_TESTS, REQUEST_POST_TESTS, RECEIVE_POST_TESTS,
  INVALIDATE_PATCH_TESTS, REQUEST_PATCH_TESTS, RECEIVE_PATCH_TESTS,
  INVALIDATE_DELETE_TESTS, REQUEST_DELETE_TESTS, RECEIVE_DELETE_TESTS,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetTests() {
  return {
    type: REQUEST_GET_TESTS,
  }
}

export function receiveGetTests(tests) {
  return {
    type: RECEIVE_GET_TESTS,
    tests: tests,
    receivedAt: Date.now()
  }
}

export function invalidateGetTests() {
  return {
    type: INVALIDATE_GET_TESTS,
  }
}

export function requestGetTestsByChatbot() {
  return {
    type: REQUEST_GET_TESTS_BY_CHATBOT,
  }
}

export function receiveGetTestsByChatbot(tests) {
  return {
    type: RECEIVE_GET_TESTS_BY_CHATBOT,
    testsFiltered: tests,
    receivedAt: Date.now()
  }
}

export function invalidateGetTestsByChatbot() {
  return {
    type: INVALIDATE_GET_TESTS_BY_CHATBOT,
  }
}

export function requestPostTests() {
  return {
    type: REQUEST_POST_TESTS,
  }
}

export function receivePostTests() {
  return {
    type: RECEIVE_POST_TESTS,
  }
}

export function invalidatePostTests() {
  return {
    type: INVALIDATE_POST_TESTS,
  }
}

export function requestPatchTests() {
  return {
    type: REQUEST_PATCH_TESTS,
  }
}

export function receivePatchTests() {
  return {
    type: RECEIVE_PATCH_TESTS,
  }
}

export function invalidatePatchTests() {
  return {
    type: INVALIDATE_PATCH_TESTS,
  }
}

export function requestDeleteTests() {
  return {
    type: REQUEST_DELETE_TESTS,
  }
}

export function receiveDeleteTests() {
  return {
    type: RECEIVE_DELETE_TESTS,
  }
}

export function invalidateDeleteTests() {
  return {
    type: INVALIDATE_DELETE_TESTS,
  }
}

export function getTests() {
  return function(dispatch) {
    dispatch(requestGetTests());
    return axios.get(`${process.env.API_HOST}/v1/tests`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetTests(res.data));
      else
        dispatch(invalidateGetTests());
    })
    .catch(err => console.log(err));
  }
}

export function getTestsByChatbot(id) {
  return function(dispatch) {
    dispatch(requestGetTestsByChatbot());
    return axios.get(`${process.env.API_HOST}/v1/chatbots/${id}/tests`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetTestsByChatbot(res.data));
      else
        dispatch(invalidateGetTestsByChatbot());
    })
    .catch(err => console.log(err));
  }
}

export const postTests = (name, description, chatbotId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostTests());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/tests`,
      data: {
        name: name,
        description: description,
        chatbotId: chatbotId,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostTests());
        resolve();
      }
      else
        dispatch(invalidatePostTests());
        reject();
    })
    .catch(err => console.log(err));
  });

export const patchTests = (id, name, description, chatbotId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchTests());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/tests/${id}`,
      data: {
        name: name,
        description: description,
        chatbotId: chatbotId,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchTests());
        resolve();
      }
      else
        dispatch(invalidatePatchTests());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteTests = (userId, testId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteTests());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/users/${userId}/tests/${testId}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteTests());
        resolve();
      }
      else {
        dispatch(invalidateDeleteTests());
        reject();
      }
    })
    .catch(err => console.log(err));
  });