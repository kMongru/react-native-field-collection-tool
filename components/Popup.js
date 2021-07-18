import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

import Colors from '../constants/Colors';
/*
  props.modalText - the text rendered in the modal
  props.modalVisible - sets the inital modal visability
  props.onPress - controls the closing and openning of the modal

  should change to make it more genernic and allow for image changes (ie submission confirmation)

*/

const Popup = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={props.onPress}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../assets/info.png')}
              style={styles.informationLogo}
            />
            <Text style={styles.modalText}>{props.modalText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={props.onPress}
            >
              <Text style={styles.textStyle}>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.primaryGreen,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  informationLogo: {
    width: 50,
    height: 50,
  },
});

export default Popup;
