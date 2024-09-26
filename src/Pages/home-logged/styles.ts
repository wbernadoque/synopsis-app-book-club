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

export const ButtonAll = styled(Text)`
  font-family: 'Inter_400Regular';
  font-size: 14px;
  color: ${Colors.grey};
`;

export const TitleCenter = styled(Text)`
  text-align: center;
  line-height: 32px;
  font-size: 18px;
  color: ${Colors.grey};
  font-family: 'Inter_700Bold';
  margin-top: 16px;
  margin-bottom: 8px;
  max-width: 252px;
`;

export const TextCenter = styled(Text)`
  font-size: 14px;

  color: ${Colors.grey};
`;
