import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserAccountScreen = (props) => {
  return (
    <View>
      <Text>Account Screen</Text>
      <TouchableOpacity>
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserAccountScreen;
