import * as fromLogin from './login.js';

export const isLoginChecking = (state) =>
  fromLogin.isLoginChecking(state.login);

export const isLoggedIn = (state) =>
  fromLogin.isLoggedIn(state.login);
