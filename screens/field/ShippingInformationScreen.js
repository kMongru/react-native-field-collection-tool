import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';

/*
  Screen to enter all relevent shipping information in the collection of your samples,
  it is important to note that this information will only be accessible to registered and logged in users
*/

const ShippingInformationScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Shipping Procedure</Text>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.textNumber}>1.</Text>
          <Text style={styles.textBody}>
            Mite samples should consist of plant host leaves and mites (at least
            100 adult females).
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.textNumber}>2.</Text>
          <Text style={styles.textBody}>
            Leaves with mites should be placed in the Ziploc bag with a wet (but
            not dripping) paper towel. Do not overstuff the bag.
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.textNumber}>3.</Text>
          <Text style={styles.textBody}>
            In hot weather sample should be shipped with a cold ice-pack to keep
            mites alive.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
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
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: '20%',
    marginLeft: '5%',
    width: '100%',
    padding: 3,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundGrey,
    borderRadius: 25,
    padding: '5%',
    width: '90%',
    height: 125,
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumber: {
    color: Colors.primaryGreen,
    marginRight: 5,
  },
  textBody: {
    color: Colors.textGrey,
  },
});

export default ShippingInformationScreen;
