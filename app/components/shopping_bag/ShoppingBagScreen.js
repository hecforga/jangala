import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ShoppingBagScreen extends Component {
  static navigationOptions = {
    title: 'Bolsa',
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
  }
});

export default ShoppingBagScreen;
