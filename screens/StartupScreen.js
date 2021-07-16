import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Place Title Here</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Your Cart',
};

// export const screenOptions = (navData) => {
//   return {
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title='Use Previous'
//           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//           onPress={() => {}}
//         />
//       </HeaderButtons>
//     ),
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title='Cart'
//           iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           onPress={() => {
//             navData.navigation.navigate('Cart');
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StartupScreen;
