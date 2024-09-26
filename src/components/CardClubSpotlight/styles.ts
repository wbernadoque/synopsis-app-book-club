import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { View, Text } from 'react-native';

export const ContainerCard = styled(View)`
  display: flex;
  border-radius: 12px;
  width: 259px;
  height: 214px;
  /* background-color: white; */
  margin-right: 16px;

  overflow: hidden;
`;

export const ContainerImage = styled(View)`
  width: 100%;
  height: 115px;
  background-color: ${Colors.backgroundDarkSecondary};
`;

export const ContainerData = styled(View)`
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: ${Colors.backgroundDarkSecondary};
`;

export const TypeCard = styled(Text)`
  font-family: 'Inter_400Regular';
  font-size: 14px;
  color: ${Colors.titlePink};
  line-height: 13px;
`;

export const TitleCard = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 18px;
  color: ${Colors.whiteTrue};
  margin-top: 8px;
  line-height: 20px;
`;

export const ContainerDataCard = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

export const ContainerBlockData = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DescriptionData = styled(Text)`
  color: ${Colors.grey};
  font-size: 14px;
  line-height: 14px;
`;
