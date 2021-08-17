import { DateTime } from "luxon";
import { IRole } from "../role/role";

export interface IUser {
    id: number;
    name: string;
    enabled: boolean;
    email: string;
    password?: string;
    passwordConfirmation?: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletetAt?: DateTime;
    roles: IRole[];
}
