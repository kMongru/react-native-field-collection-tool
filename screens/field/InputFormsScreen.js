import React, { useEffect, useState, useReducer, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

//use selector in the textForm??
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';
import * as mcActions from '../../store/actions/multipleChoice';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Popup from '../../components/Popup';
import Dots from '../../components/Dots';
import MultipleChoiceButton from '../../components/MutipleChoiceButton';
import TextSpeechForm from '../../components/TextSpeechForms/TextSpeechForm';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const USE_PREVIOUS_UPDATE = 'USE_PREVIOUS_UPDATE';

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

    case USE_PREVIOUS_UPDATE:
      //used to set all text/audio inputs valities to true
      const trueValidities = {
        ...state.inputValidities,
      };

      for (const key in trueValidities) {
        trueValidities[key] = true;
      }

      return {
        ...state,
        formIsValid: true,
        inputValidities: trueValidities,
      };

    default:
      return state;
  }
};

const InputFormsScreen = (props) => {
  //entire screen state
  const [isCompleted, setCompleted] = useState(false);

  //checking for usePrevious
  const [usePrevious, setUsePrevious] = useState(false);

  //information header button
  const [modalVisible, setModalVisible] = useState(false);

  //to dipatch actions to the store
  const dispatch = useDispatch();

  //presetting the information for usePrevious button
  const presetState = useSelector((state) => state.survey);
  let hasRetainedInformation = presetState.cultivar != '';

  const multipleChoiceState = useSelector((state) => state.mc);

  //handling the callback from children components
  const handleCropSelection = useCallback(
    (identifier, validity) => {
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
    },
    formIsValid: false,
  });

  //checks if previous information exists then fill it in
  const handleRetainedInformation = () => {
    setUsePrevious(true);
    dispatchFormState({
      type: USE_PREVIOUS_UPDATE,
    });
  };

  //getting values (text or uri) from children textSpeechForm component
  const handleInputForm = useCallback(
    (inputIndentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIndentifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  const handleOptionalForm = useCallback(
    (inputIndentifier, inputValue) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIndentifier,
        value: inputValue,
        isValid: true,
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
          hotspotDescription: inputFormState.inputValues.hotspotDescription,
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundCard}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          {/* Multiple Choice Buttons */}
          <View style={styles.mutipleChoiceContainer}>
            <View style={styles.horizontalAlignment}>
              <Text style={styles.sectionTitles}>Crops</Text>
              {/* Use Previous Button */}
              <TouchableOpacity
                onPress={handleRetainedInformation}
                style={
                  hasRetainedInformation
                    ? {
                        ...styles.usePreviousContainer,
                        ...styles.enabledPrevious,
                      }
                    : {
                        ...styles.usePreviousContainer,
                        ...styles.disabledPrevious,
                      }
                }
                disabled={!hasRetainedInformation}
                //could add disabled prop and style changes here
              >
                <Text
                  style={
                    hasRetainedInformation
                      ? { color: Colors.white }
                      : { color: Colors.primaryGreen }
                  }
                >
                  Use Previous
                </Text>
              </TouchableOpacity>
            </View>
            <MultipleChoiceButton
              id={'soybeans'}
              title={'Soybeans'}
              handleCropSelection={handleCropSelection}
            />
            <MultipleChoiceButton
              id={'dryBeans'}
              title={'Dry Beans'}
              handleCropSelection={handleCropSelection}
            />
            <MultipleChoiceButton
              id={'tomato'}
              title={'Tomato'}
              handleCropSelection={handleCropSelection}
            />
            <MultipleChoiceButton
              id={'other'}
              title={'Other'}
              handleCropSelection={handleCropSelection}
            />
          </View>
          {/* Text/Audio Forms */}
          <View style={styles.formsContainer}>
            <TextSpeechForm
              id={'cultivar'}
              title={'Cultivar/Variety'}
              style={styles.sectionTitles}
              placeHolderText={'A breif description of the cultivar...'}
              modalText={'Can be a simple one line identification!'}
              handleInputForm={handleInputForm}
              initialValue={usePrevious ? presetState.cultivar : null}
            />
            <TextSpeechForm
              id={'controlMethods'}
              title={'Previous Control Methods'}
              style={styles.sectionTitles}
              placeHolderText={'A breif description of control methods...'}
              modalText={
                'Please include pesticides used and duration in the previous _ years'
              }
              handleInputForm={handleInputForm}
              initialValue={usePrevious ? presetState.controlMethods : null}
            />
            <TextSpeechForm
              id={'hotspotDescription'}
              title={'Hotspot Description'}
              style={styles.sectionTitles}
              placeHolderText={'A breif description of the hotspot...'}
              modalText={'Try to include the ___'}
              handleInputForm={handleInputForm}
              initialValue={usePrevious ? presetState.hotspotDescription : null}
            />
            <TextSpeechForm
              id={'otherNotes'}
              title={'Other Notes'}
              style={styles.sectionTitles}
              placeHolderText={'Other notes you wish to include (optional)...'}
              modalText={'This may include...'}
              handleInputForm={handleOptionalForm}
              initialValue={usePrevious ? presetState.otherNotes : null}
            />
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView>
        </KeyboardAvoidingView> */}
        <View style={styles.bottomCard}>
          {/* Next Button */}
          <NextButton
            onPress={handleNavigation}
            isDisabled={!isCompleted}
            nextArrow={true}
          />
        </View>
      </View>
      {/* Information Popup */}
      <View style={{ width: 0, height: 0 }}>
        <Popup
          modalText={
            'You can click on the titles of each section, such as "Cultivar" for additional information!'
          }
          modalVisible={modalVisible}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => {
      return (
        //activeDot determines active index
        <Dots activeDot={0} />
      );
    },
    headerTransparent: true,
    headerTintColor: Colors.textGrey,
    headerBackTitle: 'Back',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCard: {
    backgroundColor: Colors.backgroundGrey,
    marginTop: Platform.OS === 'ios' ? '17%' : '25%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  horizontalAlignment: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usePreviousContainer: {
    marginTop: '2%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderWidth: 1,
    borderRadius: 5,
  },
  enabledPrevious: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.white,
  },
  disabledPrevious: {
    backgroundColor: Colors.secondaryGreen,
    borderColor: Colors.primaryGreen,
  },
  sectionTitles: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: '2%',
    paddingLeft: '4%',
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
    height: '15%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  informationLogo: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginTop: 10,
  },
});

export default InputFormsScreen;
