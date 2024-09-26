import React from "react";
import { Dimensions } from "react-native";
import { ButtonS, TextInsideButton } from "./styles";

interface Props {
  width: "full" | "half" | number;
  title: string;
  margin?: string;
  padding?: string;
  navigation: () => void;
}

const ButtonSecondary: React.FC<Props> = ({
  width,
  margin,
  navigation,
  title,
  padding,
}) => {
  return (
    <>
      <ButtonS
        padding={padding}
        margin={margin}
        onPress={() => navigation()}
        style={
          width === "full"
            ? { width: Dimensions.get("window").width - 32 }
            : width === "half"
            ? { width: Dimensions.get("window").width / 2 - 32 }
            : { width: width }
        }
      >
        <TextInsideButton allowFontScaling={false}>{title}</TextInsideButton>
      </ButtonS>
    </>
  );
};

export default ButtonSecondary;
