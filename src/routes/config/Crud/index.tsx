import React from "react";
import { Route, Switch } from "react-router-dom";
import { List } from "../../../pages/Crud";

export const crudRoutePath = "/crud";

export const CrudRoutesComponent: React.FC = () => (
  <Switch>
    <Route path={crudRoutePath} component={List} exact />
  </Switch>
);
