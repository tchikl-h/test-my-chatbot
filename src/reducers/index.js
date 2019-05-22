import { combineReducers } from "redux";
import { auth } from "./auth";
import { customerReducer } from "./customer";
import { orderReducer } from "./order";
import { productReducer } from "./product";
import companyReducer from "./companyReducer";
import chatbotReducer from "./chatbotReducer";
import userReducer from "./userReducer";
import testReducer from "./testReducer";

const reducers = combineReducers({
  auth,
  customerReducer,
  orderReducer,
  productReducer,
  companyReducer,
  chatbotReducer,
  userReducer,
  testReducer
});

export default reducers;
