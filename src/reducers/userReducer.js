import {
  INVALIDATE_GET_USERS, REQUEST_GET_USERS, RECEIVE_GET_USERS,
  INVALIDATE_GET_USERS_BY_COMPANY, REQUEST_GET_USERS_BY_COMPANY, RECEIVE_GET_USERS_BY_COMPANY,
  INVALIDATE_POST_USERS, REQUEST_POST_USERS, RECEIVE_POST_USERS,
  INVALIDATE_PATCH_USERS, REQUEST_PATCH_USERS, RECEIVE_PATCH_USERS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  users: [],
  usersFiltered: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_USERS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_USERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_USERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        users: action.users,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_USERS_BY_COMPANY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_USERS_BY_COMPANY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_USERS_BY_COMPANY:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        usersFiltered: action.usersFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_USERS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_USERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_USERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_USERS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_USERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_USERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}