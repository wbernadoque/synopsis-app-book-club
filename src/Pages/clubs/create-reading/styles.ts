import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';

export const ContainerScroll = styled(ScrollView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
`;

export const TextModalTitle = styled(Text)`
  font-size: 14px;
  font-family: 'Inter_600SemiBold';
  color: ${Colors.whiteText};
  margin-bottom: 4px;
  margin-top: 16px;
`;

export const TextModalAuthor = styled(Text)`
  font-size: 14px;
  color: ${Colors.whiteText};
`;

export const ContainerModalDataPage = styled(View)`
  border-radius: 12px;
  width: 100%;
  background-color: ${Colors.tabBarBackground};
  flex-direction: row;
  width: 328px;
  height: 72px;
  margin-top: 16px;
  padding: 17px 0 17px 0;
`;

export const ContentData = styled(View)`
  flex: 1;
  align-items: center;
`;
