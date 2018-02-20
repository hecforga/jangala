import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { loggedInNav, loggedOutNav } from './reducers/navigation.js';
import logIn from './reducers/logIn.js';

const configureStore = () => {

  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    //middlewares.push(createLogger());
  }

  return createStore(
    combineReducers({
      loggedInNav,
      loggedOutNav,
      logIn,
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;