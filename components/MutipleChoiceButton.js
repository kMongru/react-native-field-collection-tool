import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

/*
  val - should be the text held inside the mutiple choice
  handleCropSelection - callback implemented in parent component
*/

const MultipleChoiceButton = (props) => {
  const [isSelected, setSelected] = useState(false);

  //object destructing into consts
  const { value, handleCropSelection } = props;

  useEffect(() => {
    try {
      handleCropSelection(value, isSelected);
    } catch (e) {
      console.log(e);
    }
  }, [isSelected]);

  return (
    <View style={{ ...props.style, ...styles }}>
      <TouchableOpacity
        style={isSelected ? styles.buttonEnabled : styles.buttonDisabled}
        onPress={() => {
          setSelected((prevState) => !prevState);
        }}
      >
        <Text style={styles.text}>{value}</Text>
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
