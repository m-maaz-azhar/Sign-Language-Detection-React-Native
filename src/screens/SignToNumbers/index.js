import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function SignToNumbers() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [Loading, setLoading] = useState(false);
  const [Detection, setDetection] = useState('Detect');
  const [Answer, setAnswer] = useState('');
  const [BackendURL, setBackendURL] = useState(null);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@BackendURL');
      if (value !== null) {
        console.log(value);
        setBackendURL(value?.length > 0 ? value : null);
      }
    } catch (error) {
      // Error retrieving data
      setBackendURL(null);
      console.log(error);
    }
  };

  const camera = useRef();

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(false);
    _retrieveData();
  }, [isFocused]);

  const getCameraPermission = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'not-determined') {
        await Camera.requestCameraPermission();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TakePicture = async () => {
    setLoading(true);
    const snapshot = await camera?.current?.takePhoto({
      skipMetadata: true,
    });
    console.log(snapshot);
    let parts = snapshot?.path?.split('/');
    let image = parts[parts.length - 1];

    const data = new FormData();

    data.append('image', {
      uri: 'file://' + snapshot?.path,
      type: 'image/jpeg',
      name: image,
    });

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };

    fetch(`${BackendURL}/PredictNumber`, config)
      .then(response => response.json())
      .then(({result}) => {
        if (result?.success) {
          console.log(result);
          setLoading(false);
          setAnswer(prevState => prevState + result?.answer);
          setDetection('Detect');
        } else {
          setLoading(false);
          setDetection('Try Again');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  if (device == null) {
    return;
  }

  return (
    <View style={styles.ImageToSignContainer}>
      <Header title={'Sign to Numbers'} style={{height: 60, paddingTop: 15}} />
      <View style={styles.ScrollContainer}>
        {isFocused && (
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
        )}
        <View style={styles.snapWrapper}>
          <TouchableOpacity
            disabled={Loading || !BackendURL}
            onPress={() => TakePicture()}
            style={styles.capture}>
            {Loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.snapText}>{Detection}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={Loading || !BackendURL}
            onPress={() => setAnswer('')}
            style={styles.capture}>
            <Text style={styles.snapText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={Loading || !BackendURL}
            style={styles.AnswerContainer}>
            <Text style={styles.snapText}>
              {Answer.length > 0 ? Answer : 'Click Detect to get Answer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
