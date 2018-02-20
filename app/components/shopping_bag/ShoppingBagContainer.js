import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent } from 'recompose';

import { renderWhileLoading } from '../common/Loading.js';
import { renderIfShoppingBagEmpty } from './ShoppingBagEmpty.js';
import * as fromProductsInfo from '../../utilities/productsInfo.js';
import { runMutation } from '../../utilities/apollo.js';

import ShoppingBagLineItemsList from './ShoppingBagLineItemsList.js';
import MyButton from '../common/MyButton.js';

const CONTAINER_PADDING = 16;

class ShoppingBagContainer extends Component {
  render() {
    const { meQuery } = this.props;
    const lineItems = meQuery.me.shoppingBag.lineItems;

    return (
      <View style={styles.container}>
        <ShoppingBagLineItemsList
          lineItems={lineItems}
          onRemoveLineItemPress={this.onRemoveLineItemPress}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.totalPriceRow}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text>{lineItems.length + ' Artículos - Total (sin envío):'}</Text>
            </View>
            <Text style={styles.totalPriceText}>{fromProductsInfo.getPriceLabel(this.computeTotalPrice())}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MyButton
              title={'Pagar de forma segura'}
              onPress={this.onPayButtonPress}
              containerStyle={styles.payButtonContainer}
              buttonStyle={styles.payButton}
            />
          </View>
        </View>
      </View>
    );
  }

  onPayButtonPress = () => {
    console.log('Pagar de forma segura');
  };

  computeTotalPrice = () => (
    this.props.meQuery.me.shoppingBag.lineItems.reduce((total, lineItem) => (
      total + (lineItem.quantity * lineItem.variant.product.price)
    ), 0)
  );

  onRemoveLineItemPress = async (lineItemId) => {
    const { removeShoppingBagLineItem } = this.props;
    // TODO: Optimistic UI
    const mutationPayload = await runMutation(
      'removeShoppingBagLineItem',
      removeShoppingBagLineItem,
      { variables: { lineItemId } },
    );
    if (mutationPayload.data.removeShoppingBagLineItem) {
      console.log('Producto eliminado de tu bolsa.');
    } else {
      console.log('Lo sentimos. El producto no ha podido ser eliminado de tu bolsa.');
    }
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
  bottomContainer: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  totalPriceRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#dddddd',
  },
  totalPriceText: {
    fontWeight: 'bold',
  },
  payButtonContainer: {
    flex: 1,
    marginTop: 8,
  },
  payButton: {
    padding: 16,
  },
});

const ME_QUERY = gql`
  query {
    me {
      shoppingBag {
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
  }
`;

const REMOVE_SHOPPING_BAG_LINE_ITEM_MUTATION = gql`
  mutation RemoveShoppingBagLineItemMutation($lineItemId: ID!) {
    removeShoppingBagLineItem(lineItemId: $lineItemId) {
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

export default compose(
  graphql(ME_QUERY, { name: 'meQuery' }),
  renderWhileLoading('meQuery'),
  renderIfShoppingBagEmpty(),
  graphql(REMOVE_SHOPPING_BAG_LINE_ITEM_MUTATION, { name: 'removeShoppingBagLineItem' }),
)(ShoppingBagContainer);