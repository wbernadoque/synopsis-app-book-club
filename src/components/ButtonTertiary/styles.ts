import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Colors } from "../../styles/global";

export const ContainerButtonTertiary = styled(TouchableOpacity)<{
  width?: string;
}>`
  background-color: ${Colors.backgroundDarkSecondary};
  width: ${(props) => props.width || "156px"};
  height: 84px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

export const TextButtonTertiary = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
  font-family: "Inter_500Medium";
  text-align: center;
  margin-top: 8px;
`;
