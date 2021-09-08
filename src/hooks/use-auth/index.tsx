import { useToast } from "@chakra-ui/react";
import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useHistory } from "react-router-dom";
import { ILogin } from "../../interfaces/auth/login";
import { IAuthInitialState, IUseAuth } from "./interfaces";
import { loginRoutePath } from "../../routes/config";
import AuthHttpService from "../../services/http/auth-http";
import ActionType from "./enums/action-type-enum";
import authReducer from "./reducers/auth-reducer";

const useProvideAuth = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const initialState: IAuthInitialState = {
        isAuthenticated: true,
        user: {},
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const check = async () => {
            setIsLoading(true);
            try {
                const { data: user } =
                    await AuthHttpService.getAuthenticatedUser();
                dispatch({ type: ActionType.Login, payload: { user } });
            } catch (error) {
                dispatch({ type: ActionType.Logout, payload: {} });
            }
            setIsLoading(false);
            return;
        };

        check();
    }, []);

    const login = async (login: ILogin) => {
        const { data } = await AuthHttpService.login(login);

        dispatch({ type: ActionType.Login, payload: data });

        if (!data) {
            toast({
                title: "General Error.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
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

export { AuthProvider, useAuth };
