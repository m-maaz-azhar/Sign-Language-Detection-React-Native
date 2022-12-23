import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';

import Card from '../../components/Card';
import Header from '../../components/Header';
import styles from './stylesheet';

export default function Home({navigation}) {
  const user = auth().currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  return (
    <View style={styles.HomeContainer}>
      <Header title={`Hello, Good Morning`} username={user.displayName} />
      <View style={styles.CardContainer}>
        <Card
          title={'Sign To Text'}
          icon={<Ionicons name="md-text" size={60} color="#1dd1a1" />}
          onPress={() => navigation.navigate('Sign to Text')}
        />
        <Card
          title={'Sign To Numbers'}
          icon={<Octicons name="number" size={50} color="#1dd1a1" />}
          onPress={() => navigation.navigate('Sign to Numbers')}
        />
        <Card
          title={'Text to Voice'}
          icon={
            <MaterialCommunityIcons
              name="text-to-speech"
              size={60}
              color="#1dd1a1"
            />
          }
          onPress={() => navigation.navigate('Text to Voice')}
        />
        <Card
          title={'Voice to Text'}
          icon={
            <MaterialCommunityIcons
              name="comment-text-multiple"
              size={60}
              color="#1dd1a1"
            />
          }
          onPress={() => navigation.navigate('Voice to Text')}
        />
        <Card
          title={'Voice to Sign'}
          icon={
            <MaterialIcons name="multitrack-audio" size={60} color="#1dd1a1" />
          }
          onPress={() => navigation.navigate('Voice to Sign')}
        />
        <Card
          title={'Text to Sign'}
          icon={<Ionicons name="hand-left-sharp" size={60} color="#1dd1a1" />}
          onPress={() => navigation.navigate('Text To Sign')}
        />
      </View>
    </View>
  );
}
