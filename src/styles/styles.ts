import styled from 'styled-components';
import { Colors } from './global';
import { Dimensions, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface Props {
  error: boolean;
}

export const Toasty = styled(View)`
  display: flex;
  flex-direction: row;
  height: 88px;
  align-items: center;
  align-self: center;
  position: absolute;
  border-radius: 12px;
  width: ${Dimensions.get('window').width - 32}px;
  box-shadow: 0px 4px 9px rgba(18, 18, 18, 0.1);
  bottom: 64px;
  margin-right: 16px;
  margin-left: 16px;
  background: ${Colors.backgroundDarkSecondary};
  /* position: relative; */
  overflow: hidden;
  padding-right: 16px;
  z-index: 999;
`;

export const BorderLeft = styled(View)<Props>`
  height: 100%;
  width: 12px;
  background: ${(props) => (!!props?.error ? Colors.error : Colors.green)};
  margin-right: 18px;
`;

export const TitleToasty = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.whiteText};
  margin-top: 20px;
  margin-right: 16px;
`;

export const TextToasty = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: ${Colors.grey};
  margin-top: 8px;
  margin-right: 16px;
  margin-bottom: 20px;
  width: 70%;
`;

export const ImageToasty = styled(Image)`
  width: 24px;
  margin-right: 16px;
`;

export const CloseToasty = styled(Image)`
  width: 16px;
`;

export const ContainerClose = styled(View)`
  position: absolute;
  align-self: flex-end;
  right: 8px;
  top: 8px;
  z-index: 1000;
  width: 16px;
`;

export const CloseButton = styled(TouchableOpacity)`
  background-color: transparent;
  width: 100%;
  height: 50px;
`;
