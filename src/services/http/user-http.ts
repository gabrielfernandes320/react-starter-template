import { IUser } from "../../interfaces/user/user";
import Request from "./request";

export default class UserHttpService {
    public static uri = "/v1/users";

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

        return Request.post<IUser>(this.uri, data);
    }

    public static update(data: IUser) {
        return Request.patch<IUser>(`${this.uri}/${data.id}`, data);
    }

    //Only necessary because of the mocked API
}
