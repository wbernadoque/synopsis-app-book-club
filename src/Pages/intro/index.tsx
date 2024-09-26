import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
import * as Linking from 'expo-linking';

import {
  Container,
  ContainerButton,
  ContainerHero,
  ImageHero,
  Button,
  Title,
  TextIntro,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIntroSlider from 'react-native-app-intro-slider';
import ButtonPrimary from '../../components/Button';
import Home from '../home';
import { AuthContext } from '../../utils/Auth';
import apiInstance from '../../../api';

type Loading = StackNavigationProp<RootStackParamList, 'Intro'>;

const Intro: React.FC = () => {
  const [showHome, setShowHome] = useState<boolean>(false);
  const [actualLabel, setActualLabel] = useState<string>('1');
  const navigation = useNavigation<Loading>();
  const { getToken } = useContext(AuthContext);
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

  const getAuth = async () => {
    const token = await getToken();

    if (token) {
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
      navigation.navigate('HomeLogged', {
        screen: 'Home',
      });
    }
  };

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
      // setTimeout(() => {
      //   navigation.navigate('Intro');
      // }, 3000);
    }
  };

  const handleDeepLink = (event: any) => {
    if (!deepLinkData) {
      let data = Linking.parse(event.url);

      setDeepLinkData({ ...data, hostname: data.hostname });
    }
  };
  const slides = [
    {
      key: 1,
      title: 'Um clube para chamar de seu',
      text: 'Encontre um clube para fazer parte ou crie o seu em poucos minutos.',
      image: require('../../../assets/images/group-club.png'),
    },
    {
      key: 2,
      title: 'Gerencie seu clube sem complicações',
      text: 'Nunca foi tão fácil criar metas, avisos e moderar discussões.',
      image: require('../../../assets/images/only-club.png'),
    },
    {
      key: 3,
      title: 'Explore o mundo literário com a gente',
      text: 'Descubra novos livros, crie ou retome o hábito de leitura.',
      image: require('../../../assets/images/search-club.png'),
    },
  ];

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return;
    });
    getIntro();
  }, []);

  const getIntro = async () => {
    try {
      const hasIntro = await AsyncStorage.getItem('intro');
      if (hasIntro !== null) {
        setShowHome(true);
      }
    } catch (e) {}
  };
  const _renderItem = ({ item }: any) => {
    return (
      <>
        <ContainerHero>
          <ImageHero source={item.image} resizeMode="contain" />
        </ContainerHero>
        <Title allowFontScaling={false}>{item.title}</Title>
        <TextIntro allowFontScaling={false}>{item.text}</TextIntro>
      </>
    );
  };

  const _renderNextButton = () => {
    return <ButtonPrimary title="continuar" />;
  };

  return (
    <Container>
      {showHome === true ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <ContainerButton>
            <Button onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: 'white' }} allowFontScaling={false}>
                pular
              </Text>
            </Button>
          </ContainerButton>
          <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            onDone={async () => {
              try {
                await AsyncStorage.setItem('intro', 'true');
                setShowHome(true);
              } catch (e) {}
            }}
            renderNextButton={_renderNextButton}
            renderDoneButton={_renderNextButton}
            activeDotStyle={{
              width: 32,
              backgroundColor: '#FBFBFB',
              marginBottom: 420,
            }}
            dotStyle={{
              width: 16,
              backgroundColor: '#FBFBFB',
              marginBottom: 420,
            }}
            bottomButton={false}
            nextLabel={actualLabel}
          />
        </>
      )}
    </Container>
  );
};

export default Intro;
