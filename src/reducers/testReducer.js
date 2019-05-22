import {
  INVALIDATE_GET_TESTS, REQUEST_GET_TESTS, RECEIVE_GET_TESTS,
  INVALIDATE_GET_TESTS_BY_CHATBOT, REQUEST_GET_TESTS_BY_CHATBOT, RECEIVE_GET_TESTS_BY_CHATBOT,
  INVALIDATE_POST_TESTS, REQUEST_POST_TESTS, RECEIVE_POST_TESTS,
  INVALIDATE_PATCH_TESTS, REQUEST_PATCH_TESTS, RECEIVE_PATCH_TESTS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  tests: [],
  testsFiltered: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_TESTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_TESTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_TESTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        tests: action.tests,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_TESTS_BY_CHATBOT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_TESTS_BY_CHATBOT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_TESTS_BY_CHATBOT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        testsFiltered: action.testsFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_TESTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_TESTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_TESTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_TESTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_TESTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_TESTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}