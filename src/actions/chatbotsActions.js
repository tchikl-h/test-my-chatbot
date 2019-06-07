import {
  INVALIDATE_GET_CHATBOTS, REQUEST_GET_CHATBOTS, RECEIVE_GET_CHATBOTS,
  INVALIDATE_GET_CHATBOTS_BY_COMPANY, REQUEST_GET_CHATBOTS_BY_COMPANY, RECEIVE_GET_CHATBOTS_BY_COMPANY,
  INVALIDATE_GET_CHATBOTS_BY_USER, REQUEST_GET_CHATBOTS_BY_USER, RECEIVE_GET_CHATBOTS_BY_USER,
  INVALIDATE_POST_CHATBOTS, REQUEST_POST_CHATBOTS, RECEIVE_POST_CHATBOTS,
  INVALIDATE_PATCH_CHATBOTS, REQUEST_PATCH_CHATBOTS, RECEIVE_PATCH_CHATBOTS,
  INVALIDATE_DELETE_CHATBOTS, REQUEST_DELETE_CHATBOTS, RECEIVE_DELETE_CHATBOTS,
} from "./actionTypes";
import axios from "axios";

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

export function getChatbots() {
  return function(dispatch) {
    dispatch(requestGetChatbots());
    return axios.get('http://localhost:8080/v1/chatbots')
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveGetChatbots(res.data));
      }
      else
        dispatch(invalidateGetChatbots());
    })
  }
}

export function getChatbotsByCompany(id) {
  return function(dispatch) {
    dispatch(requestGetChatbotsByCompany());
    return axios.get(`http://localhost:8080/v1/companies/${id}/chatbots`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetChatbotsByCompany(res.data));
      else
        dispatch(invalidateGetChatbotsByCompany());
    })
  }
}

export function getChatbotsByUser(companyId, userId) {
  return function(dispatch) {
    dispatch(requestGetChatbotsByUser());
    return axios.get(`http://localhost:8080/v1/companies/${companyId}/users/${userId}/chatbots`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetChatbotsByUser(res.data));
      else
        dispatch(invalidateGetChatbotsByUser());
    })
  }
}

export const postChatbots = chatbot => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostChatbots());
    return axios({
      method: 'post',
      url: 'http://localhost:8080/v1/chatbots',
      data: {
        projectName: chatbot.project_name,
        description: chatbot.description,
        containerMode: chatbot.container_mode,
        dialogflowProjectId: chatbot.dialogflow_project_id,
        dialogflowClientEmail: chatbot.dialogflow_client_email,
        dialogflowPrivateKey: chatbot.dialogflow_private_key,
        companyId: chatbot.companyId
      }
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("200");
        dispatch(receivePostChatbots());
        resolve();
      }
      else {
        console.log("500");
        dispatch(invalidatePostChatbots());
        reject();
      }
    })
  });

export const patchChatbots = chatbot => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchChatbots());
    return axios({
      method: 'patch',
      url: `http://localhost:8080/v1/chatbots/${chatbot.id}`,
      data: {
        projectName: chatbot.project_name,
        description: chatbot.description,
        containerMode: chatbot.container_mode,
        dialogflowProjectId: chatbot.dialogflow_project_id,
        dialogflowClientEmail: chatbot.dialogflow_client_email,
        dialogflowPrivateKey: chatbot.dialogflow_private_key,
        companyId: 1 // TODO: change this
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
  });

export const deleteChatbots = id => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteChatbots());
    return axios({
      method: 'delete',
      url: `http://localhost:8080/v1/chatbots/${id}`
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
  });