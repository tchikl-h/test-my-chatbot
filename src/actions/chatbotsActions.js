import {
  INVALIDATE_GET_CHATBOTS, REQUEST_GET_CHATBOTS, RECEIVE_GET_CHATBOTS,
  INVALIDATE_GET_CHATBOTS_BY_COMPANY, REQUEST_GET_CHATBOTS_BY_COMPANY, RECEIVE_GET_CHATBOTS_BY_COMPANY,
  INVALIDATE_GET_CHATBOTS_BY_USER, REQUEST_GET_CHATBOTS_BY_USER, RECEIVE_GET_CHATBOTS_BY_USER,
  INVALIDATE_POST_CHATBOTS, REQUEST_POST_CHATBOTS, RECEIVE_POST_CHATBOTS,
  INVALIDATE_PATCH_CHATBOTS, REQUEST_PATCH_CHATBOTS, RECEIVE_PATCH_CHATBOTS,
  INVALIDATE_DELETE_CHATBOTS, REQUEST_DELETE_CHATBOTS, RECEIVE_DELETE_CHATBOTS,
  REQUEST_START_CHATBOTS, RECEIVE_START_CHATBOTS, INVALIDATE_START_CHATBOTS,
  REQUEST_STOP_CHATBOTS, RECEIVE_STOP_CHATBOTS, INVALIDATE_STOP_CHATBOTS,
  REQUEST_LAUNCH_CHATBOTS, RECEIVE_LAUNCH_CHATBOTS, INVALIDATE_LAUNCH_CHATBOTS,
  REQUEST_TALK_CHATBOTS, RECEIVE_TALK_CHATBOTS, INVALIDATE_TALK_CHATBOTS,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetChatbots() {
  return {
    type: REQUEST_GET_CHATBOTS,
  }
}

export function receiveGetChatbots(chatbots) {
  return {
    type: RECEIVE_GET_CHATBOTS,
    chatbots: chatbots,
    receivedAt: Date.now()
  }
}

export function invalidateGetChatbots() {
  return {
    type: INVALIDATE_GET_CHATBOTS,
  }
}

export function requestGetChatbotsByCompany() {
  return {
    type: REQUEST_GET_CHATBOTS_BY_COMPANY,
  }
}

export function receiveGetChatbotsByCompany(chatbots) {
  return {
    type: RECEIVE_GET_CHATBOTS_BY_COMPANY,
    chatbotsFiltered: chatbots,
    receivedAt: Date.now()
  }
}

export function invalidateGetChatbotsByCompany() {
  return {
    type: INVALIDATE_GET_CHATBOTS_BY_COMPANY,
  }
}

export function requestGetChatbotsByUser() {
  return {
    type: REQUEST_GET_CHATBOTS_BY_USER,
  }
}

export function receiveGetChatbotsByUser(chatbots) {
  return {
    type: RECEIVE_GET_CHATBOTS_BY_USER,
    chatbotsFiltered: chatbots,
    receivedAt: Date.now()
  }
}

export function invalidateGetChatbotsByUser() {
  return {
    type: INVALIDATE_GET_CHATBOTS_BY_USER,
  }
}

export function requestPostChatbots() {
  return {
    type: REQUEST_POST_CHATBOTS,
  }
}

export function receivePostChatbots() {
  return {
    type: RECEIVE_POST_CHATBOTS,
  }
}

export function invalidatePostChatbots() {
  return {
    type: INVALIDATE_POST_CHATBOTS,
  }
}

export function requestPatchChatbots() {
  return {
    type: REQUEST_PATCH_CHATBOTS,
  }
}

export function receivePatchChatbots() {
  return {
    type: RECEIVE_PATCH_CHATBOTS,
  }
}

export function invalidatePatchChatbots() {
  return {
    type: INVALIDATE_PATCH_CHATBOTS,
  }
}

export function requestDeleteChatbots() {
  return {
    type: REQUEST_DELETE_CHATBOTS,
  }
}

export function receiveDeleteChatbots() {
  return {
    type: RECEIVE_DELETE_CHATBOTS,
  }
}

export function invalidateDeleteChatbots() {
  return {
    type: INVALIDATE_DELETE_CHATBOTS,
  }
}

export function requestStartChatbots() {
  return {
    type: REQUEST_START_CHATBOTS,
  }
}

export function receiveStartChatbots() {
  return {
    type: RECEIVE_START_CHATBOTS,
  }
}

export function invalidateStartChatbots() {
  return {
    type: INVALIDATE_START_CHATBOTS,
  }
}

export function requestStopChatbots() {
  return {
    type: REQUEST_STOP_CHATBOTS,
  }
}

export function receiveStopChatbots() {
  return {
    type: RECEIVE_STOP_CHATBOTS,
  }
}

export function invalidateStopChatbots() {
  return {
    type: INVALIDATE_STOP_CHATBOTS,
  }
}

export function requestLaunchChatbots() {
  return {
    type: REQUEST_LAUNCH_CHATBOTS,
  }
}

export function receiveLaunchChatbots() {
  return {
    type: RECEIVE_LAUNCH_CHATBOTS,
  }
}

export function invalidateLaunchChatbots() {
  return {
    type: INVALIDATE_LAUNCH_CHATBOTS,
  }
}

export function requestTalkChatbots() {
  return {
    type: REQUEST_TALK_CHATBOTS,
  }
}

export function receiveTalkChatbots(chatbotResponse) {
  return {
    type: RECEIVE_TALK_CHATBOTS,
    chatbotResponse: chatbotResponse,
    receivedAt: Date.now()
  }
}

export function invalidateTalkChatbots() {
  return {
    type: INVALIDATE_TALK_CHATBOTS,
  }
}

export function startChatbot(companyId, userId, chatbotId) {
  return function(dispatch) {
    dispatch(requestStartChatbots());
    return axios.get(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/start`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveStartChatbots());
      }
      else
        dispatch(invalidateStartChatbots());
    })
    .catch(err => console.log(err));
  }
}

export function stopChatbot(companyId, userId, chatbotId) {
  return function(dispatch) {
    dispatch(requestStopChatbots());
    return axios.get(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/stop`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveStopChatbots());
      }
      else
        dispatch(invalidateStopChatbots());
    })
    .catch(err => console.log(err));
  }
}

export const launchChatbot = (companyId, userId, chatbotId, testId) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestLaunchChatbots());
    return axios.get(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/tests/${testId}/launch`)
    .then((res) => {
      console.log(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/tests/${testId}/launch`);
      if (res.status === 200) {
        dispatch(receiveLaunchChatbots());
        resolve(res.data);
      }
      else
        dispatch(invalidateLaunchChatbots());
        reject();
    })
    .catch(err => console.log(err));
  });

export function talkChatbot(companyId, userId, chatbotId, webhook_url, msg) {
  return function(dispatch) {
    dispatch(requestTalkChatbots());
    console.log(msg);
    return axios({
      method: 'post',
      url: `${webhook_url}`,
      data: {
        message: msg
      }
    })
    .then((res) => {
      if (res.status === 201) {
        dispatch(receiveTalkChatbots(res.data));
      }
      else
        dispatch(invalidateTalkChatbots());
    })
    .catch(err => console.log(err));
  }
}

export function getChatbots() {
  return function(dispatch) {
    dispatch(requestGetChatbots());
    return axios.get(`${process.env.API_HOST}/v1/chatbots`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveGetChatbots(res.data));
      }
      else
        dispatch(invalidateGetChatbots());
    })
    .catch(err => console.log(err));
  }
}

export function getChatbotsByCompany(id) {
  return function(dispatch) {
    dispatch(requestGetChatbotsByCompany());
    return axios.get(`${process.env.API_HOST}/v1/companies/${id}/chatbots`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetChatbotsByCompany(res.data));
      else
        dispatch(invalidateGetChatbotsByCompany());
    })
    .catch(err => console.log(err));
  }
}

export function getChatbotsByUser(companyId, userId) {
  return function(dispatch) {
    dispatch(requestGetChatbotsByUser());
    return axios.get(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetChatbotsByUser(res.data));
      else
        dispatch(invalidateGetChatbotsByUser());
    })
    .catch(err => console.log(err));
  }
}

export const postChatbots = chatbot => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostChatbots());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/chatbots`,
      data: {
        projectName: chatbot.project_name,
        description: chatbot.description,
        //containerMode: chatbot.container_mode,
        webhook_url: chatbot.webhook_url,
        companyId: chatbot.companyId,
        periodicBuild: chatbot.periodic_build
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostChatbots());
        resolve();
      }
      else {
        dispatch(invalidatePostChatbots());
        reject();
      }
    })
    .catch(err => console.log(err));
  });

export const patchChatbots = chatbot => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchChatbots());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/chatbots/${chatbot.id}`,
      data: {
        projectName: chatbot.project_name,
        description: chatbot.description,
        //containerMode: chatbot.container_mode,
        webhook_url: chatbot.webhook_url,
        companyId: chatbot.companyId,
        periodicBuild: chatbot.periodic_build
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchChatbots());
        resolve();
      }
      else
        dispatch(invalidatePatchChatbots());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteChatbots = id => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteChatbots());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/chatbots/${id}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteChatbots());
        resolve();
      }
      else
        dispatch(invalidateDeleteChatbots());
        reject();
    })
    .catch(err => console.log(err));
  });