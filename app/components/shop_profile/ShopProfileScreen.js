import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import FiltersProvider from '../filters/FiltersProvider.js';
import ShopProfileContainer from './ShopProfileContainer.js';

const WHICH_FILTERS_I_USE = ['price', 'categories'];

class ShopProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FiltersProvider whichFilters={WHICH_FILTERS_I_USE}>
          <ShopProfileContainer navigation={navigation} shopId={navigation.state.params.shopId} />
        </FiltersProvider>
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
