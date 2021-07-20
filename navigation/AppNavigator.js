import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SurveyNavigator } from './FieldNavigator';
import { AuthNavigator } from './AuthNavigator';
// import { ShopNavigator, AuthNavigator } from './FieldNavigator';
// import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
  // const isAuth = useSelector((state) => !!state.auth.token);
  // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  //wrapping all the navigators

  //   {isAuth && <ShopNavigator />}
  //   {!isAuth && didTryAutoLogin && <AuthNavigator />}
  //   {!isAuth && !didTryAutoLogin && <StartupScreen />}

  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <SurveyNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
