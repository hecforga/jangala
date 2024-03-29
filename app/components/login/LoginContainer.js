import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';
import { token } from '../../constants.js';

import MyButton from '../common/MyButton.js';

class LoginContainer extends Component {

  render() {
    const { logIn } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.background}>     
          <Video
            source={require('../videos/jungla.mp4')}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ flex: 1 }}
          />
        </View>
        <View style={styles.background}>
          <View style={styles.topMargin}>
            <Image 
              source={require('../images/logo_blanco_s.png')}
              style={{ width: 230, marginTop: 60 }}
              resizeMode='contain'
            />
          </View>
          <View style={styles.sloganContainer}>
            <Text style={styles.sloganText}>Genuine brands for #freesouls.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MyButton
              title='Continuar con Facebook'
              onPress={this.onLogInPress}
              buttonStyle={styles.buttonStyle}
              textStyle={{fontSize: 15}}
            />
          </View>
          <View style={styles.bottomMargin}/>
        </View>
      </View> 
    );
  }

  onLogInPress = () => {
    const { logIn } = this.props;
    logIn(token);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  topMargin: {
    flex: 0.525,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sloganContainer: {
    flex: 0.085,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sloganText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 0.165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 48,
    width: 285,
    backgroundColor: '#3b5998',
  },
  bottomMargin: {
    flex: 0.225,
  },
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions
)(LoginContainer);