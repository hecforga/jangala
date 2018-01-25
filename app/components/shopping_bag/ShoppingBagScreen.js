import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

class ShoppingBagScreen extends Component {
  static navigationOptions = {
    title: 'Bolsa'
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : null
  }
});

export default ShoppingBagScreen;
