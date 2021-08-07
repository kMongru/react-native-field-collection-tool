import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
//using AsyncStorage for data persisentence! For the 'do not show again' feature of the modal
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { DEVICE_WIDTH } from '../../constants/Screen';
import NextButton from '../../components/NextButton';

const HomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  //AsyncStorage Functions
  const storeData = async (value) => {
    try {
      //can only store string values
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('showPopupOnce', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('showPopupOnce');
      //must parse value to get boolean
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  //Navigation Functions
  const decideNavigation = async (screenName) => {
    (await getData()) ? handleNavigation(screenName) : setModalVisible(true);
  };

  const handleNavigation = (screenName) => {
    modalVisible ? setModalVisible(false) : null;
    props.navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={handleNavigation.bind(this, 'UserAccount')}>
          <Ionicons name={'person'} size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyTextContainer}>
        <Text style={styles.bodyText}>
          On behalf on the TSSM Management team, we want to express our
          graditude say thank you for testing the alpha version of our mobile
          management tool.
        </Text>
      </View>
      <View style={styles.scanningButtonContainer}>
        {/*currenly skipping over the modal */}
        <NextButton
          buttonName={'Start scanning the sample!'}
          onPress={decideNavigation.bind(this, 'BarcodeScanning')}
          isDisabled={false}
          enabledStyle={{ backgroundColor: Colors.primaryGreen }}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={handleNavigation.bind(this, 'ReportIssue')}>
          <View style={styles.bottomButton}>
            <Text style={{ color: Colors.lightRed }}>Report Issue</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigation.bind(this, 'ShippingInformation')}
        >
          <View
            style={{
              ...styles.bottomButton,
              backgroundColor: 'rgba(255, 197, 66, 0.5)',
              borderColor: Colors.yellow,
            }}
          >
            <Text style={{ color: Colors.yellow }}>Shipping Instructions</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Information Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/info.png')}
              style={styles.informationLogo}
            />
            <Text style={styles.boldModalText}>Hi there!</Text>
            <Text style={styles.modalText}>
              If at any point during the sample submission you have questions
              about what to submit, press this icon for helpful tips!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNavigation.bind(this, 'BarcodeScanning')}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                storeData.bind(this, true);
                handleNavigation.bind(this, 'BarcodeScanning');
              }}
            >
              <Text style={styles.showAgainText}>Do not show again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: '10%',
    width: '100%',
    textAlign: 'left',
    padding: '10%',
  },
  bodyTextContainer: {
    flex: 1,
    padding: '10%',
  },
  bodyText: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.textGrey,
  },
  scanningButtonContainer: {
    flex: 1,
    width: '100%',
  },
  bottomButtonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: '5%',
  },
  bottomButton: {
    width: DEVICE_WIDTH / 4,
    height: DEVICE_WIDTH / 4,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
    backgroundColor: Colors.darkRed,
    borderRadius: 10,
    borderColor: Colors.lightRed,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.popupGrey,
    borderRadius: 20,
    padding: 35,
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
  informationLogo: { width: 75, height: 75, marginBottom: 5 },
  modalText: { textAlign: 'center' },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH / 1.5,
    height: DEVICE_WIDTH / 6,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.primaryGreen,
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  showAgainText: {
    color: Colors.textGrey,
  },
  boldModalText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
});

export default HomeScreen;
