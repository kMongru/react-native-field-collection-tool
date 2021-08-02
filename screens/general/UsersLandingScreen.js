import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';

import { DEVICE_WIDTH } from '../../constants/Screen';

const UsersLandingScreen = (props) => {
  //navigation method
  const handleFieldLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.screen}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      {/* Top Card */}
      <TouchableOpacity style={styles.card} onPress={handleFieldLogin}>
        <View style={styles.topCard}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/bug.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.cardHeaderText}>Field Researcher</Text>
        </View>
        <View style={styles.bottomCard}>
          <Text style={styles.cardBodyText}>
            A user who collects TSSM samples.
          </Text>
          {/* Go Button */}
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.goText}>go</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* Bottom Card */}
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: Colors.lightPurple }}
        onPress={() => {}}
      >
        <View style={styles.topCard}>
          <View
            style={{ ...styles.imageContainer, backgroundColor: '#D3B1FD' }}
          >
            <Image
              source={require('../../assets/test-tube.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.cardHeaderText}>Lab Technincan</Text>
        </View>
        <View style={styles.bottomCard}>
          <Text style={styles.cardBodyText}>
            A user who works at Western Unversity and manages inventory.
          </Text>
          {/* Go Button */}
          <View style={{ ...styles.outerCircle, backgroundColor: '#D3B1FD' }}>
            <View style={styles.innerCircle}>
              <Text style={styles.goText}>go</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
  },
  titleContainer: {
    marginTop: '20%',
    marginHorizontal: '5%',
  },
  headerText: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    marginVertical: '8%',
    marginHorizontal: '5%',
    borderRadius: 25,
    padding: 20,
    backgroundColor: Colors.primaryGreen,
  },
  topCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: '90%',
    width: '20%',
    backgroundColor: '#AADCC8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  cardHeaderText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: '10%',
  },
  bottomCard: {
    flex: 2,
    padding: 2,
    flexDirection: 'row',
  },
  cardBodyText: { flex: 3, color: Colors.white, fontSize: 18 },
  outerCircle: {
    flex: 1,
    backgroundColor: '#AADCC8',
    height: DEVICE_WIDTH / 5,
    width: DEVICE_WIDTH / 5,
    borderRadius: DEVICE_WIDTH / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: Colors.white,
    height: DEVICE_WIDTH / 7,
    width: DEVICE_WIDTH / 7,
    borderRadius: DEVICE_WIDTH / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goText: {
    color: Colors.primaryGreen,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UsersLandingScreen;
