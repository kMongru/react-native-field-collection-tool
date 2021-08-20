import React, { useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  View,
} from 'react-native';

import NextButton from './NextButton';

import Colors from '../constants/Colors';
import { DEVICE_WIDTH } from '../constants/Screen';

const EditModal = (props) => {
  const {
    modalVisible,
    setModalVisible,
    cardHeader,
    initialText,
    savingCallback,
  } = props;

  //initalize the text to be edited
  const [text, setText] = useState(initialText);

  //handle save logic to rely text to parent
  const handleSavePress = () => {
    savingCallback(text);
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.cardHeader}>{cardHeader}</Text>
            </View>
            {/* Text Input */}
            <View style={styles.textContainer}>
              <TextInput
                style={{ width: DEVICE_WIDTH / 1.25, color: 'white' }}
                multiline
                onChangeText={setText}
                value={text}
              />
            </View>

            {/* Save Button */}
            <View style={styles.rightAlignContainer}>
              <NextButton
                isDisabled={false}
                onPress={handleSavePress}
                buttonName='Save'
                enabledStyle={styles.saveButton}
              />
              {/* <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSavePress}
              >
                <Text>Save</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    marginHorizontal: '10%',
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    width: DEVICE_WIDTH,
    backgroundColor: Colors.backgroundGrey,
    marginTop: '30%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3,
    backgroundColor: '#7C8386',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
  },
  rightAlignContainer: {
    flex: 1,
    width: '100%',

    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primaryGreen,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  textStyle: {
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditModal;
