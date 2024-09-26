import { Text, Image } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';
import { TouchableOpacity } from 'react-native';

export const CalendarButton = styled(TouchableOpacity)`
  width: 100%;
  height: 48px;
  background-color: ${Colors.backgroundDarkSecondary};
  border-radius: 100px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;
`;

export const CalendarText = styled(Text)`
  color: ${Colors.grey};
  font-size: 16px;
`;
