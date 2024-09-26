import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { SafeAreaView, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  position: relative;
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
  position: absolute;
  align-self: flex-end;
  right: 20px;
  top: 60px;
  z-index: 1;
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
  color: ${Colors.whiteText};
  width: 70%;
  margin-left: 16px;
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
