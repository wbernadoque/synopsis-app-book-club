import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateClubs from '../../Pages/clubs/create-clubs';
import MyClubs from '../../Pages/clubs';
import Profile from '../../Pages/perfil';
import { ClubList } from '../../models/clubs.model';

import DataClub from '../../Pages/clubs/data-club';
import ReadingInProgress from '../../Pages/clubs/reading-in-progress';
import DrawerClubs from '../../Pages/clubs/drawer-clubs';
import CreateReading from '../../Pages/clubs/create-reading';
import CreateReadingManual from '../../Pages/clubs/create-reading/create-reading-manual';
import CreateReadingGoal from '../../Pages/clubs/create-goal';
import ReadingConfiguration from '../../Pages/clubs/reading-configuration';
import GoalList from '../../Pages/clubs/goal-list';
import { Book } from '../../models/book.model';
import CreateNotice from '../../Pages/clubs/CreateNotice';
import NoticeClubs from '../../Pages/clubs/noticeClub';
import ChangePasswordProfile from '../../Pages/change-password-profile';

// export type MyClubsStackParamList = {
//   Clubs: undefined;
//   CreateClubs: undefined;
//   DataClub: {
//     params: { clubData: ClubList; isModerated: boolean; participate: boolean };
//   };

// };

export type ProfileStackParamList = {
  Profile: undefined;
  ChangePassswordProfile: undefined;
};

export const Stack = createStackNavigator<ProfileStackParamList>();

const StackProfile: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassswordProfile"
        component={ChangePasswordProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackProfile;
