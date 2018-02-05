import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, View, Animated } from 'react-native';

import {moderateScale} from '../../utilities/layout.js';

import ProductsListHeader from './ProductsListHeader.js';
import ProductThumbnail from './ProductThumbnail.js';

const CONTAINER_PADDING = 8;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ProductsList extends Component {
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
  }

  render() {
    const { transparentViewHeight, onScroll, animated } = this.props;

    const productsInArraysOf2 = this.getProductsInArraysOf2();
    const stickyHeader = [{ stickyHeader: true }];
    let dataToRender = stickyHeader.concat(productsInArraysOf2);
    let stickyHeaderIndex = 0;

    if (transparentViewHeight) {
      let transparentView = [{ transparentView: true, height: transparentViewHeight }];
      dataToRender = transparentView.concat(dataToRender);
      stickyHeaderIndex = 1;
    }

    // Add empty-list handling

    let MyFlatList = FlatList;
    if (animated) {
      MyFlatList = Animated.createAnimatedComponent(FlatList);
    }

    return (
      <MyFlatList
        style={styles.container}
        onScroll={onScroll}
        data={dataToRender}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => this.renderItem(item)}
        initialNumToRender={2}
        stickyHeaderIndices={[stickyHeaderIndex]}
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

  renderItem = (item) => {
    const { onFilterButtonPress } = this.props;

    if (item.transparentView) {
      return(
        <View style={{ marginTop: item.height }}/>
      );
    }
    else if (item.stickyHeader) {
      return (
        <View>
          <View style={styles.tinyGrayLineSeparator}/>
          <ProductsListHeader onFilterButtonPress={onFilterButtonPress}/>
        </View>
      );
    } else {
      return (
        <View style={styles.listRow}>
          {item.map((product) =>
            <ProductThumbnail
              key={ product.id}
              product={product}
              productThumbnailContainerStyle={{
                margin: PRODUCT_THUMBNAIL_CONTAINER_MARGIN,
                marginBottom: 16,
                width: this.imageWidth,
              }}
              onPress={this.onProductPress}
            />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CONTAINER_PADDING,
    backgroundColor: 'white',
  },
  tinyGrayLineSeparator: {
    height: moderateScale(1.38),
    marginHorizontal:moderateScale(23),
    backgroundColor:'#ebebeb',
  },
});

export default ProductsList;