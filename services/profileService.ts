import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IUserData } from 'lib/interfaces';


export const profileService = createApi({
  reducerPath: 'profileAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
  endpoints: (build) => ({
    getUserProfile: build.query<IUserData, string>({
      query: (username) => ({
        url: `profiles/${username}`,
        method: 'GET',
      }),
    }),
  })
});
