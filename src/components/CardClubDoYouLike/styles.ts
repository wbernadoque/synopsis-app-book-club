import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { View, Text } from 'react-native';

export const ContainerCard = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 12px;
  padding: 16px;
  height: 138px;
  background-color: ${Colors.backgroundDarkSecondary};
  margin-right: 16px;
  margin-left: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ContainerImage = styled(View)`
  width: 106px;
  height: 106px;
  border-radius: 12px;
  overflow: hidden;
`;

export const ContainerData = styled(View)`
  display: flex;
  flex: 1;
  margin-left: 16px;
`;

export const TitleCardClub = styled(Text)`
  font-size: 16px;
  font-family: 'Inter_500Medium';
  color: ${Colors.whiteTrue};
`;

export const DescriptionAuthor = styled(Text)`
  font-size: 14px;
  font-family: 'Inter_400Regular';
  color: ${Colors.grey};
  margin-top: 8px;
`;

export const DataClub = styled(Text)`
  font-size: 14px;
  font-family: 'Inter_400Regular';
  color: ${Colors.greyInfo};
  margin-top: 8px;
`;
