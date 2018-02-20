import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { branch, renderComponent } from 'recompose';

const ShoppingBagEmpty = () => (
  <View style={styles.container}>
    <Text style={styles.text}>La bolsa está vacía</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export const renderIfShoppingBagEmpty = () =>
  branch(
    props => props.meQuery.me.shoppingBag.lineItems.length === 0,
    renderComponent(ShoppingBagEmpty)
  )
;