import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

/*  expected props

  isDisabled - controls what state the button is in
  onPress - the method attached to the touchable opacity
  disabledStyle - additional disabled style
  enabledStyle - additional enabled style

  need to make this more flexible and become a general button*

*/

const NextButton = ({ buttonName = 'Next', ...props }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(props.isDisabled);
  }, [props.isDisabled]);

  return (
    <View>
      <TouchableOpacity
        style={
          buttonDisabled
            ? { ...styles.buttonDisabled, ...props.disabledStyle }
            : { ...styles.buttonEnabled, ...props.enabledStyle }
        }
        onPress={props.onPress}
      >
        <Text style={buttonDisabled ? styles.textDisabled : styles.textEnabled}>
          {buttonName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 40,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
    color: Colors.white,
  },
  buttonDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 40,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.yellow,
    backgroundColor: Colors.backgroundColor,
    color: Colors.yellow,
  },
  textDisabled: {
    fontWeight: '400',
    fontSize: 20,
    color: Colors.yellow,
  },
  textEnabled: {
    fontWeight: '400',
    fontSize: 20,
    color: Colors.white,
  },
});

export default NextButton;
