import { DateTime } from "luxon";

export interface IRole {
    id: number;
    reference: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletetAt?: DateTime;
}
