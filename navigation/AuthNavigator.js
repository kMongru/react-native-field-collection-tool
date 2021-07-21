import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Colors from '../constants/Colors';

//importing all screens and screenOptions
import UsersLandingScreen, {
  screenOptions as LandingScreenOptions,
} from '../screens/general/UsersLandingScreen';
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from '../screens/general/LoginScreen';
import CreateAccountScreen, {
  screenOptions as CreateAccountScreenOptions,
} from '../screens/general/CreateAccountScreen';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      {/* <AuthStackNavigator.Screen
        name='Landing'
        component={UsersLandingScreen}
        options={LandingScreenOptions}
      /> */}
      {/* <AuthStackNavigator.Screen
        name='Login'
        component={LoginScreen}
        options={LoginScreenOptions}
      /> */}
      <AuthStackNavigator.Screen
        name='CreateAccount'
        component={CreateAccountScreen}
        options={CreateAccountScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
