import * as React from 'react';
import Home from './Pages/home';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './Pages/intro';
import Loading from './Pages/loading';
import { useState } from 'react';
import Login from './Pages/login';
import Terms from './Pages/terms';
import Signup from './Pages/signup';
import ForgotPassword from './Pages/forgot-password';
import SendCode from './Pages/send-code';
import ChangePassword from './Pages/change-password';
import HomeLogged from './Pages/home-logged';
import Search from './Pages/search';
import StackHomeLogged from './components/StackHomeLogged';
import Navigation from './tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native';
import EmailSended from './Pages/email-sended';

export type RootStackParamList = {
  Intro: undefined;
  Home: undefined;
  HomeLogged: any | string;
  Loading: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Terms: { params?: { docType?: string } } | any;
  Signup: undefined;
  SendCode: undefined;
  Search: undefined;
  AllPopularClubs: undefined;
  ChangePassword: { params?: { uuid?: string; token?: string } } | any;
  MyClubs: { screen: string; params?: any };
  Profile: undefined;
  ChangePassswordProfile: undefined;
  EmailSended: { email: string };
  // MyClubs: { screen: string; params?: any };
};

export const Stack = createStackNavigator<RootStackParamList>();

const FooterTabScreen = (props: any) => {
  return (
    <>
      <Navigation props={props} />
    </>
  );
};

const Routes: React.FC = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'Intro'}>
        {/* <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendCode"
          component={SendCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeLogged"
          component={FooterTabScreen}
          options={{ headerShown: false, gestureEnabled: false }}
          initialParams={'home' as any}
        />
        <Stack.Screen
          name="EmailSended"
          component={EmailSended}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
