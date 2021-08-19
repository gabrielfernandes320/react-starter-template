import React from "react";
import { Switch } from "react-router-dom";
import { Detail, List } from "../../../pages/roles";
import PrivateRoute from "../../components/PrivateRoute";

export const rolesRoutePath = "/roles";
export const rolesDetailRoutePath = "/roles/:id/edit";
export const rolesNewRoutePath = "/roles/new";

export const RolesRoutesComponent: React.FC = () => (
    <Switch>
        <PrivateRoute path={rolesRoutePath} component={List} exact />
        <PrivateRoute path={rolesNewRoutePath} component={Detail} exact />
        <PrivateRoute path={rolesDetailRoutePath} component={Detail} exact />
    </Switch>
);
