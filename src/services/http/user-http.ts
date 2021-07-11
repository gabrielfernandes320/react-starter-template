import { IUser } from "../../interfaces/user/user";
import Request from "./request";

export default class UserHttpService {
  public static uri = "/users";

  public static index() {
    return Request.get<IUser[]>(this.uri);
  }

  public static async destroy(id: number) {
    return await Request.del(`${this.uri}/${id}`);
  }

  public static show(id: string) {
    return Request.get(`${this.uri}/${id}`);
  }

  public static store(data: IUser) {
    return Request.post(this.uri, data);
  }

  public static update(data: IUser) {
    return Request.put(`${this.uri}/${data.id}`, data);
  }
}
