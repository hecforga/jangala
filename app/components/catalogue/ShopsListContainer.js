import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ShopsList from './ShopsList.js';

class ShopsListContainer extends Component {
  render() {
    const { shopsQuery } = this.props;

    if (shopsQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}>
        <ShopsList shops={shopsQuery.shops} onShopButtonPress={this.onShopButtonPress} />
      </View>
    );
  }

  onShopButtonPress = (shopId, shopName) => {
    const { navigation } = this.props;

    navigation.navigate('ShopProfile', {
      shopId,
      title: shopName,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const SHOPS_QUERY = gql`
  query ShopsQuery {
    shops {
      id,
      name,
      logoUrl
    }
  }
`;

export default graphql(SHOPS_QUERY, {
  name: 'shopsQuery'
})(ShopsListContainer);