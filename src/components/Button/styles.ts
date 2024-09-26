import styled from "styled-components";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { Colors } from "../../styles/global";

interface Props {
  width?: string;
  margin?: string;
  padding?: string;
  hasDisabled?: boolean;
  backgroundButtonGrey?: boolean;
}

export const ButtonP = styled(TouchableOpacity)<Props>`
  display: flex;
  padding: ${(props) => (props?.padding ? props.padding : "8px 24px")};
  background: ${(props) =>
    props.hasDisabled ? Colors.primaryDisabled : Colors.primary};
  border-radius: 48px;
  margin: ${(props) => (props?.margin ? props?.margin : "0px")};
`;

export const ButtonPWithoutPress = styled(View)<Props>`
  display: flex;
  padding: ${(props) => (props?.padding ? props.padding : "8px 24px")};
  background: ${(props) =>
    props.hasDisabled ? Colors.primaryDisabled : Colors.primary};
  border-radius: 48px;
  margin: ${(props) => (props?.margin ? props?.margin : "0px")};
`;

export const TextInsideButton = styled(Text)<{ color?: string }>`
  font-style: normal;
  font-family: "Inter_600SemiBold";
  font-size: 14px;
  line-height: 32px;
  color: ${(props) => props?.color || Colors.whiteTrue};
  align-self: center;
`;
