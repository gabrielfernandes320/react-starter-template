import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoutesComponent, loginRoutePath } from "./config";

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path={loginRoutePath} component={AuthRoutesComponent} />
  </Switch>
);

export default AppRoutes;
