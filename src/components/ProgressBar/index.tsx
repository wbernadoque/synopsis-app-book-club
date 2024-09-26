import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarProgress, ContainerProgressBar, Percentage } from "./styles";

interface Props {
  progress: number;
  bgColor?: string;
  progressColor?: string;
  width?: number;
}

const ProgressBar: React.FC<Props> = ({
  progress,
  bgColor,
  progressColor,
  width,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <ContainerProgressBar bgColor={bgColor}>
        <BarProgress width={progress} progressColor={progressColor} />
      </ContainerProgressBar>
      <Percentage allowFontScaling={false}>{progress}%</Percentage>
    </View>
  );
};

export default ProgressBar;
