import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { SafeAreaView, View, Image, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface Props {
  errorPassword?: boolean;
}
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  position: relative;
  padding-top: ${Platform.OS === 'android' ? '56px' : '0px'};
`;

export const ContainerHero = styled(View)`
  align-items: center;
  padding-top: 32px;
  width: 100%;
  height: 217px;
  margin-bottom: 42px;
`;
export const ImageHero = styled(Image)`
  height: 217px;
  align-self: center;
`;

export const ContainerButton = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
`;
export const Button = styled(TouchableOpacity)`
  background-color: transparent;
  width: 100%;
  height: 50px;
`;

export const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  margin-top: 32px;
  margin-left: 16px;
  margin-right: 16px;

  color: ${Colors.whiteText};
`;
export const TextDescription = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  color: ${Colors.whiteText};
`;

export const TextIntro = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.whiteText};
  width: 70%;
  margin-left: 16px;
`;

export const ContainerInput = styled(View)<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #252836;
  border-radius: 64px;
  align-self: center;
  ${(props) =>
    props?.errorPassword === true && `border: 1px solid ${Colors.error}`};
`;
export const ContainerCheckbox = styled(View)`
  display: flex;
  flex-direction: row;
  margin: 16px;
`;
