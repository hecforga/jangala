import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-native-modal';
import {moderateScale} from '../../utilities/layout.js';

import MyButton from '../common/MyButton.js';

class AddressInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      address1: undefined,
      city: '',
      zip: '',
      province: '',
      country: '',
      buttonDisabled: true,
      mutationAddress: {
      }
    }
  }

  componentWillUpdate( nextProps, nextState ) {
    if(!this.state.address1 && !nextProps.addressQuery.loading){
      this.setState({
        address1: nextProps.addressQuery.me.address.address1,
        city: nextProps.addressQuery.me.address.city,
        zip: nextProps.addressQuery.me.address.zip,
        province: nextProps.addressQuery.me.address.province,
        country: nextProps.addressQuery.me.address.country,
      });
    }
  }

  render() {

    const {addressQuery, confirmationModalIsVisible, setCanGoBack, setConfirmationModalIsVisible} = this.props;

    if (addressQuery.loading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>CALLE</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.address1}
            onChangeText={(text) => {
              this.setState({address1: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>POBLACIÓN</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.city}
            onChangeText={(text) => {
              this.setState({city: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>   
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>CÓDIGO POSTAL</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.zip}
            onChangeText={(text) => {
              this.setState({zip: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>  
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>PROVINCIA</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.province}
            onChangeText={(text) => {
              this.setState({province: text});
              if(this.state.buttonDisabled){
                setCanGoBack();
                this.setState({buttonDisabled:false});
              }
            }}
          />
        </View>  
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>PAÍS</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.country}
            onChangeText={(text) => {
              this.setState({country: text});
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

const ADDRESS_QUERY = gql`
  query {
    me {
      id,
      address {
        address1,
        city,
        zip,
        province,
        country,
      }
    }
  }
`;

export default graphql( ADDRESS_QUERY, {
  name: 'addressQuery'
})(AddressInfoContainer);