import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TextInput,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
//use selector in the textForm??
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';
import * as Location from 'expo-location';

import Dots from 'react-native-dots-pagination';

import Popup from '../../components/Popup';
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
  //for the text input
  const [text, setText] = useState(null);

  //for the location loading
  const [loading, setLoading] = useState(false);

  //information header button
  const [modalVisible, setModalVisible] = useState(false);

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
    }
  };

  const handleLocation = async () => {
    //if statement to avoid double presses
    if (errorMsg === null && useLocation != true) {
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLoading(false);
      setLocation(location);
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
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        })
      );
      props.navigation.navigate('Summary');
    }
  };

  //allowing header component to interact with screen components
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../../assets/info.png')}
            style={styles.informationLogo}
          />
        </Pressable>
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundCard}>
        <Text style={styles.title}>Location</Text>
        <View style={styles.greenCard}>
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
            {/* <Image source={require('../../assets/Bitmap.png')} /> */}
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
        </View>

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
      {/* Information Popup, Broken */}
      {/* <Popup
        modalText={
          'You can click on the titles of each section, such as "Cultivar" for additional information!'
        }
        modalVisible={modalVisible}
        onPress={() => setModalVisible(!modalVisible)}
      /> */}
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
    headerTintColor: Colors.textGrey,
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
    elevation: 0,
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
