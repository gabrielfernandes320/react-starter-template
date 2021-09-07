import { IAuthAction } from "../../interfaces/auth/auth-action";
import { ActionType } from "../../enums/auth/action-type-enum";
import { IUseAuth } from "../../interfaces/auth/use-auth";

export default function authReducer(state: any, action: IAuthAction) {
    const { type, payload } = action;
    switch (type) {
        case ActionType.Login:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
            };
        case ActionType.Logout:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            } as IUseAuth;
        default:
            throw new Error();
    }
}
