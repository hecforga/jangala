import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {moderateScale} from '../../utilities/layout.js';

import MyButton from '../common/MyButton.js';

class EditInfo extends Component {

  render() {
    const {title, element1, element2, buttonTitle, onPress} = this.props;

    return(
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 16}}>{element1}</Text>
            <Text style={{fontSize: 16}}>{element2}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MyButton
              title={buttonTitle}
              onPress={onPress}
              buttonStyle={{ minWidth: moderateScale(50), height: moderateScale(30)}}
            />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    height: 120,
    width: '100%',
    justifyContent: 'flex-start', 
    backgroundColor:'white',
    marginTop: 10, 
    padding: 18,  
  },
  titleText:{
    flex: 0.5,
    fontSize: 18,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  bottomContainer:{
    flexDirection: 'row', 
    flex: 0.5,
  },
  textContainer:{ 
    flexDirection: 'column',
    flex: 0.6,
    alignItems: 'flex-start',
  },
  buttonContainer:{ 
    flex: 0.4,
    justifyContent:'center',
  },
});

export default EditInfo;