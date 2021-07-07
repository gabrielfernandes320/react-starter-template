import { ILogin } from "../../interfaces/auth/login";
import { signInRoutePath } from "../../routes/config";
import LoginHttpService from "../http/login-http";
import Request from "../http/request";
import history from "../history";
import { useLocalStorageValue } from "@mantine/hooks";

export default class AuthService {
  public static async login(login: ILogin) {
    const loginResponse = await LoginHttpService.login(
      login.email,
      login.password
    );
    const { data } = loginResponse;

    if (!data) {
    }

    Request.setHeader("Authorization", data);
    localStorage.setItem("@innova-token", data.token);
  }

  public static async logout() {
    await LoginHttpService.logout();

    history.push(signInRoutePath);
  }
}
