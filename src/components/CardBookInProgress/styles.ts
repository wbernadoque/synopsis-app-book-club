import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const ContainerCardBookinProgress = styled(TouchableOpacity)`
  width: 100%;
  height: 138px;
  border-radius: 12px;
  background-color: ${Colors.backgroundDarkSecondary};
  padding: 16px;
  flex-direction: row;
`;

export const ContainerDetailsCardBook = styled(View)`
  margin-left: 16px;
  justify-content: space-between;
`;

export const TextInsideBookInProgress = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
`;

export const TitleBook = styled(Text)`
  font-size: 16px;
  font-family: 'Inter_500Medium';
  color: ${Colors.whiteText};
`;

export const AuthorBook = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
`;
