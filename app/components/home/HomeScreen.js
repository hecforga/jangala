import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import MyButton from '../common/MyButton.js';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Hombre', // TODO: switch gender
    headerRight: (
      <MyButton
        title='Ajustes'
        onPress={() => {
          navigation.navigate('UserSettings');
        }}
        buttonStyle={{ minWidth: 80 }}
        containerStyle={{ marginRight: 8 }}
      />
    ),
  });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  }
});

export default HomeScreen;
