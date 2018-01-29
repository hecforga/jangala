import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MyButton from '../common/MyButton.js';

class ErrorView extends Component {
  render() {
    const { message, onRetryPress } = this.props;

    return (
      <View>
        <Text>{message || 'Ha habido un error'}</Text>
        <MyButton
          title={'Reintentar'}
          onPress={onRetryPress}
          containerStyle={styles.buttonContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16
  }
});

export default ErrorView;