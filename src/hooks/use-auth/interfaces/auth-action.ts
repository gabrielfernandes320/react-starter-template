import ActionType from "../enums/action-type-enum";
import { IAuthInitialState } from "./initial-state";

export interface IAuthAction {
    type: ActionType;
    payload: Partial<IAuthInitialState>;
}
