import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../../pages/Home";

export const homeRoutePath = "/home";

export const HomeRoutesComponent: React.FC = () => (
  <Switch>
    <Route path={homeRoutePath} component={Home} exact />
  </Switch>
);
