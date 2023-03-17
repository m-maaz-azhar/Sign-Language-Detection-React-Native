import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, useWindowDimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Input, InputGroup, Stack, Text} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Header from '../../components/Header';
import Signs from '../../assets/signs';

import styles from './stylesheet';

export default function TextToSign() {
  const [Loading, setLoading] = useState(false);
  const [Query, setQuery] = useState('');
  const [Result, setResult] = useState([]);
  const isFocused = useIsFocused();
  const {width} = useWindowDimensions();

  const handleTextToSign = () => {
    let img_paths = [];
    setLoading(true);
    Query?.split('')?.map(text => {
      img_paths.push({url: Signs[text.toUpperCase()], text});
    });
    setResult([...img_paths]);
    setLoading(false);
  };

  useEffect(() => {
    if (!isFocused) {
      setQuery('');
      setResult([]);
    }
  }, [isFocused]);

  return (
    <View style={styles.TextToVoiceContainer}>
      <Header
        title={'Text To Sign'}
        icon={
          <MaterialCommunityIcons
            name="text-to-speech"
            size={60}
            color="#fff"
          />
        }
        style={{borderBottomEndRadius: 40}}
      />
      <View style={styles.ScrollContainer}>
        <Stack alignItems="center">
          <InputGroup
            w={{
              base: '85%',
              md: '285',
            }}>
            <Input
              w={{
                base: '100%',
                md: '100%',
              }}
              placeholder="Type your text here"
              onChangeText={text => setQuery(text)}
              value={Query}
            />
          </InputGroup>
        </Stack>
        {Loading && (
          <ActivityIndicator
            size={28}
            style={{marginTop: 20}}
            color="#1dd1a1"
          />
        )}
        <TouchableOpacity style={styles.submitBtn} onPress={handleTextToSign}>
          <Text style={{color: '#fff'}}>DETECT</Text>
        </TouchableOpacity>
        {Result?.length > 0 && (
          <>
            <Text style={{...styles.ResultTitle, width: width}}>
              {Result?.map(item => {
                return item?.text;
              })}
            </Text>
            <View style={styles.ResultContainer}>
              {Result?.map((item, index) => {
                return (
                  <View key={`${item?.url}${index}`}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{width: (width / Result?.length) - 5, height: 150}}
                      source={item?.url}
                      alt="Sign"
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        borderTopColor: '#000',
                        borderTopWidth: 1,
                      }}>
                      {item?.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
