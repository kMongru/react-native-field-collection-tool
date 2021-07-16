import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

//start with just text design then move into mic implementation
const Input = (props) => {
  return (
    <View style={styles.textContainer}>
      <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primaryGreen,
  },
  input: {
    height: 100,
  },
});

export default Input;
