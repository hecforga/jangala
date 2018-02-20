import { LoggedInAppNavigator, LoggedOutAppNavigator } from '../navigators/AppNavigator.js';

const initialLoggedInNavState = null;
const initialLoggedOutNavState = null;

export const loggedInNav = (state = initialLoggedInNavState, action) => {
  let nextState;
  if (action.type === 'LOG_OUT_SUCCESS') {
    return initialLoggedInNavState;
  } else {
    nextState = LoggedInAppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export const loggedOutNav = (state = initialLoggedOutNavState, action) => {
  const nextState = LoggedOutAppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};