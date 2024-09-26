import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Colors } from "../../styles/global";

export const ContainerDetail = styled(TouchableOpacity)`
  align-items: center;
  width: 95px;
`;

export const DataDetail = styled(Text)`
  font-family: "Inter_600SemiBold";
  font-size: 16px;
  color: ${Colors.whiteText};
  margin-bottom: 8px;
`;

export const NameDetail = styled(Text)`
  font-size: 14px;
  color: ${Colors.grey};
  text-align: center;
`;
