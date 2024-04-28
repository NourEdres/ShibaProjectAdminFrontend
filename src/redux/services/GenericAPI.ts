import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: URL,
});


class GenericAPI {
  get = async <T>(
    url: string,
    params?: AxiosRequestConfig["params"],
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(`${URL}${url}/getAll`, { ...options, headers, params: params });
  };

  post = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(`${URL}${url}/create`, data, { ...options, headers });
  };

  put = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig["headers"],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(`${URL}${url}/update`, data, { ...options, headers });
  };

  delete = async <T>(url: string, headers?: AxiosRequestConfig["headers"], options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(`${URL}${url}/delete`, { ...options, headers });
  };

}

export const genericAPI = new GenericAPI();
