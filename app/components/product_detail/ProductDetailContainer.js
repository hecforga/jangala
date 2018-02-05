import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

import MyButton from '../common/MyButton.js';
import ModalPicker from '../common/ModalPicker.js';

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeModalPickerIsVisible: false,
      size: 's'
    };
  }

  render() {
    const { productQuery } = this.props;

    const data = [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M - Artículo agotado', disabled: true },
      { value: 'l', label: 'L' },
    ];

    if (productQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: productQuery.product.imagesUrls[0] }}
              resizeMode={'cover'}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.titleAndShopContainer}>
              <View style={styles.titleContainer}>
                <Text>{productQuery.product.title}</Text>
              </View>
              <TouchableOpacity
                onPress={this.onShopPress}
              >
                <View style={styles.shopButton}>
                  <Text style={styles.shopButtonText}>{productQuery.product.shop.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.priceAndSizeContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{fromProductsInfo.getPriceLabel(productQuery.product)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  onPress={this.showSizeModalPicker}
                  style={styles.sizeButtonContainer}
                >
                  <View style={styles.sizeButton}>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.sizeButtonText}>{this.state.size.toUpperCase()}</Text>
                    </View>
                    <FontAwesome
                      name='chevron-down'
                      color={'black'}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <MyButton
            title={'Añadir a mi bolsa'}
            onPress={this.addToBag}
            containerStyle={styles.addToBagButtonContainer}
            buttonStyle={styles.addToBagButton}
          />
        </View>
        <ModalPicker
          isVisible={this.state.sizeModalPickerIsVisible}
          onBackButtonPress={this.hideSizeModalPicker}
          onBackdropPress={this.hideSizeModalPicker}
          data={data}
          selectedValue={this.state.size}
          onValueChange={this.onSizeChange}
        />
      </View>
    );
  }

  onShopPress = () => {
    const { productQuery } = this.props;
    console.log(productQuery.product.id);
  };

  showSizeModalPicker = () => {
    this.setState({ sizeModalPickerIsVisible: true });
  };

  hideSizeModalPicker = () => {
    this.setState({ sizeModalPickerIsVisible: false });
  };

  onSizeChange = (size) => {
    this.setState({ size: size });
    this.hideSizeModalPicker();
  };

  addToBag = () => {
    const { productQuery } = this.props;
    console.log(productQuery.product.id);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleAndShopContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingVertical: 8,
  },
  shopButton: {
    paddingVertical: 8,
  },
  shopButtonText: {
    color: 'blue',
  },
  priceAndSizeContainer: {
    flex: 2,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
    paddingVertical: 8,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  sizeButtonContainer: {
    flex: 1,
  },
  sizeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  sizeButtonText: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  addToBagButtonContainer: {
    flex: 1,
  },
  addToBagButton: {
    padding: 16,
  },
});

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
      id,
      title,
      price,
      imagesUrls,
      shop {
        name
      }
    }
  }
`;

export default graphql(PRODUCT_QUERY, {
  name: 'productQuery',
  options: ({ productId }) => ({ variables: { id: productId } }),
})(ProductDetailContainer);