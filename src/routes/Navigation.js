import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import SignToText from '../screens/SignToText';
import TextToVoice from '../screens/TextToVoice';
import VoiceToText from '../screens/VoiceToText';
import VoiceToSign from '../screens/VoiceToSign';
import TextToSign from '../screens/TextToSign';
import About from '../screens/About';
import Share from '../screens/Share';
import SignToNumbers from '../screens/SignToNumbers';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LandingScreen from '../screens/LandingScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Settings from '../screens/Settings';

function HomeNavigation() {
  const Tab = createBottomTabNavigator();

  const [URL, setURL] = useState('');

  const getAppUrl = async () => {
    try {
      const url = await storage().ref(`apk/app-debug.apk`).getDownloadURL();
      setURL(url);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAppUrl();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Tools">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="info" size={24} color={'#fff'} />,
          tabBarActiveBackgroundColor: '#1bb58c',
          tabBarInactiveBackgroundColor: '#1dd1a1',
        }}
        name="About"
        component={About}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={36} color="#fff" />,
          tabBarActiveBackgroundColor: '#1bb58c',
          tabBarInactiveBackgroundColor: '#1dd1a1',
        }}
        name="Tools"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="share" size={24} color={'#fff'} />,
          tabBarActiveBackgroundColor: '#1bb58c',
          tabBarInactiveBackgroundColor: '#1dd1a1',
        }}
        name="Share"
        children={() => <Share url={URL} />}
      />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  let HandleLogout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('LandingScreen'));
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <>
            <Text style={{color: '#323232', fontSize: 24, fontWeight: 'bold'}}>
              Welcome to{' '}
            </Text>
            <Text
              style={{
                color: '#1dd1a1',
                fontSize: 36,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Let's Talk
            </Text>
          </>
        )}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={HandleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="#ccc" />
              <Text style={{color: '#323232', marginLeft: 40}}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      />
    </DrawerContentScrollView>
  );
}

export function DashboardNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>Home</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        component={HomeNavigation}
        name="Home"
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Sign To Text
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-text"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="SignToText"
        name="Sign to Text"
        component={SignToText}
        icon={() => <AntDesign name="text" size={24} color={'#fff'} />}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Sign to Numbers
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Octicons
              name="number"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        component={SignToNumbers}
        key="SignToNumbers"
        name="Sign to Numbers"
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Text to Voice
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="text-to-speech"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="TextToVoice"
        name="Text to Voice"
        component={TextToVoice}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Voice to Text
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="comment-text-multiple"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="VoiceToText"
        name="Voice to Text"
        component={VoiceToText}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Voice to Sign
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="multitrack-audio"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="VoiceToSign"
        name="Voice to Sign"
        component={VoiceToSign}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>
              Text To Sign
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="hand-left-sharp"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="TextToSign"
        name="Text To Sign"
        component={TextToSign}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: ({focused}) => (
            <Text style={{color: focused ? '#1dd1a1' : '#000'}}>Settings</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="settings"
              size={24}
              color={focused ? '#1dd1a1' : '#ccc'}
            />
          ),
        }}
        key="Settings"
        name="Settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );
}

export default function Authentication() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LandingScreen"
          component={LandingScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Sign In"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Sign Up"
          component={SignUp}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Dashboard"
          component={DashboardNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
