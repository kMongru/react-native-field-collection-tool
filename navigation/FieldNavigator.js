import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

//importing all screens and screenOptions
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/field/HomeScreen';

import UserAccountScreen, {
  screenOptions as userAccountScreenOptions,
} from '../screens/field/UserAccountScreen';
import ReportIssueScreen, {
  screenOptions as reportIssueScreenOptions,
} from '../screens/field/ReportIssueScreen';
import ShippingInformationScreen, {
  screenOptions as shippingInformationScreen,
} from '../screens/field/ShippingInformationScreen';

import BarcodeScanningScreen, {
  screenOptions as barcodeScanningScreenOptions,
} from '../screens/field/BarcodeScanningScreen';
import InputFormsScreen, {
  screenOptions as inputFormsScreenOptions,
} from '../screens/field/InputFormsScreen';
import CameraScreen, {
  screenOptions as cameraScreenOptions,
} from '../screens/field/CameraScreen';
import LocationScreen, {
  screenOptions as locationScreenOptions,
} from '../screens/field/LocationScreen';
import SummaryScreen, {
  screenOptions as summaryScreenOptions,
} from '../screens/field/SummaryScreen';

const defaultNavOptions = {
  backgroundColor: Colors.background,
};

const SurveyStackNavigator = createStackNavigator();

//defining the survey stack, might be able to break up the camera roll into its own stack
export const SurveyNavigator = () => {
  return (
    <SurveyStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SurveyStackNavigator.Screen
        name='Home'
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='UserAccount'
        component={UserAccountScreen}
        options={userAccountScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='ReportIssue'
        component={ReportIssueScreen}
        options={reportIssueScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='ShippingInformation'
        component={ShippingInformationScreen}
        options={shippingInformationScreen}
      />
      <SurveyStackNavigator.Screen
        name='BarcodeScanning'
        component={BarcodeScanningScreen}
        options={barcodeScanningScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='InputForms'
        component={InputFormsScreen}
        options={inputFormsScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='Camera'
        component={CameraScreen}
        options={cameraScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='Location'
        component={LocationScreen}
        options={locationScreenOptions}
      />
      <SurveyStackNavigator.Screen
        name='Summary'
        component={SummaryScreen}
        options={summaryScreenOptions}
      />
    </SurveyStackNavigator.Navigator>
  );
};
