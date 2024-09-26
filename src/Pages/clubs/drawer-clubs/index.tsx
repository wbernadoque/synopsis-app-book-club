import * as React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerItemList,
} from '@react-navigation/drawer';
import ReadingInProgress from '../reading-in-progress';
import { Colors } from '../../../styles/global';
import { Image, Platform, SafeAreaView, Text, View } from 'react-native';
import {
  ContainerDataDrawer,
  ContainerDrawer,
  DescriptionDrawer,
  SeparatedDrawer,
  TitleDrawer,
} from './styles';
const Drawer = createDrawerNavigator();

const DrawerClubs: React.FC = (props) => {
  const navigationRef = useNavigationContainerRef();
  const navigator: any = props;

  const TopDrawer = (props: any) => {
    return (
      <ContainerDrawer>
        <ContainerDataDrawer
          style={{
            width: '100%',
            paddingTop: 88,
            paddingLeft: 12,
            flexDirection: 'row',
          }}
        >
          <Image
            style={{ width: 56, height: 56 }}
            source={require('../../../../assets/images/image_profile.png')}
          />
          <View style={{ marginLeft: 14 }}>
            <TitleDrawer>{navigator.route.params.params.nameClub}</TitleDrawer>
            <DescriptionDrawer>
              Criado hà {navigator.route.params.params.time}
            </DescriptionDrawer>
          </View>
        </ContainerDataDrawer>
        <SeparatedDrawer />
        <DrawerContent {...props} />
      </ContainerDrawer>
    );
  };

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Drawer.Navigator
        backBehavior="history"
        initialRouteName="ReadingHistory"
        drawerContent={(props) => <TopDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerContentStyle: { width: '100%' },
          drawerInactiveTintColor: Colors.grey,
          drawerActiveBackgroundColor: Colors.backgroundDark,
          drawerInactiveBackgroundColor: Colors.backgroundDark,
          drawerStyle: {
            width: '85%',
            backgroundColor: Colors.backgroundDark,
            borderTopLeftRadius: Platform.OS === 'android' ? 24 : 0,
            borderBottomLeftRadius: Platform.OS === 'android' ? 24 : 0,
          },
        }}
      >
        <Drawer.Screen
          name="EditClub"
          component={ReadingInProgress}
          options={{
            drawerItemStyle: {
              width: '100%',
              display: navigator.route.params.params.moderate ? 'flex' : 'none',
            },
            title: 'Editar clube',
            drawerActiveBackgroundColor: Colors.backgroundDark,
            drawerInactiveBackgroundColor: Colors.backgroundDark,
            drawerActiveTintColor: Colors.grey,
            drawerInactiveTintColor: Colors.grey,
            drawerIcon: ({ focused, size }) => (
              <Image source={require('../../../../assets/images/Edit.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name="ReadingHistory"
          component={ReadingInProgress}
          options={{
            drawerPosition: 'right',
            drawerItemStyle: { width: '100%' },
            title: 'Histórico de leitura',
            drawerActiveBackgroundColor: Colors.backgroundDark,
            drawerInactiveBackgroundColor: Colors.backgroundDark,
            drawerActiveTintColor: Colors.grey,
            drawerInactiveTintColor: Colors.grey,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={require('../../../../assets/images/History.png')}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="SuggestionBook"
          component={ReadingInProgress}
          options={{
            drawerItemStyle: { width: '100%' },

            title: 'Sugerir de livro',
            drawerActiveBackgroundColor: Colors.backgroundDark,
            drawerInactiveBackgroundColor: Colors.backgroundDark,
            drawerActiveTintColor: Colors.grey,
            drawerInactiveTintColor: Colors.grey,
            drawerIcon: ({ focused, size }) => (
              <Image source={require('../../../../assets/images/Book.png')} />
            ),
          }}
        />
        <Drawer.Screen
          name="SpeakToModerate"
          component={ReadingInProgress}
          options={{
            drawerItemStyle: { width: '100%' },
            title: 'Falar com moderador',
            drawerActiveBackgroundColor: Colors.backgroundDark,
            drawerInactiveBackgroundColor: Colors.backgroundDark,
            drawerActiveTintColor: Colors.grey,
            drawerInactiveTintColor: Colors.grey,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={require('../../../../assets/images/Insert-comment.png')}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerClubs;
