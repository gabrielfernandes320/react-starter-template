import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  AuthRoutesComponent,
  loginRoutePath,
  HomeRoutesComponent,
  homeRoutePath,
  ExampleRoutesComponent,
  exampleRoutePath,
} from "./config";

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path={loginRoutePath} component={AuthRoutesComponent} />
    <Route path={homeRoutePath} component={HomeRoutesComponent} />
    <Route path={exampleRoutePath} component={ExampleRoutesComponent} />
  </Switch>
);

export default AppRoutes;
