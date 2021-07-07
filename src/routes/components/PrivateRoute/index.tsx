import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { loginRoutePath } from "../../config";

interface Props extends RouteProps {
  component?: any;
  isPrivate?: any;
  redirectIfNotExact?: any;
  path: any;
  redirectTo?: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  console.log(auth.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? (
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
