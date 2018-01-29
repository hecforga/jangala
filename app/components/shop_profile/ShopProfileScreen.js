import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ShopProfileContainer from './ShopProfileContainer.js';

class ShopProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ShopProfileContainer shopId={navigation.state.params.shopId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ShopProfileScreen;
