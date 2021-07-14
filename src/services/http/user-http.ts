import { DateTime } from "luxon";
import { IUser } from "../../interfaces/user/user";
import Request from "./request";
import RoleHttpService from "./role-http";

export default class UserHttpService {
  public static uri = "/users";

  public static index() {
    return Request.get<IUser[]>(this.uri);
  }

  public static async destroy(id: number) {
    return await Request.del(`${this.uri}/${id}`);
  }

  public static show(id: string) {
    return Request.get<IUser>(`${this.uri}/${id}`);
  }

  public static async store(data: IUser) {
    if (data.id) {
      return this.update(data);
    }

    return Request.post<IUser>(this.uri, await this.formatData(data));
  }

  public static update(data: IUser) {
    return Request.put<IUser>(`${this.uri}/${data.id}`, data);
  }

  //Only necessary because of the mocked API
  private static async formatData(data: IUser) {
    const { data: role } = await RoleHttpService.show(data.roleId);
    console.log(DateTime.now());
    data.enabled = true;
    data.role = role;
    data.createdAt = DateTime.now();
    data.updatedAt = DateTime.now();

    return data;
  }
}
