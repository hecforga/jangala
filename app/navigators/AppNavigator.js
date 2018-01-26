import React, { PropTypes, Component } from 'react';
import { BackHandler, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, TabBarTop, TabBarBottom } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Constants } from 'expo';

import tabs, { getInitialTabName, getTabNameForCatalogueScreen, getTabNameForHomeScreen, getTabNameForShoppingBagScreen } from '../utilities/tabsInfo.js';

import ShopsListScreen from '../components/catalogue/ShopsListScreen.js';
import CategoriesListScreen from '../components/catalogue/CategoriesListScreen.js';
import HomeScreen from '../components/home/HomeScreen.js';
import ShoppingBagScreen from '../components/shopping_bag/ShoppingBagScreen.js';
import ShopProfileScreen from '../components/shop_profile/ShopProfileScreen.js';
import CategoryScreen from '../components/category/CategoryScreen.js';

const CatalogueTabs = TabNavigator({
  ShopsList: {
    screen: ShopsListScreen,
  },
  CategoriesList: {
    screen: CategoriesListScreen,
  },
}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  backBehavior: 'none',
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    tabStyle: {
      paddingTop: 0, // default padding: 8 (https://github.com/react-native-community/react-native-tab-view/blob/master/src/TabBar.js)
    },
    labelStyle: {
      fontWeight: '500',
      marginTop: 0, // default margin: 8 (https://github.com/react-native-community/react-native-tab-view/blob/master/src/TabBar.js)
    },
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    indicatorStyle: {
      backgroundColor: '#6683a4',
    },
    pressColor: 'grey',
  },
});

const CatalogueNavigator = StackNavigator({
  Catalogue: { screen: CatalogueTabs },
  ShopProfile: { screen: ShopProfileScreen },
  Category: { screen: CategoryScreen },
}, {
  initialRouteName: 'Catalogue',
  navigationOptions: {
    headerBackTitle: null,
  },
  cardStyle:{
    backgroundColor:'white',
  },
});

const HomeNavigator = StackNavigator({
  Home: { screen: HomeScreen }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerBackTitle: null
  },
  cardStyle:{
    backgroundColor:'white'
  }
});

const ShoppingBagNavigator = StackNavigator({
  ShoppingBag: { screen: ShoppingBagScreen }
}, {
  initialRouteName: 'ShoppingBag',
  navigationOptions: {
    headerBackTitle: null
  },
  cardStyle:{
    backgroundColor:'white'
  }
});

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    backgroundColor:'#efeef3',
    borderTopColor:'rgba(0, 0, 0, 0.1)',
    borderTopWidth: StyleSheet.hairlineWidth,
  };
} else {
  platformContainerStyles = {
    backgroundColor:'white',
    borderTopColor:'rgba(0, 0, 0, 0.1)',
    borderTopWidth:0.9
  };
}

export const AppNavigator = TabNavigator({
  [getTabNameForCatalogueScreen()]: {
    screen: CatalogueNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <FontAwesome
          name='search'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  },
  [getTabNameForHomeScreen()]: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <FontAwesome
          name='home'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  },
  [getTabNameForShoppingBagScreen()]: {
    screen: ShoppingBagNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <FontAwesome
          name='shopping-bag'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: getInitialTabName(),
  order: tabs,
  tabBarOptions: {
    activeTintColor: '#f0742f',
    inactiveTintColor: '#9e9e9e',
    showIcon: true,
    showLabel: false,
    style: {...platformContainerStyles},
    indicatorStyle: { height: 0, width: 0 }
  }
});


class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.onBackPress());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    const initialScreenIndex = tabs.indexOf(getInitialTabName());
    if (nav.index === initialScreenIndex && nav.routes[initialScreenIndex].routes.length === 1) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;

    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
