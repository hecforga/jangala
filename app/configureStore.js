import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { loggedInNav, loggedOutNav } from './reducers/navigation.js';
import login from './reducers/login.js';

const configureStore = () => {

  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    //middlewares.push(createLogger());
  }

  return createStore(
    combineReducers({
      loggedInNav,
      loggedOutNav,
      login,
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;