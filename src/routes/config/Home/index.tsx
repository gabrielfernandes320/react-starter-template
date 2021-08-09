import { Button } from "@chakra-ui/react";
import React from "react";
import { Switch } from "react-router-dom";
import Home from "../../../pages/home";
import PrivateRoute from "../../components/PrivateRoute";

export const homeRoutePath = "/home";

export const HomeRoutesComponent: React.FC = () => (
  <Switch>
    <PrivateRoute path={homeRoutePath} component={Home} exact />


    <Button rounded={"xl"} mx={5} fontSize={"lg"} />
    
    
  </Switch>
);
