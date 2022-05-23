import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { errorHandleService } from './errorHandleService';
import { getUserFromLocalStorage } from './localStorage';


const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_APP_BASE_URL,
});

instance.interceptors.request.use(function (config) {
  const userData = getUserFromLocalStorage();
  const token = userData?.user.token;
  if (config.headers) config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<{
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
        unknown, string> =>
        async ({ url, method, data, params }) => {
          try {
            const result = await instance({ url: baseUrl + url, method, data, params });
            return { data: result.data };
          } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
              error: errorHandleService(err),
            };
          }
        };
