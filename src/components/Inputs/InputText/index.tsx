import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from "react-native";
import { TextDescription } from "../../../Pages/signup/styles";
import { Colors } from "../../../styles/global";
import { ContainerInput } from "./styles";

interface Props {
  label: string;
  error: boolean;
  onChangeText: (e: any) => void;
  value: any;
  placeholder: string;
  maxLength?: number;
  nameError: string;
  hasCounter?: boolean;
  numberCounter?: string;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  focusMessage?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  hasValidateIcon?: boolean;
  validate?: boolean;
  customWidth?: number;
  customPaddingPlaceholder?: number;
}

const InputText: React.FC<Props> = ({
  label,
  error,
  onChangeText,
  value,
  placeholder,
  maxLength,
  nameError,
  hasCounter,
  numberCounter,
  multiline,
  autoCapitalize,
  focusMessage,
  keyboardType,
  hasValidateIcon = false,
  validate,
  customWidth,
  customPaddingPlaceholder,
}) => {
  const [showHelpTextName, setShowHelpTextName] = useState<boolean>(false);

  return (
    <>
      {!!label && (
        <Text
          style={{
            color: Colors.grey,
            marginLeft: 16,
            fontSize: 16,
            marginTop: 16,
          }}
          allowFontScaling={false}
        >
          {label}
        </Text>
      )}
      <ContainerInput
        errorPassword={error}
        style={
          multiline
            ? {
                borderRadius: 16,
                width: customWidth
                  ? customWidth
                  : Dimensions.get("window").width - 32,
                marginTop: 8,
              }
            : {
                width: customWidth
                  ? customWidth
                  : Dimensions.get("window").width - 32,
                marginTop: 8,
              }
        }
      >
        {multiline ? (
          <View style={{ width: Dimensions.get("window").width - 32 }}>
            <TextInput
              onChangeText={(e) => {
                onChangeText(e);
              }}
              scrollEnabled={true}
              autoCapitalize={autoCapitalize}
              value={value}
              autoCorrect={false}
              placeholder={placeholder}
              placeholderTextColor={"#808191"}
              multiline
              keyboardType={keyboardType}
              maxLength={maxLength}
              style={{
                color: Colors.whiteText,
                width: Dimensions.get("window").width - 32,
                height: 130,
                // marginLeft: 16,
                textAlignVertical: "top",
                fontSize: 16,
                padding: customPaddingPlaceholder || 16,
              }}
              onFocus={() => setShowHelpTextName(true)}
              onBlur={() => setShowHelpTextName(false)}
              allowFontScaling={false}
            />
            {!!focusMessage && showHelpTextName && (
              <TextDescription
                style={{
                  color: Colors.grey,
                  fontSize: 14,
                  lineHeight: 21,
                  marginTop: 8,
                }}
                allowFontScaling={false}
              >
                {focusMessage}
              </TextDescription>
            )}
          </View>
        ) : (
          <>
            <View style={{ width: Dimensions.get("window").width - 32 }}>
              <TextInput
                onChangeText={(e: any) => {
                  onChangeText(e);
                }}
                autoCapitalize={autoCapitalize}
                value={value}
                keyboardType={keyboardType}
                autoCorrect={false}
                enablesReturnKeyAutomatically
                placeholder={placeholder}
                placeholderTextColor={"#808191"}
                maxLength={maxLength}
                style={{
                  color: Colors.whiteText,
                  width: Dimensions.get("window").width - 87,
                  marginLeft: customPaddingPlaceholder || 16,
                  // padding: 16,
                  height: 48,
                  fontSize: 16,
                }}
                onFocus={() => setShowHelpTextName(true)}
                onBlur={() => setShowHelpTextName(false)}
                allowFontScaling={false}
              />

              {hasValidateIcon && validate && (
                <Image
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 12,
                  }}
                  source={require("../../../../assets/images/done.png")}
                />
              )}
            </View>
          </>
        )}

        {hasCounter && (
          <Text
            style={{
              marginLeft: 36,
              marginTop: 4,
              color: Colors.grey,
              position: "absolute",
              right: 0,
              bottom: -24,
            }}
            allowFontScaling={false}
          >
            {value?.length || 0}/{numberCounter}
          </Text>
        )}

        {error && !hasValidateIcon && !validate && (
          <Image
            style={{ position: "absolute", right: 16 }}
            source={require("../../../../assets/images/error-x.png")}
          />
        )}
      </ContainerInput>
      {!!focusMessage && showHelpTextName && (
        <TextDescription
          style={{
            width: customWidth
              ? customWidth
              : Dimensions.get("screen").width - 32,
            color: Colors.grey,
            fontSize: 14,
            lineHeight: 21,
            marginTop: -8,
            marginLeft: 32,
            marginBottom: 16,
          }}
          allowFontScaling={false}
        >
          {focusMessage}
        </TextDescription>
      )}
      {error && (
        <Text
          style={{
            marginTop: -8,
            color: Colors.error,
            marginLeft: 32,
            width: customWidth
              ? customWidth
              : Dimensions.get("screen").width - 48,
          }}
          allowFontScaling={false}
        >
          {nameError}
        </Text>
      )}
    </>
  );
};

export default InputText;
