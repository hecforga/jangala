import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import ProductDetailContainer from './ProductDetailContainer.js';

class ProductDetailScreen extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      backgroundColor: 'transparent',
      zIndex: 100,
      borderBottomWidth: 0,
      elevation: 0,
    },
    tabBarVisible: false,
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ProductDetailContainer navigation={navigation} productId={navigation.state.params.productId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});

export default ProductDetailScreen;
