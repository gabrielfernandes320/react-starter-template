import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { API_URL } from "../../config/api";
import { loginRoutePath } from "../../routes/config";
import history from "../history";
interface RequestParams {
    method: string;
    path: string;
    data?: any;
    config?: AxiosRequestConfig;
}

const HTTP_METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
    DEL: "delete",
};

export const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
    FORBIDDEN: 403,
};

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    withCredentials: true,
    timeoutErrorMessage:
        "Houston nós temos um problema na conexão. Tente novmente mais tarde",
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data.statusCode === HTTP_STATUS.UNAUTHORIZED) {
            history.push(loginRoutePath);
        }
        return Promise.reject(error);
    }
);
class Request {
    public static HTTP_STATUS = HTTP_STATUS;

    public static CancelToken = axios.CancelToken;

    public static isCancel = axios.isCancel;

    public static setHeader(name: string, value: string): void {
        api.defaults.headers[name] = value;
    }

    public static get<T = any, R = AxiosResponse<T>>(
        path: string,
        data = {},
        config?: AxiosRequestConfig
    ): Promise<R> {
        path += `?${this.queryString(data)}`;

        return Request.request({ method: HTTP_METHOD.GET, path, config });
    }

    public static post<T = any, R = AxiosResponse<T>>(
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return Request.request({
            method: HTTP_METHOD.POST,
            path,
            data,
            config,
        });
    }

    public static put<T = any, R = AxiosResponse<T>>(
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return Request.request({ method: HTTP_METHOD.PUT, path, data, config });
    }

    public static patch<T = any, R = AxiosResponse<T>>(
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return Request.request<R>({
            method: HTTP_METHOD.PATCH,
            path,
            data,
            config,
        });
    }

    public static async del<T = any, R = AxiosResponse<T>>(
        path: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return Request.request({ method: HTTP_METHOD.DEL, path, config });
    }

    private static async request<R>({
        method,
        path,
        data = {},
        config = {},
    }: RequestParams): Promise<R> {
        try {
            const response = await Request.httpRequest<R>({
                method,
                path,
                data,
                config,
            });

            return response;
        } catch (error: any) {
            const requestIsCanceled = !error.response;

            if (requestIsCanceled) {
                return Promise.reject(error);
            }

            const { data: errorData } = error.response;

            return Promise.reject(errorData);
        }
    }

    private static async httpRequest<R>({
        method = "get",
        path,
        data,
        config,
    }: RequestParams): Promise<R> {
        // @ts-ignore
        const axiosMethod: Function = api[method];
        const reqConfig = Request.getConfig(config || {});

        if ([HTTP_METHOD.GET, HTTP_METHOD.DEL].includes(method)) {
            return await axiosMethod(path, reqConfig);
        }

        return await axiosMethod(path, data, reqConfig);
    }

    private static getConfig(config: object): object {
        return {
            responseType: "json",
            headers: {
                Authorization: `Bearer ${api.defaults.headers.Authorization}`,
                "Content-Type": "application/json",
            },
            ...config,
        };
    }

    private static queryString(obj: any = {}) {
        return Object.keys(obj)
            .map(function (key) {
                if (
                    obj &&
                    obj[key] &&
                    typeof obj[key] == "object" &&
                    obj[key].length
                ) {
                    let url: any = [];

                    for (let index = 0; index < obj[key].length; index++) {
                        const objeto = obj[key][index];

                        Object.keys(objeto).forEach(function (keyObjeto) {
                            let valorObjeto = objeto[keyObjeto];

                            url.push(
                                `${key}[${index}][${keyObjeto}]=${valorObjeto}`
                            );
                        });
                    }

                    return url.join("&");
                } else {
                    let url = `${key}=${obj[key]}`;

                    return url;
                }
            })
            .join("&");
    }
}

export default Request;
