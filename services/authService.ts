import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IRegisterData, IUserData } from 'lib/interfaces';


export const authService = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
  endpoints: (build) => ({
    login: build.mutation<IUserData, IRegisterData>({
      query: (signInData) => ({
        url: '/users/login',
        method: 'POST',
        data: {
          user: {
            email: signInData.email,
            password: signInData.password
          }
        },
      }),
    }),
    registration: build.mutation<IUserData, IRegisterData>({
      query: (signUpData) => ({
        url: '/users',
        method: 'POST',
        data: {
          user: {
            username: signUpData.name,
            email: signUpData.email,
            password: signUpData.password
          }
        },
      }),
    })
  })
});
