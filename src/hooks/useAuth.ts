import { IUseAuth } from "./../interfaces/auth/useAuth";
import AuthHttpService from "../services/http/login-http";
import { ILogin } from "../interfaces/auth/login";
import Request from "../services/http/request";
import { useHistory } from "react-router-dom";
import { signInRoutePath } from "../routes/config";
import { useLocalStorageValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

const useAuth = () => {
  const TOKEN_KEY = "@innova-token";
  const AUTH_HEADER_KEY = "Authorization";
  const history = useHistory();
  const [token, setToken] = useLocalStorageValue({
    key: TOKEN_KEY,
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const resp = await AuthHttpService.getAuthenticatedUser();

      setUser(resp.data);
    };

    getUser();

    return () => {};
  }, []);

  const login = async (login: ILogin) => {
    const loginResponse = await AuthHttpService.login(
      login.email,
      login.password
    );
    const { data } = loginResponse;

    if (!data) {
    }

    Request.setHeader(AUTH_HEADER_KEY, data);
    setToken(data.token);
  };

  const isAuthenticated = (): boolean => {
    // if (!token) {
    //   return false;
    // }

    // const resp = await AuthHttpService.validateToken();

    // if (resp.data?.isValid) {
    //   return true;
    // }

    return token ? true : false;
  };

  const logout = async () => {
    await AuthHttpService.logout();

    history.push(signInRoutePath);
  };

  return { login, logout, isAuthenticated, user } as IUseAuth;
};

export default useAuth;
