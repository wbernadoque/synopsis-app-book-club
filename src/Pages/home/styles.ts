import styled from 'styled-components';
import { Colors } from '../../styles/global';
import { Text, View } from 'react-native';

export const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  margin-top: 32px;
  text-align: center;

  color: ${Colors.whiteText};
`;
export const TextDescription = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  text-align: center;
  width: 244px;
  color: ${Colors.whiteText};
`;

export const ContainerButtons = styled(View)`
  display: flex;
  margin-top: 72px;
`;
