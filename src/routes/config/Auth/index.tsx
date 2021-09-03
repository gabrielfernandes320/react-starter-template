import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../../pages/authentication/Login";
import AccountRecovery from "../../../pages/authentication/AccountRecovery";
import PasswordChange from "../../../pages/authentication/PasswordChange";

export const loginRoutePath = "/login";
export const signInRoutePath = "/signin";
export const accountRecoveryRoutePath = "/account-recovery";
export const changePasswordRoutePath = "/change-password/:token";

export const AuthRoutesComponent: React.FC = () => (
    <Switch>
        <Route path={loginRoutePath} component={Login} exact />
        <Route
            path={changePasswordRoutePath}
            component={PasswordChange}
            exact
        />
        <Route
            path={accountRecoveryRoutePath}
            component={AccountRecovery}
            exact
        />
    </Switch>
);
