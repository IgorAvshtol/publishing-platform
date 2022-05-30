import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { ITags } from 'lib/interfaces';


export const tagsService = createApi({
  reducerPath: 'tagsAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
  endpoints: (build) => ({
    getAllTags: build.query<ITags, string>({
      query: () => ({
        url: '/tags',
        method: 'GET'
      })
    }),
  })
});
