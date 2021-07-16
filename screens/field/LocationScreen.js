import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';
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
  const [isCompleted, setCompleted] = useState(true);
  //for the UI of the component
  const [useLocation, setUseLocation] = useState(false);

  //from expo docs, location.coords.latitude and location.coords.longitude
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const handleNavigation = () => {
    if(isCompleted){
      dispatch(
        surveyActions.addInformation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
      props.navigation.navigate('Summary')
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
          <View style={styles.dashedBoarder}>
            <Image
              source={require('../../assets/Bitmap.png')}
              style={{ width: '100%', height: '100%' }}
            ></Image>
          </View>
          <View style={styles.locationButtonContainer}>
            <NextButton
              buttonName={'Use Current Location'}
              onPress={handleLocation}
              isDisabled={!useLocation}
            />
          </View>
          <Text style={styles.ORtext}>---- OR ----</Text>
          <View style={styles.typeLocationContainer}>
            <NextButton
              buttonName={'Enter GPS Coordinates'}
              onPress={() => {}}
              isDisabled={useLocation}
            />
          </View>
        </View>

        <View style={styles.bottomCard}>
          <NextButton onPress={handleNavigation} isDisabled={!isCompleted} />
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
    backgroundColor: 'red',
  },
  ORtext: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  typeLocationContainer: {
    width: '100%',
    backgroundColor: 'green',
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
