import {
  INVALIDATE_GET_CHATBOTS, REQUEST_GET_CHATBOTS, RECEIVE_GET_CHATBOTS,
  INVALIDATE_GET_CHATBOTS_BY_COMPANY, REQUEST_GET_CHATBOTS_BY_COMPANY, RECEIVE_GET_CHATBOTS_BY_COMPANY,
  INVALIDATE_GET_CHATBOTS_BY_USER, REQUEST_GET_CHATBOTS_BY_USER, RECEIVE_GET_CHATBOTS_BY_USER,
  INVALIDATE_POST_CHATBOTS, REQUEST_POST_CHATBOTS, RECEIVE_POST_CHATBOTS,
  INVALIDATE_PATCH_CHATBOTS, REQUEST_PATCH_CHATBOTS, RECEIVE_PATCH_CHATBOTS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  chatbots: [],
  chatbotsFiltered: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        chatbots: action.chatbots,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_CHATBOTS_BY_COMPANY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_CHATBOTS_BY_COMPANY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_CHATBOTS_BY_COMPANY:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        chatbotsFiltered: action.chatbotsFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_CHATBOTS_BY_USER:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_CHATBOTS_BY_USER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_CHATBOTS_BY_USER:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        chatbotsFiltered: action.chatbotsFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}