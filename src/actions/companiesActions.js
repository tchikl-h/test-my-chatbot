import {
  INVALIDATE_GET_COMPANIES, REQUEST_GET_COMPANIES, RECEIVE_GET_COMPANIES,
  INVALIDATE_POST_COMPANIES, REQUEST_POST_COMPANIES, RECEIVE_POST_COMPANIES,
  INVALIDATE_PATCH_COMPANIES, REQUEST_PATCH_COMPANIES, RECEIVE_PATCH_COMPANIES,
  INVALIDATE_DELETE_COMPANIES, REQUEST_DELETE_COMPANIES, RECEIVE_DELETE_COMPANIES,
} from "./actionTypes";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.ADMIN_TOKEN;

export function requestGetCompanies() {
  return {
    type: REQUEST_GET_COMPANIES,
  }
}

export function receiveGetCompanies(companies) {
  return {
    type: RECEIVE_GET_COMPANIES,
    companies: companies,
    receivedAt: Date.now()
  }
}

export function invalidateGetCompanies() {
  return {
    type: INVALIDATE_GET_COMPANIES,
  }
}

export function requestPostCompanies() {
  return {
    type: REQUEST_POST_COMPANIES,
  }
}

export function receivePostCompanies() {
  return {
    type: RECEIVE_POST_COMPANIES,
  }
}

export function invalidatePostCompanies() {
  return {
    type: INVALIDATE_POST_COMPANIES,
  }
}

export function requestPatchCompanies() {
  return {
    type: REQUEST_PATCH_COMPANIES,
  }
}

export function receivePatchCompanies() {
  return {
    type: RECEIVE_PATCH_COMPANIES,
  }
}

export function invalidatePatchCompanies() {
  return {
    type: INVALIDATE_PATCH_COMPANIES,
  }
}

export function requestDeleteCompanies() {
  return {
    type: REQUEST_DELETE_COMPANIES,
  }
}

export function receiveDeleteCompanies() {
  return {
    type: RECEIVE_DELETE_COMPANIES,
  }
}

export function invalidateDeleteCompanies() {
  return {
    type: INVALIDATE_DELETE_COMPANIES,
  }
}

export function getCompanies() {
  return function(dispatch) {
    dispatch(requestGetCompanies());
    return axios.get(`${process.env.API_HOST}/v1/companies`)
    .then((res) => {
      if (res.status === 200)
        dispatch(receiveGetCompanies(res.data));
      else
        dispatch(invalidateGetCompanies());
    })
    .catch(err => console.log(err));
  }
}

export const postCompanies = (name, description) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPostCompanies());
    return axios({
      method: 'post',
      url: `${process.env.API_HOST}/v1/companies`,
      data: {
        companyName: name,
        companyDescription: description,
        premium: false
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePostCompanies());
        resolve(res.data);
      }
      else
        dispatch(invalidatePostCompanies());
        reject();
    })
    .catch(err => console.log(err));
  });

export const patchCompanies = (id, name, description) => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestPatchCompanies());
    return axios({
      method: 'patch',
      url: `${process.env.API_HOST}/v1/companies/${id}`,
      data: {
        companyName: name,
        companyDescription: description
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receivePatchCompanies());
        resolve();
      }
      else
        dispatch(invalidatePatchCompanies());
        reject();
    })
    .catch(err => console.log(err));
  });

export const deleteCompanies = id => (dispatch) =>
  new Promise(function(resolve, reject) {
    dispatch(requestDeleteCompanies());
    return axios({
      method: 'delete',
      url: `${process.env.API_HOST}/v1/companies/${id}`
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(receiveDeleteCompanies());
        resolve();
      }
      else
        dispatch(invalidateDeleteCompanies());
        reject();
    })
    .catch(err => console.log(err));
  });