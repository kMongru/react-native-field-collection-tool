import React, { useEffect, useState, useReducer, useCallback } from 'react';
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
import * as mcActions from '../../store/actions/multipleChoice';

import Dots from 'react-native-dots-pagination';

import Popup from '../../components/Popup';
import MultipleChoiceButton from '../../components/MutipleChoiceButton';
import TextSpeechForm from '../../components/TextSpeechForms/TextSpeechForm';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const MULTIPLE_CHOICE_SELECTION = 'MULTIPLE_CHOICE_SELECTION';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const inputFormReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
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

    default:
      return state;
  }
};

const InputFormsScreen = (props) => {
  //entire screen state, may be removed
  const [isCompleted, setCompleted] = useState(false);

  //information header button
  const [modalVisible, setModalVisible] = useState(false);

  //to dipatch actions to the store
  const dispatch = useDispatch();

  //presetting the information for persisentence, use the proper survey identifier, in combine reducer
  const presetState = useSelector((state) => state.survey.crop);

  const multipleChoiceState = useSelector((state) => state.mc);

  //handling the callback from children components
  const handleCropSelection = useCallback(
    (identifier, validity) => {
      console.log(identifier + '/' + validity);
      dispatch(mcActions.selectOption(identifier, validity));
    },
    [multipleChoiceState]
  );

  //inital state of input form redux store
  const [inputFormState, dispatchFormState] = useReducer(inputFormReducer, {
    inputValues: {
      cultivar: '',
      controlMethods: '',
      hotspotDescription: '',
      otherNotes: '',
    },
    inputValidities: {
      cultivar: false,
      controlMethods: false,
      hotspotDescription: false,
      otherNotes: false,
    },
    formIsValid: false,
  });

  //getting values (text or uri) from children textSpeechForm component
  const handleInputForm = useCallback(
    (inputIndentifier, inputValue, inputValidity) => {
      console.log(inputIndentifier + '/' + inputValue + '/' + inputValidity);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIndentifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  //determining if the entire screen is completed
  useEffect(() => {
    multipleChoiceState.formIsValid && inputFormState.formIsValid
      ? setCompleted(true)
      : setCompleted(false);
  }, [multipleChoiceState.formIsValid, inputFormState.formIsValid]);

  //naviagtion to next page
  const handleNavigation = () => {
    if (isCompleted) {
      dispatch(
        surveyActions.addInformation({
          crop: multipleChoiceState.selectedChoice,
          cultivar: inputFormState.inputValues.cultivar,
          controlMethods: inputFormState.inputValues.controlMethods,
          hotspotDecription: inputFormState.inputValues.hotspotDescription,
          otherNotes: inputFormState.inputValues.otherNotes,
        })
      );
      return props.navigation.navigate('Camera');
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
                value={'Soybeans'}
                handleCropSelection={handleCropSelection}
              />
              <MultipleChoiceButton
                value={'Dry Beans'}
                handleCropSelection={handleCropSelection}
                //onPress={handleCropSelection}
              />
              {/* <MultipleChoiceButton
                value={'Tomato'}
                handleCropSelection={handleCropSelection}
                //onPress={handleCropSelection}
              />
              <MultipleChoiceButton
                value={'Other'}
                handleCropSelection={handleCropSelection}
                //onPress={handleCropSelection}
              /> */}
            </View>
            <View style={styles.formsContainer}>
              <TextSpeechForm
                id={'cultivar'}
                title={'Cultivar/Variety'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'variety modal'}
                handleInputForm={handleInputForm}
              />
              <TextSpeechForm
                id={'controlMethods'}
                title={'Previous Control Methods'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'control modal'}
                handleInputForm={handleInputForm}
              />
              <TextSpeechForm
                id={'hotspotDescription'}
                title={'Hotspot Description'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'hotspot modal'}
                handleInputForm={handleInputForm}
              />
              <TextSpeechForm
                id={'otherNotes'}
                title={'Other Notes'}
                style={styles.sectionTitles}
                placeHolderText={'test'}
                modalText={'others modal'}
                handleInputForm={handleInputForm}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.bottomCard}>
          <NextButton
            onPress={handleNavigation}
            isDisabled={!isCompleted}
            nextArrow={true}
          />
        </View>
      </View>
      {/* Information Popup */}
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
          active={0}
          activeDotHeight={15}
          activeDotWidth={15}
          activeColor={Colors.primaryGreen}
          passiveColor={Colors.backgroundGrey}
        />
      );
    },
    headerTransparent: true,
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
