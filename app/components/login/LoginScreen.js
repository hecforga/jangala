import React, { Component } from 'react';

import LoginContainer from './LoginContainer.js';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <LoginContainer />
    );
  }
}

export default LoginScreen;