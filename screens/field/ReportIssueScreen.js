import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import Colors from '../../constants/Colors';
import { DEVICE_WIDTH } from '../../constants/Screen';

import Popup from '../../components/Popup';

/*
  Reported issues will be stored in the database for history,
  needs form validation for spaces
*/

const ReportIssueScreen = (props) => {
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const textInputHandler = () => {
    //need more form validation on blank spaces
    if (text.trim()) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  };

  const handleSubmission = () => {
    //connect to database and make row input
    if (confirmed) {
      console.log('submitted!');
      //reset text input
      setText('');
      //show confirmation modal
      setModalVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '15%',
          }}
        >
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              style={{ width: DEVICE_WIDTH / 2, height: DEVICE_WIDTH / 2 }}
              source={require('../../assets/warning.png')}
            />
          </View>
          {/* Header Text */}
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>
              We’re sorry you’re experiencing an issue
            </Text>
            <Text style={styles.bodyText}>
              Thank you for taking the time to report the problem.
            </Text>
          </View>
          {/* Input Form */}
          <View style={styles.inputTextBox}>
            <TextInput
              placeholder={'Enter your issue here...'}
              placeholderTextColor={Colors.textGrey}
              blurOnSubmit
              multiline
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={true}
              onEndEditing={textInputHandler}
              onChangeText={(text) => setText(text)}
              defaultValue={text}
              style={{ color: Colors.white }}
            />
          </View>
        </KeyboardAvoidingView>
        {/* Submit Button */}
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmission}
          >
            <Text style={{ color: Colors.white, fontWeight: '600' }}>
              Submit Issue
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerTintColor: Colors.textGrey,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    marginBottom: '5%',
  },
  textContainer: {
    flex: 1,
  },
  boldText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
  bodyText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.textGrey,
  },
  inputTextBox: {
    flex: 1,
    minWidth: '80%',
    maxWidth: '80%',
    minHeight: '3%',
    backgroundColor: Colors.backgroundGrey,
    marginBottom: '10%',
    borderColor: Colors.lightRed,
    borderWidth: 1,
    borderRadius: 10,
    padding: '1%',
  },
  submitButton: {
    backgroundColor: Colors.lightRed,
    width: '60%',
    height: '30%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportIssueScreen;
