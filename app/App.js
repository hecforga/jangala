import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import { ApolloClient, HttpLink, InMemoryCache, from } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';

import { AUTH_TOKEN_KEY } from './constants.js';
import configureStore from './configureStore.js';

import Root from './components/Root.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    const httpLink = new HttpLink({ uri: 'https://jangala.herokuapp.com' });

    const middlewareAuthLink = setContext(operation =>
      AsyncStorage.getItem(AUTH_TOKEN_KEY).then(token => {
        const authorizationHeader = token ? `Bearer ${token}` : null;
        return {
          headers: {
            authorization: authorizationHeader,
          },
        };
      })
    );

    this.client = new ApolloClient({
      link: from([middlewareAuthLink, httpLink]),
      cache: new InMemoryCache(),
    });

    this.store = configureStore();
  }

  render() {
    return (
      <Root store={this.store} client={this.client} />
    );
  }
}
