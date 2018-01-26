import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import CategoryContainer from './CategoryContainer.js';

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CategoryContainer categoryId={navigation.state.params.categoryId} />
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
