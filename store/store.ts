import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/authSlice';
import { platformService } from 'services/platformService';


export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [platformService.reducerPath]: platformService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(platformService.middleware)
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
