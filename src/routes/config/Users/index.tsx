import React from "react";
import { Switch } from "react-router-dom";
import { Detail, List } from "../../../pages/users";
import PrivateRoute from "../../components/PrivateRoute";

export const usersRoutePath = "/users";
export const usersDetailRoutePath = "/users/:id/edit";
export const usersNewRoutePath = "/users/new";

export const UsersRoutesComponent: React.FC = () => (
    <Switch>
        <PrivateRoute path={usersRoutePath} component={List} exact />
        <PrivateRoute path={usersNewRoutePath} component={Detail} exact />
        <PrivateRoute path={usersDetailRoutePath} component={Detail} exact />
    </Switch>
);
