import React, {useEffect} from 'react';
import {Text, View, Share as ShareOption} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';

export default function Share({url}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const onShare = async () => {
    try {
      ShareOption.share({
        message: `Let's Talk Download Link: ${url}`,
      });
      navigation.navigate('Tools');
    } catch (error) {
      navigation.navigate('Tools');
    }
  };

  useEffect(() => {
    if (isFocused) {
      onShare();
    }
  }, [isFocused]);

  return (
    <View>
      <Header
        title={'SHARE APP'}
        icon={<Entypo name="share" size={24} color={'#fff'} />}
      />
      <Text>Share</Text>
    </View>
  );
}
