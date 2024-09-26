import React from 'react';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import CreateClubs from '../../Pages/clubs/create-clubs';
import MyClubs from '../../Pages/clubs';
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
import { BackHandler } from 'react-native';
import { RootStackParamList } from '../../routes';
import { HomeLoggedStackParamList } from '../StackHomeLogged';

// export type MyClubsStackParamList = {
//   Clubs: undefined;
//   CreateClubs: undefined;
//   DataClub: {
//     params: { clubData: ClubList; isModerated: boolean; participate: boolean };
//   };

// };

export type MyClubsStackParamList = {
  Clubs: undefined;
  CreateClubs: {
    params: {
      name: string;
      edit?: boolean;
      dataClub?: ClubList;
      previousScreen?: { page: string; screen?: string };
    };
  };
  CreateReading: {
    params: { idClub: string };
  };
  DataClub: {
    params: {
      id: string;
      isModerated: boolean;
      participate: boolean;
      previousScreen?: { page: string; screen?: string };
    };
  };
  ReadingInProgress: { id: string; moderator: boolean; member: boolean };
  Cover: any;
  CreateReadingManual: { idClub: string };
  CreateReadingGoal: { id: string; idGoal?: string };
  GoalList: { id: string };
  ReadingConfiguration: { book: Book; idClub: string; idReading?: string };
  CreateNotice: {
    id: string;
    idNotice?: string;
    type?: 'bookclub' | 'reading';
    edit?: boolean;
  };
  NoticeClubs: { idClub: string; isModerated: boolean };
};

export const Stack = createStackNavigator<MyClubsStackParamList>();
type Home = StackNavigationProp<HomeLoggedStackParamList, any>;

const StackMyClubs: React.FC = () => {
  const navigation = useNavigation<Home>();

  return (
    <Stack.Navigator initialRouteName="Clubs">
      <Stack.Screen
        name="Clubs"
        component={MyClubs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateClubs"
        component={CreateClubs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateReading"
        component={CreateReading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DataClub"
        component={DataClub}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReadingInProgress"
        component={ReadingInProgress}
        // component={DrawerClubs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateReadingManual"
        component={CreateReadingManual}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateReadingGoal"
        component={CreateReadingGoal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReadingConfiguration"
        component={ReadingConfiguration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNotice"
        component={CreateNotice}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NoticeClubs"
        component={NoticeClubs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackMyClubs;
