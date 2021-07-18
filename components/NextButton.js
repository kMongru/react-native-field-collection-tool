import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';

/*  expected props

  isDisabled - controls what state the button is in
  buttonName - displayed name within the button
  onPress - the method attached to the touchable opacity
  disabledStyle - additional disabled style
  enabledStyle - additional enabled style
  textDisabled - disabled text

  need to make this more flexible and become a general button*

*/

const NextButton = ({ buttonName = 'Next', nextArrow = false, ...props }) => {
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
        <View style={styles.rowContainer}>
          <Text
            style={
              buttonDisabled
                ? { ...styles.textDisabled, ...props.textDisabled }
                : styles.textEnabled
            }
          >
            {buttonName}
          </Text>
          {nextArrow && (
            <Image
              source={require('../assets/white-right-arrow.png')}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
          )}
        </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    shadowColor: Colors.yellow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textDisabled: {
    fontWeight: '400',
    fontSize: 20,
    color: Colors.white,
  },
  textEnabled: {
    fontWeight: '400',
    fontSize: 20,
    color: Colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
});

export default NextButton;
