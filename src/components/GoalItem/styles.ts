import { Text, View, TouchableOpacity, Touchable } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { Dimensions } from 'react-native';

// const width = Dimensions.get('window').width - 20;

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 112px;
  margin: 6px 0;
  background-color: ${Colors.backgroundDarkSecondary};
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;
  border-radius: 16px;
`;

export const GoalTitle = styled(Text)`
  color: ${Colors.whiteText};
  font-size: 16px;
  padding-left: 18px;
`;

export const ContainerInfo = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4px;
`;

export const CheckButton = styled(View)`
  width: 24px;
  height: 24px;
  border: 3px solid #808191;
  border-radius: 4px;
`;

export const OptionItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-vertical: 6px;
  justify-content: flex-start;
`;
