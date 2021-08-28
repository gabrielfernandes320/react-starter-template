import { IUser } from "./../interfaces/user/user";
import { IUseAuth } from "./../interfaces/auth/useAuth";
import AuthHttpService from "../services/http/login-http";
import { ILogin } from "../interfaces/auth/login";
import Request from "../services/http/request";
import { useHistory } from "react-router-dom";
import { loginRoutePath } from "../routes/config";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const useAuth = () => {
    const AUTH_HEADER_KEY = "Authorization";
    const history = useHistory();

    const [user, setUser] = useState<IUser>();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const check = async () => {
            setIsLoading(true);

            try {
                const { data } = await AuthHttpService.getAuthenticatedUser();
                setUser(data);
                setIsAuthenticated(true);
            } catch (error) {
                setUser({} as IUser);
                setIsAuthenticated(false);
            }

            setIsLoading(false);
            return;
        };

        check();
    }, [toast]);

    const login = async (login: ILogin) => {
        const loginResponse = await AuthHttpService.login(login);
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

        setUser(data.user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await AuthHttpService.logout();
        history.push(loginRoutePath);
    };

    return { login, logout, isAuthenticated, user, isLoading } as IUseAuth;
};

export default useAuth;
