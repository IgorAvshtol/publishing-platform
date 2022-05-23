import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, IGetCurrentUser } from 'lib/interfaces';
import { removeUserFromLocalStorage } from 'services/localStorage';


const initialState: IAuthState = {
  user: null,
  signInModalOpen: false,
  signUpModalOpen: false,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IGetCurrentUser>) => {
      state.user = action.payload.user;
    },
    isSignInModalOpen: (state) => {
      state.signInModalOpen = !state.signInModalOpen;
    },
    isSignUpModalOpen: (state) => {
      state.signUpModalOpen = !state.signUpModalOpen;
    },
    closeModal: (state) => {
      state.signInModalOpen = false;
      state.signUpModalOpen = false;
    },
    logout: (state) => {
      removeUserFromLocalStorage();
      state.user = null;
    },
  },
});

export const { isSignInModalOpen, isSignUpModalOpen, closeModal, setCurrentUser, logout } = authReducer.actions;