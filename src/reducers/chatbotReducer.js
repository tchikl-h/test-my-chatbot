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
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: new Date,
  chatbotResponse: "",
  chatbots: [],
  chatbotsFilteredByCompany: [],
  chatbotsFilteredByUser: [],
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
        chatbotsFilteredByCompany: action.chatbotsFiltered,
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
        chatbotsFilteredByUser: action.chatbotsFiltered,
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
    case INVALIDATE_DELETE_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DELETE_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DELETE_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_START_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_START_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_START_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_STOP_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_STOP_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_STOP_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_LAUNCH_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_LAUNCH_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_LAUNCH_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_TALK_CHATBOTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TALK_CHATBOTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TALK_CHATBOTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        chatbotResponse: action.chatbotResponse,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}