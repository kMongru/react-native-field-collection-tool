import React, { useEffect, useState, useReducer } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import Colors from '../../constants/Colors';

//implement the same state managment here?
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//could implement this same structure for the input page??
const formReducer = (state, action) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  if (action.type === FORM_INPUT_UPDATE) {
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

const CreateAccountScreen = (props) => {
  //setting intital state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      organization: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    inputValidities: {
      organization: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  //dispatch a login action to the store to switch to new stack
  const handleLogin = async () => {
    //dispatch a login action to the store to switch to new stack
    let action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.confirmPassword,
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
            <View style={styles.inputLineContainer}>
              <Text style={styles.label}>Orgainization</Text>
              <TextInput style={styles.input} placeholder='orgainization' />
            </View>
            <View style={styles.inputLineContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput style={styles.input} placeholder='first name' />
            </View>
            <View style={styles.inputLineContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} placeholder='first name' />
            </View>
            <View style={styles.inputLineContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput style={styles.input} placeholder='first name' />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogin}
          >
            <View>
              <Text style={styles.buttonText}>Sign up & Log In</Text>
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
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenTitleContainer: {
    marginTop: '10%',
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: '70%',
    textAlign: 'left',
    marginVertical: 8,
    color: Colors.white,
    fontWeight: '600',
  },
  input: {
    width: '70%',
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primaryGreen,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    height: '10%',
    width: '70%',
    marginBottom: '5%',
    backgroundColor: Colors.darkPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});

export default CreateAccountScreen;
