import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CategoryContainer extends Component {
  render() {
    const { categoryQuery } = this.props;

    if (categoryQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{categoryQuery.category.name}</Text>
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

const CATEGORY_QUERY = gql`
  query CategoryQuery($id: ID!) {
    category(id: $id) {
      id,
      name
    }
  }
`;

export default graphql(CATEGORY_QUERY, {
  name: 'categoryQuery',
  options: ({ categoryId }) => ({ variables: { id: categoryId } }),
})(CategoryContainer);