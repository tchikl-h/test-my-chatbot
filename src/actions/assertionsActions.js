import {
  INVALIDATE_GET_ASSERTIONS, REQUEST_GET_ASSERTIONS, RECEIVE_GET_ASSERTIONS,
  INVALIDATE_GET_ASSERTIONS_BY_TEST, REQUEST_GET_ASSERTIONS_BY_TEST, RECEIVE_GET_ASSERTIONS_BY_TEST,
  INVALIDATE_POST_ASSERTIONS, REQUEST_POST_ASSERTIONS, RECEIVE_POST_ASSERTIONS,
  INVALIDATE_PATCH_ASSERTIONS, REQUEST_PATCH_ASSERTIONS, RECEIVE_PATCH_ASSERTIONS,
  INVALIDATE_DELETE_ASSERTIONS, REQUEST_DELETE_ASSERTIONS, RECEIVE_DELETE_ASSERTIONS,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetAssertions() {
  return {
    type: REQUEST_GET_ASSERTIONS,
  }
}

export function receiveGetAssertions(assertions) {
  return {
    type: RECEIVE_GET_ASSERTIONS,
    assertions: assertions,
    receivedAt: Date.now()
  }
}

export function invalidateGetAssertions() {
  return {
    type: INVALIDATE_GET_ASSERTIONS,
  }
}

export function requestGetAssertionsByTest() {
  return {
    type: REQUEST_GET_ASSERTIONS_BY_TEST,
  }
}

export function receiveGetAssertionsByTest(assertions) {
  return {
    type: RECEIVE_GET_ASSERTIONS_BY_TEST,
    assertionsFiltered: assertions,
    receivedAt: Date.now()
  }
}

export function invalidateGetAssertionsByTest() {
  return {
    type: INVALIDATE_GET_ASSERTIONS_BY_TEST,
  }
}

export function requestPostAssertions() {
  return {
    type: REQUEST_POST_ASSERTIONS,
  }
}

export function receivePostAssertions() {
  return {
    type: RECEIVE_POST_ASSERTIONS,
  }
}

export function invalidatePostAssertions() {
  return {
    type: INVALIDATE_POST_ASSERTIONS,
  }
}

export function requestPatchAssertions() {
  return {
    type: REQUEST_PATCH_ASSERTIONS,
  }
}

export function receivePatchAssertions() {
  return {
    type: RECEIVE_PATCH_ASSERTIONS,
  }
}

export function invalidatePatchAssertions() {
  return {
    type: INVALIDATE_PATCH_ASSERTIONS,
  }
}

export function requestDeleteAssertions() {
  return {
    type: REQUEST_DELETE_ASSERTIONS,
  }
}

export function receiveDeleteAssertions() {
  return {
    type: RECEIVE_DELETE_ASSERTIONS,
  }
}

export function invalidateDeleteAssertions() {
  return {
    type: INVALIDATE_DELETE_ASSERTIONS,
  }
}

export function getAssertions() {
  return function(dispatch) {
    dispatch(requestGetAssertions());
    return axios.get(`${process.env.API_HOST}/v1/assertions`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetAssertions(res.data));
      else
        dispatch(invalidateGetAssertions());
    })
    .catch(err => console.log(err));
  }
}

export const getAssertionsByTest = (id) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestGetAssertionsByTest());
    return axios.get(`${process.env.API_HOST}/v1/tests/${id}/assertions`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveGetAssertionsByTest(res.data));
        resolve(res.data);
      }
      else
      dispatch(invalidateGetAssertionsByTest());
        reject();
    })
    .catch(err => console.log(err));
  });

export const postAssertions = (orderId, userInput, chatbotResponse, intent, testId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostAssertions());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/assertions`,
      data: {
        orderId: orderId,
        userInput: userInput,
        chatbotResponse: chatbotResponse,
        intent: intent,
        testId: parseInt(testId),
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostAssertions());
        resolve();
      }
      else
        dispatch(invalidatePostAssertions());
        reject();
    })
    .catch(err => console.log(err));
  });

export const patchAssertions = (id, userInput, chatbotResponse, intent, testId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchAssertions());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/assertions/${id}`,
      data: {
        userInput: userInput,
        chatbotResponse: chatbotResponse,
        intent: intent,
        testId: parseInt(testId),
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchAssertions());
        resolve();
      }
      else
        dispatch(invalidatePatchAssertions());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteAssertions = (id, testId, assertionId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteAssertions());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/tests/${testId}/assertions/${assertionId}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteAssertions());
        resolve();
      }
      else {
        dispatch(invalidateDeleteAssertions());
        reject();
      }
    })
    .catch(err => console.log(err));
  });