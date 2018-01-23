import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ShopsListContainer from './ShopsListContainer.js';

class CatalogueContainer extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ShopsListContainer navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CatalogueContainer;