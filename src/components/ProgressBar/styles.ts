import { View, Text } from "react-native";
import styled from "styled-components";
import { Colors } from "../../styles/global";

interface Props {
  width?: number;
  bgColor?: string;
  progressColor?: string;
}

export const ContainerProgressBar = styled(View)<Props>`
  flex: 1;
  height: 4px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : Colors.backgroundDark};
  border-radius: 8px;
  margin-right: 4px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
`;

export const BarProgress = styled(View)<Props>`
  width: ${(props) => props.width}%;
  height: 4px;
  background-color: ${(props) => props.progressColor || Colors.primary};
  border-radius: 8px;
`;

export const Percentage = styled(Text)`
  color: ${Colors.grey};
  width: 40px;
  text-align: right;
`;
