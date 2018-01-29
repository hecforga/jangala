import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

class ProductThumbnail extends Component {
  render() {
    const {
      product,
      productThumbnailContainerStyle,
      onPress
    } = this.props;

    return (
      <TouchableHighlight
        style={productThumbnailContainerStyle}
        onPress={() => onPress(product.id) }
      >
        <View style={styles.productThumbnail}>
          <Image
            source={{ uri: product.imagesUrls[0] }}
            style={styles.image}
            resizeMode='cover'
          />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{fromProductsInfo.getPriceLabel(product)}</Text>
          </View>
          <Text numberOfLines={1}>{product.shop.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  productThumbnail: {
    backgroundColor: 'white'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    minHeight: 30
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
    marginBottom: 10,
  },
});

export default ProductThumbnail;