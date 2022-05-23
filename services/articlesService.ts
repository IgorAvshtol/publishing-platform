import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IArticleData, IGetArticles } from 'lib/interfaces';


export const articlesService = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (build) => ({
    getAllArticles: build.query<IGetArticles, string>({
      query: () => ({
        url: '/articles',
        method: 'GET'
      }),
    }),
    getCurrentUserArticles: build.query<IGetArticles, string>({
      query: (username: string) => ({
        url: `articles?author=${username}`,
        method: 'GET'
      }),
    }),
    getCurrentArticle: build.query<IArticleData, string>({
      query: (slug: string) => ({
        url: `articles/${slug}`,
        method: 'GET'
      }),
    }),
  })
});