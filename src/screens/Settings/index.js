import {Box, Button, Center, Icon, Image, Input, Spinner} from 'native-base';
import React, {useState} from 'react';
import {
  Alert,
  LogBox,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import Header from '../../components/Header';
import styles from './stylesheet';

export default function Settings() {
  let user = auth().currentUser;

  const [name, setname] = useState(user.displayName);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState('');
  const [address, setaddress] = useState('');
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  const updateProfile = async () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      photoURL.length < 1
    ) {
      setError('Please fill all the fields');
      return;
    } else {
      setloading(true);
      const ProfilePicRef = storage().ref(`/images/${user.uid}.png`);

      await ProfilePicRef.putFile(photoURL);

      const url = await storage()
        .ref(`images/${user.uid}.png`)
        .getDownloadURL();

      user
        .updateProfile({
          displayName: name,
          photoURL: url,
        })
        .then(() => {
          setloading(false);
          Alert.alert('Profile Updated');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
            console.log('That email address is invalid!');
          }
          setloading(false);

          console.error(error);
        });
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs storage permission for you to use it',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
          },
          response => {
            console.log(response);
            setPhotoURL(response.assets[0]?.uri);
          },
        );
      } else {
        Alert.alert('Message', 'Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.ImageToSignContainer}>
      <Header
        title={'Profile Settings'}
        icon={<AntDesign name="camera" size={60} color="#fff" />}
        style={{borderBottomEndRadius: 40}}
      />
      <ScrollView style={styles.ScrollContainer}>
        <Box px={5} mt={4}>
          <Center>
            <TouchableOpacity onPress={requestGalleryPermission}>
              {photoURL ? (
                <Box py={3}>
                  <Image
                    source={{uri: photoURL}}
                    alt="image base"
                    size="xl"
                    rounded="full"
                  />
                </Box>
              ) : (
                <Box py={3}>
                  <FontAwesome name="user-circle" color={'#ccc'} size={80} />
                  <Text color={'#323232'} mt={3}>
                    Upload Profile
                  </Text>
                </Box>
              )}
            </TouchableOpacity>
          </Center>
          <Input
            value={name}
            onChangeText={text => setname(text)}
            my={2}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="account" />}
                size="md"
                m={2}
                _light={{
                  color: '#1dd1a1',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            placeholder="Full Name" // mx={4}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />

          <Input
            value={email}
            onChangeText={text => setemail(text)}
            my={2}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="email" />}
                size="md"
                m={2}
                _light={{
                  color: '#1dd1a1',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            placeholder="Email" // mx={4}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />

          <Input
            onChangeText={text => setpassword(text)}
            my={2}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="lock" />}
                size="md"
                m={2}
                _light={{
                  color: '#1dd1a1',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                style={{backgroundColor: 'transparent'}}
                onPress={() => setShow(!show)}>
                <MaterialCommunityIcons
                  color="#1dd1a1"
                  size={20}
                  name={show ? 'eye' : 'eye-off'}
                />
              </Button>
            }
            placeholder="Password" // mx={4}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />

          <Input
            value={address}
            onChangeText={text => setaddress(text)}
            my={2}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="location-enter" />}
                size="md"
                m={2}
                _light={{
                  color: '#1dd1a1',
                }}
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
            placeholder="Address" // mx={4}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}
          <Button
            onPress={() => updateProfile()}
            my={3}
            size="md"
            style={{backgroundColor: '#1dd1a1'}}
            disabled={loading}
            width="100%">
            {loading ? <Spinner color="#fff" /> : 'Update Profile'}
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
