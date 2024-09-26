import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { View, Image } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary};
`;
export const ContainerDark = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.backgroundDark};
`;

export const ImageLoading = styled(Image)`
  width: 112px;
  height: 170px;
`;
