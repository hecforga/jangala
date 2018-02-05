import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { moderateScale } from '../../utilities/layout.js';

import MyButton from '../common/MyButton.js';

class ProductsListHeader extends Component {
  render() {
    const { onFilterButtonPress } = this.props;

    return (
      <View>
        <View style={styles.topContainer}>
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
        <View style={styles.bigGrayLineSeparator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: moderateScale(48),
    backgroundColor: 'white',
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
    color: '#484848',
    fontSize: moderateScale(14)
  },
  bigGrayLineSeparator: {
    height: moderateScale(3),
    backgroundColor:'#ebebeb',
  },
});

export default ProductsListHeader;