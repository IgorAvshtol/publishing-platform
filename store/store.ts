import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/authSlice';
import { articlesService } from 'services/articlesService';
import { tagsService } from 'services/tagsService';
import { commentsService } from 'services/commentsService';
import { authService } from 'services/authService';
import { profileService } from '../services/profileService';


export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [articlesService.reducerPath]: articlesService.reducer,
    [tagsService.reducerPath]: tagsService.reducer,
    [commentsService.reducerPath]: commentsService.reducer,
    [authService.reducerPath]: authService.reducer,
    [profileService.reducerPath]: profileService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      articlesService.middleware,
      tagsService.middleware,
      commentsService.middleware,
      authService.middleware,
      profileService.middleware
  )
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
