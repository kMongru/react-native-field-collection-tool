import React from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <Text></Text>
    // {/* TouchableW/OFeedback requires only a single child component */}
    // <ScrollView>
    //   <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={50}
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'red',
    //   }}>
    //     {children}
    //   </KeyboardAvoidingView>
    // </ScrollView>
  );
};

export default KeyboardAvoidingWrapper;
