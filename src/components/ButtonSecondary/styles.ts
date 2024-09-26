import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/global';
import { Text } from 'react-native';

interface Props {
  width?: string;
  padding?: string;
  margin?: string;
}

export const ButtonS = styled(TouchableOpacity)<Props>`
  display: flex;
  padding: ${(props) => (props?.padding ? props.padding : '8px 24px')};
  background: ${Colors.whiteSecondary};
  border-radius: 48px;
  margin: ${(props) => (props?.margin ? props?.margin : '0px')};
`;

export const TextInsideButton = styled(Text)`
  font-style: normal;
  font-family: 'Inter_600SemiBold';
  font-size: 14px;
  line-height: 32px;
  color: ${Colors.whiteText};
  align-self: center;
`;
