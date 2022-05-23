import { IUserData } from 'lib/interfaces';

const REACT_APP_LOCALSTORAGE_KEY = 'userData';


export const getUserFromLocalStorage = () => {
  const data = localStorage.getItem(REACT_APP_LOCALSTORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const setUserFromLocalStorage = (data: IUserData) => {
  return localStorage.setItem(REACT_APP_LOCALSTORAGE_KEY, JSON.stringify(data));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(REACT_APP_LOCALSTORAGE_KEY);
};