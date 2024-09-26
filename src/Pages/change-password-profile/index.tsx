import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
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
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../components/Button';
import { Colors } from '../../styles/global';
import { View } from 'react-native';
import { ToastyContext } from '../../utils/ToastyGlobal';
import Auth from '../../services/auth.service';
import Profile from '../../services/profile.service';

type ChangePassword = StackNavigationProp<RootStackParamList, 'ChangePassword'>;

interface Props {
  route: any;
}

const ChangePasswordProfile: React.FC<Props> = ({ route }) => {
  const { createToasty } = useContext(ToastyContext);
  const [showHome, setShowHome] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showPasswordTwo, setShowPasswordTwo] = useState<boolean>(true);
  const [showPasswordOld, setShowPasswordOld] = useState<boolean>(true);
  const [passwordTwo, setPasswordTwo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [oldpassword, setOldpassword] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const navigation = useNavigation<ChangePassword>();

  const handleSubmit = () => {
    if (password !== passwordTwo) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      changePassword();
    }
  };

  const changePassword = async () => {
    const result = await Profile.changePasswordLogged({
      new_password1: password,
      new_password2: passwordTwo,
      old_password: oldpassword,
    });
    if (result.status == 200) {
      createToasty(
        true,
        'Senha redefinida!',
        'Insira suas credenciasi para entrar',
        false
      );
      navigation.navigate('Login');
    } else {
      createToasty(
        true,
        'Ops! Algo deu errado.',
        result.response.data.token[0] ||
          'Não foi possível redefinir sua senha, tente novamente.',
        true
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Title allowFontScaling={false}>Redefinir senha</Title>
        <TextDescription allowFontScaling={false}>
          Escolha uma senha que contenha no mínimo 8 caracteres incluindo
          maiúscula, minúscula, número e caractere especial.
        </TextDescription>
        <ContainerInput
          errorPassword={errorPassword}
          style={{ width: Dimensions.get('window').width - 32, marginTop: 16 }}
        >
          <TextInput
            value={oldpassword}
            onChangeText={(text) => setOldpassword(text)}
            secureTextEntry={showPasswordOld}
            placeholder="senha atual"
            placeholderTextColor={'#808191'}
            enablesReturnKeyAutomatically
            allowFontScaling={false}
            style={{
              color: '#808191',
              width: Dimensions.get('window').width - 98,
              marginLeft: 40,
              height: 48,
            }}
          />

          <TouchableOpacity
            onPress={() => setShowPasswordOld(!showPasswordOld)}
          >
            {showPasswordOld ? (
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
        <ContainerInput
          errorPassword={errorPassword}
          style={{ width: Dimensions.get('window').width - 32, marginTop: 16 }}
        >
          <TextInput
            secureTextEntry={showPassword}
            onChangeText={(e) => setPassword(e)}
            value={password}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholder="senha"
            placeholderTextColor={'#808191'}
            style={{
              color: '#808191',
              width: Dimensions.get('window').width - 98,
              marginLeft: 40,
              height: 48,
            }}
            allowFontScaling={false}
          />
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
        </ContainerInput>
        <ContainerInput
          errorPassword={errorPassword}
          style={{ width: Dimensions.get('window').width - 32, marginTop: 16 }}
        >
          <TextInput
            secureTextEntry={showPasswordTwo}
            onChangeText={(e) => setPasswordTwo(e)}
            value={passwordTwo}
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholder="repetir senha"
            placeholderTextColor={'#808191'}
            style={{
              color: '#808191',
              width: Dimensions.get('window').width - 98,
              marginLeft: 40,
              height: 48,
            }}
            allowFontScaling={false}
          />
          <TouchableOpacity
            onPress={() => setShowPasswordTwo(!showPasswordTwo)}
          >
            {showPasswordTwo ? (
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
              <TextDescription
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 16,
                  color: Colors.error,
                }}
                allowFontScaling={false}
              >
                As senhas precisam ser iguais.
              </TextDescription>
            )}
          </View>
        </View>
        <ContainerButton style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: Dimensions.get('window').width / 2 - 32 }}
          >
            <TextDescription allowFontScaling={false}>cancelar</TextDescription>
          </TouchableOpacity>
          <ButtonPrimary
            navigation={() => handleSubmit()}
            title="redefinir senha"
            width="half"
          />
        </ContainerButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordProfile;
function show(show: any, arg1: boolean) {
  throw new Error('Function not implemented.');
}
