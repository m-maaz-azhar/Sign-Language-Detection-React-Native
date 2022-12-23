import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useIsFocused} from '@react-navigation/native';

import Header from '../../components/Header';
import styles from './stylesheet';

const audioPlayer = new AudioRecorderPlayer();

export default function TextToVoice() {
  const [ImageSrc, setImageSrc] = useState(null);
  const [PlayTime, setPlayTime] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [AudioUrl, setAudioUrl] = useState(null);
  const [Pause, setPause] = useState(true);
  const [Loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (PlayTime === Duration) {
      setPause(true);
    }
  }, [PlayTime, Duration]);

  const ResetAllStates = () => {
    audioPlayer.stopPlayer();
    audioPlayer.removePlayBackListener();
    setImageSrc(null);
    setPlayTime(0);
    setDuration(0);
    setAudioUrl(null);
    setPause(true);
    setLoading(false);
  };

  useEffect(() => {
    ResetAllStates();
  }, [isFocused]);

  let onStartPlay = async () => {
    setPause(false);
    await audioPlayer.startPlayer(AudioUrl);
    audioPlayer.addPlayBackListener(e => {
      setPlayTime(audioPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  let onPausePlay = async () => {
    setPause(true);
    await audioPlayer.pausePlayer();
  };

  let onStopPlay = async () => {
    setPause(true);
    audioPlayer.stopPlayer();
    audioPlayer.removePlayBackListener();
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission for you to use it',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          async response => {
            if (response?.didCancel) {
              return;
            }
            await TextToVoiceReq(response.assets[0]);
            setImageSrc(response.assets[0]);
          },
        );
      } else {
        Alert.alert('Message', 'Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs storage permission for you to use it',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
          },
          async response => {
            if (response?.didCancel) {
              return;
            }
            await TextToVoiceReq(response.assets[0]);
            setImageSrc(response.assets[0]);
          },
        );
      } else {
        Alert.alert('Message', 'Storage permission denied!');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const TextToVoiceReq = img => {
    setAudioUrl(null);
    setLoading(true);
    const data = new FormData();
    data.append('name', 'avatar');
    data.append('fileData', {
      uri: img?.uri,
      type: img?.type,
      name: img?.fileName,
    });
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch('http://3.109.49.18/image-to-voice', config)
      .then(response => response.json())
      .then(({result}) => {
        if (result.success) {
          setAudioUrl(result.url);
          setLoading(false);
        } else {
          setAudioUrl(null);
          setLoading(false);
          Alert.alert(
            'Message',
            "Couldn't convert image to voice, image is not clear",
          );
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.TextToVoiceContainer}>
      <Header
        title={'Text To Voice'}
        icon={
          <MaterialCommunityIcons
            name="text-to-speech"
            size={60}
            color="#fff"
          />
        }
        style={{borderBottomEndRadius: 40}}
      />
      <View style={styles.ScrollContainer}>
        <View style={styles.selectorContainer}>
          <View>
            <Text style={styles.selectorTitle}>Select Image</Text>
          </View>
          <View style={styles.selectorBtns}>
            <TouchableOpacity onPress={requestGalleryPermission}>
              <Entypo name="images" size={26} color="#323232" />
            </TouchableOpacity>
            <TouchableOpacity onPress={requestCameraPermission}>
              <Entypo name="camera" size={26} color="#323232" />
            </TouchableOpacity>
          </View>
        </View>
        {ImageSrc && (
          <View style={styles.ImageView}>
            <Text style={styles.resultText}>IMAGE</Text>
            <Image
              resizeMode="contain"
              resizeMethod="auto"
              style={styles.ImageStyle}
              source={{uri: ImageSrc?.uri}}
            />
          </View>
        )}
        {ImageSrc && AudioUrl ? (
          <View style={styles.resultContainer}>
            <TouchableOpacity
              style={styles.playAudioBtn}
              onPress={Pause ? onStartPlay : onPausePlay}>
              <FontAwesome
                name={Pause ? 'play-circle' : 'pause-circle'}
                size={26}
                color="#fff"
              />
            </TouchableOpacity>
            {!Pause && (
              <TouchableOpacity
                style={styles.playAudioBtn}
                onPress={onStopPlay}>
                <FontAwesome name={'stop-circle'} size={26} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <></>
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
  );
}
