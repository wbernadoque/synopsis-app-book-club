import React from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { Colors } from "../../styles/global";
import { ButtonP, ButtonPWithoutPress, TextInsideButton } from "./styles";

interface Props {
  width?: "full" | "half" | number;
  margin?: string;
  padding?: string;
  title: string;
  navigation?: () => void | undefined | Promise<void>;
  disabled?: boolean;
  onPressAction?: () => void;
  loading?: boolean;
}

const ButtonPrimary: React.FC<Props> = ({
  width,
  margin,
  padding,
  title,
  navigation,
  disabled,
  onPressAction,
  loading,
}) => {
  return (
    <>
      {navigation || onPressAction ? (
        <ButtonP
          disabled={disabled}
          hasDisabled={disabled}
          margin={margin}
          padding={padding}
          style={[
            width === "full"
              ? { width: Dimensions.get("window").width - 32 }
              : width === "half"
              ? { width: Dimensions.get("window").width / 2 - 32 }
              : { width: width },
            { flexDirection: "row", justifyContent: "center" },
          ]}
          onPress={() =>
            navigation
              ? navigation()
              : onPressAction
              ? onPressAction()
              : undefined
          }
        >
          <TextInsideButton
            style={disabled && { opacity: 0.5 }}
            allowFontScaling={false}
          >
            {title}
          </TextInsideButton>
          {loading && (
            <ActivityIndicator size="small" color={Colors.whiteText} />
          )}
        </ButtonP>
      ) : (
        <ButtonPWithoutPress
          hasDisabled={disabled}
          margin={margin}
          padding={padding}
          style={
            width === "full"
              ? { width: Dimensions.get("window").width - 32 }
              : width === "half"
              ? { width: Dimensions.get("window").width / 2 - 32 }
              : { width: width }
          }
        >
          <TextInsideButton
            style={disabled && { opacity: 0.5 }}
            allowFontScaling={false}
          >
            {title}
          </TextInsideButton>
        </ButtonPWithoutPress>
      )}
    </>
  );
};

export default ButtonPrimary;
