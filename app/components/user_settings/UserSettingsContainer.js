import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

import {moderateScale} from '../../utilities/layout.js';

import EditInfo from './EditInfo.js';
import MyButton from '../common/MyButton.js';

class UserSettingsContainer extends Component {

  render() {

    const {currentUserQuery, logOut} = this.props;

    if (currentUserQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <EditInfo 
          title='MIS DATOS'
          element1={currentUserQuery.me.firstName ? currentUserQuery.me.firstName +' '+ currentUserQuery.me.lastName : ''}
          element2={currentUserQuery.me.firstName ? currentUserQuery.me.email : ''}
          buttonTitle={currentUserQuery.me.firstName ? 'EDITAR' : 'AÑADIR'}
          onPress={this.onPressDetails}
        />
        <EditInfo 
          title='MI DIRECCIÓN DE ENVÍO'
          element1={currentUserQuery.me.address.address1 ? currentUserQuery.me.address.address1 : ''}
          element2={currentUserQuery.me.address.city ? currentUserQuery.me.address.city : ''}
          buttonTitle={currentUserQuery.me.address.address1 ? 'EDITAR' : 'AÑADIR'}
          onPress={this.onPressAddress}
        />        
        <EditInfo 
          title='INFORMACIÓN DE PAGO'
          element1={currentUserQuery.me.paymentInfo ? currentUserQuery.me.paymentInfo.cardNumber : ''}
          element2={currentUserQuery.me.paymentInfo ? currentUserQuery.me.paymentInfo.valid : ''}
          buttonTitle={currentUserQuery.me.paymentInfo ? 'EDITAR' : 'AÑADIR'}
          onPress={this.onPressPayment}
        />
        <MyButton
          title='Cerrar sesión'
          onPress={() => logOut();}
          buttonStyle={{ minWidth: moderateScale(50), height: moderateScale(30)}}
        />
      </View>
    );
  }

  onPressDetails = () => {
    const {navigation} = this.props;
    navigation.navigate('UserInfo');
  };

  onPressAddress = () => {
    const {navigation} = this.props;
    navigation.navigate('AddressInfo');
  };

  onPressPayment = () => {
    const {navigation} = this.props;
    console.log('PaymentInfo');
  };
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eeeeee',    
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id,
      email,
      firstName,
      lastName,
      address {
        address1,
        city,
      }
    }
  }
`;

const mapStateToProps = () => ({});

export default compose (
  connect(
    mapStateToProps,
    actions
  ),
  graphql( CURRENT_USER_QUERY, {
    name: 'currentUserQuery'
  })
)(UserSettingsContainer);