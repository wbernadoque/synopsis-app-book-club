import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const ContainerButton = styled(TouchableOpacity)`
  height: 42px;
  width: 42px;
  background: ${Colors.primary};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
