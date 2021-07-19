import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BarCodeScanner } from 'expo-barcode-scanner';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import * as surveyActions from '../../store/actions/survey';

/*
  testing code128 -> 1030832, see barcode scanning props
*/

//make these into env constants
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const BarcodeScanningScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);

  //need to reset inital value to false
  const [scanned, setScanned] = useState(false);

  //will get the scanned data as a state
  const [scannedData, setScannedData] = useState(null);

  //to dipatch actions to the store
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //remeber it won't be avaible till the next rerender cycle
    setScannedData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleNavigation = () => {
    if (scanned) {
      //need to access the method from the action file
      dispatch(surveyActions.addInformation({ barcode: scannedData }));
      return props.navigation.navigate('InputForms');
    } else {
      return undefined;
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code128]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.instructionalTextContainer}>
        <Text style={styles.instructionText}>Place barcode within frame</Text>
      </View>

      <View style={styles.barcodeFrame}></View>
      {scanned && (
        //needs to query database here to check if scanned data is empty
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}

      <NextButton
        style={styles.buttonContainer}
        onPress={handleNavigation}
        isDisabled={!scanned}
        nextArrow={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionalTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 60,
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.white,
  },
  barcodeFrame: {
    flex: 3,
    borderColor: Colors.white,
    borderWidth: 3,
    marginBottom: 150,
    marginHorizontal: 30,
    maxHeight: 100,
  },
  buttonContainer: {},
});

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
};

export default BarcodeScanningScreen;
