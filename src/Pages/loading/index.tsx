import React, { useState } from 'react';
import { Container, ContainerDark, ImageLoading } from './styles';
import { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { Appearance } from 'react-native';
import * as Linking from 'expo-linking';

type Loading = StackNavigationProp<RootStackParamList, 'Loading'>;

const Loading: React.FC = () => {
  const navigation = useNavigation<Loading>();
  const colorScheme = Appearance.getColorScheme();
  const [deepLinkData, setDeepLinkData] = useState<Linking.ParsedURL | null>(
    null
  );
  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setDeepLinkData(Linking.parse(initialURL));
      }
    };

    const event = Linking.addEventListener('url', handleDeepLink);
    if (!deepLinkData) {
      getInitialURL();
    }

    return () => {
      event.remove();
    };
  }, []);

  useEffect(() => {
    if (deepLinkData) {
      useDeepLink(deepLinkData);
    } else {
      // setTimeout(() => {
      // navigation.navigate('Intro');
      // }, 3000);
    }
  }, [deepLinkData]);

  const useDeepLink = (data?: Linking.ParsedURL) => {
    if (data?.path === 'reset') {
      navigation.navigate('ChangePassword', {
        uuid: data?.queryParams?.uuid,
        token: data?.queryParams?.token,
      });
    } else if (data?.path === 'DataClub') {
      navigation.navigate('MyClubs', {
        screen: 'DataClub',
        params: {
          id: data?.queryParams?.id,
        },
      });
    } else {
      setTimeout(() => {
        navigation.navigate('Intro');
      }, 3000);
    }
  };

  const handleDeepLink = (event: any) => {
    if (!deepLinkData) {
      let data = Linking.parse(event.url);

      setDeepLinkData({ ...data, hostname: data.hostname });
    }
  };

  return (
    <>
      {colorScheme !== 'dark' ? (
        <Container>
          <ImageLoading source={require('../../../assets/images/logo.png')} />
        </Container>
      ) : (
        <ContainerDark>
          <ImageLoading
            source={require('../../../assets/images/logo-dark.png')}
          />
        </ContainerDark>
      )}
    </>
  );
};

export default Loading;
