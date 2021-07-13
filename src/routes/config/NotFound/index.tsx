import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../../../pages/NotFound";

export const NotFoundRoutesComponent: React.FC = () => (
  <Switch>
    <Route component={NotFound} />
  </Switch>
);
