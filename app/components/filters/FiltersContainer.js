import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import { getFiltersInitialState, areFiltersCleared } from '../../utilities/filters.js';

import ShopsFilter from './ShopsFilter.js';
import MyButton from '../common/MyButton';

class FiltersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentFilters: props.appliedFilters };
  }

  render() {
    const whichFilters = Object.keys(this.state.currentFilters);

    return(
      <View style={styles.container}>
        <ScrollView style={styles.filtersContainer}>
          {whichFilters.map((filterName) => this.getFilterComponent(filterName))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <MyButton
            title={'Borrar'}
            onPress={this.clearFilters}
            disabled={areFiltersCleared(this.state.currentFilters)}
            containerStyle={[styles.buttonContainer, { marginRight: 8 }]}
            buttonStyle={styles.button}
          />
          <MyButton
            title={'Aplicar'}
            onPress={() => this.applyFilters()}
            containerStyle={[styles.buttonContainer, { marginLeft: 8 }]}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }

  clearFilters = () => {
    const whichFilters = Object.keys(this.state.currentFilters);
    this.setState({ currentFilters: getFiltersInitialState(whichFilters) });
  };

  applyFilters = () => {
    const { navigation, setAppliedFilters } = this.props;

    setAppliedFilters(this.state.currentFilters);
    navigation.goBack(null);
  };

  getFilterComponent = (filterName) => {
    switch (filterName) {
      case 'shops':
        return (
          // We assume options.shops is passed to navigate() and FiltersProvider's whichFilters contains 'shops'
          <View key={filterName} style={styles.filterContainer}>
            <ShopsFilter
              key={filterName}
              options={this.props.options.shops}
              selectedShops={this.state.currentFilters.shops}
              addShopFilter={this.addShopFilter}
              removeShopFilter={this.removeShopFilter}
            />
          </View>
        );
      default:
        return null;
    }
  };

  addShopFilter = (shopName) => {
    this.setState({ currentFilters: {
      ...this.state.currentFilters,
      shops: this.state.currentFilters.shops.concat(shopName),
    }});
  };

  removeShopFilter = (shopName) => {
    const index = this.state.currentFilters.shops.indexOf(shopName);
    if (index > -1) {
      this.setState({ currentFilters: {
        ...this.state.currentFilters,
        shops: [
          ...this.state.currentFilters.shops.slice(0, index),
          ...this.state.currentFilters.shops.slice(index + 1),
        ],
      }});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  filterContainer: {
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: 16,
  },
});

export default FiltersContainer;