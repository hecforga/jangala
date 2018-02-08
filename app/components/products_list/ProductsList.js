import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, View, Animated } from 'react-native';

import {moderateScale} from '../../utilities/layout.js';

import ProductsListHeader from './ProductsListHeader.js';
import ProductThumbnail from './ProductThumbnail.js';

const CONTAINER_PADDING = 8;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ProductsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottomEmptyViewHeight: undefined,
    };
  }
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const differentHeight = this.state.bottomEmptyViewHeight === nextState.bottomEmptyViewHeight;
    console.log(this.state);
    console.log(nextState);
    return !differentHeight;
  }

  render() {
    const { transparentViewHeight, onScroll, animated, style } = this.props;

    const productsInArraysOf2 = this.getProductsInArraysOf2();
    const stickyHeader = [{ stickyHeader: true }];
    let dataToRender = stickyHeader.concat(productsInArraysOf2);
    let stickyHeaderIndex = 0;

    if(productsInArraysOf2.length === 1){    
      let bottomEmptyView = [{ bottomEmptyView: true }];
      dataToRender = dataToRender.concat(bottomEmptyView);
    }

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
          <ProductsListHeader onFilterButtonPress={onFilterButtonPress}/>
        </View>
      );
    }
    else if (item.bottomEmptyView) {
      return (
        <View style={{backgroundColor:'red', height:this.state.bottomEmptyViewHeight}}/>
      );
    } else {
      return (
        <View 
          style={styles.listRow}
          onLayout={this.computeEmptyViewHeight}
        >
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

  computeEmptyViewHeight = (onLayoutEvent) =>{
    if(!this.state.bottomEmptyViewHeight){
      const {style} = this.props;
      var bottomEmptyViewHeight = style - onLayoutEvent.nativeEvent.layout.height - 50;
      console.log(bottomEmptyViewHeight);
      this.setState({bottomEmptyViewHeight: bottomEmptyViewHeight})
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
});

export default ProductsList;