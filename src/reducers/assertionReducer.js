import {
  INVALIDATE_GET_ASSERTIONS, REQUEST_GET_ASSERTIONS, RECEIVE_GET_ASSERTIONS,
  INVALIDATE_GET_ASSERTIONS_BY_TEST, REQUEST_GET_ASSERTIONS_BY_TEST, RECEIVE_GET_ASSERTIONS_BY_TEST,
  INVALIDATE_POST_ASSERTIONS, REQUEST_POST_ASSERTIONS, RECEIVE_POST_ASSERTIONS,
  INVALIDATE_PATCH_ASSERTIONS, REQUEST_PATCH_ASSERTIONS, RECEIVE_PATCH_ASSERTIONS,
  INVALIDATE_DELETE_ASSERTIONS, REQUEST_DELETE_ASSERTIONS, RECEIVE_DELETE_ASSERTIONS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  assertions: [],
  assertionsFiltered: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_ASSERTIONS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_ASSERTIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_ASSERTIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        assertions: action.assertions,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_GET_ASSERTIONS_BY_TEST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_ASSERTIONS_BY_TEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_ASSERTIONS_BY_TEST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        assertionsFiltered: action.assertionsFiltered,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_ASSERTIONS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_ASSERTIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_ASSERTIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_ASSERTIONS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_ASSERTIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_ASSERTIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_DELETE_ASSERTIONS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DELETE_ASSERTIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DELETE_ASSERTIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}