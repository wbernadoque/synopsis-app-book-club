import React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../styles/global";
import { ButtonText } from "./styles";

interface Props {
  image: ImageSourcePropType;
  title: string;
  onPress: () => void;
  selected: boolean;
  disabled?: boolean;
  marginRight?: number;
  marginLeft?: number;
}

const ButtonSelectorType: React.FC<Props> = ({
  image,
  onPress,
  selected,
  title,
  disabled,
  marginRight,
  marginLeft,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 88,
        height: 88,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: selected ? Colors.primary : "transparent",
        borderWidth: 1,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          paddingBottom: 11,
          borderRadius: 12,
          backgroundColor: selected
            ? Colors.whiteSecondary
            : Colors.backgroundDarkSecondary,
        }}
      >
        <Image
          source={image}
          style={{ tintColor: selected ? Colors.whiteText : Colors.grey }}
        />
        <ButtonText selected={selected} allowFontScaling={false}>
          {title}
        </ButtonText>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSelectorType;
