import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableHighlight, View, Text, Image } from 'react-native';

import * as layoutUtilities from '../../utilities/layout.js';

const DESIRED_BUTTON_HEIGHT = 56;
const BUTTON_PADDING = 8;

class ShopsList extends Component {
  constructor(props) {
    super(props);
    this.state = { shopButtonHeight: undefined };
  }

  render() {
    const { shops, onShopButtonPress } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.container}
        onLayout={this.computeShopButtonHeight}
      >
        {this.state.shopButtonHeight ?
          shops.map((shop, index) => (
            <TouchableHighlight
              key={shop.id}
              onPress={() => onShopButtonPress(shop.id, shop.name)}
              underlayColor={'transparent'}
            >
              <View
                style={[styles.shopButton, {
                  height: this.state.shopButtonHeight,
                  borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth
                }]}
              >
                <Image
                  source={{ uri: shop.logoUrl }}
                  resizeMode={'contain'}
                  borderRadius={100}
                  style={[styles.shopLogo, {
                    height: this.state.shopButtonHeight - BUTTON_PADDING,
                    width: this.state.shopButtonHeight - BUTTON_PADDING,
                  }]}
                />
                <Text style={styles.shopButtonText}>{shop.name}</Text>
              </View>
            </TouchableHighlight>
          ))
          :
          null
        }
      </ScrollView>
    );
  }

  computeShopButtonHeight = (onLayoutEvent) => {
    if (this.state.shopButtonHeight) {
      return;
    }
    const { height } = onLayoutEvent.nativeEvent.layout;
    const shopButtonHeight = layoutUtilities.computeListItemHeight(height, 0, DESIRED_BUTTON_HEIGHT, 0);
    this.setState({ shopButtonHeight });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: BUTTON_PADDING,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
  },
  shopButtonText: {
    flex: 1,
    marginLeft: 8,
  },
  shopLogo: {
  }
});

export default ShopsList;