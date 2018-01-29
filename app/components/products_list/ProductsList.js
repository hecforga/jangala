import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';

import ProductThumbnail from './ProductThumbnail.js';

const CONTAINER_PADDING = 8;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ProductsList extends Component {
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
  }

  render() {
    const productsInArraysOf2 = this.getProductsInArraysOf2();

    // Add empty-list handling

    return (
      <FlatList
        style={styles.container}
        data={productsInArraysOf2}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View style={styles.listRow}>
              {item.map((product) =>
                <ProductThumbnail
                  key={ product.id}
                  product={product}
                  productThumbnailContainerStyle={{
                    margin: PRODUCT_THUMBNAIL_CONTAINER_MARGIN,
                    marginBottom: 16,
                    width: this.imageWidth
                  }}
                  onPress={this.onProductPress}
                />
              )}
            </View>
          );
        }}
        initialNumToRender={2}
      />
    );
  }

  getProductsInArraysOf2 = () => {
    const { products } = this.props;

    const productsInArraysOf2 = [];
    let aux = [];
    let count = 0;
    products.forEach((product) => {
      aux.push(product);
      if (count % 2 === 1) {
        productsInArraysOf2.push(aux);
        aux = [];
      }
      count++;
    });

    return productsInArraysOf2;
  };

  onProductPress = (productId) => {
    const { navigation } = this.props;

    navigation.navigate('ProductDetail', {
      productId,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default ProductsList;