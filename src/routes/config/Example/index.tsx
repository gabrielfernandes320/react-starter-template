import React from "react";
import { Switch } from "react-router-dom";
import { List } from "../../../pages/Example";
import PrivateRoute from "../../components/PrivateRoute";

export const exampleRoutePath = "/example";

export const ExampleRoutesComponent: React.FC = () => (
  <Switch>
    <PrivateRoute path={exampleRoutePath} component={List} exact />
  </Switch>
);
