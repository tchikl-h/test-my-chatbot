import { combineReducers } from "redux";
import { auth } from "./auth";
import companyReducer from "./companyReducer";
import chatbotReducer from "./chatbotReducer";
import userReducer from "./userReducer";
import testReducer from "./testReducer";

const reducers = combineReducers({
  auth,
  companyReducer,
  chatbotReducer,
  userReducer,
  testReducer
});

export default reducers;
