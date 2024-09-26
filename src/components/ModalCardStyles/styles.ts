import { Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const ContainerModalCard = styled(View)`
  flex: 1;
  margin-top: 45px;
`;

export const TitleModalCard = styled(Text)`
  color: ${Colors.grey};
  font-size: 16px;
  font-family: 'Inter_600SemiBold';
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;
