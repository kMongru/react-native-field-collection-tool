import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import AuthInput from '../../components/AuthInput';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//could implement this same structure for the input page??
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  //needs to be async for rest calls to server!
  const handleLogin = async () => {
    //dispatch a login action to the store to switch to new stack
    let action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const handleCreateAccountNav = () => {
    props.navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>Welcome!</Text>
      </View>
      <AuthInput
        id='email'
        label='E-Mail'
        keyboardType='email-address'
        required
        email
        autoCapitalize='none'
        errorText='Please enter a valid email address.'
        onInputChange={inputChangeHandler}
        initialValue=''
      />
      <AuthInput
        id='password'
        label='Password'
        keyboardType='default'
        secureTextEntry
        required
        minLength={5}
        autoCapitalize='none'
        errorText='Please enter a valid password.'
        onInputChange={inputChangeHandler}
        initialValue=''
      />
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
