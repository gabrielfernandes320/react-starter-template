import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import {
    AuthRoutesComponent,
    loginRoutePath,
    HomeRoutesComponent,
    homeRoutePath,
    UsersRoutesComponent,
    NotFoundRoutesComponent,
    RolesRoutesComponent,
    accountRecoveryRoutePath,
    changePasswordRoutePath,
} from "./config";

const AppRoutes: React.FC = () => (
    <Switch>
        <Route path={loginRoutePath} component={AuthRoutesComponent} />
        <Route
            path={accountRecoveryRoutePath}
            component={AuthRoutesComponent}
        />
        <Route path={changePasswordRoutePath} component={AuthRoutesComponent} />

        <NavBar>
            <Route path={homeRoutePath} component={HomeRoutesComponent} />
            <UsersRoutesComponent />
            <RolesRoutesComponent />
        </NavBar>
        <Route component={NotFoundRoutesComponent} />
    </Switch>
);

export default AppRoutes;
