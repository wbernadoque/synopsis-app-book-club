import { Text } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';

interface Props {
  color: string;
}

export const Label = styled(Text)`
  font-size: 16px;
  font-family: 'Inter_600SemiBold';
  color: ${Colors.grey};
`;

export const LabelRadioButton = styled(Text)<Props>`
  color: ${(props) => props.color};
  font-size: 14px;
`;
