import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import ShoppingBagLineItem from './ShoppingBagLineItem.js';

const CONTAINER_PADDING = 16;
const LINE_ITEM_MARGIN = 8;

class ShoppingBagLineItemsList extends Component {
  render() {
    const { lineItems } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.container}
      >
        {lineItems.map((lineItem, index) => (
          <ShoppingBagLineItem
            key={index}
            productInfo={this.getProductInfo(lineItem)}
            containerStyle={{
              marginTop: index === 0 ? CONTAINER_PADDING : 0,
              marginBottom: LINE_ITEM_MARGIN,
            }}
          />
        ))}
      </ScrollView>
    );
  }

  getProductInfo = (lineItem) => ({
    imageUrl: lineItem.variant.product.imagesUrls[0],
    price: lineItem.variant.product.price,
    quantity: lineItem.quantity,
    shopName: lineItem.variant.product.shop.name,
    size: lineItem.variant.selectedOptions.find((option) => option.name === 'size').value,
    title: lineItem.variant.product.title,
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },
});

export default ShoppingBagLineItemsList;