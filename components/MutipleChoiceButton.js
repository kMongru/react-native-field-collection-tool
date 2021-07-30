import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

/*
  id - the key for accessing the redux state
  title - should be the text held inside the mutiple choice
  handleCropSelection - callback implemented in parent component
*/

const MultipleChoiceButton = (props) => {
  const [isSelected, setSelected] = useState(false);

  //object destructing into consts
  const { id, title, handleCropSelection } = props;

  let containerState = useSelector((state) => state.mc.validities);

  //gets called on inital mounting, relays state change of isSelected
  useEffect(() => {
    //to avoid double calling, only called on true state
    isSelected ? handleCropSelection(id, isSelected) : null;
  }, [isSelected]);

  //changes the UI based on the state
  useEffect(() => {
    containerState[id] != isSelected ? setSelected(containerState[id]) : null;
  }, [containerState[id]]);

  return (
    <View style={{ ...props.style, ...styles }}>
      <TouchableOpacity
        style={
          isSelected
            ? { ...styles.button, ...styles.buttonEnabled }
            : { ...styles.button, ...styles.buttonDisabled }
        }
        onPress={() => {
          setSelected((prevState) => !prevState);
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '7%',
    marginVertical: '3%',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonEnabled: {
    borderColor: Colors.white,
    backgroundColor: Colors.darkPurple,
  },
  buttonDisabled: {
    borderColor: Colors.darkPurple,
  },
  text: {
    fontWeight: '400',
    color: Colors.white,
    fontSize: 20,
  },
});

export default MultipleChoiceButton;
