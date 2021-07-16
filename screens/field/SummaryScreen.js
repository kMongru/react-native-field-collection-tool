import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

/*
  will need to query (useSelector) through the final redux state of the survey object?
  how to save the final images?
  then push the changes as a row entry to the database
*/

const SummaryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Summary</Text>
      <Button title='next' onPress={() => props.navigation.navigate('Home')} />
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

export default SummaryScreen;
