import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../../pages/Auth/Login";

export const loginRoutePath = "/login";
export const signInRoutePath = "/signin";

export const AuthRoutesComponent: React.FC = () => (
  <Switch>
    <Route path={loginRoutePath} component={Login} exact />
  </Switch>
);
