export interface IUseAuth {
  login: Function;
  logout: Function;
  isAuthenticated: boolean;
  user: {};
  isLoading: boolean;
}
