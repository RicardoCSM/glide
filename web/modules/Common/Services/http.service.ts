import { getToken } from '@/app/auth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, } from 'axios';

const API_ENDPOINT: string = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://glide.serveo.net/';

const config: AxiosRequestConfig = {
  baseURL: API_ENDPOINT,
};

const httpClient: AxiosInstance = axios.create(config);

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default httpClient;