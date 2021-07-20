import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const LoginScreen = (props) => {
  const handleLogin = () => {
    //dispatch a login action to the store to switch to new stack
  };

  const handleCreateAccountNav = () => {
    props.navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>Welcome!</Text>
      </View>
      <TouchableOpacity style={styles.card} onPress={handleLogin}>
        <View>
          <Text>Log in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleCreateAccountNav}>
        <Text>
          Don't have an account?<Text>Sign up</Text>
        </Text>
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

export default LoginScreen;
