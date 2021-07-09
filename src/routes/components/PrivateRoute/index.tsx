import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { loginRoutePath } from "../../config";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";

interface Props extends RouteProps {
  component?: any;
  isPrivate?: any;
  redirectIfNotExact?: any;
  path: any;
  redirectTo?: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Flex
            height="100vh"
            width="full"
            align="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Flex>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: loginRoutePath,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
