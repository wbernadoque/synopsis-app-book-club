import React from "react";
import { Image } from "react-native";
import { ContainerButton } from "./styles";

interface Props {
  onPress?: () => void;
}

const ButtonAdd: React.FC<Props> = ({ onPress }) => {
  return (
    <ContainerButton onPress={onPress}>
      <Image source={require("../../../assets/images/Add.png")} />
    </ContainerButton>
  );
};

export default ButtonAdd;
