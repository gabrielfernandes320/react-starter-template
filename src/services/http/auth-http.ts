import { ILogin } from "../../interfaces/auth/login";
import Request from "./request";

export default class AuthHttpService {
    public static uri = "/v1/auth";

    public static login(login: ILogin) {
        return Request.post(`${this.uri}/login`, login);
    }

    public static accountRecovery(email: string) {
        return Request.post(`${this.uri}/password/forgot`, {
            email,
        });
    }

    public static resetPassword(data: Object) {
        return Request.post(`${this.uri}/password/reset`, data);
    }

    public static getAuthenticatedUser() {
        return Request.get(`${this.uri}/user`);
    }

    public static logout() {
        return Request.post(`${this.uri}/logout`);
    }
}
