import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from 'react-native';
//use selector in the textForm??
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';

import Dots from 'react-native-dots-pagination';

import MultipleChoiceButton from '../../components/MutipleChoiceButton';
import TextSpeechForm from '../../components/TextSpeechForms/TextSpeechForm';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const InputFormsScreen = (props) => {
  const [isCompleted, setCompleted] = useState(false);

  //mutiple choice selection
  const [selectedChoice, setSelectedChoice] = useState(null);
  //text/audio information, either string or uri
  const [cultivar, setCultivar] = useState(null);
  const [controlMethods, setControlMethods] = useState(null);
  const [hotspotDecription, setHotspotDecription] = useState(null);
  const [otherNotes, setOtherNotes] = useState(null);

  useEffect(() => {
    //need to change so value goes back to null or false after
    selectedChoice &&
    cultivar &&
    controlMethods &&
    hotspotDecription &&
    otherNotes
      ? setCompleted(true)
      : setCompleted(false);
    console.log(isCompleted);
  }, [selectedChoice, cultivar, controlMethods, hotspotDecription, otherNotes]);

  //to dipatch actions to the store
  const dispatch = useDispatch();

  //presetting the information for persisentence, use the proper survey identifier, in combine reducer
  const presetState = useSelector((state) => state.survey.crop);

  //getting values (text or uri) from children textSpeechForm component
  const handleCropSelection = (value) => {
    console.log('in the loop');
    setSelectedChoice((prev) => (prev === value ? prev : value));
    console.log(selectedChoice);
  };

  const handleCultivarCallback = (value) => {
    setCultivar(value);
  };

  const handleControlMethodsCallback = (value) => {
    setControlMethods(value);
  };

  const handleHotspotDescriptionCallback = (value) => {
    setHotspotDecription(value);
  };

  //might be able to pass functions as arguments to reduce redundency
  const handleOtherNotesCallback = (value) => {
    if (value) {
      setOtherNotes(value);
    } else {
      setOtherNotes(false);
    }
  };

  //naviagtion to next page
  const handleNavigation = () => {
    if (isCompleted) {
      dispatch(
        surveyActions.addInformation({
          crop: selectedChoice,
          cultivar: cultivar,
          controlMethods: controlMethods,
          hotspotDecription: hotspotDecription,
          otherNotes: otherNotes,
        })
      );
      return props.navigation.navigate('Camera');
    } else {
      return undefined;
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.tempCard}>
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          behavior='padding' //need to change for andriod
          enabled
          keyboardVerticalOffset={100}
        >
          <ScrollView>
            <View style={styles.mutipleChoiceContainer}>
              <Text style={styles.sectionTitles}>Crops</Text>
              <MultipleChoiceButton
                val={'Soybeans'}
                onPress={handleCropSelection.bind(this, 'Soybeans')}
              />
              <MultipleChoiceButton
                val={'Dry Beans'}
                onPress={handleCropSelection.bind(this, 'Dry Beans')}
              />
              <MultipleChoiceButton
                val={'Tomato'}
                onPress={handleCropSelection.bind(this, 'Tomato')}
              />
              <MultipleChoiceButton
                val={'Other'}
                onPress={handleCropSelection.bind(this, 'Other')}
              />
            </View>
            <View style={styles.formsContainer}>
              <TextSpeechForm
                title={'Cultivar/Variety'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'variety modal'}
                parentCallback={handleCultivarCallback}
              />
              <TextSpeechForm
                title={'Previous Control Methods'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'control modal'}
                parentCallback={handleControlMethodsCallback}
              />
              <TextSpeechForm
                title={'Hotspot Description'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'hotspot modal'}
                parentCallback={handleHotspotDescriptionCallback}
              />
              <TextSpeechForm
                title={'Other Notes'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'others modal'}
                parentCallback={handleOtherNotesCallback}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
          active={0}
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
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempCard: {
    backgroundColor: Colors.backgroundGrey,
    marginTop: 75,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  sectionTitles: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 20,
    paddingLeft: 20,
  },
  mutipleChoiceContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formsContainer: {
    flex: 2,
  },
  bottomCard: {
    backgroundColor: Colors.background,
    width: DEVICE_WIDTH,
    height: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 100,
  },
  informationLogo: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginTop: 10,
  },
});

export default InputFormsScreen;
