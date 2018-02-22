import { AsyncStorage } from "react-native";
import { AUTH_TOKEN_KEY, token } from '../constants.js';

export const checkLogin = () => (dispatch, getState) => {
  dispatch({
    type: 'CHECK_LOGIN_REQUEST',
  });
  AsyncStorage.getItem(AUTH_TOKEN_KEY).then((token) => {
    dispatch({
      type: 'CHECK_LOGIN_SUCCESS',
      loggedIn: !!token,
    });
  }).catch(error => {
    console.log(error);
    dispatch({
      type: 'CHECK_LOGIN_FAILURE',
    });
  });
};

export const logIn = () => (dispatch, getState) => {
  dispatch({
    type: 'LOG_IN_REQUEST',
  });
  if (!token) {
    dispatch({
      type: 'LOG_IN_FAILURE',
    });
  }
  AsyncStorage.setItem(AUTH_TOKEN_KEY, token).then(() => {
    dispatch({
      type: 'LOG_IN_SUCCESS',
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