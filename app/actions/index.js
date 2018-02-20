import { AsyncStorage } from "react-native";
import { AUTH_TOKEN_KEY } from '../constants.js';

export const checkLoggedIn = () => (dispatch, getState) => {
  AsyncStorage.getItem(AUTH_TOKEN_KEY).then((token) => {
    dispatch({
      type: 'CHECK_LOGGED_IN',
      token: token,
    });
  }).catch(
    error => console.log('error in check token action')
  );
};

export const logIn = (token) => (dispatch, getState) => {
  dispatch({
    type: 'LOG_IN_REQUEST',
  });
  AsyncStorage.setItem(AUTH_TOKEN_KEY, token).then(() => {
    dispatch({
      type: 'LOG_IN_SUCCESS',
      token: token,
    });
  }).catch(error => {
    console.log(error);
    dispatch({
      type: 'LOG_IN_FAILURE',
    });
  });
};

export const logOut = () => (dispatch, getState) => {
  AsyncStorage.removeItem(AUTH_TOKEN_KEY).then(() => {
    dispatch({
      type: 'LOG_OUT_SUCCESS',
    });
  }).catch(error => {
    console.log(error);
    dispatch({
      type: 'LOG_OUT_FAILURE',
    });
  });
};