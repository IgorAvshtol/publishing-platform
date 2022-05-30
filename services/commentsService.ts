import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

import { IComment, ICreateComment, IDeleteComment, IGetComments } from 'lib/interfaces';


export const commentsService = createApi({
  reducerPath: 'commentsAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api/'
  }),
  endpoints: (build) => ({
    getAllComments: build.query<IGetComments, string>({
      query: (slug: string) => ({
        url: `articles/${slug}/comments`,
        method: 'GET'
      }),
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
    }),
    deleteComment: build.mutation<IComment, IDeleteComment>({
      query: (data: IDeleteComment) => ({
        url: `articles/${data.slug}/comments/${data.id}`,
        method: 'DELETE',
      }),
    }),
  })
});
