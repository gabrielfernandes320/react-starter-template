import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  AuthRoutesComponent,
  loginRoutePath,
  HomeRoutesComponent,
  homeRoutePath,
  UsersRoutesComponent,
  usersRoutePath,
  NotFoundRoutesComponent,
} from "./config";

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path={loginRoutePath} component={AuthRoutesComponent} />
    <Route path={homeRoutePath} component={HomeRoutesComponent} />
    {/* <Route path={usersRoutePath} component={UsersRoutesComponent} /> */}
    <UsersRoutesComponent />
    <Route component={NotFoundRoutesComponent} />
  </Switch>
);

export default AppRoutes;
