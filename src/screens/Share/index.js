import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, Share as ShareOption} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../components/Header';

export default function Share({navigation}) {
  const isFocused = useIsFocused();

  const onShare = () => {
    try {
      ShareOption.share({
        message:
          'Sign Language Translator App. AppLink Here: https://speak-app.web.app/',
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
