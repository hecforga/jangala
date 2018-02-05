import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class CategoriesFilter extends Component {
  render() {
    const { options, addCategoryFilter, removeCategoryFilter } = this.props;

    return (
      <View>
        <Text style={styles.title}>Categorías:</Text>
        {options.map((categoryName, index) =>
          <TouchableHighlight
            key={index}
            onPress={() => this.isCategorySelected(categoryName) ? removeCategoryFilter(categoryName) : addCategoryFilter(categoryName)}
          >
            <View style={[styles.button, { borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth }]}>
              <Text style={styles.text}>{categoryName}</Text>
              {this.isCategorySelected(categoryName) ?
                <FontAwesome name={'check'} style={styles.icon} />
                :
                null
              }
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }

  isCategorySelected = (categoryName) => {
    const { selectedCategories } = this.props;

    return selectedCategories.indexOf(categoryName) > -1;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  button: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: 'white',
    padding: 8,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'lightgrey',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  icon: {
    color: '#2196F3',
    fontSize: 24,
  }
});

export default CategoriesFilter;