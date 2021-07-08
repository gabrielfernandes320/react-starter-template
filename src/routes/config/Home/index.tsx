import React from "react";
import { Switch } from "react-router-dom";
import Home from "../../../pages/Home";
import PrivateRoute from "../../components/PrivateRoute";

export const homeRoutePath = "/home";

export const HomeRoutesComponent: React.FC = () => (
  <Switch>
    <PrivateRoute path={homeRoutePath} component={Home} exact />
  </Switch>
);
