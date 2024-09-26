import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from './styles/global';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import MyClubs from './Pages/clubs';
import Perfil from './Pages/perfil';
import StackMyClubs, { MyClubsStackParamList } from './components/StackMyClubs';
import StackHomeLogged from './components/StackHomeLogged';
import StackProfile from './components/StackProfile';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './routes';

interface Props {
  props?: any;
}

export type RootTabParamList = {
  Home: undefined;
  MyClubs: undefined;
  Perfil: undefined;
};
export const Tab = createBottomTabNavigator<RootTabParamList>();
type Club = StackNavigationProp<MyClubsStackParamList, any>;
type Root = StackNavigationProp<RootStackParamList, any>;

const Navigation: React.FC<Props> = (props) => {
  const navigator = useNavigation<Root>();
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.whiteText,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: {
          height: Platform.OS === 'android' ? 56 : 80,
          backgroundColor: Colors.tabBarBackground,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'android' ? 9 : 30,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <StackHomeLogged />}
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => {
            let imgSource = undefined;
            {
              focused
                ? (imgSource = require('../assets/images/home-active.png'))
                : (imgSource = require('../assets/images/home-inactive.png'));
            }
            return <Image source={imgSource} style={{ marginBottom: 6 }} />;
          },
        }}
      />
      <Tab.Screen
        name="MyClubs"
        children={() => <StackMyClubs />}
        options={{
          title: 'Meus clubes',
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigator.navigate('MyClubs', { screen: 'Clubs' });
                }}
                style={props.style}
              >
                {props.children}
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused }) => {
            let imgSource = undefined;
            {
              focused
                ? (imgSource = require('../assets/images/my-clubs-active.png'))
                : (imgSource = require('../assets/images/my-clubs-inactive.png'));
            }
            return <Image source={imgSource} style={{ marginBottom: 6 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StackProfile}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => {
            let imgSource = undefined;
            {
              focused
                ? (imgSource = require('../assets/images/perfil-active.png'))
                : (imgSource = require('../assets/images/perfil-inactive.png'));
            }
            return <Image source={imgSource} style={{ marginBottom: 6 }} />;
          },
        }}
      />
      {/* bode esta mexendo */}
      {/* <Tab.Screen
        name="MyClubs"
        component={CreateClubs}
        options={{
          tabBarButton: (props) => null,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Navigation;
