import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ShoppingBagContainer from './ShoppingBagContainer.js';

class ShoppingBagScreen extends Component {
  static navigationOptions = {
    title: 'Mi bolsa', // TODO: show number of lineItems
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ShoppingBagContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShoppingBagScreen;
