import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import CatalogueContainer from './CatalogueContainer.js';

class CatalogueScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CatalogueContainer navigation={navigation} />
      </View>
    );
  }
}

CatalogueScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : null
  }
});

export default CatalogueScreen;
