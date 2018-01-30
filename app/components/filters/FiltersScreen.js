import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import FiltersProvider from './FiltersProvider.js';
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
        <FiltersProvider copyFiltersFrom={navigation.state.params.appliedFilters}>
          <FiltersContainer
            navigation={navigation}
            setAppliedFilters={navigation.state.params.setAppliedFilters}
            options={navigation.state.params.options}
          />
        </FiltersProvider>
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