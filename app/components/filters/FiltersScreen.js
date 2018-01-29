import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import FiltersContainer from './FiltersContainer.js';

class FiltersScreen extends Component {
  static navigationOptions = {
    title: 'Filtros',
    tabBarVisible: false,
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FiltersContainer
          navigation={navigation}
          appliedFilters={navigation.state.params.appliedFilters}
          setAppliedFilters={navigation.state.params.setAppliedFilters}
          options={navigation.state.params.options}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FiltersScreen;