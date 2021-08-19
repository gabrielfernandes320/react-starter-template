import { IPermission } from "./../permission/permission";
import { DateTime } from "luxon";

export interface IRole {
    id: number;
    reference: string;
    name: string;
    enabled: boolean;
    permissions: IPermission[];
    createdAt: DateTime;
    updatedAt: DateTime;
    deletetAt?: DateTime;
}
