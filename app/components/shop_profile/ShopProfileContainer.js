import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Animated, Text, Dimensions, Image } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { moderateScale } from '../../utilities/layout.js';
import { computeProductsWhere } from '../../utilities/filters.js';

import ProductsList from '../products_list/ProductsList.js';

const deviceHeight = Dimensions.get('window').height;

class ShopProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollAnimatedValue: new Animated.Value(0),
    };
  }

  render() {
    const { shopQuery, navigation } = this.props;

    let transform = [{
      translateY: this.state.scrollAnimatedValue.interpolate({
        inputRange: [0, moderateScale(deviceHeight * 0.632)],
        outputRange: [0, -300],
        extrapolateRight: 'clamp',
      }),
    }];

    let borderTransform = [{
      translateY: this.state.scrollAnimatedValue.interpolate({
        inputRange: [0, moderateScale(deviceHeight * 0.632)],
        outputRange: [0, -moderateScale(deviceHeight * 0.632)],
        extrapolateRight: 'clamp',
      }),
    }];

    if (shopQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    // Add error handling (wait until this issue is solved: https://github.com/apollographql/apollo-client/issues/2513)

    return (
      <View style={styles.container}
      >
      <View
        style={styles.container}
        onLayout={this.computeProductsListHeight}
      >
        <Animated.View
          style={[styles.aux, {
            transform,
          }]}
        >
          <View
            key='coverImage'
            style={styles.coverImageContainer}>
            <Image
              source={{uri: shopQuery.shop.coverImageUrl}}
              style={styles.coverImage}
              resizeMode='cover'
            />
          </View>
          <View
            style={styles.shopInfoContainer}>
            <View style={styles.shopNameContainer}>
              <Text style={{fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica', color:'#484848', fontWeight: '500', fontSize: moderateScale(30), marginLeft: moderateScale(25)}}>{shopQuery.shop.name}</Text>
            </View>
            <View style={styles.infoCenterContainer}>
              <View style={styles.textCenterContainer}>
                <Text style={{fontFamily:Platform.OS === 'android' ? 'sans-serif' : 'Helvetica', color: '#484848', fontStyle: 'italic', fontSize: moderateScale(16), marginTop: moderateScale(16), marginHorizontal: moderateScale(23),}}>{shopQuery.shop.slogan}</Text>
                <Text style={{color: '#484848', fontSize: moderateScale(14), marginVertical: moderateScale(6), marginHorizontal: moderateScale(23),}}>{shopQuery.shop.country}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: shopQuery.shop.logoUrl }}
                  style={styles.logoImage}
                  resizeMode='contain'
                />
              </View>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.tinyGrayLineSeparator, {
            transform: borderTransform,
          }]}
        />
        <ProductsList
          style={this.state.productsListHeight}
          navigation={navigation}
          animated={true}
          products={shopQuery.shop.products}
          transparentViewHeight={moderateScale(deviceHeight * 0.632)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnimatedValue }} }],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={8} // 120fps
          onFilterButtonPress={this.onFilterButtonPress}
        >
        </ProductsList>
      </View>
      </View>
    );
  }

  onFilterButtonPress = () => {
    const { navigation, filters, shopQuery } = this.props;
    navigation.navigate('Filters', {
      appliedFilters: filters,
      setAppliedFilters: this.setFilters,
      options: {
        categories: shopQuery.shop.categories.map((category) => category.name),
      },
    });
  }

  computeProductsListHeight = (onLayoutEvent) => {
    this.setState({productsListHeight:onLayoutEvent.nativeEvent.layout.height});
  }

  setFilters = (currentFilters) => {
    const { setFilters } = this.props;
    setFilters(JSON.parse(JSON.stringify(currentFilters)));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aux: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: moderateScale(deviceHeight * 0.632),
    backgroundColor: 'white',
  },
  coverImageContainer: {
    height: moderateScale(deviceHeight * 0.375),
    alignItems: 'center',
  },
  coverImage: {
    flex: 1,
    aspectRatio: 1.75,
  },
  shopInfoContainer: {
    height: moderateScale(deviceHeight * 0.267),
    backgroundColor: 'white',
  },
  shopNameContainer: {
    height: moderateScale(50),
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
  },
  infoCenterContainer: {
    height: moderateScale(112),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenterContainer: {
    flex: 0.65,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 0.35,
    backgroundColor: 'white',
  },
  logoImage: {
    flex: 1,
    borderRadius: 25,
  },
  tinyGrayLineSeparator: {
    position: 'absolute',
    top: moderateScale(deviceHeight * 0.632) - moderateScale(1.38), left: 0, right: 0,
    height: moderateScale(1.38),
    marginHorizontal: moderateScale(23),
    backgroundColor: '#ebebeb',
  },
});

const SHOP_QUERY = gql`
  query ShopQuery($id: ID!, $productsWhere: ProductWhereInput!) {
    shop(id: $id) {
      id,
      name,
      slogan,
      logoUrl,
      coverImageUrl,
      country,
      categories {
        name
      }
      products(where: $productsWhere) {
        id,
        price,
        imagesUrls,
        shop {
          name
        }
      }
    }
  }
`;

export default graphql(SHOP_QUERY, {
  name: 'shopQuery',
  options: ({ shopId, filters }) => ({
    variables: {
      id: shopId,
      productsWhere: computeProductsWhere(filters),
    }
  }),
})(ShopProfileContainer);