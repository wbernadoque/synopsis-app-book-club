import { Dimensions, Text, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';

export const Overflow = styled(View)`
  position: absolute;
  flex: 1;
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height}px;
  /* padding: 0px 16px; */
  background-color: ${Colors.pureBlack};
  opacity: 0.6;
`;

export const ContainerModal = styled(View)`
  width: 100%;
  height: auto;
  min-height: 200px;
  background-color: ${Colors.backgroundDarkSecondary};
  border-radius: 24px;
  overflow: hidden;
  padding: 24px 16px;
`;

export const Container = styled(View)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
`;

export const TitleModal = styled(Text)`
  font-size: 16px;
  color: ${Colors.whiteText};
  font-family: 'Inter_600SemiBold';
  margin-bottom: 16px;
  margin-top: 21px;
`;

export const TextModal = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
  margin-bottom: 30px;
`;

export const ContainerButtonsModal = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
