import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';
import styles from './stylesheet';
import Signs from '../../assets/signs';
import {Image} from 'native-base';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function VoiceToSign() {
  const [RecordSecs, setRecordSecs] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [OutputText, setOutputText] = useState('');
  const [Result, setResult] = useState([]);
  const {width} = useWindowDimensions();

  const isFocused = useIsFocused();

  const ResetAllStates = () => {
    setOutputText('');
    setLoading(false);
  };

  useEffect(() => {
    ResetAllStates();
  }, [isFocused]);

  useEffect(() => {
    let img_paths = [];
    setLoading(true);
    OutputText?.split('')?.map(text => {
      img_paths.push({url: Signs[text.toUpperCase()], text});
    });
    setResult([...img_paths]);
    setLoading(false);
  }, [OutputText]);

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
    fetch('http://3.109.49.18/speech-to-text', config)
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
    SpeechToTextReq(result);
  };

  return (
    <View style={styles.VoiceToTextContainer}>
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
        <View>
          {Result?.length > 0 && (
            <>
              <Text style={{...styles.ResultTitle, width: width}}>
                {Result?.map(item => {
                  return item?.text;
                })}
              </Text>
              <View style={styles.ResultContainer}>
                {Result?.map((item, index) => {
                  return (
                    <View key={`${item?.url}${index}`}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: width / Result?.length - 5, height: 150}}
                        source={item?.url}
                        alt="Sign"
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          borderTopColor: '#000',
                          borderTopWidth: 1,
                        }}>
                        {item?.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
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
      </View>
    </View>
  );
}
