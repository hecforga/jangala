import React, { PropTypes, Component } from 'react';
import { BackHandler, Platform, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, TabBarTop, TabBarBottom } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Constants } from 'expo';

import { getCheckedLoggedIn, getToken } from '../reducers';
import * as actions from '../actions/index';

import tabs, { getInitialTabName, getTabNameForCatalogueScreen, getTabNameForHomeScreen, getTabNameForShoppingBagScreen } from '../utilities/tabsInfo.js';

import ShopsListScreen from '../components/catalogue/ShopsListScreen.js';
import CategoriesListScreen from '../components/catalogue/CategoriesListScreen.js';
import HomeScreen from '../components/home/HomeScreen.js';
import ShoppingBagScreen from '../components/shopping_bag/ShoppingBagScreen.js';
import ShopProfileScreen from '../components/shop_profile/ShopProfileScreen.js';
import CategoryScreen from '../components/category/CategoryScreen.js';
import FiltersScreen from '../components/filters/FiltersScreen.js';
import ProductDetailScreen from '../components/product_detail/ProductDetailScreen.js';
import LogInScreen from '../components/log_in/LogInScreen.js';
import UserSettingsScreen from '../components/user_settings/UserSettingsScreen.js';
import AddressInfoScreen from '../components/user_settings/AddressInfoScreen.js';
import UserInfoScreen from '../components/user_settings/UserInfoScreen.js';

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
  swipeEnabled: true,
  backBehavior: 'none',
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    tabStyle: {
      // default padding: 8 (https://github.com/react-native-community/react-native-tab-view/blob/master/src/TabBar.js)
      // need to be 0 to show correctly in some devices
      paddingTop: 8,
    },
    labelStyle: {
      fontWeight: '500',
      // default margin: 8 (https://github.com/react-native-community/react-native-tab-view/blob/master/src/TabBar.js)
      // need to be 0 to show correctly in some devices
      marginTop: 8,
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
  Filters: { screen: FiltersScreen },
  ProductDetail: { screen: ProductDetailScreen },
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
  Home: { screen: HomeScreen },
  UserSettings: { screen: UserSettingsScreen },
  UserInfo: { screen: UserInfoScreen },
  AddressInfo: { screen: AddressInfoScreen },
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

export const LoggedInAppNavigator = TabNavigator({
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

export const LoggedOutAppNavigator = StackNavigator({
  LogIn: { screen: LogInScreen }
}, {
  navigationOptions: {
    title: 'Log In'
  },
  cardStyle:{
    backgroundColor:'white'
  },
});


class AppWithNavigationState extends Component {
  componentWillMount() {
    const { checkLoggedIn } = this.props;
    checkLoggedIn();
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.onBackPress());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, loggedInNav, loggedOutNav } = this.props;

    const homeTab = loggedInNav.routes.find((route) => route.routeName==='HomeTab' );
    const addressInfoScreen = homeTab.routes.find((route) => route.routeName === 'AddressInfo');
    const userInfoScreen = homeTab.routes.find((route) => route.routeName === 'UserInfo');
    if( addressInfoScreen ){

      if(!addressInfoScreen.params.canGoBack){
        addressInfoScreen.params.setConfirmationModalIsVisible(true);
        return true;
      }
      else{
        dispatch(NavigationActions.back());
        return true;
      }
    }
    else if( userInfoScreen ){
      
      if(!userInfoScreen.params.canGoBack){
        userInfoScreen.params.setConfirmationModalIsVisible(true);
        return true;
      }
      else{
        dispatch(NavigationActions.back());
        return true;
      }
    }
    else{
      const initialScreenIndex = tabs.indexOf(getInitialTabName());
      if (loggedInNav.index === initialScreenIndex && loggedInNav.routes[initialScreenIndex].routes.length === 1) {
        return false;
      }
      dispatch(NavigationActions.back());
      return true;
    }
  };

  render() {
    const { dispatch, loggedOutNav, loggedInNav, checkedLoggedIn, token } = this.props;

    if(!checkedLoggedIn){
      return null;
    }

    if(!token){
      return <LoggedOutAppNavigator navigation={addNavigationHelpers({ dispatch, state: loggedOutNav })} />
    }
    else{
      return <LoggedInAppNavigator navigation={addNavigationHelpers({ dispatch, state: loggedInNav })} />
    }
  }
}

const mapStateToProps = state => ({
  loggedInNav: state.loggedInNav,
  loggedOutNav: state.loggedOutNav,
  checkedLoggedIn: getCheckedLoggedIn(state),
  token: getToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
