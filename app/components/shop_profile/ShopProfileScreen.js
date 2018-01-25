import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import ShopProfileContainer from './ShopProfileContainer.js';

class ShopProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const shopId = navigation.state.params.shopId;

    return (
      <View style={styles.container}>
        <ShopProfileContainer shopId={shopId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : null
  }
});

export default ShopProfileScreen;
