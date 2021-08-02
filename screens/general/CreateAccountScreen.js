import React, { useCallback, useEffect, useState, useReducer } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import AuthInput from '../../components/AuthInput';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import Colors from '../../constants/Colors';

//implement the same state managment here?
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';

//could implement this same structure for the input page??
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
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
    case INPUT_BLUR:
      return { ...state, touched: true };
  }
};

const CreateAccountScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //for the orginization text, may be removed for dropdown
  const [text, setText] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const dispatch = useDispatch();

  //setting intital state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      organization: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
    inputValidities: {
      organization: false,
      email: false,
      password: false,
      confirmedPassword: false,
    },
    formIsValid: false,
  });

  const textHandler = () => {
    inputChangeHandler('organization', text, true);
  };

  const lostFocusHandler = () => {
    dispatchFormState({ type: INPUT_BLUR });
  };

  //called at the end of editing the confirmed password
  const handlePasswordConfirmation = () => {
    let validity = false;
    const password = formState.inputValues.password;
    const confirmedPassword = confirmText;

    console.log(formState);
    if (password != null && password === confirmedPassword) {
      //could be changed to its own action, just update validity
      validity = true;
    }
    inputChangeHandler('confirmedPassword', confirmText, validity);
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

  //dispatch a login action to the store to switch to new stack
  const handleLogin = async () => {
    //dispatch a login action to the store to switch to new stack
    console.log(formState.inputValues.password);
    let action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.confirmedPassword,
      formState.inputValues.organization
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitleText}>Create Account</Text>
        </View>
        <View style={styles.centerItems}>
          <View style={styles.inputFormContainer}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
              <View style={styles.inputLineContainer}>
                <View style={{ width: '90%', marginVertical: '5%' }}>
                  <Text style={styles.label}>Orgainization</Text>
                  <TextInput
                    style={styles.input}
                    placeholder='orgainization'
                    onEndEditing={textHandler}
                    onChangeText={(text) => setText(text)}
                  />
                </View>
              </View>
              <View style={styles.inputLineContainer}>
                <AuthInput
                  id='email'
                  label='Email Address'
                  keyboardType='email-address'
                  required
                  email
                  autoCapitalize='none'
                  errorText='Please enter a valid email address.'
                  onInputChange={inputChangeHandler}
                  initialValue=''
                />
              </View>
              <View style={styles.inputLineContainer}>
                <AuthInput
                  id='password'
                  label='Password'
                  keyboardType='default'
                  secureTextEntry={true}
                  required
                  minLength={5}
                  autoCapitalize='none'
                  errorText='Password must be longer then 5 characters.'
                  onInputChange={inputChangeHandler}
                  initialValue=''
                />
              </View>
              <View style={styles.inputLineContainer}>
                <View style={{ width: '90%', marginVertical: '5%' }}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    initialValue=''
                    autoCapitalize='none'
                    secureTextEntry={true}
                    required
                    style={styles.input}
                    placeholder='confirm'
                    onEndEditing={handlePasswordConfirmation}
                    onChangeText={(confirmText) => setConfirmText(confirmText)}
                    onBlur={lostFocusHandler}
                  />
                  {!formState.inputValidities.confirmedPassword &&
                    formState.touched && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Uh Oh</Text>
                      </View>
                    )}
                </View>
              </View>
            </ScrollView>
          </View>
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
                Sign up & Log In
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenTitleContainer: {
    marginTop: Platform.OS === 'ios' ? '15%' : '20%',
    marginHorizontal: '5%',
    width: '30%',
  },
  screenTitleText: { color: Colors.white, fontSize: 25, fontWeight: '600' },
  centerItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFormContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: Colors.backgroundGrey,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.84,
    elevation: 5,
  },
  inputLineContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginVertical: 8,
    color: Colors.white,
    fontWeight: '600',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primaryGreen,
    borderBottomWidth: 1,
  },
  loginContainer: {
    width: '70%',
    height: '10%',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
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
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default CreateAccountScreen;
