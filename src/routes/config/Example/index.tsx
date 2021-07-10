import React from "react";
import { Switch } from "react-router-dom";
import { List } from "../../../pages/Users";
import PrivateRoute from "../../components/PrivateRoute";

export const usersRoutePath = "/users";

export const UsersRoutesComponent: React.FC = () => (
  <Switch>
    <PrivateRoute path={usersRoutePath} component={List} exact />
  </Switch>
);
