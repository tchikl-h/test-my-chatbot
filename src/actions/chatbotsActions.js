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
  console.log(chatbots)
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

export function startChatbot(companyId, userId, chatbotId) {
  return function(dispatch) {
    dispatch(requestStartChatbots());
    return fetch(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
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
    return fetch(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/stop`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveStopChatbots());
      }
      else
        dispatch(invalidateStopChatbots());
    })
    .catch(err => console.log(err));
  }
}

export function launchChatbot(companyId, userId, chatbotId) {
  return function(dispatch) {
    dispatch(requestLaunchChatbots());
    return fetch(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots/${chatbotId}/launch`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveLaunchChatbots());
      }
      else
        dispatch(invalidateLaunchChatbots());
    })
    .catch(err => console.log(err));
  }
}

export function getChatbots() {
  return function(dispatch) {
    dispatch(requestGetChatbots());
    return fetch(`${process.env.API_HOST}/v1/chatbots`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveGetChatbots(res));
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
    return fetch(`${process.env.API_HOST}/v1/companies/${id}/chatbots`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res) {
        dispatch(receiveGetChatbotsByCompany(res));
      }
      else
        dispatch(invalidateGetChatbotsByCompany());
    })
    .catch(err => console.log(err));
  }
}

export function getChatbotsByUser(companyId, userId) {
  return function(dispatch) {
    dispatch(requestGetChatbotsByUser());
    return fetch(`${process.env.API_HOST}/v1/companies/${companyId}/users/${userId}/chatbots`, {headers: {Authorization: process.env.ADMIN_TOKEN}})
    .then(response => response.json())
    .then((res) => {
      if (res)
        dispatch(receiveGetChatbotsByUser(res));
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
        dialogflowProjectId: chatbot.dialogflow_project_id,
        dialogflowClientEmail: chatbot.dialogflow_client_email,
        dialogflowPrivateKey: chatbot.dialogflow_private_key,
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
        dialogflowProjectId: chatbot.dialogflow_project_id,
        dialogflowClientEmail: chatbot.dialogflow_client_email,
        dialogflowPrivateKey: chatbot.dialogflow_private_key,
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