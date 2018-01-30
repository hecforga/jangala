import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import { getDefaultFilters, areFiltersCleared } from '../../utilities/filters.js';

import PriceFilter from './PriceFilter.js';
import ShopsFilter from './ShopsFilter.js';
import MyButton from '../common/MyButton';

class FiltersContainer extends Component {
  render() {
    const whichFilters = Object.keys(this.props.filters);

    return(
      <View style={styles.container}>
        <ScrollView style={styles.filtersContainer}>
          {whichFilters.indexOf('price') > -1 ?
            this.getPriceFilterComponent()
            :
            <View>{null}</View>
          }
          {whichFilters.indexOf('shops') > -1 ?
            this.getShopsFilterComponent()
            :
            <View>{null}</View>
          }
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <MyButton
            title={'Borrar'}
            onPress={this.clearFilters}
            disabled={areFiltersCleared(this.props.filters)}
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
    const { filters, setFilters } = this.props;
    const whichFilters = Object.keys(filters);
    setFilters(getDefaultFilters(whichFilters));
  };

  applyFilters = () => {
    const { navigation, filters, setAppliedFilters } = this.props;
    setAppliedFilters(filters);
    navigation.goBack(null);
  };

  getPriceFilterComponent = () => {
    const { filters } = this.props;

    return (
      <View style={styles.filterContainer}>
        <PriceFilter
          minPrice={filters.price.min}
          maxPrice={filters.price.max}
          setMinPriceFilter={this.setMinPriceFilter}
          setMaxPriceFilter={this.setMaxPriceFilter} />
      </View>
    );
  };

  setMinPriceFilter = (newMinPrice) => {
    const { filters, setFilters } = this.props;
    const newFilters = {
      ...filters,
      price: {
        ...filters.price,
        min: newMinPrice,
      },
    };
    setFilters(newFilters);
  };

  setMaxPriceFilter = (newMaxPrice) => {
    const { filters, setFilters } = this.props;
    const newFilters = {
      ...filters,
      price: {
        ...filters.price,
        max: newMaxPrice,
      },
    };
    setFilters(newFilters);
  };

  getShopsFilterComponent = () => {
    const { options, filters } = this.props;

    return (
      // We assume options.shops is passed when filters.shops exists
      <View style={styles.filterContainer}>
        <ShopsFilter
          options={options.shops}
          selectedShops={filters.shops}
          addShopFilter={this.addShopFilter}
          removeShopFilter={this.removeShopFilter}
        />
      </View>
    );
  };

  addShopFilter = (shopName) => {
    const { filters, setFilters } = this.props;
    const newFilters = {
      ...filters,
      shops: filters.shops.concat(shopName),
    };
    setFilters(newFilters);
  };

  removeShopFilter = (shopName) => {
    const { filters, setFilters } = this.props;
    const index = filters.shops.indexOf(shopName);
    if (index > -1) {
      const newFilters = {
        ...filters,
        shops: [
          ...filters.shops.slice(0, index),
          ...filters.shops.slice(index + 1),
        ],
      };
      setFilters(newFilters);
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