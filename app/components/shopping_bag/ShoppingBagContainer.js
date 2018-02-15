import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { branch, compose, renderComponent } from 'recompose';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

import ShoppingBagLineItemsList from './ShoppingBagLineItemsList.js';
import MyButton from '../common/MyButton.js';

const CONTAINER_PADDING = 16;

class ShoppingBagContainer extends Component {
  render() {
    const { meQuery } = this.props;

    return (
      <View style={styles.container}>
        <ShoppingBagLineItemsList lineItems={meQuery.me.shoppingBag.lineItems} />
        <View style={styles.bottomContainer}>
          <View style={styles.totalPriceRow}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.withOutShippingText}>(sin envío)</Text>
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
  totalText: {
    fontWeight: 'bold',
  },
  withOutShippingText: {
    marginLeft: 4,
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
  graphql(ME_QUERY, { name: 'meQuery' }),
  renderWhileLoading(Loading, 'meQuery'),
)(ShoppingBagContainer);