import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { articlesService } from 'services/articlesService';
import { authReducer } from './auth/authSlice';
import { authService } from 'services/authService';
import { tagsService } from 'services/tagsService';
import { profileService } from 'services/profileService';


export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [articlesService.reducerPath]: articlesService.reducer,
    [authService.reducerPath]: authService.reducer,
    [tagsService.reducerPath]: tagsService.reducer,
    [profileService.reducerPath]: profileService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(articlesService.middleware, authService.middleware, tagsService.middleware, profileService.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
