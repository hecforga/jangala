import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withState, branch, compose, renderComponent } from 'recompose';

import * as fromProductsInfo from '../../utilities/productsInfo.js';
import { runMutation } from '../../utilities/apollo.js';

import MyButton from '../common/MyButton.js';
import ModalPicker from '../common/ModalPicker.js';
import AddingProductToShoppingBagModal from './AddingProductToShoppingBagModal.js';

class ProductDetailContainer extends Component {
  componentDidUpdate() {
    const { automaticallyAddToBagOnSizeChange, selectedSize } = this.props;
    if (automaticallyAddToBagOnSizeChange && selectedSize) {
      this.addToBag();
    }
  }

  render() {
    const { productQuery, sizeModalPickerIsVisible, selectedSize, addingProductToShoppingBag } = this.props;

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    const compatibleVariantsOmittingSize = fromProductsInfo.computeCompatibleVariants(productQuery.product, this.computeSelectedOptions(), ['size']);
    const data = fromProductsInfo.generateDataForSizeModalPicker(compatibleVariantsOmittingSize);

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
                <Text style={styles.priceText}>{fromProductsInfo.getPriceLabel(productQuery.product.price)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                {fromProductsInfo.hasUniqueSize(productQuery.product) ?
                  <View style={styles.sizeButtonContainer}>
                    <View style={styles.sizeButton}>
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.uniqueSizeText}>{'TALLA ÚNICA'}</Text>
                      </View>
                    </View>
                  </View>
                  :
                  <TouchableHighlight
                    onPress={this.showSizeModalPicker}
                    style={styles.sizeButtonContainer}
                  >
                    <View style={styles.sizeButton}>
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.sizeButtonText}>{fromProductsInfo.getSizeLabel(selectedSize)}</Text>
                      </View>
                      <FontAwesome
                        name='chevron-down'
                        color={'black'}
                      />
                    </View>
                  </TouchableHighlight>
                }
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
          isVisible={sizeModalPickerIsVisible}
          onBackButtonPress={this.hideSizeModalPicker}
          onBackdropPress={this.hideSizeModalPicker}
          data={data}
          selectedValue={selectedSize}
          onValueChange={this.onSizeChange}
        />
        <AddingProductToShoppingBagModal isVisible={addingProductToShoppingBag} />
      </View>
    );
  }

  onShopPress = () => {
    const { productQuery } = this.props;
    console.log(productQuery.product.id);
  };

  showSizeModalPicker = () => {
    const { setSizeModalPickerIsVisible } = this.props;
    setSizeModalPickerIsVisible(true);
  };

  hideSizeModalPicker = () => {
    const { setSizeModalPickerIsVisible } = this.props;
    setSizeModalPickerIsVisible(false);
  };

  onSizeChange = (size) => {
    const { setSelectedSize } = this.props;
    setSelectedSize(size);
    this.hideSizeModalPicker();
  };

  addToBag = async () => {
    const {
      navigation,
      productQuery,
      setAutomaticallyAddToBagOnSizeChange,
      setAddingProductToShoppingBag,
      addProductToShoppingBag,
    } = this.props;

    setAutomaticallyAddToBagOnSizeChange(false);
    const selectedOptions = this.computeSelectedOptions();
    const compatibleProductVariants = fromProductsInfo.computeCompatibleVariants(productQuery.product, selectedOptions, []);

    // For now we assume we will always have at least 1 compatible product variant
    if (compatibleProductVariants.length > 1) {
      const sizeOption = selectedOptions.find((option) => option.name === 'size');
      if (!sizeOption.value) {
        setAutomaticallyAddToBagOnSizeChange(true);
        this.showSizeModalPicker();
      }
      return;
    }

    const productVariant = compatibleProductVariants[0];
    setAddingProductToShoppingBag(true);
    const mutationPayload = await runMutation(
      'addProductToShoppingBag',
      addProductToShoppingBag,
      { variables: { productVariantId: productVariant.id } },
    );
    setAddingProductToShoppingBag(false);
    if (mutationPayload.data.addProductToShoppingBag) {
      navigation.goBack();
      console.log('Producto añadido a tu bolsa!');
    } else if (mutationPayload.error.name === 'ShoppingBagLineItemAlreadyExistsError') {
      console.log('ShoppingBagLineItemAlreadyExistsError');
    } else {
      console.log('Lo sentimos. El producto no ha podido ser añadido a tu bolsa.');
    }
  };

  computeSelectedOptions = () => {
    const { selectedSize } = this.props;
    return [{
      name: 'size',
      value: selectedSize,
    }];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  uniqueSizeText: {
    fontWeight: 'bold',
    textAlign: 'center',
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
      id
      imagesUrls
      options {
        name
        values
      }
      price
      shop {
        name
      }
      title
      variants {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

const ADD_PRODUCT_TO_SHOPPING_BAG_MUTATION = gql`
  mutation AddProductToShoppingBagMutation($productVariantId: ID!) {
    addProductToShoppingBag(productVariantId: $productVariantId) {
      id
      lineItems {
        id
        quantity
        variant {
          id
          product {
            imagesUrls
            price
            shop {
              name
            }
            title
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

const Loading = () => (
  <View style={styles.centeredContainer}>
    <ActivityIndicator size='large' />
  </View>
);

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  )
;

export default compose(
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: ({ productId }) => ({ variables: { id: productId } }),
  }),
  renderWhileLoading(Loading, 'productQuery'),
  graphql(ADD_PRODUCT_TO_SHOPPING_BAG_MUTATION, { name: 'addProductToShoppingBag' }),
  withState('sizeModalPickerIsVisible', 'setSizeModalPickerIsVisible', false),
  withState('selectedSize', 'setSelectedSize', ({ productQuery }) => fromProductsInfo.getDefaultSize(productQuery.product)),
  withState('automaticallyAddToBagOnSizeChange', 'setAutomaticallyAddToBagOnSizeChange', false),
  withState('addingProductToShoppingBag', 'setAddingProductToShoppingBag', false),
)(ProductDetailContainer);