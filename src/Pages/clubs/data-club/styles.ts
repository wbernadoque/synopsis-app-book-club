import styled from 'styled-components';
import { Text } from 'react-native';
import { Colors } from '../../../styles/global';

export const NameClub = styled(Text)`
  font-family: 'Inter_600SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${Colors.whiteText};
  margin-top: 8px;
  max-width: 200px;
`;

export const TextToAdd = styled(Text)`
  color: ${Colors.grey};
  margin-bottom: 12px;
`;

export const DescriptionClub = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
  margin-top: 8px;
`;
