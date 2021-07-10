import Request from "./request";

export default class UserHttpService {
  public static uri = "/users";

  public static index() {
    return Request.get(this.uri);
  }
}
