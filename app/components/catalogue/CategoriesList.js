import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import * as layoutUtilities from '../../utilities/layout.js';

const CONTAINER_PADDING = 16;
const BUTTON_MARGIN = 8;
const DESIRED_BUTTON_HEIGHT = 96;

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryButtonHeight: undefined };
  }

  render() {
    const { categories, onCategoryButtonPress } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.container}
        onLayout={this.computeCategoryButtonHeight}
      >
        {this.state.categoryButtonHeight ?
          categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategoryButtonPress(category.id, category.name)}
              activeOpacity={1}
            >
              <View
                style={[styles.categoryButton, {
                  height: this.state.categoryButtonHeight,
                  marginTop: index === 0 ? CONTAINER_PADDING : 0,
                  marginBottom: index === categories.length - 1 ? CONTAINER_PADDING : BUTTON_MARGIN,
                }]}
              >
                <Text style={styles.categoryButtonText}>{category.name.toUpperCase()}</Text>
                <Text>Imagen</Text>
              </View>
            </TouchableOpacity>
          ))
          :
          null
        }
      </ScrollView>
    );
  }

  computeCategoryButtonHeight = (onLayoutEvent) => {
    if (this.state.categoryButtonHeight) {
      return;
    }
    const { height } = onLayoutEvent.nativeEvent.layout;
    const categoryButtonHeight = layoutUtilities.computeListItemHeight(height, CONTAINER_PADDING, DESIRED_BUTTON_HEIGHT, BUTTON_MARGIN);
    this.setState({ categoryButtonHeight });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#6683a4',
    borderRadius: 10,
  },
  categoryButtonText: {
    flex: 1,
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default CategoriesList;