import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import FiltersProvider from '../filters/FiltersProvider.js';
import CategoryContainer from './CategoryContainer.js';

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FiltersProvider whichFilters={['shops']}>
          <CategoryContainer navigation={navigation} categoryId={navigation.state.params.categoryId} />
        </FiltersProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default CategoryScreen;
