import React, { useState, useCallback, useReducer } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

//custom imports
import * as authActions from '../../store/actions/auth';
import AuthInput from '../../components/AuthInput';
import Colors from '../../constants/Colors';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//could implement this same structure for the input page??
//redux for state mangement of the log in form
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    //uses action.input param as key for object
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    //update validity by combinning with old state and overwritting
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    //loop to check if each key returns a valid true state, only remains true if ALL are true
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
  //declaring and initizating useStates
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [eye, setEye] = useState('eye-off-outline');

  const dispatch = useDispatch();

  //inital state of redux store
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

  //change the image of the eye icon to change password visibility
  const changeIcon = () => {
    setEye((prev) =>
      prev === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline'
    );
    setPasswordHidden((prev) => !prev);
  };

  //needs to be async for rest calls to server!
  const handleLogin = async () => {
    //dispatch a login action to the store to switch to new nav stack
    let action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    setIsLoading(true);
    try {
      //navigation is a result of auth store state change after this action has been dispatched
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  //handling input changes, and updating the form state
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

  //simple navigation implementation
  const handlePasswordNav = () => {
    //still need to build screens and recovery system
  };
  const handleCreateAccountNav = () => {
    props.navigation.navigate('CreateAccount');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        {/* Title Text */}
        <View style={styles.textContainer}>
          <Text style={styles.headerTitle}>Log In</Text>
          <Text style={styles.instructionText}>Please log in to continue</Text>
        </View>

        {/* Input Forms */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              color={Colors.white}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                color={Colors.white}
              />
              <TouchableOpacity onPress={changeIcon}>
                <Ionicons name={eye} size={30} color={Colors.textGrey} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.centeredItems}>
          {/* Login Button */}
          <TouchableOpacity
            style={
              formState.formIsValid
                ? { ...styles.loginContainer, ...styles.loginEnabled }
                : { ...styles.loginContainer, ...styles.loginDisabled }
            }
            disabled={!formState.formIsValid}
            onPress={handleLogin}
          >
            <View>
              <Text
                style={
                  formState.formIsValid
                    ? { ...styles.logInText, color: Colors.white }
                    : { ...styles.logInText, color: Colors.darkPurple }
                }
              >
                Log in
              </Text>
            </View>
          </TouchableOpacity>

          {/* Forgotten Password */}
          <TouchableOpacity onPress={handlePasswordNav} style={{ flex: 1 }}>
            <Text style={{ color: Colors.textGrey }}>
              Forget your password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Create Account Text */}
        <TouchableOpacity
          style={styles.createAccountContainer}
          onPress={handleCreateAccountNav}
        >
          <Text style={styles.bottomText}>
            Don't have an account?
            <Text style={styles.bottomTextGreen}> Sign up</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerTintColor: Colors.textGrey,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  textContainer: {
    marginTop: Platform.OS === 'ios' ? '15%' : '20%',
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: Colors.backgroundGrey,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: '5%',
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
    height: '40%',
    width: '70%',
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginEnabled: {
    backgroundColor: Colors.darkPurple,
  },
  loginDisabled: {
    backgroundColor: Colors.popupGrey,

    borderWidth: 1,
    borderColor: Colors.darkPurple,
  },
  logInText: {
    fontWeight: '600',
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
