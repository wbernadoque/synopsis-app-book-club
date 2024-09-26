import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../../styles/global';

export const ContainerReading = styled(View)`
  flex: 1;
  margin-top: 20px;
`;

export const ContainerInfo = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const TextContainer = styled(View)`
  margin-left: 14px;
  margin-top: 4px;
`;
export const DateInfo = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const Cover = styled<any>(Image)`
  border-radius: 10px;
  width: 125px;
  height: 183px;
`;

export const Title = styled(Text)`
  color: ${Colors.whiteText};
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 8px;
`;

export const SubTitle = styled(Text)`
  color: ${Colors.grey};
  line-height: 14px;
  /* margin-bottom: 10px; */
`;

export const TextInfo = styled(Text)`
  color: ${Colors.grey};
`;

export const Participants = styled(Text)`
  color: ${Colors.grey};
  font-size: 11px;
  margin-left: 4px;
`;

export const ReadersContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  /* padding: 0 32px; */
`;

export const AvatarImage = styled(Image)`
  margin: 16px 1px;
  width: 24px;
  height: 24px;
`;

export const ButtonView = styled(View)`
  align-items: center;
`;
