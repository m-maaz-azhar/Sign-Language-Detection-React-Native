import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';
import styles from './stylesheet';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function VoiceToText() {
  const [RecordSecs, setRecordSecs] = useState(0);
  const [RecordTime, setRecordTime] = useState(0);
  const [CurrentPositionSec, setCurrentPositionSec] = useState(0);
  const [CurrentDurationSec, setCurrentDurationSec] = useState(0);
  const [PlayTime, setPlayTime] = useState(0);
  const [Duration, setDuration] = useState(0);

  const requestRecordingPermission = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  // audioRecorderPlayer.setSubscriptionDuration(0.09);

  let onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  let onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  let onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  let onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  let onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  useEffect(() => {
    requestRecordingPermission();
  }, []);

  return (
    <View style={styles.VoiceToSignContainer}>
      <Header
        title={'Voice To Sign'}
        icon={
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={60}
            color="#fff"
          />
        }
        style={{borderBottomEndRadius: 40}}
      />
      <View style={styles.ScrollContainer}>
        <View style={styles.selectorContainer}>
          <View>
            <Text style={styles.selectorTitle}>
              {RecordSecs === 0 ? 'Start Recording' : 'Speak Now...'}
            </Text>
          </View>
          <View style={styles.selectorBtns}>
            <TouchableOpacity
              onPress={RecordSecs === 0 ? onStartRecord : onStopRecord}>
              <Entypo
                name={RecordSecs === 0 ? 'mic' : 'controller-stop'}
                size={26}
                color="#323232"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.ImageView}>
            <Text style={styles.resultText}>SIGN</Text>
            <Image
              resizeMode="contain"
              resizeMethod="auto"
              style={styles.ImageStyle}
              source={{uri: 'https://source.unsplash.com/random/300x200/?hand'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
