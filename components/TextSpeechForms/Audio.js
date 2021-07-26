import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

//declaring recording Audio object
let recording = new Audio.Recording();

const AudioInput = () => {
  const [RecordedURI, SetRecordedURI] = useState(null);
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [isPLaying, SetisPLaying] = useState(false);
  //
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
    SetAudioPerm(getAudioPerm.granted);
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
        SetisRecording(true);
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
      SetRecordedURI(result); // Here is the URI
      recording = new Audio.Recording();
      SetisRecording(false);
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
        { uri: RecordedURI },
        {},
        true
      );

      const response = await Player.current.getStatusAsync();
      console.log('play sound' + response.durationMillis);
      if (response.isLoaded) {
        if (response.isPlaying === false) {
          Player.current.playAsync();
          SetisPLaying(true);
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
        SetisPLaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${
        minutesTimer <= 9 ? `0${minutesTimer}` : minutesTimer
      }:${secondsTimer <= 9 ? `0${secondsTimer}` : secondsTimer}`}</Text>
      {!RecordedURI ? (
        isRecording ? (
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
        )
      ) : (
        <Button
          title='Play Sound'
          onPress={isPLaying ? () => stopSound : () => playSound()}
        />
      )}
      <Text>{RecordedURI}</Text>
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
  iconContainer: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 10,
    paddingLeft: '2%',
    paddingRight: '1%',
    paddingVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioInput;
