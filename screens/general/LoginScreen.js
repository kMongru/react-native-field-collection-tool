import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { Ionicons } from '@expo/vector-icons';

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
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [eye, setEye] = useState('eye-off-outline');
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

  const changeIcon = () => {
    setEye((prev) =>
      prev === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline'
    );
    setPasswordHidden((prev) => !prev);
  };

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
        <Text style={styles.headerTitle}>Log In</Text>
        <Text style={styles.instructionText}>Please log in to continue</Text>
      </View>
      <View style={styles.centeredItems}>
        <View style={styles.formContainer}>
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
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <AuthInput
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry={passwordHidden}
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <TouchableOpacity onPress={changeIcon}>
              <Ionicons name={eye} size={30} color={Colors.textGrey} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
          <View>
            <Text style={styles.logInText}>Log in</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: Colors.textGrey }}>Forget your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={handleCreateAccountNav}
      >
        <Text style={styles.bottomText}>
          Don't have an account?
          <Text style={styles.bottomTextGreen}> Sign up</Text>
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
  textContainer: {
    marginTop: '20%',
    marginHorizontal: '5%',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: '600',
  },
  instructionText: {
    color: Colors.textGrey,
  },
  centeredItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: Colors.backgroundGrey,
    marginTop: '10%',
    marginHorizontal: '5%',
    borderRadius: 25,
    padding: 10,
    borderWidth: 5,
    borderColor: Colors.backgroundGrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.84,
    elevation: 5,
  },
  loginContainer: {
    width: '70%',
    height: '10%',
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkPurple,
  },
  logInText: {
    fontWeight: '600',
    color: Colors.white,
  },
  createAccountContainer: {
    marginVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: Colors.textGrey,
  },
  bottomTextGreen: {
    color: Colors.primaryGreen,
    fontSize: 16,
  },
});

export default LoginScreen;
