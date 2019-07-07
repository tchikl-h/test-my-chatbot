/* eslint-disable import/default */
import 'babel-polyfill';
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import injectTapEventPlugin from "react-tap-event-plugin";
require("./favicon.ico");
import "./styles.scss";
import "font-awesome/css/font-awesome.css";
import "flexboxgrid/css/flexboxgrid.css";

import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger'

import reducers from "./reducers";
const loggerMiddleware = createLogger()

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(
  createStore
);

const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    {/*<MuiThemeProvider muiTheme={getMuiTheme()}>*/}
    <Router routes={routes} history={browserHistory} />
    {/*</MuiThemeProvider>*/}
  </Provider>,
  document.getElementById("root")
);
