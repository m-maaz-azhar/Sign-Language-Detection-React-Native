import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './stylesheet';

export default function Card({title, icon, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
