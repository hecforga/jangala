import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductsListHeader from '../products_list/ProductsListHeader.js';
import ProductsList from '../products_list/ProductsList.js';

class CategoryContainer extends Component {
  render() {
    const { navigation, categoryQuery } = this.props;

    if (categoryQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}>
        <ProductsListHeader onFilterButtonPress={this.onFilterButtonPress} />
        <ProductsList navigation={navigation} products={categoryQuery.category.products} />
      </View>
    );
  }

  onFilterButtonPress = () => {
    const { navigation, appliedFilters, setAppliedFilters, categoryQuery } = this.props;

    navigation.navigate('Filters', {
      appliedFilters,
      setAppliedFilters,
      options: {
        shops: categoryQuery.category.shops.map((shop) => shop.name),
      },
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CATEGORY_QUERY = gql`
  query CategoryQuery($id: ID!, $productsWhere: ProductWhereInput!) {
    category(id: $id, orderBy: upda) {
      id,
      name,
      products(where: $productsWhere) {
        id
        price
        imagesUrls
        shop {
          name
        }
      },
      shops {
        name
      }
    }
  }
`;

export default graphql(CATEGORY_QUERY, {
  name: 'categoryQuery',
  options: ({ categoryId, appliedFilters }) => ({
    variables: {
      id: categoryId,
      productsWhere: appliedFilters.shops.length ? { shop: { name_in: appliedFilters.shops } } : {},
    },
  }),
})(CategoryContainer);