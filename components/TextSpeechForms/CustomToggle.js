import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

//importing from a specific icon pack
//import { Icon } from 'react-native-vector-icons/Ionicons';

const CustomToggle = (props) => {
  return (
    <View>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={props.toggleSwitch}
        value={props.isEnabled}
      />
    </View>
  );
};

export default CustomToggle;
