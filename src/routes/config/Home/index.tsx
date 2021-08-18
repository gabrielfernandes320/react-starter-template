import React from "react";
import { Switch } from "react-router-dom";
import Home from "../../../pages/home";
import PrivateRoute from "../../components/PrivateRoute";

export const homeRoutePath = "/";

export const HomeRoutesComponent: React.FC = () => (
    <Switch>
        <PrivateRoute path={homeRoutePath} component={Home} exact />
    </Switch>
);
