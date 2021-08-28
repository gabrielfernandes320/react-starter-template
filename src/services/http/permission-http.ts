import { IPermission } from "../../interfaces/permission/permission";
import Request from "./request";

export default class PermissionHttpService {
    public static uri = "/v1/permissions";

    public static index() {
        return Request.get<IPermission[]>(this.uri);
    }
}
