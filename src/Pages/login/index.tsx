import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
import {
  Container,
  ContainerButton,
  ImageHero,
  Title,
  Description,
  ContainerInput,
} from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../components/Button';
import { Colors } from '../../styles/global';
import { View } from 'react-native';
import Auth from '../../services/auth.service';
import { AuthContext } from '../../utils/Auth';
import InputText from '../../components/Inputs/InputText';

type Login = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [showHome, setShowHome] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errorEmail, setErrorEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorEmailSubmit, setErrorEmailSubmit] = useState<boolean>(false);
  const { setToken, setUser, setAuthEmail, setAuthId, removeData } =
    useContext(AuthContext);
  const navigation = useNavigation<Login>();

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setErrorPassword(false);
      setErrorEmail(true);
      setErrorEmail(false);
      setShowPassword(true);
    }, [])
  );

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      setErrorPassword(false);
      setErrorEmailSubmit(true);
      return;
    } else {
      setErrorEmailSubmit(false);
    }
    const result = await Auth.signin({
      username: '',
      email,
      password,
    }).then((result) => {
      return result;
    });

    if (result.status === 200) {
      await setToken(result.data.access_token);
      await setUser(result.data.user.username);
      await setAuthEmail(result.data.user.email);
      await setAuthId(result.data.user.pk);

      setErrorPassword(false);
      navigation.navigate('HomeLogged', {
        screen: 'Home',
      });
    } else {
      setErrorPassword(true);
      console.warn('Erro');
    }
  };

  useEffect(() => {
    setErrorEmail(validateEmail(email));
  }, [email]);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(email);
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <Container>
      <ScrollView bounces={false}>
        <ImageHero source={require('../../../assets/images/hi-five.png')} />
        <Title allowFontScaling={false}>Oi, de novo!</Title>
        <Description allowFontScaling={false}>
          Que bom ter você de volta!
        </Description>
        <View
          style={{
            marginTop: 36,
          }}
        >
          <InputText
            placeholder="seuemail@email.com"
            keyboardType="email-address"
            onChangeText={(e) => setEmail(e)}
            autoCapitalize="none"
            label=""
            value={email}
            hasValidateIcon={email?.length > 0 && !errorEmail}
            validate={email?.length > 0 && !errorEmail}
            error={false}
            nameError={''}
          />
        </View>
        <ContainerInput
          errorPassword={errorPassword}
          style={{ width: Dimensions.get('window').width - 32, marginTop: 0 }}
        >
          <TextInput
            secureTextEntry={showPassword}
            onChangeText={(e) => setPassword(e)}
            value={password}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            autoCapitalize="none"
            placeholder="senha"
            placeholderTextColor={'#808191'}
            style={{
              color: Colors.whiteText,
              width: Dimensions.get('window').width - 86,
              fontSize: 16,
              marginLeft: 28,
              // padding: 16,
              height: 48,
            }}
            allowFontScaling={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Image
                style={{ marginRight: 28 }}
                source={require('../../../assets/images/visibility-off.png')}
              />
            ) : (
              <Image
                style={{ marginRight: 28 }}
                source={require('../../../assets/images/visibility.png')}
              />
            )}
          </TouchableOpacity>
        </ContainerInput>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Dimensions.get('window').width,
          }}
        >
          <View>
            {errorPassword && (
              <Description
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 32,
                  color: Colors.textError,
                  marginTop: 4,
                  fontSize: 14,
                }}
                allowFontScaling={false}
              >
                Senha incorreta
              </Description>
            )}
            {errorEmailSubmit && (
              <Description
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 32,
                  color: Colors.textError,
                  marginTop: 4,
                  fontSize: 14,
                }}
                allowFontScaling={false}
              >
                Insira um e-mail válido.
              </Description>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginRight: 16 }}
          >
            <Description style={{ marginTop: 8 }} allowFontScaling={false}>
              Esqueceu a senha?
            </Description>
          </TouchableOpacity>
        </View>
        <ContainerButton style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{ width: Dimensions.get('window').width / 2 - 32 }}
          >
            <Description allowFontScaling={false}>voltar</Description>
          </TouchableOpacity>
          <ButtonPrimary
            navigation={() => handleSubmit()}
            title="entrar"
            width="half"
            disabled={!!email && !!password ? false : true}
          />
        </ContainerButton>
      </ScrollView>
    </Container>
    // </TouchableWithoutFeedback>
  );
};

export default Login;
