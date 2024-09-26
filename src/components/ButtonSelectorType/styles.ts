import { Text } from "react-native";
import styled from "styled-components";
import { Colors } from "../../styles/global";

interface PropsText {
  selected: boolean;
}

export const ButtonText = styled(Text)<PropsText>`
  font-size: 14px;
  font-family: "Inter_500Medium";
  line-height: 22px;
  color: ${(props) => (props.selected ? Colors.whiteText : Colors.grey)};
  text-align: center;
`;
