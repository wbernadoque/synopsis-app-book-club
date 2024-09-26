//componente referencia

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonBack from '../../../../components/ButtonBack';
import Container from '../../../../components/Container';
import InputText from '../../../../components/Inputs/InputText';
import { MyClubsStackParamList } from '../../../../components/StackMyClubs';
import { Title } from '../../../signup/styles';
import { ContainerInputImage } from '../../create-clubs/styles';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../../styles/global';
import ButtonPrimary from '../../../../components/Button';
import InputAutoComplete from '../../../../components/InputAutoComplete';
import { ClubsIndex } from '../../../../models/clubs-service-index.model';
import Select from '../../../../components/Select';
import Clubs from '../../../../services/clubs.service';
import { AuthContext } from '../../../../utils/Auth';
import { ToastyContext } from '../../../../utils/ToastyGlobal';
import PageLoading from '../../../../components/PageLoading';
import { Book } from '../../../../models/book.model';

type Search = StackNavigationProp<MyClubsStackParamList>;

interface Props {
  route: any;
}

const CreateReadingManual: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Search>();
  const { getToken } = useContext(AuthContext);
  const { createToasty } = useContext(ToastyContext);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<any>('');
  const [synopsi, setSynopsi] = useState<string>('');
  const [publishing, setPublishing] = useState<any>('');
  const [pages, setPages] = useState<string>('');
  const [publishDate, setPublishDate] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [imageUploaded, setImageUploaded] = useState<any>();
  const [language, setLanguage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (
      imageUploaded &&
      title &&
      author &&
      synopsi &&
      publishing &&
      pages &&
      publishDate
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [imageUploaded, title, author, synopsi, publishing, pages, publishDate]);

  const goBack = () => {
    navigation.goBack();
  };
  const getImage = async () => {
    const result = await ImagePicker?.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.1,
    });

    setImageUploaded(result || {});
  };

  const submitReading = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append('cover', {
      name: 'image',
      uri: imageUploaded?.assets[0]?.uri,
      type: 'image/*',
    } as unknown as Blob);

    formData.append('language', language[0]);
    formData.append('synopsis', synopsi);
    formData.append('publication_date', publishDate);
    formData.append('page_qty', pages);
    formData.append('isbn', '');
    formData.append('author_id', author?.id || '');
    formData.append('author_name', author?.name || author);
    formData.append('publisher_id', publishing?.id || '');
    formData.append(
      'publisher_name',
      publishing?.imprint || publishing?.name || publishing
    );
    formData.append('book_title', title);

    Clubs.setBook((await getToken()) || '', formData)
      .then((result) => {
        if (result?.status === 200 || result?.status === 201)
          return result?.text();
      })
      .then(async (text) => {
        if (text) {
          const id: string = text.replace('"', '').replace('"', '');
          const result = await Clubs.getBookById(id);
          if (result.status === 200) {
            // createToasty(
            //   true,
            //   "Uhu! Livro criado com sucesso",
            //   "Convide amigos e comece sua leitura coletiva.",
            //   false
            // );
            navigation.navigate('ReadingConfiguration', {
              book: result.data || ({} as Book),
              idClub: route.params.idClub,
            });
          }
        } else {
          createToasty(
            true,
            'Ops! Algo deu de errado',
            'Não foi possível adicionar o livro, por favor, tente novamente.',
            true
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      {!!loading && <PageLoading />}
      <ScrollView bounces={false}>
        <ButtonBack navigation={goBack} />
        <Title style={{ marginTop: 86 }} allowFontScaling={false}>
          Adicionar manualmente
        </Title>
        <View>
          <InputText
            label="Titulo"
            error={false}
            onChangeText={setTitle}
            value={undefined}
            placeholder={'ex. Quincas Borba'}
            maxLength={100}
            nameError={''}
          />
          <InputAutoComplete
            label="Autor"
            error={false}
            onChangeText={setAuthor}
            value={author}
            placeholder={'ex. Machado de Assis'}
            maxLength={100}
            nameError={''}
            getInClubsService={ClubsIndex.getAuthors}
          />
          <InputText
            label="Sinopse"
            error={false}
            onChangeText={setSynopsi}
            value={undefined}
            placeholder={'inclua a sinopse do livro'}
            maxLength={undefined}
            nameError={''}
            multiline
          />
          <InputAutoComplete
            label="Editora"
            error={false}
            onChangeText={setPublishing}
            value={publishing}
            placeholder={'nome da editora'}
            maxLength={100}
            nameError={''}
            getInClubsService={ClubsIndex.getPublishers}
          />
          <InputText
            label="Número de páginas"
            error={false}
            onChangeText={setPages}
            value={undefined}
            placeholder={'ex. 200'}
            maxLength={5}
            nameError={''}
          />
          <InputText
            label="Ano da publicação"
            error={false}
            onChangeText={setPublishDate}
            value={undefined}
            placeholder={'ex. 2022'}
            maxLength={4}
            nameError={''}
          />
          <View style={{ marginLeft: 16 }}>
            <Select
              initialDescription="Selecione o idioma"
              label="Idioma"
              selectData={[
                ['por', 'Português'],
                ['eng', 'Inglês'],
                ['spa', 'Espanhol'],
                ['fre', 'Francês'],
                ['ita', 'Italiano'],
                ['ger', 'Alemão'],
                ['jpn', 'Japonês'],
                ['chi', 'Chinês'],
                ['ara', 'Árabe'],
                ['rus', 'Russo'],
                ['', 'Outros'],
              ]}
              defaultValue=""
              onChange={(e) => setLanguage(e)}
            />
          </View>
          <Text
            style={{
              color: Colors.grey,
              marginLeft: 16,
              fontSize: 16,
              marginTop: 16,
            }}
            allowFontScaling={false}
          >
            Capa do livro
          </Text>
          <ContainerInputImage style={{ marginBottom: 32 }}>
            <TouchableOpacity onPress={() => getImage()}>
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
                        : null
                    }
                    source={
                      !!imageUploaded?.assets
                        ? { uri: imageUploaded?.assets[0]?.uri }
                        : require('../../../../../assets/images/ImageInput.png')
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
              clique para carregar imagem (png, jpeg, tif)
            </Text>
          </ContainerInputImage>
          <View style={{ padding: 16 }}>
            <ButtonPrimary
              title={'continuar'}
              disabled={buttonDisabled}
              navigation={() => submitReading()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateReadingManual;
