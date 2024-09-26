import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const ContainerMenu = styled(View)`
  padding-left: 56px;
  justify-content: center;
  padding-top: 73px;
`;

export const ContainerItemMenu = styled(TouchableOpacity)`
  flex-direction: row;
  /* justify-content: center; */
`;

export const TextItemMenu = styled(Text)`
  font-size: 16px;
  color: ${Colors.grey};
`;
