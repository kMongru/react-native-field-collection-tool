import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, Pressable, Modal, SafeAreaView} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';

import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
/*
  will need to query (useSelector) through the final redux state of the survey object?
  how to save the final images?
  then push the changes as a row entry to the database
*/

const SummaryScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  //simple test state
  const testState = useSelector((state) => state.survey);

  const handleSubmission = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.screen}>
      {/* Images */}
      <View style={styles.imageRollContainer}>
            {/* <ScrollView horizontal={true}>
              {testState.images.map((imageUri, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View style={styles.imageBackground}>
                        <Image
                          source={{ uri: imageUri }}
                          style={styles.images}
                        />
                      </View>
                    </View>
                  );
                })}
            </ScrollView> */}
      </View>
      {/* Location */}
      <View style = {styles.locationContainer}>
        <Image source={require('../../assets/info.png')}
          style={styles.informationLogo}/>
        <Text style = {styles.locationText}>{testState.latitute},{testState.longitute}</Text>
      </View>
      {/* Crop */}
      <View style = {styles.cropContainer}>
        <Text style = {styles.cropText}>{testState.crop}</Text> 
      </View>
      {/* Summary Cards */}
      <ScrollView>
        <View style = {styles.cardContainer}>
          <Text style = {styles.cardHeader}>Cultivar</Text>
          <Text style = {styles.cardBody}>{testState.cultivar}</Text>
        </View>
        <View style = {styles.cardContainer}>
          <Text style = {styles.cardHeader}>Control Explaination</Text>
          <Text style = {styles.cardBody}>{testState.controlMethods}</Text>
        </View>
        <View style = {styles.cardContainer}>
          <Text style = {styles.cardHeader}>Hotspot Description</Text>
          <Text style = {styles.cardBody}>{testState.hotspotDescription}</Text>
        </View>
        <View style = {styles.cardContainer}>
          <Text style = {styles.cardHeader}>Other Notes</Text>
          <Text style = {styles.cardBody}>{testState.otherNotes}</Text>
        </View>
      </ScrollView>
      {/* Submit Button */}
      <NextButton isDisabled={false} buttonName= {'Submit!'} onPress={handleSubmission}/>
      {/*Modal JSX, for successful upload*/}
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView style={styles.modalScreen}>
          <Image source={require('../../assets/info.png')}
          style={styles.informationLogo}/>
          <Text>Your subimission was succesfully recorded!</Text>
          <View style={styles.homeScanContainer}>
            <NextButton
              buttonName={'Home'}
              isDisabled={false}
              onPress={() => setModalVisible(false)}
            />
            <NextButton
              buttonName={'Scan Again'}
              isDisabled={false}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Summary',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRollContainer: {
    flex:1
  }, locationContainer: {
    flex: 1
  }, locationText: {

  }, cropContainer: {

  }, cropText: {

  }, cardContainer: {

  }, cardHeader: {

  }, cardBody: {

  }, modalScreen: {

  }, homeScanContainer: {

  },
  informationLogo: {

  }
});

export default SummaryScreen;
