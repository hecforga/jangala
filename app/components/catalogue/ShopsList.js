import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import MyButton from '../common/MyButton.js';

class ShopsList extends Component {
  render() {
    const { shops, onShopButtonPress } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.container}
      >
        {shops.map((shop, index) => (
          <MyButton
            key={shop.id}
            title={shop.name}
            onPress={() => onShopButtonPress(shop.id)}
            buttonStyle={[styles.shopButton, {
              marginTop: index === 0 ? 8 : 0
            }]}
            textStyle={styles.shopButtonText}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  shopButton: {
    flexDirection: 'row',
    marginBottom: 8
  },
  shopButtonText: {
    flex: 1
  }
});

export default ShopsList;