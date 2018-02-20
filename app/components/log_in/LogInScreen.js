import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import LogInContainer from './LogInContainer.js';

class LogInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {

    return (
      <LogInContainer />
    );
  }
}

const styles = StyleSheet.create({
});

export default LogInScreen;