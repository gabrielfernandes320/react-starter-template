import { IRole } from "../../interfaces/role/role";
import Request from "./request";

export default class RoleHttpService {
    public static uri = "/v1/roles";

    public static index() {
        return Request.get<IRole[]>(this.uri);
    }

    public static async destroy(id: number) {
        return await Request.del(`${this.uri}/${id}`);
    }

    public static show(id: string) {
        return Request.get(`${this.uri}/${id}`);
    }

    public static store(data: IRole) {
        return Request.post(this.uri, data);
    }

    public static update(data: IRole) {
        return Request.patch(`${this.uri}/${data.id}`, data);
    }
}
