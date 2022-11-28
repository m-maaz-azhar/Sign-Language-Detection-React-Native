import React, {useState} from 'react';
import {
  Container,
  Text,
  Heading,
  Center,
  Box,
  Input,
  Button,
  Icon,
  Divider,
  Spinner,
} from 'native-base';
import {
  ImageBackground,
  LogBox,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

function SignIn({navigation}) {
  const [show, setShow] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState('');

  const [validationError, setValidationError] = useState('');

  LogBox.ignoreLogs(['auth/user-not-found']);
  LogBox.ignoreLogs(['auth/wrong-password']);

  const attemptSignIn = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Sign In Done', res);
        setLoading(false);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('Sorry, you are not registered');
          setValidationError('Sorry, you are not registered');
        } else if (error.code === 'auth/wrong-password') {
          console.log('Sorry, you are not registered');
          setValidationError("Email and Password doesn't match");
        }
        setLoading(false);

        console.log(error);
      });
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
              SIGN IN
            </Heading>
          </Box>
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
          {validationError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {validationError}
            </Text>
          )}
          <Button
            onPress={() => attemptSignIn()}
            my={3}
            size="md"
            style={{backgroundColor: '#1dd1a1'}}
            width="90%">
            {loading ? <Spinner color="emerald.500" /> : 'SIGN IN'}
          </Button>
          <Divider my={2} />

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Forget Password')}>
            <Text py={1}>Forget Your Password?</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text py={1}>Don't have an account?</Text>
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

export default SignIn;
