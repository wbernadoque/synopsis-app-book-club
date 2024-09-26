import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ButtonBack from '../../components/ButtonBack';
import Container from '../../components/Container';
import { RootStackParamList } from '../../routes';
import Auth from '../../services/auth.service';
import { Colors } from '../../styles/global';
import { ToastyContext } from '../../utils/ToastyGlobal';
import { ImageHero, TextDescription, Title } from '../forgot-password/styles';

type ForgotPassword = StackNavigationProp<RootStackParamList>;

interface Props {
  route?: any;
}

const EmailSended: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<ForgotPassword>();
  const { createToasty } = useContext(ToastyContext);
  const goBack = () => {
    navigation.goBack();
  };

  const reesend = async () => {
    const result = await Auth.forgotPassword({
      email: route?.params?.email,
    }).then((result) => {
      return result;
    });

    if (result.status === 200) {
      createToasty(
        true,
        'Email enviado com sucesso!',
        'Enviamos as instruções ao seu email!',
        false
      );
    } else {
      createToasty(
        true,
        'Ops! Algo deu errado',
        'Tente reenviar a solicitação novamente!',
        true
      );
    }
  };
  return (
    <Container>
      <>
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets>
          <ButtonBack navigation={goBack} />
          <ImageHero
            source={require('../../../assets/images/email-sended.png')}
            resizeMode="contain"
            style={{ marginTop: 76 }}
          />
          <Title allowFontScaling={false}>Confira seu email.</Title>
          <TextDescription
            allowFontScaling={false}
            style={{ marginTop: 8, lineHeight: 32 }}
          >
            Nós enviamos instruções de recuperação de senha para seu email. Não
            se esqueça de olhar na pasta de spam ou lixo eletrônico.
          </TextDescription>
          <View style={{ alignItems: 'center' }}>
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.grey,
                marginTop: 50,
                fontSize: 14,
              }}
            >
              não recebeu nenhum email?
            </Text>
            <TouchableOpacity>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.whiteText,
                  marginTop: 8,
                  fontFamily: 'Inter_600SemiBold',
                }}
                onPress={() => reesend()}
              >
                reenviar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    </Container>
  );
};

export default EmailSended;
