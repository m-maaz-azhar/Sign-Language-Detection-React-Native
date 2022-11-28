import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {RNCamera} from 'react-native-camera';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function SignToText() {
  const cameraRef = useRef(null);
  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  return (
    <View style={styles.ImageToSignContainer}>
      <Header title={'Sign to Text'} style={{height: 60, paddingTop: 15}} />
      <View style={styles.ScrollContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View style={styles.snapWrapper}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={styles.snapText}>Hello</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
