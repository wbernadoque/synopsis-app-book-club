import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../../src/styles/global';
import { RootStackParamList } from '../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Title, TitleCenter, TextCenter } from './styles';
import ButtonBack from '../../components/ButtonBack';
import SearchBar from '../../components/Inputs/SearchBar';
import { ImageHero } from '../login/styles';
import CardClubDoYouLike from './../../components/CardClubDoYouLike/index';
import { useDebounce } from 'use-debounce';
import Clubs from '../../services/clubs.service';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { AuthContext } from '../../utils/Auth';
import { ClubList } from '../../models/clubs.model';
import PageLoading from '../../components/PageLoading';
import { ToastyContext } from '../../utils/ToastyGlobal';
import Modal from '../../components/Modal';
import { ContainerButtonsModal } from '../../components/Modal/styles';
import ButtonPrimary from '../../components/Button';

type Search = StackNavigationProp<RootStackParamList, 'Search'>;
const Search = () => {
  const navigation = useNavigation<Search>();
  const { createToasty } = useContext(ToastyContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [booksSearch, setBooksSearch] = useState<ClubList[]>([]);
  const [notResults, setNotResult] = useState<boolean>(false);
  const [idBookClubToRemove, setIdBookClubToRemove] = useState<string>('');
  const [searchDebounce] = useDebounce(searchInput, 600);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      // setBooksSearch([]);
      // setSearchInput('');
      // setNotResult(false);
      // setIdBookClubToRemove('');
      setModalOpen(false);
    }, [])
  );

  useEffect(() => {
    if (searchDebounce) {
      searchClubs(searchDebounce);
    } else {
      setBooksSearch([]);
    }
  }, [searchDebounce]);

  const searchClubs = async (value: string) => {
    setLoading(true);
    const result = await Clubs.getSearchClubs(value);
    if (result?.data?.results) {
      setBooksSearch(result?.data?.results);
      setNotResult(false);
    } else {
      setNotResult(true);
    }
    setLoading(false);
  };

  const goBack = () => {
    navigation.goBack();
  };
  const enjoyClub = (id: string) => {
    navigation.navigate('MyClubs', {
      screen: 'DataClub',
      params: {
        id: id,
        isModerated: false,
        participate: false,
        previousScreen: { page: 'Search' },
      },
    });
  };

  const actionInButton = async (bookClub: ClubList) => {
    if (bookClub?.profile === 'moderador') {
      navigation.navigate('MyClubs', {
        screen: 'DataClub',
        params: {
          id: bookClub?.id,
          isModerated: false,
          participate: false,
          previousScreen: { page: 'Search' },
        },
      });
      return;
    }

    if (bookClub?.profile === 'leitor') {
      setIdBookClubToRemove(bookClub?.id);
      setModalOpen(true);
    }

    if (!bookClub?.profile) {
      const result = await Clubs.enterClub(bookClub?.id);
      if (result?.status === 200) {
        navigation.navigate('MyClubs', {
          screen: 'DataClub',
          params: { id: bookClub?.id },
        });
      }
      navigation.navigate('MyClubs', {
        screen: 'DataClub',
        params: {
          id: bookClub?.id,
          isModerated: false,
          participate: false,
          previousScreen: { page: 'Search' },
        },
      });
      return;
    }
  };

  const sendRemoveClub = async (id: string) => {
    const result = await Clubs.leaveClub(id);

    if (result) {
      createToasty(
        true,
        'Você saiu do clube.',
        'O que acha de procurar novos clubes ou criar o seu? ',
        false
      );
      searchClubs(searchDebounce);
    } else {
      createToasty(
        true,
        'Ops! Algo deu errado.',
        'Não foi possível deixar clube, por favor, tente novamente.',
        true
      );
    }

    setModalOpen(false);
  };

  return (
    <Container
      style={{
        justifyContent: 'flex-start',
      }}
    >
      <ButtonBack navigation={goBack} />
      <SearchBar onChange={setSearchInput} value={searchInput} />
      <Title
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 16,
          marginTop: 24,
          color: Colors.grey,
          fontSize: 16,
          fontFamily: 'Inter_600SemiBold',
          lineHeight: 32,
        }}
        allowFontScaling={false}
      >
        Resultados de busca
      </Title>
      {!!loading && <PageLoading />}
      <ScrollView>
        {searchDebounce && booksSearch?.length === 0 && !loading && (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <ImageHero
              source={require('../../../assets/images/search-club.png')}
              resizeMode="contain"
            />
            <TitleCenter allowFontScaling={false}>
              Ops! Não encontramos nenhum resultado{' '}
            </TitleCenter>
            <TextCenter allowFontScaling={false}>
              Tente buscar por outro clube
            </TextCenter>
          </View>
        )}
        {booksSearch?.map((card, index: number) => (
          <>
            {card.type !== 'PRIVATE' && (
              <CardClubDoYouLike
                key={index}
                category={card?.category}
                hasCategory
                title={card?.name}
                participants={card?.member_count || 0}
                typeClub={card?.type || ''}
                imageBook={card?.cover_url}
                handleFunctionButton={() => actionInButton(card)}
                backgroundButtonGrey={
                  card?.profile === 'leitor'
                    ? true
                    : card?.profile === 'moderador'
                    ? false
                    : false
                }
                descriptionButton={
                  card?.profile === 'leitor'
                    ? 'deixar clube'
                    : card?.profile === 'moderador'
                    ? 'gerenciar'
                    : 'juntar-se'
                }
                navigation={() => enjoyClub(card?.id || '')}
              />
            )}
          </>
        ))}
      </ScrollView>
      {modalOpen && (
        <Modal
          text={
            'Essa ação não poderá ser desfeita e você não terá mais acesso ao clube.'
          }
          title={'Você quer deixar o clube?'}
        >
          <ContainerButtonsModal>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text
                style={{
                  color: Colors.whiteText,
                  fontFamily: 'Inter_600SemiBold',
                  paddingTop: 8,
                  paddingRight: 24,
                  paddingBottom: 8,
                  paddingLeft: 24,
                }}
                allowFontScaling={false}
              >
                cancelar
              </Text>
            </TouchableOpacity>
            <ButtonPrimary
              title={'sim, quero deixar'}
              width={'half'}
              padding="0px"
              navigation={() => sendRemoveClub(idBookClubToRemove)}
            />
          </ContainerButtonsModal>
        </Modal>
      )}
    </Container>
  );
};
export default Search;
