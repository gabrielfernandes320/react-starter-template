import { IUser } from "../../../interfaces/user/user";

export interface IAuthInitialState {
    isAuthenticated: boolean;
    user: Partial<IUser>;
}
