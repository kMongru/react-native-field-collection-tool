import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  Button,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';

import Popup from '../../components/Popup';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import { DEVICE_WIDTH } from '../../constants/Screen';

/*
  how to save the final images?
  then push the changes as a row entry to the database
*/

const SummaryScreen = (props) => {
  //submission modal
  const [modalVisible, setModalVisible] = useState(false);
  //information header button
  const [informationModalVisible, setInformationModalVisible] = useState(false);
  //ediiting modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [value, setValue] = useState(false);

  const dispatch = useDispatch();

  //simple test state
  const initialSurveyState = useSelector((state) => state.survey);

  //setting up editable textinputs
  const [cultivarText, setCultivarText] = useState(initialSurveyState.cultivar);

  //userId
  const userID = useSelector((state) => state.auth.userId);

  //controls the modal to edit information
  const handleEditing = (indentifer, initalValue) => {
    setEditModalVisible(true);

    console.log(editModalVisible);
  };

  //navigation and submission functions
  const handleSubmission = () => {
    //right here will dipatched final database call
    let dateAndTime = new Date().toLocaleString();
    dispatch(
      surveyActions.addInformation({ user: userID, dateAndTime: dateAndTime })
    );
    setModalVisible(true);
  };

  const handleHomeNavigation = () => {
    dispatch(surveyActions.resetContents());
    //close modal
    setModalVisible(false);
    props.navigation.navigate('Home');
  };

  const handleScanNavigation = () => {
    dispatch(surveyActions.resetContents());
    //close modal
    setModalVisible(false);
    props.navigation.navigate('BarcodeScanning');
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
    <SafeAreaView style={styles.screen}>
      {/* Images */}
      <View style={styles.imageRollContainer}>
        <ScrollView horizontal={true}>
          {initialSurveyState.images.map((imageUri, index) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={styles.imageBackground}>
                  <Image source={{ uri: imageUri }} style={styles.images} />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* Location */}
      <View style={styles.locationContainer}>
        <Image
          source={require('../../assets/location.png')}
          style={styles.locationIMG}
        />
        <Text style={styles.locationText}>
          {initialSurveyState.latitude},{initialSurveyState.longitude}
        </Text>
      </View>
      {/* Crop */}
      <View style={styles.cropContainer}>
        <Text style={styles.cropText}>{initialSurveyState.crop}</Text>
      </View>
      {/* Summary Cards */}
      {!editModalVisible && (
        <ScrollView
          horizontal={true}
          style={{ marginHorizontal: DEVICE_WIDTH * 0.08 }}
        >
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>Cultivar/Variety</Text>
            <View style={{ flex: 3 }}>
              <Text>{cultivarText}</Text>
            </View>
            <View style={styles.rightAlignContainer}>
              <TouchableOpacity
                onPress={handleEditing}
                style={styles.editButton}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>Control Explaination</Text>
            <Text style={styles.cardBody}>
              {initialSurveyState.controlMethods}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>Hotspot Description</Text>
            <Text style={styles.cardBody}>
              {initialSurveyState.hotspotDecription}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>Other Notes</Text>
            <Text style={styles.cardBody}>{initialSurveyState.otherNotes}</Text>
          </View>
        </ScrollView>
      )}

      {/* Submit Button */}
      <View style={{ width: '100%' }}>
        <NextButton
          isDisabled={false}
          buttonName={'Submit!'}
          onPress={handleSubmission}
        />
      </View>
      {/*Modal JSX, for successful upload*/}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/check.png')}
              style={styles.comfirmationIMG}
            />
            <View
              style={{
                width: 300,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: Colors.textGrey }}>
                Your subimission was succesfully recorded!
              </Text>
            </View>
            <View style={styles.homeScanContainer}>
              <NextButton
                buttonName={'Home'}
                isDisabled={false}
                onPress={handleHomeNavigation}
                enabledStyle={{
                  marginHorizontal: 20,
                  width: '80%',
                  backgroundColor: Colors.darkPurple,
                }}
              />
              <NextButton
                buttonName={'Scan Again'}
                isDisabled={false}
                onPress={handleScanNavigation}
                enabledStyle={{
                  marginHorizontal: 20,
                  width: '80%',
                  backgroundColor: Colors.primaryGreen,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Information Popup */}
      <View style={{ width: 0, height: 0 }}>
        <Popup
          modalText={'You can scroll through each text section!'}
          modalVisible={informationModalVisible}
          onPress={() => setInformationModalVisible(!informationModalVisible)}
        />
      </View>
      {/* Editing Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(!editModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 3, backgroundColor: 'blue' }}>
              <View>
                <Text>Title</Text>
              </View>
              <TextInput
                style={{
                  width: DEVICE_WIDTH / 1.5,
                  backgroundColor: 'red',
                }}
                multiline
                // change these to be dynamic
                onChangeText={setCultivarText}
                value={cultivarText}
              />
            </View>
            {/* Save Button */}
            <View style={styles.rightAlignContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditModalVisible(!editModalVisible)}
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Summary',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
      color: Colors.white,
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
  imageRollContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: '20%',
    marginBottom: '2%',
    paddingHorizontal: 10,
  },
  imageBackground: {
    padding: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.backgroundGrey,
    borderRadius: 5,
  },
  images: { width: DEVICE_WIDTH / 2, height: DEVICE_WIDTH / 2 },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: { color: Colors.textGrey },
  cropContainer: {
    height: '5%',
    width: '80%',
    marginVertical: '5%',
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropText: { color: Colors.white, fontWeight: 'bold' },
  cardContainer: {
    flex: 1,
    width: DEVICE_WIDTH * 0.8,
    height: '100%',
    backgroundColor: Colors.backgroundGrey,
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 10,
  },
  cardHeader: { fontSize: 18, fontWeight: '600', color: Colors.white },
  cardBody: { color: Colors.white },
  homeScanContainer: { flexDirection: 'row', width: '80%' },
  informationLogo: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginTop: 10,
  },
  locationIMG: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  comfirmationIMG: {
    height: 200,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.popupGrey,
    marginVertical: '40%',
    marginHorizontal: '20%',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  rightAlignContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '30%',
    height: '100%',
    backgroundColor: Colors.primaryGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SummaryScreen;
