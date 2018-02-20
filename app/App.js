import React, { Component } from 'react';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from 'apollo-client-preset';

import configureStore from './configureStore.js';
import token from './constants.js';

import Root from './components/Root.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    const httpLink = new HttpLink({ uri: 'https://jangala.herokuapp.com' });

    const middlewareAuthLink = new ApolloLink((operation, forward) => {
      const authorizationHeader = token ? `Bearer ${token}` : null;
      operation.setContext({
        headers: {
          authorization: authorizationHeader,
        },
      });
      return forward(operation);
    });

    const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

    this.client = new ApolloClient({
      link: httpLinkWithAuthToken,
      cache: new InMemoryCache()
    });

    this.store = configureStore();

  }

  render() {
    return (
      <Root store={this.store} client={this.client}/>
    );
  }
}
