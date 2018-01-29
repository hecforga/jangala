import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import MyButton from '../common/MyButton.js';

class ProductsListHeader extends Component {
  render() {
    const { onFilterButtonPress } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <MyButton
            touchableType={'highlight'}
            title={'Filtrar'}
            onPress={onFilterButtonPress}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 48,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  buttonText: {
    color: 'black',
  },
});

export default ProductsListHeader;