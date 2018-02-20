import * as fromLogin from './login.js';

export const getCheckedLoggedIn = (state) =>
  fromLogin.getCheckedLoggedIn(state.login);

export const getToken = (state) =>
  fromLogin.getToken(state.login);
