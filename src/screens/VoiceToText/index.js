import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';
import styles from './stylesheet';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function VoiceToText() {

  // useDimensions
  const {width, height} = useWindowDimensions();

  const [RecordSecs, setRecordSecs] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [OutputText, setOutputText] = useState('');

  const isFocused = useIsFocused();

  const ResetAllStates = () => {
    setOutputText('');
    setLoading(false);
  };

  useEffect(() => {
    ResetAllStates();
  }, [isFocused]);

  const SpeechToTextReq = audio => {
    setLoading(true);
    const data = new FormData();
    data.append('name', 'audio');
    data.append('fileData', {
      uri: audio,
      type: 'audio/mp4',
      name: 'sound.mp4',
    });
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch('http://65.2.169.182/speech-to-text', config)
      .then(response => response.json())
      .then(({result}) => {
        if (result?.success) {
          console.log('===< ', data);
          setOutputText(result?.text);
          setLoading(false);
        } else {
          setOutputText(null);
          setLoading(false);
          console.log('ERROR');
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  let onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      return;
    });
    console.log(result);
  };

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
        onStartRecord();
      } else {
        Alert.alert('Permission Issue', 'All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  let onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log('===>>>>> ', result);
    SpeechToTextReq(result);
  };

  return (
    <ScrollView style={styles.VoiceToTextContainer}>
      <Header
        title={'Voice To Text'}
        icon={
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={60}
            color="#fff"
          />
        }
        style={{borderBottomEndRadius: 40}}
      />
      <View style={{...styles.ScrollContainer, minHeight: height}}>
        <View style={styles.selectorContainer}>
          <View>
            <Text style={styles.selectorTitle}>
              {RecordSecs === 0 ? 'Start Recording' : 'Speak Now...'}
            </Text>
          </View>
          <View style={styles.selectorBtns}>
            <TouchableOpacity
              onPress={
                RecordSecs === 0 ? requestRecordingPermission : onStopRecord
              }>
              <Entypo
                name={RecordSecs === 0 ? 'mic' : 'controller-stop'}
                size={26}
                color="#323232"
              />
            </TouchableOpacity>
          </View>
        </View>
        {OutputText?.length > 0 && (
          <>
            <Text style={styles.InputTitle}>OUTPUT TEXT</Text>
            <Text style={styles.OutputText}>{OutputText}</Text>
          </>
        )}
        {Loading && (
          <ActivityIndicator
            size={28}
            style={{marginTop: 20}}
            color="#1dd1a1"
          />
        )}
      </View>
    </ScrollView>
  );
}
