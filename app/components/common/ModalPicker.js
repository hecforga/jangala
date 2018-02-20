import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';

class ModalPicker extends Component {
  render() {
    const { isVisible, onBackButtonPress, onBackdropPress, data, onValueChange } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {data.map((option) => (
            <TouchableHighlight
              key={option.value}
              onPress={() => onValueChange(option.value)}
              disabled={option.disabled}
            >
              <View style={styles.optionButton}>
                <Text style={[styles.optionText, this.getOptionTextStyle(option)]}>{option.label}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </Modal>
    );
  }

  getOptionTextStyle = (option) => {
    if (option.disabled) {
      return {
        color: 'red',
        textDecorationLine: 'line-through',
        fontWeight: 'normal',
      };
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  optionText: {
    fontWeight: 'bold',
  },
});

export default ModalPicker;