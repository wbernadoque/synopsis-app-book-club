import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { ContainerButtonTertiary, TextButtonTertiary } from "./styles";
import { Colors } from "../../styles/global";

interface Props {
  image: ImageSourcePropType;
  name: string;
  hasToasty?: boolean;
  onPress: () => void;
  width?: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
}

const ButtonTertiary: React.FC<Props> = ({
  image,
  name,
  hasToasty,
  onPress,
  width,
  style,
  styleText,
}) => {
  return (
    <ContainerButtonTertiary onPress={onPress} width={width} style={style}>
      <View style={{ position: "relative" }}>
        <Image source={image} />
        {!!hasToasty && (
          <Image
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              borderColor: Colors.backgroundDarkSecondary,
              borderWidth: 1,
              borderRadius: 10,
            }}
            source={require("../../../assets/images/toasty_notification.png")}
          />
        )}
      </View>
      <TextButtonTertiary allowFontScaling={false} style={styleText}>
        {name}
      </TextButtonTertiary>
    </ContainerButtonTertiary>
  );
};

export default ButtonTertiary;
