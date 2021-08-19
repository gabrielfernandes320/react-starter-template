import { DateTime } from "luxon";

export interface IPermission {
    id: number;
    name: string;
    resource: string;
    action: string;
    reference: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletetAt?: DateTime;
}
