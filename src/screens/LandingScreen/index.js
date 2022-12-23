import React from 'react';
import {ImageBackground, Image, StyleSheet} from 'react-native';
import {Box, Heading, Text, Button, Divider} from 'native-base';

function LandingScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <Box style={{justifyContent: 'center', alignItems: 'center', flex: 1.3}}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 180,
            height: 180,
          }}
          resizeMode="contain"
        />
        <Heading
          alignSelf={{
            base: 'center',
            md: 'flex-start',
          }}
          color="#1dd1a1"
          mb={5}
          mt={5}
          size="xl">
          Let's Talk
        </Heading>
      </Box>
      <Box
        p={5}
        style={{
          width: '100%',
          flex: 0.7,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        bg="white">
        <Heading
          alignSelf={{
            base: 'center',
            md: 'flex-start',
          }}
          size="md">
          Welcome
        </Heading>

        <Text mb={5} mt={2} alignSelf={'center'}>
          Let's Talk with your differently-abled friends.
        </Text>

        <Button
          onPress={() => navigation.navigate('Sign In')}
          my={3}
          size="md"
          variant={'solid'}
          borderRadius={10}
          style={{backgroundColor: '#1dd1a1'}}>
          Sign In
        </Button>

        <Divider my={5} />

        <Button
          onPress={() => navigation.navigate('Sign Up')}
          size="md"
          variant={'outline'}
          borderRadius={10}
          colorScheme="emerald">
          Sign Up
        </Button>

        {/* <Button
          onPress={() => console.log('first')}
          size="md"
          variant={'solid'}
          borderRadius={10}
          colorScheme="blue">
          Continue With Facebook
        </Button> */}
      </Box>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LandingScreen;
