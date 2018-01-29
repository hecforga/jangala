import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CategoriesList from './CategoriesList.js';

class CategoriesListContainer extends Component {
  render() {
    const { categoriesQuery } = this.props;

    if (categoriesQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}>
        <CategoriesList categories={categoriesQuery.categories} onCategoryButtonPress={this.onCategoryButtonPress} />
      </View>
    );
  }

  onCategoryButtonPress = (categoryId, categoryName) => {
    const { navigation } = this.props;

    navigation.navigate('Category', {
      categoryId,
      title: categoryName,
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

const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      id,
      name
    }
  }
`;

export default graphql(CATEGORIES_QUERY, {
  name: 'categoriesQuery'
})(CategoriesListContainer);