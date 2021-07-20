import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const UsersLandingScreen = (props) => {
  const handleFieldLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>Welcome!</Text>
      </View>
      <TouchableOpacity style={styles.card} onPress={handleFieldLogin}>
        <View>
          <Text>Field Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <View>
          <Text>Lab Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    flex: 1,
    marginVertical: 40,
    backgroundColor: Colors.primaryGreen,
  },
});

export default UsersLandingScreen;
