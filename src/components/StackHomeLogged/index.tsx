import React from 'react';
// import {
//   NavigationContainer,
//   useNavigationContainerRef,
// } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AllPopularClubs from '../../Pages/allPopularClubs';
import HomeLogged from '../../Pages/home-logged';
import Search from '../../Pages/search';
import { useFocusEffect } from '@react-navigation/native';

export type HomeLoggedStackParamList = {
  HomeInitial: undefined;
  AllPopularClubs: undefined;
  Search: undefined;
};

export const Stack = createStackNavigator<HomeLoggedStackParamList>();

const StackHomeLogged: React.FC = () => {
  useFocusEffect(React.useCallback(() => {}, []));
  return (
    <Stack.Navigator initialRouteName="HomeInitial">
      <Stack.Screen
        name="HomeInitial"
        component={HomeLogged}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllPopularClubs"
        component={AllPopularClubs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackHomeLogged;
