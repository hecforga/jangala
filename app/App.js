import React, { Component } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

import configureStore from './configureStore.js';

import Root from './components/Root.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.client = new ApolloClient({
      link: new HttpLink({ uri: 'https://jangala.herokuapp.com' }),
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
