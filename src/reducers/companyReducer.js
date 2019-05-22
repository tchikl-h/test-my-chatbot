import {
  INVALIDATE_GET_COMPANIES, REQUEST_GET_COMPANIES, RECEIVE_GET_COMPANIES,
  INVALIDATE_POST_COMPANIES, REQUEST_POST_COMPANIES, RECEIVE_POST_COMPANIES,
  INVALIDATE_PATCH_COMPANIES, REQUEST_PATCH_COMPANIES, RECEIVE_PATCH_COMPANIES,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: "",
  companies: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_GET_COMPANIES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_GET_COMPANIES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_GET_COMPANIES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        companies: action.companies,
        lastUpdated: action.receivedAt
      }
    case INVALIDATE_POST_COMPANIES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POST_COMPANIES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POST_COMPANIES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    case INVALIDATE_PATCH_COMPANIES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PATCH_COMPANIES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PATCH_COMPANIES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state
  }
}