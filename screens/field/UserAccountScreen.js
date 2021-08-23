import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//custom imports
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const UserAccountScreen = (props) => {
  const dispatch = useDispatch();

  //userId
  const userEmail = useSelector((state) => state.auth.userId);

  //logout function
  const handleLogout = async () => {
    try {
      await dispatch(authActions.logout());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Account Screen</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Email</Text>
        <View>
          <Text style={styles.formInfo}>{userEmail}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <NextButton
          isDisabled={false}
          onPress={handleLogout}
          buttonName={'Logout'}
          enabledStyle={{ backgroundColor: Colors.darkPurple }}
        />
      </View>
    </SafeAreaView>
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
    backgroundColor: Colors.backgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    marginTop: '15%',
    padding: 10,
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
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
  formHeader: {},
  formInfo: {
    color: Colors.white,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
    height: '20%',
    width: '100%',
  },
});

export default UserAccountScreen;
