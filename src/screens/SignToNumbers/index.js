import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {RNCamera} from 'react-native-camera';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function SignToNumbers() {
  const cameraRef2 = useRef(null);
  const [Result, setResult] = useState('');

  const takePicture = async () => {
    if (cameraRef2) {
      const options = {quality: 0.5};
      const img = await cameraRef2.current.takePictureAsync(options);

      const data = new FormData();

      data.append('image', {
        uri: img?.uri,
        type: 'image/jpeg',
        name: 'test.jpg',
      });

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };

      fetch('https://8c6b-182-189-216-232.ap.ngrok.io/PredictNumber', config)
        .then(response => response.json())
        .then(({result}) => {
          if (result?.success) {
            console.log('===< ', result);
            setResult(result.answer);
          } else {
            console.log('ERROR_');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => takePicture(), 2000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.ImageToSignContainer}>
      <Header title={'Sign to Numbers'} style={{height: 60, paddingTop: 15}} />
      <View style={styles.ScrollContainer}>
        <RNCamera
          ref={cameraRef2}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
        />
        <View style={styles.snapWrapper}>
          <View style={styles.capture}>
            <Text style={styles.snapText}>{Result}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
