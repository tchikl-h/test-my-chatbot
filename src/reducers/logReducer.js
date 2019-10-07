import {
  INVALIDATE_GET_LOGS, REQUEST_GET_LOGS, RECEIVE_GET_LOGS,
  INVALIDATE_GET_LOGS_BY_CHATBOT, REQUEST_GET_LOGS_BY_CHATBOT, RECEIVE_GET_LOGS_BY_CHATBOT,
  INVALIDATE_POST_LOGS, REQUEST_POST_LOGS, RECEIVE_POST_LOGS,
  INVALIDATE_PATCH_LOGS, REQUEST_PATCH_LOGS, RECEIVE_PATCH_LOGS,
  INVALIDATE_DELETE_LOGS, REQUEST_DELETE_LOGS, RECEIVE_DELETE_LOGS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  logs: [],
  logsFiltered: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_LOGS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_LOGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_LOGS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        logs: action.logs,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_LOGS_BY_CHATBOT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_LOGS_BY_CHATBOT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_LOGS_BY_CHATBOT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        logsFiltered: action.logsFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_LOGS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_LOGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_LOGS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_LOGS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_LOGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_LOGS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_DELETE_LOGS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DELETE_LOGS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DELETE_LOGS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}