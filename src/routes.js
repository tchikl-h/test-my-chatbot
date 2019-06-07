import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage.js";
import Dashboard from "./containers/DashboardPage";
import AboutPage from "./containers/AboutPage";
import UserListPage from "./containers/UserListPage";
import UserFormPage from "./containers/UserFormPage";

import ChatbotListPage from "./containers/ChatbotListPage";
import ChatbotFormPage from "./containers/ChatbotFormPage";
import ChatbotDetailPage from "./containers/ChatbotDetailPage";
import ChatbotRegisterTestPage from "./containers/ChatbotRegisterTestPage";
import TestListPage from "./containers/TestListPage";
import HistoryListPage from "./containers/HistoryListPage";

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
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
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
