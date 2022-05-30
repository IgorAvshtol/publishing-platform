import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IArticle, IArticleData, IGetArticles, INewArticle, IUpdateArticle } from 'lib/interfaces';


export const articlesService = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
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
    addNewArticle: build.mutation<IArticle, INewArticle>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        data: {
          article: article
        }
      }),
    }),
    updateArticle: build.mutation<IArticle, IUpdateArticle>({
      query: (data: IUpdateArticle) => {
        const { slug, ...article } = data;
        return (
            {
              url: `article/${data.slug}`,
              method: 'PUT',
              data: {
                article: article
              }
            }
        );
      },
    }),
    deleteArticle: build.mutation<IArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    like: build.mutation<IArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),
    dislike: build.mutation<IArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
    }),
  }),
});
