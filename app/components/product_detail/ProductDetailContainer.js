import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ProductDetailContainer extends Component {
  render() {
    const { productQuery } = this.props;

    if (productQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}>
        <Text>{productQuery.product.title}</Text>
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

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
      id,
      title
    }
  }
`;

export default graphql(PRODUCT_QUERY, {
  name: 'productQuery',
  options: ({ productId }) => ({ variables: { id: productId } }),
})(ProductDetailContainer);