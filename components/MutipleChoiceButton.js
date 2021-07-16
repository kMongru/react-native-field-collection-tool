import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
/*
  val - should be the text held inside the mutiple choice
*/

const MultipleChoiceButton = (props) => {
  const [isSelected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected((prevState) => !prevState);
  };

  return (
    <View style={{ ...props.style, ...styles }}>
      <TouchableOpacity
        style={isSelected ? styles.buttonEnabled : styles.buttonDisabled}
        onPress={() => {
          props.onPress();
          handlePress();
        }}
      >
        <Text style={styles.text}>{props.val}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.darkPurple,
  },
  buttonDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkPurple,
  },
  text: {
    fontWeight: '400',
    color: Colors.white,
    fontSize: 20,
  },
});

export default MultipleChoiceButton;
