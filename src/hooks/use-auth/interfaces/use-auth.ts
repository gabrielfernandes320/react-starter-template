import { IUser } from "../../../interfaces/user/user";

export interface IUseAuth {
    login: Function;
    logout: Function;
    isAuthenticated: boolean;
    user: IUser;
    isLoading: boolean;
}
