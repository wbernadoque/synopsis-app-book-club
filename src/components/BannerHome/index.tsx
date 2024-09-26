import React from 'react';
import { Image, Text, View } from 'react-native';
import { Title } from '../../Pages/home-logged/styles';
import ButtonPrimary from '../Button';
import { ContainerBanner, ContainerButtons } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';

type Home = StackNavigationProp<RootStackParamList, any>;

const BannerHome: React.FC = () => {
  const navigation = useNavigation<Home>();

  const handleCreateNow = () => {
    navigation.navigate('MyClubs', {
      screen: 'CreateClubs',
      params: {
        previousScreen: { page: 'HomeInitial' },
      },
    });
  };
  return (
    <>
      <ContainerBanner>
        <ContainerButtons>
          <Title
            style={{ maxWidth: 150, lineHeight: 32 }}
            allowFontScaling={false}
          >
            Um clube para chamar de seu
          </Title>

          <ButtonPrimary
            navigation={handleCreateNow}
            padding={'0'}
            title={'criar agora'}
          />
        </ContainerButtons>
        <Image source={require('../../../assets/images/lonely-reading.png')} />
      </ContainerBanner>
    </>
  );
};

export default BannerHome;
