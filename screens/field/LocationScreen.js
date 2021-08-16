import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
//use selector in the textForm??
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';
import * as Location from 'expo-location';

import Dots from '../../components/Dots';
import Popup from '../../components/Popup';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Screen';

/* 
  Text handing needs logic to seperate the string into long and lat
*/

const LocationScreen = (props) => {
  //set to false, prototyping is true for now
  const [isCompleted, setCompleted] = useState(false);
  //for the UI of the component
  const [useLocation, setUseLocation] = useState(false);

  //from expo docs, location.coords.latitude and location.coords.longitude
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //for the text input
  const [text, setText] = useState(null);

  //for the location loading
  const [loading, setLoading] = useState(false);

  //information header button
  const [informationModalVisible, setInformationModalVisible] = useState(false);

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
    try {
      if (text.trim()) {
        //split the string by the commas and cut whitespaces
        let locationArray = text.split(',[ ]*');
        //setting the location
        setLatitude(locationArray[0]);
        setLongitude(locationArray[1]);
        setCompleted(true);
      }
    } catch (e) {
      setCompleted(false);
    }
  };

  const handleLocation = async () => {
    //if statement to avoid double presses
    if (errorMsg === null && useLocation != true) {
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLoading(false);
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
      setUseLocation(true);
      setCompleted(true);
    } else {
      console.log('already have location!');
    }
  };

  const handleNavigation = () => {
    if (isCompleted) {
      dispatch(
        surveyActions.addInformation({
          latitude: latitude,
          longitude: longitude,
        })
      );
      props.navigation.navigate('Summary');
    }
  };

  //allowing header component to interact with screen components
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setInformationModalVisible(!informationModalVisible)}
        >
          <Image
            source={require('../../assets/info.png')}
            style={styles.informationLogo}
          />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.backgroundCard}>
          <Text style={styles.title}>Location</Text>
          {/* Input Forms */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={10}
            style={{
              flex: 4.5,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={styles.greenCard}>
              <View style={styles.dashedBoarder}>
                <Image
                  source={require('../../assets/Bitmap.png')}
                  style={styles.map}
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
                <View style={styles.textBox}>
                  <TextInput
                    placeholder='Enter latitude, longitude...'
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
            </View>
          </KeyboardAvoidingView>

          <View style={styles.bottomCard}>
            <NextButton
              onPress={handleNavigation}
              isDisabled={!isCompleted}
              nextArrow={true}
            />
          </View>
        </View>

        {/* Loading Modal */}
        {loading && (
          <Modal transparent={true} style={styles.loadingScreen}>
            <View style={styles.loadingBackground}>
              <ActivityIndicator size='large' color={Colors.white} />
            </View>
          </Modal>
        )}
        {/* Information Popup */}
        <View style={{ width: 0, height: 0 }}>
          <Popup
            modalText={
              'Please stand as close as possible to the collection site when using current location'
            }
            modalVisible={informationModalVisible}
            onPress={() => setInformationModalVisible(!informationModalVisible)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => {
      return (
        //activeDot determines active index
        <Dots activeDot={2} />
      );
    },
    headerTransparent: true,
    headerTintColor: Colors.textGrey,
    headerBackTitle: 'Back',
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
  backgroundCard: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '17%' : '25%',
    width: DEVICE_WIDTH,
    backgroundColor: Colors.backgroundGrey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'visible',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    marginVertical: 10,
    width: '90%',
    height: '90%',
    backgroundColor: Colors.primaryGreen,
    borderRadius: 25,
    padding: 20,
  },
  dashedBoarder: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  map: { width: DEVICE_WIDTH / 1.5, height: DEVICE_WIDTH / 3 },
  locationButtonContainer: {
    width: '100%',
  },
  locationEnabled: {
    backgroundColor: Colors.lightPurple,
  },
  locationDisabled: {
    borderColor: Colors.lightPurple,
    elevation: 0,
  },
  ORtext: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold',
  },
  typeLocationContainer: {
    marginTop: 10,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: Colors.background,
    width: DEVICE_WIDTH / 1.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: Colors.background,
    width: DEVICE_WIDTH,
    height: '20%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  loadingScreen: {
    flex: 1,
  },
  loadingBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.7,
  },
});

export default LocationScreen;
