import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage.js";
import AboutPage from "./containers/AboutPage";
import UserListPage from "./containers/UserListPage";
import UserFormPage from "./containers/UserFormPage";

import ChatbotListPage from "./containers/ChatbotListPage";
import ChatbotFormPage from "./containers/ChatbotFormPage";
import ChatbotDetailPage from "./containers/ChatbotDetailPage";
import ChatbotRegisterTestPage from "./containers/ChatbotRegisterTestPage";
import TestListPage from "./containers/TestListPage";
import HistoryListPage from "./containers/HistoryListPage";
import SignupPage from "./containers/SignupPage";
import LoginPage from "./containers/LoginPage";
import SubscribePage from "./containers/SubscribePage";
import ChangePasswordPage from "./containers/ChangePasswordPage";

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={ChatbotListPage} />
      {/* <Route path="dashboard" component={Dashboard} /> */}
      <Route path="signup" component={SignupPage} />
      <Route path="login" component={LoginPage} />
      <Route path="users" component={UserListPage} />
      <Route path="user" component={UserFormPage} />
      <Route path="user/:id" component={UserFormPage} />
      <Route path="chatbots" component={ChatbotListPage} />
      <Route path="chatbot" component={ChatbotFormPage} />
      <Route path="chatbot/:id" component={ChatbotDetailPage} />
      <Route path="chatbot/:id/edit" component={ChatbotFormPage} />
      <Route path="chatbot/:id/test" component={ChatbotRegisterTestPage} />
      <Route path="chatbot/:id/tests" component={TestListPage} />
      <Route path="history" component={HistoryListPage} />
      <Route path="about" component={AboutPage} />
      <Route path="subscribe" component={SubscribePage} />
      <Route path="password" component={ChangePasswordPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
