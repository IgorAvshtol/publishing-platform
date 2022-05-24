import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IArticle, IArticleData, IComment, ICreateComment, IDeleteComment, IGetArticles, IGetComments, IRegisterData, ITags, IUserData } from 'lib/interfaces';


export const platformService = createApi({
  reducerPath: 'platformAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
  tagTypes: ['articles', 'currentArticle', 'currentUserArticles', 'comments'],
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
    }),
    getAllArticles: build.query<IGetArticles, string>({
      query: () => ({
        url: '/articles',
        method: 'GET'
      }),
      providesTags: ['articles']
    }),
    getCurrentUserArticles: build.query<IGetArticles, string>({
      query: (username: string) => ({
        url: `articles?author=${username}`,
        method: 'GET'
      }),
      providesTags: ['currentUserArticles']
    }),
    getCurrentArticle: build.query<IArticleData, string>({
      query: (slug: string) => ({
        url: `articles/${slug}`,
        method: 'GET'
      }),
      providesTags: ['currentArticle']
    }),
    getUserProfile: build.query<IUserData, string>({
      query: (username) => ({
        url: `profiles/${username}`,
        method: 'GET',
      }),
    }),
    getAllTags: build.query<ITags, string>({
      query: () => ({
        url: '/tags',
        method: 'GET'
      })
    }),
    getAllComments: build.query<IGetComments, string>({
      query: (slug: string) => ({
        url: `articles/${slug}/comments`,
        method: 'GET'
      }),
      providesTags: ['comments']
    }),
    createComment: build.mutation<IComment, ICreateComment>({
      query: (commentData: ICreateComment) => ({
        url: `articles/${commentData.slug}/comments`,
        method: 'POST',
        data: {
          comment: {
            body:
            commentData.comment
          }
        },
      }),
      invalidatesTags: ['comments']
    }),
    deleteComment: build.mutation<IComment, IDeleteComment>({
      query: (data: IDeleteComment) => ({
        url: `articles/${data.slug}/comments/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comments']
    }),
    like: build.mutation<IArticle, string>({
      query: (slug: string) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['articles', 'currentArticle']
    }),
    dislike: build.mutation<IArticle, string>({
      query: (slug: string) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['articles', 'currentArticle', 'currentUserArticles']
    }),
  })
});
