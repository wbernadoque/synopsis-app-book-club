import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';

export const ContainerDrawer = styled(SafeAreaView)`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

export const ContainerDataDrawer = styled(View)`
  width: 100%;
  padding-top: 88px;
  flex-direction: row;
`;

export const SeparatedDrawer = styled(View)`
  height: 1px;
  width: 100%;
  background-color: ${Colors.whiteSecondary};
  margin-top: 40px;
`;

export const TitleDrawer = styled(Text)`
  color: ${Colors.whiteText};
  font-family: 'Inter_600SemiBold';
  font-size: 16px;
`;

export const DescriptionDrawer = styled(Text)`
  color: ${Colors.grey};
  font-size: 14px;
  margin-top: 4px;
`;
