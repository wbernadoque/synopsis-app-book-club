import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ClubList } from '../../models/clubs.model';
import { RootStackParamList } from '../../routes';
import {
  ContainerBlockData,
  ContainerCard,
  ContainerData,
  ContainerDataCard,
  ContainerImage,
  DescriptionData,
  TitleCard,
  TypeCard,
} from './styles';

interface Props {
  category: string;
  title: string;
  participants: number;
  typeClub?: string;
  clubData: ClubList;
  participate: boolean;
  index?: number;
}

type Home = StackNavigationProp<RootStackParamList, any>;

const CardClubSpotlight: React.FC<Props> = ({
  category,
  title,
  participants,
  typeClub,
  clubData,
  participate,
  index,
}) => {
  const navigation = useNavigation<Home>();
  const [imageError, setImageError] = useState<boolean>(false);
  const categories = [
    ['FICTION', 'Ficção'],

    ['FICTION_CLASSICS', 'Clássicos'],

    ['FICTION_ACTION_ADVENTURE', 'Ação e Aventura'],

    ['FICTION_FANTASY', 'Fantasia'],

    ['FICTION_HORROR', 'Terror'],

    ['FICTION_MISTERY', 'Mistério e Detetive'],

    ['FICTION_ROMANCE', 'Romance'],

    ['FICTION_SCIENTIFIC', 'Ficção Científica'],

    ['FICTION_DISTOPY', 'Distopia'],

    ['FICTION_THRILLER', 'Thriller'],

    ['BIOGRAPHY', 'Biografia'],

    ['COMICS', 'Quadrinhos'],

    ['JUVENILE_FICTION', 'Juvenil'],

    ['YOUNG_ADULT_FICTION', 'Young Adult'],

    ['EDUCATION', 'Educação'],

    ['RELIGION', 'Religião'],

    ['SELF_HELP', 'Autoajuda'],
    ['MISCELLANEOUS', 'Diversos'],
  ];
  const clickOnClub = () => {
    navigation.navigate('MyClubs', {
      screen: 'DataClub',
      params: {
        id: clubData?.id,
        isModerated: false,
        participate: false,
        previousScreen: { page: 'HomeInitial' },
      },
    });
  };
  return (
    <>
      <TouchableOpacity onPress={clickOnClub}>
        <ContainerCard style={{ marginLeft: index === 0 ? 16 : 0 }}>
          <ContainerImage>
            <Image
              style={{ width: 259, height: 115 }}
              resizeMode="cover"
              source={
                imageError
                  ? require('../../../assets/images/banner-clube.png')
                  : { uri: clubData.cover_url }
              }
              onError={() => setImageError(true)}
              defaultSource={require('../../../assets/images/banner-clube.png')}
            />
          </ContainerImage>
          <ContainerData>
            <TypeCard allowFontScaling={false}>
              {
                categories.filter((item) => {
                  return item[0] === category;
                })[0][1]
              }
            </TypeCard>
            <TitleCard allowFontScaling={false}>{title}</TitleCard>

            <ContainerDataCard>
              <ContainerBlockData>
                <DescriptionData allowFontScaling={false}>
                  {participants} participantes
                </DescriptionData>
              </ContainerBlockData>
              {/* MVP - Removido */}
              {/* <ContainerBlockData>
                <Image source={require('../../../assets/images/clock.png')} />
                <DescriptionData>{typeClub}</DescriptionData>
              </ContainerBlockData> */}
            </ContainerDataCard>
          </ContainerData>
        </ContainerCard>
      </TouchableOpacity>
    </>
  );
};

export default CardClubSpotlight;
