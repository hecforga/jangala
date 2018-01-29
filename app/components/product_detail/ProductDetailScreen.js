import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ProductDetailContainer from './ProductDetailContainer.js';

class ProductDetailScreen extends Component {
  static navigationOptions = {
    title: 'ProductDetail',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ProductDetailContainer productId={navigation.state.params.productId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ProductDetailScreen;
