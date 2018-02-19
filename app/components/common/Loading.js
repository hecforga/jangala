import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { branch, renderComponent } from 'recompose';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const renderWhileLoading = (propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(Loading),
  )
;