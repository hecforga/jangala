import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class ShopsFilter extends Component {
  render() {
    const { options, addShopFilter, removeShopFilter } = this.props;

    return (
      <View>
        <Text style={styles.title}>Tiendas:</Text>
        {options.map((shopName, index) =>
          <TouchableHighlight
            key={index}
            onPress={() => this.isShopSelected(shopName) ? removeShopFilter(shopName) : addShopFilter(shopName)}
          >
            <View style={[styles.button, { borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth }]}>
              <Text style={styles.text}>{shopName}</Text>
              {this.isShopSelected(shopName) ?
                <FontAwesome name={'check'} style={styles.icon} />
                :
                null
              }
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }

  isShopSelected = (shopName) => {
    const { selectedShops } = this.props;

    return selectedShops.indexOf(shopName) > -1;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  button: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: 'white',
    padding: 8,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  icon: {
    color: '#2196F3',
    fontSize: 24,
  }
});

export default ShopsFilter;