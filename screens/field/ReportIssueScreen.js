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
} from 'react-native';
import Colors from '../../constants/Colors';

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
      console.log(confirmed);
    } else {
      setConfirmed(false);
      console.log(confirmed);
    }
  };

  const handleSubmission = () => {
    //connect to database and make row input
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 250, height: 250 }}
          source={require('../../assets/warning.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>
          We’re sorry you’re experiencing an issue
        </Text>
        <Text style={styles.bodyText}>
          Thank you for taking the time to report the problem.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputTextBox}>
          <TextInput
            placeholder={'Enter your issue here...'}
            placeholderTextColor={Colors.textGrey}
            blurOnSubmit
            multiline={true}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={true}
            onEndEditing={textInputHandler}
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmission}
      >
        <View style={styles.submitButton}>
          <Text style={{ color: Colors.white, fontWeight: '600' }}>
            Submit Issue
          </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 2,
    marginTop: '5%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    padding: '2%',
    marginBottom: '10%',
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
  inputContainer: {
    padding: '1%',
    width: '100%',
    height: '15%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputTextBox: {
    width: '80%',
    height: '100%',
    backgroundColor: Colors.backgroundGrey,
    borderColor: Colors.lightRed,
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: '5%',
  },
  submitButton: {
    backgroundColor: Colors.lightRed,
    width: '60%',
    height: '40%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportIssueScreen;
