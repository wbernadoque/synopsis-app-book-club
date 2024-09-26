import { View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';

interface Props {
  errorPassword?: boolean;
}

export const ContainerInput = styled(View)<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #252836;
  border-radius: 64px;
  font-size: 16px;
  align-self: center;
  margin-bottom: 16px;
  ${(props) =>
    props?.errorPassword === true && `border: 1px solid ${Colors.error}`};
`;
