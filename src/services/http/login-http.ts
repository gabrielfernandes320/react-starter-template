import Request from "./request";

export default class LoginHttpService {
  public static login(email: string, password: string) {
    return Request.post("/auth/login", {
      email,
      password,
    });
  }

  public static forgotPassword(email: string) {
    return Request.post("/auth/send-password-reset-request", { email });
  }

  public static resetPassword(data: Object) {
    return Request.post("/auth/reset-password", data);
  }

  public static logout() {
    return Request.get("/auth/logout");
  }
}
