import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function About() {
  return (
    <View style={styles.aboutContainer}>
      <Header
        title={'ABOUT US'}
        icon={<Entypo name="info" size={24} color={'#fff'} />}
      />
      <Text style={styles.Title}>OUR MISSION</Text>
      <Text style={styles.desc}>
        Language barrirers between those who are deaf and those who can hear and
        speak will be eliminated by our system, we will make communication as
        comprehensive as possible for both hearing and hard at hearing or deaf
        individuals.
      </Text>
      <View style={styles.socialGridContainer}>
        <Text style={styles.Title}>FOLLOW US ON</Text>
        <View style={styles.socialGrid}>
          <View style={styles.fb}>
            <FontAwesome name="facebook" size={24} color={'#fff'} />
          </View>
          <View style={styles.twitter}>
            <FontAwesome name="twitter" size={24} color={'#fff'} />
          </View>
        </View>
        <View style={styles.socialGrid}>
          <View style={styles.youtube}>
            <FontAwesome name="youtube-play" size={24} color={'#fff'} />
          </View>
          <View style={styles.insta}>
            <FontAwesome name="instagram" size={24} color={'#fff'} />
          </View>
        </View>
      </View>
    </View>
  );
}
