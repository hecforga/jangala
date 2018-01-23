import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ShopsList from './ShopsList.js';

class ShopsListContainer extends Component {
  render() {
    const { visibleShopsQuery } = this.props;

    if (visibleShopsQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ShopsList shops={visibleShopsQuery.visibleShops} onShopButtonPress={this.onShopButtonPress} />
      </View>
    );
  }

  onShopButtonPress = (shopId) => {
    const { navigation } = this.props;

    navigation.navigate('ShopProfile', {
      shopId
    });
  }
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

const VISIBLE_SHOPS_QUERY = gql`
  query VisibleShopsQuery {
    visibleShops {
      id,
      name
    }
  }
`;

export default graphql(VISIBLE_SHOPS_QUERY, {
  name: 'visibleShopsQuery'
})(ShopsListContainer);