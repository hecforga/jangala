import { LoggedInAppNavigator, LoggedOutAppNavigator } from '../navigators/AppNavigator.js';

// Commented because it was causing problems with TabNavigator
//const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
const initialLoggedInNavState = null;
const initialLoggedOutNavState = null;

export const loggedInNav = (state = initialLoggedInNavState, action) => {
  let nextState;
  if (action.type === 'SET_TOKEN' && !action.token) {
    return initialLoggedInNavState;
  } else {
    nextState = LoggedInAppNavigator.router.getStateForAction(action, state);
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


export const loggedOutNav = (state = initialLoggedOutNavState, action) => {
  const nextState = LoggedOutAppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};