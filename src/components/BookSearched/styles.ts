import { Text } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const TextBook = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: ${Colors.whiteText};
  margin-bottom: 8px;
`;
