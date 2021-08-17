import { ILogin } from "../../interfaces/auth/login";
import Request from "./request";

export default class AuthHttpService {
    public static uri = "/auth";

    public static login(login: ILogin) {
        return Request.post(`${this.uri}/login`, login);
    }

    public static forgotPassword(email: string) {
        return Request.post(`${this.uri}/send-password-reset-request`, {
            email,
        });
    }

    public static resetPassword(data: Object) {
        return Request.post(`${this.uri}/reset-password`, data);
    }

    public static getAuthenticatedUser() {
        return Request.get(`${this.uri}/user`);
    }

    public static logout() {
        return Request.post(`${this.uri}/logout`);
    }
}
