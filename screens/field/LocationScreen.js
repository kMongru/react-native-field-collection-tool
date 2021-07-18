import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
//use selector in the textForm??
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';
import * as Location from 'expo-location';

import Dots from 'react-native-dots-pagination';

import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Screen';

const LocationScreen = (props) => {
  //set to false, prototyping is true for now
  const [isCompleted, setCompleted] = useState(false);
  //for the UI of the component
  const [useLocation, setUseLocation] = useState(false);

  //from expo docs, location.coords.latitude and location.coords.longitude
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const textInputHandler = () => {
    //need more form validation on GPS blank spaces
    if (text.trim()) {
      setCompleted(true);
    } else {
    }
  };

  const handleNavigation = () => {
    if (isCompleted) {
      dispatch(
        surveyActions.addInformation({
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        })
      );
      props.navigation.navigate('Summary');
    }
  };

  const handleLocation = async () => {
    if (errorMsg === null && useLocation != true) {
      let location = await Location.getCurrentPositionAsync({});
      //take these out later
      console.log(`long: ${location.coords.longitude}`);
      console.log(`lat: ${location.coords.latitude}`);
      setLocation(location);
      setUseLocation(true);
      setCompleted(true);
    } else {
      console.log('already have location!');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.tempCard}>
        <Text style={styles.title}>Location</Text>
        <View style={styles.greenCard}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.dashedBoarder}>
              <Image
                source={require('../../assets/Bitmap.png')}
                style={{ width: '100%', height: '100%' }}
              ></Image>
            </View>
            <View style={styles.locationButtonContainer}>
              <NextButton
                buttonName={'Use Current Location'}
                enabledStyle={styles.locationEnabled}
                disabledStyle={styles.locationDisabled}
                textDisabled={{ color: Colors.lightPurple }}
                onPress={handleLocation}
                isDisabled={!useLocation}
              />
            </View>
            <Text style={styles.ORtext}>---- OR ----</Text>
            <View style={styles.typeLocationContainer}>
              <Image source={require('../../assets/Bitmap.png')} />
              <View style={styles.textBox}>
                <TextInput
                  placeholder='GPS'
                  placeholderTextColor={Colors.textGrey}
                  style={{ color: Colors.primaryGreen }}
                  blurOnSubmit
                  multiline
                  keyboardType='default'
                  autoCapitalize='none'
                  autoCorrect={true}
                  onEndEditing={textInputHandler}
                  onChangeText={(text) => setText(text)}
                  defaultValue={text}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.bottomCard}>
          <NextButton
            onPress={handleNavigation}
            isDisabled={!isCompleted}
            nextArrow={true}
          />
        </View>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => {
      return (
        //see offical npm docs for all information relationing to Dot props
        <Dots
          length={3}
          active={2}
          activeDotHeight={15}
          activeDotWidth={15}
          activeColor={Colors.primaryGreen}
          passiveColor={Colors.backgroundGrey}
        />
      );
    },
    headerTransparent: true,
    headerRight: () => (
      <Pressable onPress={() => {}}>
        <Image
          source={require('../../assets/info.png')}
          style={styles.informationLogo}
        />
      </Pressable>
    ),
  };
};

const styles = StyleSheet.create({
  informationLogo: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginTop: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempCard: {
    flex: 1,
    marginTop: 75,
    width: DEVICE_WIDTH,
    backgroundColor: Colors.backgroundGrey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    margin: 10,
    width: '90%',
  },
  greenCard: {
    marginHorizontal: 0,
    marginVertical: 10,
    width: '90%',
    height: '70%',
    backgroundColor: Colors.primaryGreen,
    borderRadius: 25,
    padding: 20,
  },
  dashedBoarder: {
    width: '100%',
    height: '40%',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  locationButtonContainer: {
    width: '100%',
  },
  locationEnabled: {
    backgroundColor: Colors.lightPurple,
  },
  locationDisabled: {
    borderColor: Colors.lightPurple,
  },
  ORtext: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  typeLocationContainer: {
    marginTop: 20,
    width: '100%',
    height: '20%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: Colors.background,
    width: '80%',
    height: '45%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCard: {
    backgroundColor: Colors.background,
    width: DEVICE_WIDTH,
    height: '20%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 10,
  },
});

export default LocationScreen;
