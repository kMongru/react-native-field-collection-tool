import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
//using AsyncStorage for data persisentence! For the 'do not show again' feature of the modal
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../constants/Colors';
import { DEVICE_WIDTH } from '../../constants/Screen';
import NextButton from '../../components/NextButton';

const HomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showModalOnce, setShowModalOnce] = useState(false);

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

  const openModal = () => {
    setModalVisible(true);
  };

  const decideNavigation = () => {
    getData ? handleScanningNavigation() : setModalVisible(true);
  };

  const handleScanningNavigation = () => {
    props.navigation.navigate('BarcodeScanning');
  };

  const handleReport = () => {
    props.navigation.navigate('ReportIssue');
  };

  const handleShipping = () => {
    props.navigation.navigate('ShippingInformation');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Home</Text>
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
          onPress={handleScanningNavigation}
          isDisabled={false}
          enabledStyle={{ backgroundColor: Colors.primaryGreen }}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={handleReport}>
          <View style={styles.bottomButton}>
            <Text style={{ color: Colors.lightRed }}>Report Issue</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShipping}>
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
});

export default HomeScreen;
