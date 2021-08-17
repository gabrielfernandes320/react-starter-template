import React from "react";
import { Switch, Route } from "react-router-dom";
import {
    AuthRoutesComponent,
    loginRoutePath,
    HomeRoutesComponent,
    homeRoutePath,
    UsersRoutesComponent,
    NotFoundRoutesComponent,
} from "./config";

const AppRoutes: React.FC = () => (
    <Switch>
        <Route path={loginRoutePath} component={AuthRoutesComponent} />
        <Route path={homeRoutePath} component={HomeRoutesComponent} />
        <UsersRoutesComponent />
        <Route component={NotFoundRoutesComponent} />
    </Switch>
);

export default AppRoutes;
