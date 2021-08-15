import { IUseAuth } from "./../interfaces/auth/useAuth";
import AuthHttpService from "../services/http/login-http";
import { ILogin } from "../interfaces/auth/login";
import Request from "../services/http/request";
import { useHistory } from "react-router-dom";
import { loginRoutePath } from "../routes/config";
import { useLocalStorageValue } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const useAuth = () => {
    const TOKEN_KEY = "@innova-token";
    const AUTH_HEADER_KEY = "Authorization";
    const history = useHistory();
    const [token, setToken] = useLocalStorageValue({
        key: TOKEN_KEY,
    });
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const validateToken = useCallback(async () => {
        if (!token) {
            return false;
        }

        const { data } = await AuthHttpService.validateToken();

        if (data?.isValid) {
            return true;
        }

        return false;
    }, [token]);

    useEffect(() => {
        const check = async () => {
            setIsLoading(true);

            setIsAuthenticated(await validateToken());

            setIsLoading(false);
            return;
        };

        check();
    }, [validateToken]);

    const login = async (login: ILogin) => {
        const loginResponse = await AuthHttpService.login(
            login.email,
            login.password
        );
        const { data } = loginResponse;

        if (!data) {
            toast({
                title: "General Error.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }

        Request.setHeader(AUTH_HEADER_KEY, data);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        setToken("");

        history.push(loginRoutePath);
    };

    return { login, logout, isAuthenticated, user, isLoading } as IUseAuth;
};

export default useAuth;
