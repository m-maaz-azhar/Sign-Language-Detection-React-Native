import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
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

  const camera = useRef();

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(false);
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
    console.log('requesting');
    fetch('http://65.2.169.182:5000/PredictNumber', config)
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
            disabled={Loading}
            onPress={() => TakePicture()}
            style={styles.capture}>
            {Loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.snapText}>{Detection}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={Loading}
            onPress={() => setAnswer('')}
            style={styles.capture}>
            <Text style={styles.snapText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={Loading} style={styles.AnswerContainer}>
            <Text style={styles.snapText}>
              {Answer.length > 0 ? Answer : 'Click Detect to get Answer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
