import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function SignToNumbers() {
  const devices = useCameraDevices();
  const device = devices.back;

  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

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
          <Camera style={styles.camera} device={device} isActive={true} />
        )}
        <View style={styles.snapWrapper}>
          <TouchableOpacity style={styles.capture}>
            <Text style={styles.snapText}>1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
