import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

import styles from './stylesheet';
import {Image} from 'native-base';

export default function Header({title, username = '', style = {}}) {
  const {toggleDrawer, navigate} = useNavigation();
  const user = auth().currentUser;

  return (
    <View style={styles.wrapper}>
      <View style={styles.topHeader}>
        <Pressable onPress={toggleDrawer}>
          <MaterialCommunityIcons name="menu" color={'#fff'} size={32} />
        </Pressable>
        <Pressable onPress={() => navigate('Settings')}>
          {user.photoURL ? (
            <Image
              source={{uri: user.photoURL}}
              alt="image base"
              style={styles.profileImage}
              rounded="full"
            />
          ) : (
            <FontAwesome name="user-circle" color={'#fff'} size={40} />
          )}
        </Pressable>
      </View>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{username}</Text>
      </View>
    </View>
  );
}
