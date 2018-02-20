import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-native-modal';
import {moderateScale} from '../../utilities/layout.js';

import MyButton from '../common/MyButton.js';

class UserInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: '',
      email: '',
      phone: '',
      buttonDisabled: true,
      mutationUser: {
      }
    }
  }

  componentWillUpdate( nextProps, nextState ) {
    if(!this.state.firstName && !nextProps.userQuery.loading){
      this.setState({
        firstName: nextProps.userQuery.me.firstName,
        lastName: nextProps.userQuery.me.lastName,
        email: nextProps.userQuery.me.email,
        phone: nextProps.userQuery.me.phone,
      });
    }
  }

  render() {

    const {userQuery, confirmationModalIsVisible, setCanGoBack, setConfirmationModalIsVisible} = this.props;

    if (userQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>NOMBRE</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.firstName}
            onChangeText={(text) => {
              this.setState({firstName: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>   
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>APELLIDO</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.lastName}
            onChangeText={(text) => {
              this.setState({lastName: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>  
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>EMAIL</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.email}
            onChangeText={(text) => {
              this.setState({email: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>  
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>MÓVIL</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.phone}
            onChangeText={(text) => {
              this.setState({phone: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>   
        <View style={styles.buttonsContainer} >        
          <MyButton
            title='cancelar'
            onPress={this.onCancelPress}
            containerStyle={{flex:1, marginRight:8}} 
          />
          <MyButton
            title='guardar'
            onPress={this.onSavePress }
            containerStyle={{flex:1, marginLeft:8}} 
            disabled={this.state.buttonDisabled}
          />
        </View>
        <Modal
          isVisible={confirmationModalIsVisible}
          onBackButtonPress={() => setConfirmationModalIsVisible(false)}
          onBackdropPress={() => setConfirmationModalIsVisible(false)}
          backDropColor={'white'}
          backDropOpacity={0}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>Si sales ahora tus cambios no se guardarán.</Text>
              <Text style={styles.modalText}>¿Quieres salir sin guardar?</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <MyButton
                title='cancelar'
                onPress={() => setConfirmationModalIsVisible(false)}
                containerStyle={{flex:0.4}} 
              />
              <MyButton
                title='salir'
                onPress={this.onExitPress}
                containerStyle={{flex:0.4}} 
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  onSavePress = () => {
    const {navigation} = this.props;
    var mutationAddress = {
      address1: this.state.address1,
      city: this.state.city,
      zip: this.state.zip,
      province: this.state.province,
      country: this.state.country
    };
    this.setState({mutationAddress: mutationAddress});

    navigation.goBack(null);
  };

  onCancelPress = () => {
    const {navigation, setConfirmationModalIsVisible} = this.props;
    if(!this.state.buttonDisabled){
      setConfirmationModalIsVisible(true);
    }
    else{
      navigation.goBack(null);
    }
  };

  onExitPress = () => {
    const {navigation} = this.props;
    navigation.goBack(null);
  };
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: moderateScale(16),   
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  textInputContainer: {
    flex:0.16,
    width: '100%',
  },
  textInputTitle: {
    marginLeft:moderateScale(3.5), 
    fontSize: moderateScale(12), 
    fontWeight:'600', 
    color: '#484848',
  },
  textInput: {
    height: moderateScale(45), 
    width: '100%',
    borderWidth: 0,
    paddingLeft: moderateScale(3.5),
    fontSize: moderateScale(16),
  },
  buttonsContainer: {
    flex: 0.20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
  },
  modalContent: {
    flex:0.4,
    backgroundColor:'white',
    padding: moderateScale(16),
  },
  modalTextContainer: {
    flex:0.65,
    justifyContent: 'flex-start'
  },
  modalText: {
    fontSize:moderateScale(16),
    marginTop:moderateScale(16),
  }, 
  modalButtonsContainer: {
    flex:0.35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
  },
});

const USER_QUERY = gql`
  query {
    me {
      id,
      firstName,
      lastName,
      email,
      phone,
    }
  }
`;

export default graphql( USER_QUERY, {
  name: 'userQuery'
})(UserInfoContainer);