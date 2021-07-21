import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../../constants/Colors';

//implement the same state managment here?

const CreateAccountScreen = (props) => {
  const handleLogin = () => {
    //dispatch a login action to the store to switch to new stack
  };
  return (
    <View style={styles.screen}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitleText}>Create Account</Text>
      </View>
      <View style={styles.centerItems}>
        <View style={styles.inputFormContainer}>
          <View style={styles.inputLineContainer}>
            <TextInput style={styles.input} placeholder='first name' />
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <View>
            <Text style={styles.buttonText}>Sign up & Log In</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  screenTitleContainer: {
    marginTop: '20%',
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
    width: '100%',
    alignItems: 'center',
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
