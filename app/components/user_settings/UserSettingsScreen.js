import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UserSettingsContainer from './UserSettingsContainer.js';

class UserSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Mi cuenta',
  };

  render() {

    const { navigation } = this.props;

    return (
      <UserSettingsContainer navigation={navigation}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default UserSettingsScreen;
