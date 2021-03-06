import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import Popup from '../Popup';
import CustomToggle from './CustomToggle';
import Input from './Input';
import AudioInput from './Audio';
import Colors from '../../constants/Colors';

/*
  title - title of the section
  placeHolderText - place holder text for text input option

  modalText - information text inside the modal (popup)
*/

const TextSpeechForm = (props) => {
  const { initialValue } = props;

  const [confirmed, setConfirmed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState(initialValue);
  const [audioMode, setAudioMode] = useState(false);

  const [value, setValue] = useState(null);

  const { handleInputForm, id } = props;

  const textInputHandler = () => {
    //need more form validation on blank spaces
    if (text.trim()) {
      setValue(text);
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  };

  const audioInputHandler = (uri, isValid) => {
    setValue(uri);
    setConfirmed(isValid);
  };

  //rerenders the component based on changes to the inital value (ie. if usePrevious is pressed)
  useEffect(() => {
    initialValue != null ? setText(initialValue) : null;
  }, [initialValue]);

  useEffect(() => {
    handleInputForm(id, value, confirmed);
  }, [value, confirmed]);

  //switching the toggle
  const toggleSwitch = () => setAudioMode((previousState) => !previousState);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.formContainer}>
        <Popup
          modalText={props.modalText}
          modalVisible={modalVisible}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.title}>{props.title}</Text>
          </TouchableOpacity>
          <CustomToggle isEnabled={audioMode} toggleSwitch={toggleSwitch} />
        </View>
        {audioMode ? (
          <View>
            <AudioInput handleURI={audioInputHandler} />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Input
              placeholder={props.placeHolderText}
              placeholderTextColor={Colors.textGrey}
              style={styles.input}
              blurOnSubmit
              multiline
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={true}
              onEndEditing={textInputHandler}
              onChangeText={(text) => setText(text)}
              defaultValue={text}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  input: {
    color: 'white',
    textAlign: 'left',
    //so the text isn't directly touching the container
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  formContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TextSpeechForm;
