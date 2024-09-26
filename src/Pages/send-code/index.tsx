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
  Cell,
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
import { Colors as global } from '../../styles/global';
import { View } from 'react-native';
import {
  CodeField,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ButtonBack from '../../components/ButtonBack';
import Auth from '../../services/auth.service';

type SendCode = StackNavigationProp<RootStackParamList, 'SendCode'>;

interface Props {
  route: any;
}

const SendCode: React.FC<Props> = ({ route }) => {
  const [errorCode, setErrorCode] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [code, getCode] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation<SendCode>();

  useEffect(() => {
    if (value.length === 4) {
      handleSend();
      setValue('');
    }
  }, [value]);

  const handleSend = async () => {
    Keyboard.dismiss();

    const result = await Auth.sendCode({ token: value }).then((response) => {
      return response;
    });

    //bypass comentado
    // if (result.status === 200 || result.response.status === 200) {
    navigation.navigate('ChangePassword', value as never);
    // }

    // console.warn("enviando novo codigo");
  };

  const handleResendCode = async () => {
    const result = await Auth.forgotPassword({ email: route.params }).then(
      (result) => {
        return result;
      }
    );
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <ImageHero source={require('../../../assets/images/send-email.png')} />
        <ButtonBack navigation={goBack} />
        <Title allowFontScaling={false}>Confira seu email.</Title>
        <TextDescription allowFontScaling={false}>
          Nós enviamos um código de recuperação de senha para seu email.
        </TextDescription>

        <CodeField
          rootStyle={{ marginLeft: 60, marginRight: 60, marginTop: 48 }}
          {...code}
          value={value}
          onChangeText={setValue}
          allowFontScaling={false}
          renderCell={({ index, symbol, isFocused }) => (
            <Cell
              allowFontScaling={false}
              key={index}
              // Call getter method on each cell component
              onLayout={getCode(index)}
            >
              {symbol}
            </Cell>
          )}
        ></CodeField>

        <TextDescription
          style={{ marginTop: 32, color: global.grey, textAlign: 'center' }}
          allowFontScaling={false}
        >
          não recebeu nenhum código?
        </TextDescription>

        <TouchableOpacity
          style={{ marginTop: -8 }}
          onPress={() => handleResendCode()}
        >
          <TextDescription
            style={{
              color: global.whiteText,
              fontWeight: '600',
              textAlign: 'center',
            }}
            allowFontScaling={false}
          >
            reenviar
          </TextDescription>
        </TouchableOpacity>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SendCode;
