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
  ContainerCheckbox,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../components/Button';
import { Colors } from '../../styles/global';
import { View } from 'react-native';
import CheckBox from 'expo-checkbox';
import Auth from '../../services/auth.service';
import PageLoading from '../../components/PageLoading';
import InputText from '../../components/Inputs/InputText';

type Signup = StackNavigationProp<RootStackParamList, 'Signup'>;

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errorEmail, setErrorEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCorrect, setPasswordCorrect] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [confirmPasswordCorrect, setConfirmPasswordCorrect] =
    useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>('');
  const [errorMessageUsername, setErrorMessageUsername] = useState<string>('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>('');
  const [showHelpTextName, setShowHelpTextName] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const navigation = useNavigation<Signup>();
  const regNumberChar = /\d+/;
  const regSpecialChar = /\W|_/;
  const regLetterChar = /[a-z]/i;

  useEffect(() => {
    if (!!password && !!confirmPassword && !!name && !!email && !!terms) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [password, confirmPassword, name, email, terms]);

  const handleSubmit = async () => {
    setErrorMessagePassword('');
    setErrorMessageUsername('');
    setErrorMessageEmail('');
    if (password === confirmPassword) {
      setLoading(true);
      setConfirmPasswordCorrect(true);

      const result = await Auth.signup({
        username: name,
        email,
        password1: password,
        password2: confirmPassword,
      }).then((result) => {
        setLoading(false);
        return result;
      });
      if (result?.status === 201) {
        setError(false);
        navigation.navigate('Login');
      } else {
        setError(true);
        if (
          !!result?.response?.data?.email ||
          !!result?.response?.data?.username ||
          !!result?.response?.data?.password1
        ) {
          if (!!result?.response?.data?.username) {
            setErrorMessageUsername(result?.response?.data?.username[0]);
            setErrorMessagePassword('');
            setErrorMessageEmail('');
          }
          if (!!result?.response?.data?.email) {
            setErrorMessageEmail(result?.response?.data?.email[0]);
            setErrorMessageUsername('');
            setErrorMessagePassword('');
          }
          if (!!result?.response?.data?.password1) {
            setErrorMessagePassword(result?.response?.data?.password1[0]);
            setErrorMessageEmail('');
            setErrorMessageUsername('');
          }
        }
      }
    } else {
      setError(true);
      setConfirmPasswordCorrect(false);
      setErrorMessagePassword('As senhas precisam ser iguais.');
    }
  };

  useEffect(() => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    setErrorEmail(!re.test(email));
  }, [email]);

  useEffect(() => {
    if (
      password?.length >= 8 &&
      regLetterChar.test(password) &&
      regNumberChar.test(password) &&
      regSpecialChar.test(password)
    ) {
      setPasswordCorrect(true);
    } else {
      setPasswordCorrect(false);
    }
  }, [password]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
        <Container>
          {loading && <PageLoading />}
          <Title allowFontScaling={false}>Cadastrar</Title>
          <TextDescription allowFontScaling={false}>
            Insira um nome de usuário, email e senha para criar conta.
          </TextDescription>
          <InputText
            placeholder="nome de usuário"
            onChangeText={(e) => setName(e)}
            autoCapitalize="none"
            value={name}
            focusMessage="O nome de usuário pode conter letras, números e os seguintes caracteres @/./+/-/_"
            label={''}
            error={!!errorMessageUsername}
            nameError={errorMessageUsername}
          />

          <InputText
            placeholder="seuemail@email.com"
            keyboardType="email-address"
            onChangeText={(e) => setEmail(e)}
            autoCapitalize="none"
            value={email}
            label={''}
            error={!!errorMessageEmail}
            nameError={errorMessageEmail}
            hasValidateIcon={email?.length > 0 && !errorEmail}
            validate={email?.length > 0 && !errorEmail}
          />

          <ContainerInput
            // errorPassword={errorPassword}
            style={{
              width: Dimensions.get('window').width - 32,
              marginTop: 8,
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              secureTextEntry={showPassword}
              onChangeText={(e) => setPassword(e)}
              value={password}
              autoCorrect={false}
              enablesReturnKeyAutomatically
              placeholder="senha"
              autoCapitalize="none"
              placeholderTextColor={'#808191'}
              style={{
                color: Colors.whiteText,
                width: Dimensions.get('window').width - 116,
                fontSize: 16,
                marginLeft: 8,
                padding: 16,
              }}
              allowFontScaling={false}
            />
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View style={{ marginRight: 12, width: 23 }}>
                {!passwordCorrect && !!error && (
                  <Image
                    source={require('../../../assets/images/error-x.png')}
                  />
                )}
                {passwordCorrect && (
                  <Image source={require('../../../assets/images/done.png')} />
                )}
              </View>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image
                    style={{ marginRight: 50 }}
                    source={require('../../../assets/images/visibility-off.png')}
                  />
                ) : (
                  <Image
                    style={{ marginRight: 50 }}
                    source={require('../../../assets/images/visibility.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </ContainerInput>
          <ContainerInput
            errorPassword={errorPassword}
            style={{
              width: Dimensions.get('window').width - 32,
              marginTop: 16,
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              secureTextEntry={showConfirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
              value={confirmPassword}
              autoCorrect={false}
              enablesReturnKeyAutomatically
              autoCapitalize="none"
              placeholder="confirmar senha"
              placeholderTextColor={'#808191'}
              style={{
                color: Colors.whiteText,
                width: Dimensions.get('window').width - 116,
                fontSize: 16,
                marginLeft: 8,
                padding: 16,
              }}
              allowFontScaling={false}
            />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 12, width: 23 }}>
                {confirmPasswordCorrect && !error && (
                  <Image source={require('../../../assets/images/done.png')} />
                )}
                {!confirmPasswordCorrect && !!error && (
                  <Image
                    source={require('../../../assets/images/error-x.png')}
                  />
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Image
                  style={{ marginRight: 50 }}
                  source={require('../../../assets/images/visibility-off.png')}
                />
              ) : (
                <Image
                  style={{ marginRight: 50 }}
                  source={require('../../../assets/images/visibility.png')}
                />
              )}
            </TouchableOpacity>
          </ContainerInput>

          {errorMessagePassword?.length > 0 && (
            <TextDescription
              style={{
                alignSelf: 'flex-start',
                marginLeft: 32,
                marginRight: 32,
                color: Colors.textError,
                lineHeight: 24,
                marginTop: 4,
                fontSize: 14,
                fontFamily: 'Inter_400Regular',
              }}
              allowFontScaling={false}
            >
              {errorMessagePassword}
            </TextDescription>
          )}
          <TextDescription
            style={{
              color: Colors.grey,
              fontSize: 14,
              lineHeight: 21,
              marginTop: 8,
            }}
            allowFontScaling={false}
          >
            Mínimo de 8 caracteres incluindo maiúscula, minúscula, número e
            caractere especial.
          </TextDescription>
          <ContainerCheckbox>
            <CheckBox
              style={{ marginTop: 20 }}
              color={Colors.primary}
              value={terms}
              onValueChange={(e) => setTerms(e)}
            />
            <TextDescription
              onPress={() => setTerms(!terms)}
              style={{ color: Colors.grey }}
              allowFontScaling={false}
            >
              Li e concordo com os{' '}
              <TextDescription
                style={{ color: Colors.grey, textDecorationLine: 'underline' }}
                onPress={() =>
                  navigation.navigate('Terms', { docType: 'term' })
                }
                allowFontScaling={false}
              >
                Termos de uso
              </TextDescription>{' '}
              e{' '}
              <TextDescription
                style={{ color: Colors.grey, textDecorationLine: 'underline' }}
                onPress={() =>
                  navigation.navigate('Terms', { docType: 'policy' })
                }
                allowFontScaling={false}
              >
                Política de Privacidade
              </TextDescription>
              .
            </TextDescription>
          </ContainerCheckbox>

          <ContainerButton style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: Dimensions.get('window').width / 2 - 32 }}
            >
              <TextDescription
                style={{ textAlign: 'center' }}
                allowFontScaling={false}
              >
                voltar
              </TextDescription>
            </TouchableOpacity>
            <ButtonPrimary
              disabled={buttonDisable}
              navigation={() => handleSubmit()}
              title="cadastrar"
              width="half"
            />
          </ContainerButton>
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
