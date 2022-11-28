import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/routes/Navigation';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#1dd1a1" />
        <Navigation />
      </NativeBaseProvider>
    </>
  );
}
