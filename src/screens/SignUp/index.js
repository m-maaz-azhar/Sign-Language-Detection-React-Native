import React, {useState} from 'react';
import {
  Text,
  Heading,
  Center,
  Box,
  Input,
  Button,
  Icon,
  Divider,
  Spinner,
  Image,
} from 'native-base';
import {
  ImageBackground,
  TouchableOpacity,
  LogBox,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

function SignUp({navigation}) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  LogBox.ignoreLogs(['auth/email-already-in-use']);
  LogBox.ignoreLogs(['auth/invalid-email']);

  const attemptSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      photoURL.length < 1 ||
      cpassword.length < 1
    ) {
      setError('Please fill all the fields');
      return;
    } else if (password !== cpassword) {
      setError('Password and Confirm Password must be same');
      return;
    } else {
      setloading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          const ProfilePicRef = storage().ref(`/images/${user.uid}.png`);

          await ProfilePicRef.putFile(photoURL?.uri);

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
              navigation.navigate('Dashboard');
            });
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
            setPhotoURL(response.assets[0]);
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
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <Box w="90%" px={3} pb={5} rounded="lg" bg="white">
        <Center>
          <Box w="100%" py={4} mb={3} bg="#1dd1a1">
            <Heading alignSelf="center" color="white" size="md">
              SIGN UP
            </Heading>
          </Box>
          <TouchableOpacity onPress={requestGalleryPermission}>
            {photoURL?.uri ? (
              <Box py={3}>
                <Image
                  source={{uri: photoURL?.uri}}
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
          <Input
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
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                style={{backgroundColor: 'transparent'}}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  color="#1dd1a1"
                  size={20}
                  name={showPassword ? 'eye' : 'eye-off'}
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
            onChangeText={text => setcpassword(text)}
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
            type={showCPassword ? 'text' : 'password'}
            InputRightElement={
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                style={{backgroundColor: 'transparent'}}
                onPress={() => setShowCPassword(!showCPassword)}>
                <MaterialCommunityIcons
                  color="#1dd1a1"
                  size={20}
                  name={showCPassword ? 'eye' : 'eye-off'}
                />
              </Button>
            }
            placeholder="Confirm Password" // mx={4}
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
            onPress={() => attemptSignUp()}
            my={3}
            size="md"
            style={{backgroundColor: '#1dd1a1', zIndex: 1000}}
            disabled={loading}
            width="90%">
            {loading ? <Spinner color="#fff" /> : 'SIGN UP'}
          </Button>
          <Divider my={2} />

          <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
            <Text py={1}>Already Have An Account?</Text>
          </TouchableOpacity>
        </Center>
      </Box>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
