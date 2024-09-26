import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
import {
  Container,
  ContainerButton,
  ContainerHero,
  ImageHero,
  Button,
  Title,
  TextDescription,
  TextIntro,
  ContainerInput,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import ButtonPrimary from '../../components/Button';
import { Colors } from '../../styles/global';
import { View } from 'react-native';
import ButtonBack from '../../components/ButtonBack';
import Auth from '../../services/auth.service';
import { Description } from '../login/styles';

type ForgotPassword = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigation = useNavigation<ForgotPassword>();

  const handleSubmit = async () => {
    // navigation.navigate("SendCode");
    // console.warn(email);
    setError(false);
    const result = await Auth.forgotPassword({ email }).then((result) => {
      return result;
    });

    if (result?.status === 200) {
      navigation.navigate('EmailSended', { email: email });
    } else {
      setError(true);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    setErrorEmail(!re.test(email));
  }, [email]);

  return (
    <Container>
      <ButtonBack navigation={goBack} />
      <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets>
        <ImageHero
          source={require('../../../assets/images/forgot-password.png')}
        />
        <Title allowFontScaling={false}>Esqueceu a senha?</Title>
        <TextDescription allowFontScaling={false}>
          Insira o email associado com sua conta e nós enviaremos um email com
          instruções para redefinir sua senha.
        </TextDescription>
        <ContainerInput
          style={{
            width: Dimensions.get('window').width - 32,
            marginTop: 36,
          }}
        >
          <TextInput
            placeholder="seuemail@email.com"
            placeholderTextColor={Colors.grey}
            onChangeText={(e) => setEmail(e)}
            autoCapitalize={'none'}
            value={email}
            style={{
              color: Colors.whiteText,
              width:
                email?.length > 0 && !errorEmail
                  ? Dimensions.get('window').width - 98
                  : Dimensions.get('window').width - 24,
              marginLeft: 40,
              height: 48,
            }}
            allowFontScaling={false}
          />
          {email?.length > 0 && !errorEmail && (
            <Image
              style={{ marginRight: 50 }}
              source={require('../../../assets/images/done.png')}
            />
          )}
        </ContainerInput>

        {error && (
          <Description
            style={{
              alignSelf: 'flex-start',
              textAlign: 'left',
              marginLeft: 16,
              color: Colors.textError,
            }}
            allowFontScaling={false}
          >
            Algo aconteceu, verifique seu e-mail ou tente novamente
          </Description>
        )}

        <ContainerButton style={{ marginTop: 40 }}>
          <ButtonPrimary
            navigation={() => handleSubmit()}
            title="enviar instruções"
            width="full"
            disabled={!email}
          />
        </ContainerButton>
      </ScrollView>
    </Container>
  );
};

export default ForgotPassword;
