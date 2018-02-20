import { AsyncStorage } from "react-native";
import { AUTH_TOKEN_KEY, token } from '../constants.js';

export const checkLoggedIn = () => (dispatch, getState) => {

  AsyncStorage.getItem(AUTH_TOKEN_KEY).then((token) => {
    dispatch({
      type: 'CHECK_LOGGED_IN',
      token: token
    });
  }).catch(
    error => console.log('error in check token action')
  );
};

export const logIn = () => (dispatch, getState) => {

  AsyncStorage.setItem(AUTH_TOKEN_KEY, token).then(() => {
    dispatch({    
      type: 'SET_TOKEN',
      token: token
    });
  }).catch(
    error => console.log('error in set token action')
  );  
};

export const logOut = () => (dispatch, getState) => {

  AsyncStorage.removeItem(AUTH_TOKEN_KEY).then(() => {
    dispatch({    
      type: 'SET_TOKEN',
      token: null
    });
  }).catch(
    error => console.log('error in remove token action')
  );  
};