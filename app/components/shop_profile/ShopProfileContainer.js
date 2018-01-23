import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ShopProfileContainer extends Component {
  render() {
    const { shopQuery } = this.props;

    if (shopQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{shopQuery.shop.name}</Text>
      </View>
    );
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

const SHOP_QUERY = gql`
  query ShopQuery($id: ID!) {
    shop(id: $id) {
      id,
      name,
      slogan,
      logoUrl,
      coverImageUrl,
      country
    }
  }
`;

export default graphql(SHOP_QUERY, {
  name: 'shopQuery',
  options: ({ shopId }) => ({ variables: { id: shopId } }),
})(ShopProfileContainer);