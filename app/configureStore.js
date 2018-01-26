import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import nav from './reducers/navigation.js';

const configureStore = () => {

  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    //middlewares.push(createLogger());
  }

  return createStore(
    combineReducers({
      nav
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;