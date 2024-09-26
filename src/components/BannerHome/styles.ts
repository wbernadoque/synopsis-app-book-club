import { View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const ContainerBanner = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.backgroundDarkSecondary};
  border-radius: 12px;
  margin: 16px 16px;
  height: 136px;
`;

export const ContainerButtons = styled(View)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 11px 16px;
`;
