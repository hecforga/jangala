import { LoggedInAppNavigator, LoggedOutAppNavigator } from '../navigators/AppNavigator.js';

// Commented because it was causing problems with TabNavigator
//const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
const initialNavState = null;

export const loggedInNav = (state = initialNavState, action) => {
  const nextState = LoggedInAppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


export const loggedOutNav = (state = initialNavState, action) => {
  const nextState = LoggedOutAppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};