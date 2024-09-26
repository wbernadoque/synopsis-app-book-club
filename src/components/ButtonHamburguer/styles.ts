import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Colors } from '../../styles/global';

interface Props {
  width?: string;
  margin?: string;
}

export const ButtonP = styled(TouchableOpacity)<Props>`
  display: flex;
  padding: 8px 24px;
  background: ${Colors.primary};
  border-radius: 48px;
  margin-bottom: ${(props: Props) => (props?.margin ? props?.margin : '0px')};
`;

export const TextInsideButton = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 32px;
  color: ${Colors.whiteTrue};
  align-self: center;
`;
