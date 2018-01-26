import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ShopsListContainer from './ShopsListContainer.js';

class ShopsListScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Tiendas',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ShopsListContainer navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ShopsListScreen;
