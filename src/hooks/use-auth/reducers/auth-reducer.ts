import { IAuthAction } from "../interfaces";
import ActionType from "../enums/action-type-enum";
import { IAuthInitialState } from "../interfaces";

export default function authReducer(
    state: IAuthInitialState,
    action: IAuthAction
) {
    const { type, payload } = action;
    switch (type) {
        case ActionType.Login:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
            } as IAuthInitialState;
        case ActionType.Logout:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            } as IAuthInitialState;
        default:
            throw new Error();
    }
}
