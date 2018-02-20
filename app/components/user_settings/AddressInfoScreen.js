import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderBackButton} from 'react-navigation';

import AddressInfoContainer from './AddressInfoContainer.js';

class AddressInfoScreen extends Component {  

  static navigationOptions = ({navigation}) => ({
    title: 'Mi dirección',
    headerLeft: ( 
      <HeaderBackButton 
        onPress={() => navigation.state.params.handleBack()}
      /> ),
  });

  constructor(props) {
    super(props);
    this.state = {      
      confirmationModalIsVisible: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ 
      handleBack: this.onBackPress,
      setConfirmationModalIsVisible: this.setConfirmationModalIsVisible,
      canGoBack: true
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <AddressInfoContainer 
        navigation={navigation}
        confirmationModalIsVisible={this.state.confirmationModalIsVisible}
        setCanGoBack={this.setCanGoBack}
        setConfirmationModalIsVisible={this.setConfirmationModalIsVisible}
      />
    );
  }

  onBackPress = () => {
    const { navigation } = this.props;

    if(navigation.state.params.canGoBack){
      navigation.goBack(null);
    }
    else{
      this.setConfirmationModalIsVisible(true);
    }
  };

  setCanGoBack = () => {
    this.props.navigation.setParams({canGoBack: false});
  };

  setConfirmationModalIsVisible = (isVisible) => {
    this.setState({ confirmationModalIsVisible: isVisible });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AddressInfoScreen;