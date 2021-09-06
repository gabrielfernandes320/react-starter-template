import { useToast } from "@chakra-ui/react";
import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useHistory } from "react-router-dom";
import { ILogin } from "../interfaces/auth/login";
import { IUseAuth } from "../interfaces/auth/use-auth";
import { IUser } from "../interfaces/user/user";
import { loginRoutePath } from "../routes/config";
import AuthHttpService from "../services/http/auth-http";
import Request from "../services/http/request";

const useProvideAuth = () => {
    const AUTH_HEADER_KEY = "Authorization";
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const initialState = {
        isAuthenticated: true,
        user: {} as IUser,
    };

    enum Action {
        Login = "login",
        Logout = "logout",
    }

    interface CountAction {
        type: Action;
        payload: any;
    }

    function reducer(state: any, action: CountAction) {
        const { type, payload } = action;
        switch (type) {
            case Action.Login:
                return {
                    ...state,
                    isAuthenticated: true,
                    user: payload.user,
                };
            case Action.Logout:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: {},
                } as IUseAuth;
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const check = async () => {
            setIsLoading(true);

            try {
                const { data } = await AuthHttpService.getAuthenticatedUser();
                dispatch({ type: Action.Login, payload: data });
            } catch (error) {
                dispatch({ type: Action.Logout, payload: {} });
            }
            console.log("aqui");
            setIsLoading(false);
            return;
        };

        check();
    }, [Action.Login, Action.Logout]);

    const login = async (login: ILogin) => {
        const loginResponse = await AuthHttpService.login(login);
        const { data } = loginResponse;

        dispatch({ type: Action.Login, payload: data });

        if (!data) {
            toast({
                title: "General Error.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }

        Request.setHeader(AUTH_HEADER_KEY, data);
    };

    const logout = async () => {
        await AuthHttpService.logout();
        history.push(loginRoutePath);
    };

    return { login, logout, isLoading, ...state } as IUseAuth;
};

const AuthContext = createContext<IUseAuth>({} as IUseAuth);
const useAuth = () => useContext(AuthContext);

function AuthProvider(props: any) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth} {...props} />;
}

export { AuthProvider, useAuth, useProvideAuth };
