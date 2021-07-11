import { AxiosResponse } from "axios";
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
}
