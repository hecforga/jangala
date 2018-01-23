import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import AppWithNavigationState from '../navigators/AppNavigator.js';

const Root = ({ store, client }) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </ApolloProvider>
);

export default Root;
