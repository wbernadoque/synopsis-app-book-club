import styled from 'styled-components';
import { View, TextInput, Image, Platform } from 'react-native';
import { Colors } from '../../../styles/global';

export const ContainerSearch = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 48px;
  border-radius: 32px;
  background-color: ${Colors.backgroundDarkSecondary};
  margin: ${Platform.OS === 'ios'
    ? '42px 16px 0px 16px'
    : '92px 16px 0px 16px'};
  padding-left: 16px;
  padding-right: 32px;
`;

export const ImageSearch = styled(Image)`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 7px;
  top: 8px;
`;

export const InputSearch = styled(TextInput)`
  width: 100%;
  color: ${Colors.whiteText};
  font-size: 16px;
`;
