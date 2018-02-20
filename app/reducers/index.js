import * as fromLogIn from './logIn.js';

export const getCheckedLoggedIn = (state) => 
  fromLogIn.getCheckedLoggedIn(state.logIn);

export const getToken = (state) =>
  fromLogIn.getToken(state.logIn);
