import { IUseAuth } from "./../interfaces/auth/useAuth";
import AuthHttpService from "../services/http/login-http";
import { ILogin } from "../interfaces/auth/login";
import Request from "../services/http/request";
import { useHistory } from "react-router-dom";
import { loginRoutePath } from "../routes/config";
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      setLoading(true);

      setIsAuthenticated(await validateToken());

      setLoading(false);
      return;
    };

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const validateToken = async (): Promise<boolean> => {
    if (!token) {
      return false;
    }

    const { data } = await AuthHttpService.validateToken();

    if (data?.isValid) {
      return true;
    }

    return false;
  };

  const logout = async () => {
    setToken("");

    history.push(loginRoutePath);
  };

  return { login, logout, isAuthenticated, user, loading } as IUseAuth;
};

export default useAuth;