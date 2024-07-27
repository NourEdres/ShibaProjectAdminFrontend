import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const URL = "http://localhost:8080";
// const URL = "https://sheba-service-gcp-tm3zus3bzq-uc.a.run.app"

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const loginInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});


class GenericAPI {


  setAuthToken(token: string | null) {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

  get = async <T>(
    url: string,
    params?: AxiosRequestConfig['params'],
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, { ...options, headers, params });
  };

  post = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url, data, { ...options, headers });
  };

  postFormData = async <T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    const config = {
      ...options,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    };
    return axiosInstance.post<T>(url, formData, config);
  };

  put = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, { ...options, headers });
  };

  putFormData = async <T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, formData, { ...options, headers });
  };

  delete = async <T>(
    url: string,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, { ...options, headers });
  };

  login = async <T>(
    username: string,
    password: string
  ): Promise<AxiosResponse<T>> => {
    return loginInstance.post<T>("/login", { username, password });
  };

}

export const genericAPI = new GenericAPI();
