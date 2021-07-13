import { IRole } from "../role/role";

export interface IUser {
  id: number;
  name: string;
  enabled: boolean;
  email: string;
  password: string;
  passwordConfirmation: string;
  createdAt: Date;
  updatedAt: Date;
  deletetAt?: Date;
  roles: IRole[];
}
