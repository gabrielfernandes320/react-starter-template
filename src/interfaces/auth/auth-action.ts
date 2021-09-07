import { ActionType } from "../../enums/auth/action-type-enum";
import { IUser } from "../user/user";

export interface IAuthAction {
    type: ActionType;
    payload: { user?: IUser };
}
