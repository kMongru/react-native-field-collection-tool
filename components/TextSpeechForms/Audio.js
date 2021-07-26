import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

import { DEVICE_WIDTH } from '../../constants/Screen';
import Colors from '../../constants/Colors';

//declaring recording Audio object
let recording = new Audio.Recording();

const AudioInput = () => {
  const [recordedURI, setRecordedURI] = useState(null);
  const [AudioPerm, setAudioPerm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  //timer states
  const [secondsTimer, setSecondsTimer] = useState(0);
  const [minutesTimer, setMinuteTimer] = useState(0);

  const [audioLength, setAudioLength] = useState(null);
  const Player = useRef(new Audio.Sound());

  useEffect(() => {
    GetPermission();
  }, []);

  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setAudioPerm(getAudioPerm.granted);
  };

  //not rolling over properly
  const timer = () => {
    if (secondsTimer <= 59) {
      setSecondsTimer((prev) => prev + 1);
    } else {
      setMinuteTimer((prev) => prev + 1);
      setSecondsTimer(0);
    }
  };

  const startRecording = async () => {
    if (AudioPerm === true) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        setSecondsTimer(0);
        setIsRecording(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      GetPermission();
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const status = await recording.getStatusAsync();
      const result = recording.getURI();
      console.log('stop recording' + status.durationMillis);
      setAudioLength(status.durationMillis / 1000); //here is the length in seconds
      setRecordedURI(result); // Here is the URI
      recording = new Audio.Recording();
      setIsRecording(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isRecording === true) {
      const timeInterval = setInterval(timer, 1000);
      //return unmounts the interval
      return () => clearInterval(timeInterval);
    }
  }, [isRecording]);

  const playSound = async () => {
    try {
      const result = await Player.current.loadAsync(
        { uri: recordedURI },
        {},
        true
      );

      const response = await Player.current.getStatusAsync();
      console.log('play sound' + response.durationMillis);
      if (response.isLoaded) {
        if (response.isPlaying === false) {
          Player.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      console.log('stop sound' + checkLoading.durationMillis);
      if (checkLoading.isLoaded === true) {
        await Player.current.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetSound = () => {
    setRecordedURI(null);
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <Text style={styles.timerText}>{`${
        minutesTimer <= 9 ? `0${minutesTimer}` : minutesTimer
      }:${secondsTimer <= 9 ? `0${secondsTimer}` : secondsTimer}`}</Text>
      {!recordedURI ? (
        <View style={styles.singleButtonContainer}>
          {isRecording ? (
            <TouchableOpacity onPress={() => stopRecording()}>
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: Colors.darkRed,
                }}
              >
                <Ionicons
                  name={'stop-circle-outline'}
                  size={40}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => startRecording()}>
              <View style={styles.iconContainer}>
                <Ionicons name={'mic'} size={40} color={Colors.white} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.rowContainer}>
          {/* reset button */}
          <TouchableOpacity onPress={() => resetSound()}>
            <View style={styles.playingIconContainer}>
              <Ionicons
                name={'refresh-outline'}
                size={40}
                color={Colors.backgroundColor}
              />
            </View>
          </TouchableOpacity>
          {/* Check Mark Container */}
          <View style={styles.checkMarkContainer}>
            <Ionicons
              name={'checkmark-outline'}
              size={40}
              color={Colors.primaryGreen}
            />
          </View>
          {isPlaying ? (
            //Stop Playing Button
            <TouchableOpacity onPress={() => stopSound()}>
              <View style={styles.playingIconContainer}>
                <Ionicons
                  name={'pause-outline'}
                  size={40}
                  color={Colors.backgroundColor}
                />
              </View>
            </TouchableOpacity>
          ) : (
            //Playing Button
            <TouchableOpacity onPress={() => playSound()}>
              <View style={styles.playingIconContainer}>
                <Ionicons
                  name={'play-outline'}
                  size={40}
                  color={Colors.backgroundColor}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      {/* <Text>{recordedURI}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 70,
    color: Colors.textGrey,
    fontWeight: '100',
  },
  singleButtonContainer: {
    marginTop: DEVICE_WIDTH / 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '30%',
  },
  iconContainer: {
    backgroundColor: Colors.primaryGreen,
    height: DEVICE_WIDTH / 5,
    width: DEVICE_WIDTH / 5,
    borderRadius: DEVICE_WIDTH / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '2%',
    paddingVertical: '2%',
    paddingRight: '1%',
  },
  rowContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    height: '30%',
    backgroundColor: Colors.primaryGreen,
    borderRadius: 15,
    marginTop: DEVICE_WIDTH / 20,
    paddingHorizontal: '4%',
  },
  checkMarkContainer: {
    backgroundColor: 'black',
    height: DEVICE_WIDTH / 5,
    width: DEVICE_WIDTH / 5,
    borderRadius: DEVICE_WIDTH / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingIconContainer: {
    backgroundColor: '#CEECE0',
    borderRadius: DEVICE_WIDTH / 12,
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioInput;
