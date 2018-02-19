import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

class ShoppingBagLineItem extends Component {
  render() {
    const { productInfo, id, quantity, onRemoveLineItemPress, containerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productInfo.imageUrl }}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{productInfo.title}</Text>
          <Text>{productInfo.shopName}</Text>
          <Text>{fromProductsInfo.getPriceLabel(productInfo.price)}</Text>
          <Text>{'Talla: ' + fromProductsInfo.getSizeLabel(productInfo.size)}</Text>
          <Text>{'Cantidad: ' + quantity}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => onRemoveLineItemPress(id)}
            sty4
          >
            <FontAwesome name={'remove'} style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 120,
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 8,
  },
  titleText: {
    fontWeight: 'bold',
  },
  removeIcon: {
    fontSize: 32,
  },
});

export default ShoppingBagLineItem;