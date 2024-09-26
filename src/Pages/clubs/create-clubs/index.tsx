import React, { useContext, useEffect, useState } from 'react';
import ButtonBack from '../../../components/ButtonBack';
import { Container } from '../styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../styles/global';
import { ContainerTitle, Title } from '../../home-logged/styles';
import * as ImagePicker from 'expo-image-picker';

import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ContainerInputImage } from './styles';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native';
import { ContainerInput } from './../../terms/styles';
import ButtonPrimary from '../../../components/Button';
import * as FileSystem from 'expo-file-system';
import { ToastyContext } from '../../../utils/ToastyGlobal';
import { MyClubsStackParamList } from '../../../components/StackMyClubs';
import { RootTabParamList } from '../../../tab';
import { NavigationActions, TabRouter } from 'react-navigation';
import { RootStackParamList } from '../../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeLogged from './../../home-logged/index';
import InputText from '../../../components/Inputs/InputText';
import ClubService from '../../../services/clubs.service';
import { AuthContext } from '../../../utils/Auth';
import { ClubList } from '../../../models/clubs.model';
import Select from '../../../components/Select';
import PageLoading from '../../../components/PageLoading';

interface Props {
  route?: any;
}

type Club = StackNavigationProp<MyClubsStackParamList, any>;

const CreateClubs: React.FC<Props> = ({ route }) => {
  const clubNavigation = useNavigation<Club>();
  const [loading, setLoading] = useState<boolean>(false);
  const [nameClub, setNameClub] = useState<string>('teste titulo');
  const [category, setCategory] = useState<string>('');
  const [descriptionClub, setDescriptionClub] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<any>();
  const [dataClub, setDataClub] = useState<ClubList>();
  const { getToken, getId } = useContext(AuthContext);
  const { createToasty } = useContext(ToastyContext);

  const categories = [
    ['FICTION_ACTION_ADVENTURE', 'Ação e Aventura'],
    ['SELF_HELP', 'Autoajuda'],
    ['BIOGRAPHY', 'Biografia'],
    ['FICTION_CLASSICS', 'Clássicos'],
    ['FICTION_DISTOPY', 'Distopia'],
    ['MISCELLANEOUS', 'Diversos'],
    ['EDUCATION', 'Educação'],
    ['FICTION_FANTASY', 'Fantasia'],
    ['FICTION', 'Ficção'],
    ['FICTION_SCIENTIFIC', 'Ficção Científica'],
    ['JUVENILE_FICTION', 'Juvenil'],
    ['FICTION_MISTERY', 'Mistério e Detetive'],
    ['COMICS', 'Quadrinhos'],
    ['RELIGION', 'Religião'],
    ['FICTION_ROMANCE', 'Romance'],
    ['FICTION_HORROR', 'Terror'],
    ['FICTION_THRILLER', 'Thriller'],
    ['YOUNG_ADULT_FICTION', 'Young Adult'],
  ];

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useFocusEffect(
    React.useCallback(() => {
      setNameClub('');
      setDescriptionClub('');
      setIsEnabled(false);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.params?.edit) {
        setDataClub(route?.params?.params?.dataClub);
        setCategory(route?.params?.params?.dataClub?.category);
        setIsEnabled(
          route?.params?.params?.dataClub?.type === 'PUBLIC' ? false : true
        );
        setDescriptionClub(route?.params?.params?.dataClub?.description);
        setNameClub(route?.params?.params?.dataClub?.name);
      }
    }, [route])
  );

  const getImage = async () => {
    const result = await ImagePicker?.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.1,
      exif: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    setImageUploaded(result || {});
  };

  const hasErrorInName = () => {
    if (nameClub.length > 0) {
      if (nameClub?.length > 30 || nameClub?.length < 5) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append(`name`, nameClub);

    formData.append('cover', {
      name: 'image',
      uri: imageUploaded?.assets[0]?.uri || dataClub?.cover_url,
      type: 'image/*',
    } as unknown as Blob);

    formData.append(`description`, descriptionClub || '');
    // formData.append(`ending_date`, '');
    // formData.append(`is_active`, 'true');
    formData.append(`type`, isEnabled ? 'PRIVATE' : 'PUBLIC');
    formData.append(`category`, category);

    setLoading(true);
    if (!route?.params?.params?.edit) {
      ClubService.setClub((await getToken()) || '', formData)
        .then((result) => {
          if (result?.status === 200 || result?.status === 201)
            return result?.text();
        })
        .then((text) => {
          if (text) {
            createToasty(
              true,
              'Uhu! Clube criado com sucesso',
              'Convide amigos e comece sua leitura coletiva.',
              false
            );

            const id: string = text.replace('"', '').replace('"', '');
            clubNavigation.navigate('DataClub', {
              params: { id: id, isModerated: true, participate: true },
            });
          } else {
            createToasty(
              true,
              'Ops! Algo deu de errado',
              'Não foi possível criar seu clube, por favor, tente novamente.',
              true
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      ClubService.editClub(
        (await getToken()) || '',
        formData,
        dataClub?.id || ''
      )
        .then((result) => {
          if (result?.status === 200 || result?.status === 201)
            return result?.text();
        })
        .then((text: any) => {
          if (text) {
            createToasty(
              true,
              'Uhu! Clube editado com sucesso',
              'Convide amigos e comece sua leitura coletiva.',
              false
            );
            const id: string =
              JSON.parse(text)?.id || text.replace('"', '').replace('"', '');

            clubNavigation.navigate('DataClub', {
              params: { id: id, isModerated: true, participate: true },
            });
          } else {
            createToasty(
              true,
              'Ops! Algo deu de errado',
              'Não foi possível editar seu clube, por favor, tente novamente.',
              true
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleBack = () => {
    if (route?.params?.previousScreen?.screen) {
      clubNavigation.navigate(route?.params?.previousScreen?.page, {
        screen: route?.params?.previousScreen.screen,
      });
    } else if (route?.params?.previousScreen?.page) {
      clubNavigation.navigate(route?.params?.previousScreen?.page);
    } else {
      clubNavigation.reset({
        index: 0,
        routes: [{ name: 'Clubs' }],
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        {!!loading && <PageLoading />}
        <ScrollView
          style={{ flex: 1, backgroundColor: Colors.backgroundDark }}
          nestedScrollEnabled={true}
        >
          <ButtonBack navigation={() => handleBack()} />
          <ContainerTitle
            style={{ marginTop: Platform.OS === 'ios' ? 93 : 93 }}
          >
            <Title allowFontScaling={false}>
              {dataClub ? 'Editar clube' : 'Criar clube'}
            </Title>
          </ContainerTitle>
          <ContainerInputImage>
            <TouchableOpacity
              onPress={() => !route?.params?.params?.edit && getImage()}
            >
              <View
                style={{
                  width: 116,
                  height: 116,
                  borderRadius: 100,
                  borderColor: Colors.backgroundDarkSecondary,
                  borderWidth: !!imageUploaded?.assets ? 0 : 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 100,
                    backgroundColor: Colors.backgroundDarkSecondary,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={
                      !!imageUploaded?.assets
                        ? { width: '100%', height: '100%', borderRadius: 100 }
                        : dataClub?.cover_url
                        ? { width: '100%', height: '100%', borderRadius: 100 }
                        : null
                    }
                    source={
                      !!imageUploaded?.assets
                        ? { uri: imageUploaded?.assets[0]?.uri }
                        : dataClub?.cover_url
                        ? { uri: dataClub?.cover_url }
                        : require('../../../../assets/images/ImageInput.png')
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: Colors.grey,
                lineHeight: 20,
                width: 189,
                marginTop: 16,
              }}
              allowFontScaling={false}
            >
              clique para carregar imagem (png, jpeg, tif). Máximo: 2MB
            </Text>
          </ContainerInputImage>

          <InputText
            error={hasErrorInName()}
            label="Nome do clube"
            maxLength={30}
            nameError="Escolha um nome com mais de 5 caracteres"
            onChangeText={setNameClub}
            value={nameClub}
            placeholder="Pense em um nome fácil e único"
            hasCounter={true}
            numberCounter="30"
          />
          <View style={{ marginLeft: 16 }}>
            <Select
              label="Categoria"
              selectData={categories}
              onChange={(e) => setCategory(e)}
              defaultValue={dataClub?.category || ''}
            />
          </View>
          <InputText
            error={false}
            label="Descrição"
            maxLength={100}
            nameError=""
            onChangeText={setDescriptionClub}
            value={descriptionClub}
            placeholder="O que vocês gostam de ler? (opcional)"
            hasCounter={true}
            numberCounter="100"
            multiline
          />

          <View
            style={{
              marginTop: 53,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{ color: Colors.whiteText, marginRight: 12, fontSize: 14 }}
              allowFontScaling={false}
            >
              Clube privado
            </Text>
            <Switch
              trackColor={{
                false: Colors.whiteSecondary,
                true: Colors.primary,
              }}
              thumbColor={isEnabled ? Colors.primary : Colors.grey}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginRight: 16 }}
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 32,
              marginBottom: 24,
            }}
          >
            <ButtonPrimary
              title={
                route?.params?.params?.edit ? 'editar clube' : 'criar clube'
              }
              disabled={
                (nameClub?.length <= 30 &&
                  nameClub?.length >= 5 &&
                  category &&
                  dataClub?.cover_url) ||
                !!imageUploaded?.assets
                  ? false
                  : true
              }
              navigation={handleSubmit}
            />
          </View>
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default CreateClubs;
