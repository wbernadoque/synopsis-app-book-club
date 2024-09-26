import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  position: relative;
  /* padding: 16px; */
`;

export const DescriptionTypeClub = styled(Text)`
  color: ${Colors.grey};
  font-size: 16px;
  font-family: 'Inter_600SemiBold';
  margin-left: 16px;
  margin-bottom: 16px;
`;

export const ContainerMyClubsEmpty = styled(View)`
  flex: 1;
  padding-top: 89px;
  justify-content: center;
  align-items: center; ;
`;

export const TitleEmpty = styled(Text)`
  font-family: 'Inter_700Bold';
  font-size: 18px;
  text-align: center;
  color: ${Colors.grey};
  line-height: 32px;
  max-width: 252px;
  margin-top: 16px;
`;

export const TextEmpty = styled(Text)`
  font-family: 'Inter_400Regular';
  font-size: 14px;
  color: ${Colors.grey};
  text-align: center;
  max-width: 230px;
  margin-top: 8px;
  line-height: 24px;
`;
