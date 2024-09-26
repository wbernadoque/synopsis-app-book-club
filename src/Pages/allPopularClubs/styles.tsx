import styled from 'styled-components';

import { Colors } from '../../styles/global';
import { ScrollView, View, Text, Platform } from 'react-native';

export const ContainerScroll = styled(ScrollView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  position: relative;
  margin-top: ${Platform.OS === 'android' ? '100px' : '56px'};
`;

export const ContainerScrollHorizontal = styled(ScrollView)`
  display: flex;
  flex-direction: row;
  height: 230px;
  padding-bottom: 5px;
`;

export const ContainerTitle = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 16px;
`;

export const Title = styled(Text)`
  font-family: 'Inter_600SemiBold';
  font-size: 20px;
  color: ${Colors.whiteText};
`;
