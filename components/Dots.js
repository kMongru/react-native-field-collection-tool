import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { DEVICE_WIDTH } from '../constants/Screen';

/*
  activeDot should be an int between 0 - 2
*/

//inital dot array of length 3
const dotArray = [0, 0, 0];

const Dots = (props) => {
  const { activeDot } = props;
  return (
    <View style={styles.container}>
      {dotArray.map((value, index) => {
        return (
          <View
            key={index}
            style={
              index === activeDot
                ? [styles.dot, styles.activeDot]
                : [styles.dot, styles.inactiveDot]
            }
          ></View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: Colors.backgroundGrey,
    width: DEVICE_WIDTH / 30,
    height: DEVICE_WIDTH / 30,
    borderRadius: DEVICE_WIDTH / 60,
  },
  activeDot: {
    backgroundColor: Colors.primaryGreen,
    width: DEVICE_WIDTH / 25,
    height: DEVICE_WIDTH / 25,
    borderRadius: DEVICE_WIDTH / 50,
  },
});

export default Dots;
