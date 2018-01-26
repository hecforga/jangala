import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CategoriesListContainer from './CategoriesListContainer.js';

class CategoriesListScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Categorías',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CategoriesListContainer navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default CategoriesListScreen;
