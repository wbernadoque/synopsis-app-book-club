import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { SafeAreaView, View, Image, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  position: relative;
`;

export const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  color: ${Colors.whiteText};
  width: 70%;
  margin-left: 16px;
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
  text-align: center;
  max-width: ${Dimensions.get('window').width - 64}px;

  color: ${Colors.grey};
`;
