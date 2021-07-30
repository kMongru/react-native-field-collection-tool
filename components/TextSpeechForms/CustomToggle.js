import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

//importing from a specific icon pack
//import { Icon } from 'react-native-vector-icons/Ionicons';

const CustomToggle = (props) => {
  return (
    <View>
      <Switch
        trackColor={{ false: Colors.darkPurple, true: '#B0903D' }}
        thumbColor={props.isEnabled ? Colors.yellow : Colors.lightPurple}
        ios_backgroundColor={Colors.darkPurple}
        onValueChange={props.toggleSwitch}
        value={props.isEnabled}
      />
    </View>
  );
};

export default CustomToggle;
